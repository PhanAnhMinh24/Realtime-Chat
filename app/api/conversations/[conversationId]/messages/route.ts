import { CurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

//PUT: Cập nhật tin nhắn
export async function PUT(request: Request) {
  try {
    const currentUser = await CurrentUser();
    const body = await request.json();
    const { messageId, newContent } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!messageId || !newContent) {
      return new NextResponse("Message ID and new content are required", { status: 400 });
    }

    const message = await db.message.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      return new NextResponse("Message not found", { status: 404 });
    }

    if (message.senderId !== currentUser.id) {
      return new NextResponse("You are not authorized to edit this message", { status: 403 });
    }

    const updatedMessage = await db.message.update({
      where: { id: messageId },
      data: { body: newContent },
    });

    return NextResponse.json(updatedMessage);
  } catch (error) {
    return new NextResponse(`Internal error: ${error}`, { status: 500 });
  }
}