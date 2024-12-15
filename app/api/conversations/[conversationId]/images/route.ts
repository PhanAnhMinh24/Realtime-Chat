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
            select: {
                image: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: 'asc',
            },         
        });

        if (!messages || messages.length === 0) {
            return NextResponse.json([]);
        }

        // Format dữ liệu trả về
        const formattedMessages = messages.map(message => ({
            image: message.image, // Hình ảnh nếu có
            createdAt: message.createdAt, // Thời gian tạo tin nhắn
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
