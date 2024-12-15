import { CurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// POST: Tạo cuộc trò chuyện
export async function POST(request: Request) {
  try {
    const currentUser = await CurrentUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    // Kiểm tra nếu là cuộc trò chuyện nhóm
    if (isGroup) {
      const memberIds = members.map(
        (member: { value: string }) => member.value
      );
      const userIds = [currentUser.id, ...memberIds];

      const newConversation = await db.conversation.create({
        data: {
          name,
          isGroup,
          userIds, // Lưu userIds
          users: {
            connect: userIds.map((id) => ({ id })),
          },
        },
        include: {
          users: true,
        },
      });
      return NextResponse.json(newConversation);
    }

    // Kiểm tra nếu cuộc trò chuyện giữa hai người đã tồn tại
    const existingConversations = await db.conversation.findMany({
      where: {
        isGroup: false,
        AND: [
          { userIds: { has: currentUser.id } },
          { userIds: { has: userId } },
        ],
      },
    });

    if (existingConversations.length > 0) {
      const existingConversation = existingConversations[0];
      return NextResponse.json(existingConversation);
    }

    // Tạo cuộc trò chuyện mới giữa hai người
    const newConversation = await db.conversation.create({
      data: {
        userIds: [currentUser.id, userId], // Lưu userIds
        users: {
          connect: [{ id: currentUser.id }, { id: userId }],
        },
      },
      include: {
        users: true,
      },
    });

    return NextResponse.json(newConversation);
  } catch (error) {
    return new NextResponse(`Internal error: ${error}`, {
      status: 500,
    });
  }
}

// GET: Lấy thông tin cuộc trò chuyện
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get("conversationId"); // Lấy conversationId từ URL query parameters

    if (!conversationId) {
      return new NextResponse("Conversation ID is required", { status: 400 });
    }

    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
        messages: true, // Nếu bạn muốn lấy thông tin các tin nhắn
      },
    });

    if (!conversation) {
      return new NextResponse("Conversation not found", { status: 404 });
    }

    return NextResponse.json(conversation);
  } catch (error) {
    return new NextResponse(`Internal error: ${error}`, {
      status: 500,
    });
  }

}
