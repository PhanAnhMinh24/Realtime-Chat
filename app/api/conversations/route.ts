import { CurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
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

    if (isGroup) {
      const newConversation = await db.conversation.create({
        data: {
          isGroup,
          name,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      newConversation.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, "conversation:new", newConversation);
        }
      });
    
      return NextResponse.json(newConversation);
    }

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

    newConversation.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:new", newConversation);
      }
    });

    return NextResponse.json(newConversation);
  } catch (error) {
    return new NextResponse(`Internal error: ${error}`, {
      status: 500,
    });
  }
}
