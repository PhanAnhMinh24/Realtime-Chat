/* eslint-disable @typescript-eslint/no-unused-vars */
// components/ConversationList.tsx
"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ConversationBox from "./conversation-box";
import { User } from "@prisma/client"; // Import the User type
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";

interface ConversationListProps {
  initialItems: FullConversationType[];
  currentUser: User | null;
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  currentUser,
}) => {
  const [items, setItems] = useState(initialItems);
  const router = useRouter();
  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return currentUser?.email;
  }, [currentUser?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }
        return [conversation, ...current];
      });
    };

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }
          return currentConversation;
        })
      );
    };

    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:update", updateHandler);
    };
  }, [pusherKey]);

  return (
    <div className="h-[600px]">
      {items.map((item) => (
        <ConversationBox
          key={item.id}
          data={item}
          selected={conversationId === item.id}
          currentUser={currentUser} // Pass currentUser to ConversationBox
        />
      ))}
    </div>
  );
};

export default ConversationList;
