import { NextResponse } from "next/server";
import { StreamChat } from "stream-chat";

export async function POST(request: Request) {
  try {
    const serverClient = StreamChat.getInstance(
      "24g96492rxjm",
      process.env.STREAM_CHAT_SECRET
    );

    const body = await request.json();
    console.log("[/api/token] Body:", body);

    const userId = body?.userId;

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const token = serverClient.createToken(userId);

    return NextResponse.json({ userId, token });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
