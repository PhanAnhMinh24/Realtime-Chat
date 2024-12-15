import { CurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface IParams {
  conversationId?: string;
}

export async function GET(request: Request, { params }: { params: { conversationId: string } }) {
    const { conversationId } = params;

    if (!conversationId) {
        return new NextResponse("Missing conversationId", { status: 400 });
    }

    try {
        // Truy vấn lấy danh sách messages và attachments
        const messages = await db.message.findMany({
            where: {
                conversationId,
            },
            include: {
                attachments: true, // Lấy tất cả các file đính kèm liên quan
                sender: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        if (!messages || messages.length === 0) {
            return NextResponse.json([]);
        }

        // Format dữ liệu trả về
        const formattedMessages = messages.map((message) => ({
            messageId: message.id,
            body: message.body,
            createdAt: message.createdAt,
            sender: {
              id: message.sender?.id,
              name: message.sender?.name,
              avatar: message.sender?.image || null,
            },
            attachments: message.attachments.map((attachment) => ({
              id: attachment.id,
              type: attachment.type,
              url: attachment.url,
            })),
        }));

        return NextResponse.json(formattedMessages);
    } catch (error) {
        console.error(
            `Error fetching attachments for conversation ${conversationId}:`,
            error
        );
      return new NextResponse("Internal Server Error", { status: 500 });
    }
}
