/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {db} from "@/lib/db";
import { CurrentUser } from "./current-user";

const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await CurrentUser();

    if (!currentUser?.email) {
      return null;
    }

    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    return conversation;
  } catch (error: any) {
    return null;
  }
};

export default getConversationById;
