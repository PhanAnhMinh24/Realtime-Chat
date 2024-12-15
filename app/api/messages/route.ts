/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await CurrentUser();
    const body = await request.json();

    const { message, image, conversationId } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const newMessage = await db.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    const updatedConversation = await db.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });
    console.log(newMessage);

    return NextResponse.json(newMessage);
  } catch (error: any) {
    console.log(error, "ERROR_MESSAGES");
    return new NextResponse("Internal Error", { status: 500 });
  }
}

//Lọc tin nhắn
// Lọc tin nhắn
export async function GET(request: Request) {
  try {
    const currentUser = await CurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("searchTerm") || "";

    // Fetch messages matching the search term along with conversation and sender information
    const messages = await db.message.findMany({
      where: {
        OR: [
          { body: { contains: searchTerm, mode: "insensitive" } },
          { sender: { email: { contains: searchTerm, mode: "insensitive" } } },
        ],
      },
      include: {
        sender: true,
        conversation: true, // Đảm bảo trả về tên cuộc trò chuyện
      },
      orderBy: {
        createdAt: "desc", // Sort by newest first
      },
    });

    return NextResponse.json(messages);
  } catch (error: any) {
    console.log(error, "ERROR_FILTER_MESSAGES");
    return new NextResponse("Internal Error", { status: 500 });
  }
}