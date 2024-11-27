import { db } from "@/lib/db";
import { CurrentUser } from "./current-user";

const getConversations = async () => {
  const currentUser = await CurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const conversations = await db.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: currentUser.id, 
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });

    return conversations;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return [];
  }
};

export default getConversations;
