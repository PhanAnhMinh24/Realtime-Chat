/* eslint-disable @typescript-eslint/no-unused-vars */
// components/ConversationList.tsx
"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConversationBox from "./conversation-box";
import { User } from "@prisma/client"; // Import the User type

interface ConversationListProps {
  initialItems: FullConversationType[];
  currentUser: User | null; // Add currentUser to the props
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  currentUser, // Accept currentUser as a prop
}) => {
  const [items, setItem] = useState(initialItems);
  const router = useRouter();
  const { conversationId, isOpen } = useConversation();

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
