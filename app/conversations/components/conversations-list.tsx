// components/ConversationList.tsx
"use client";

import { FullConversationType } from "@/app/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ConversationBox from "./conversation-box";
import { User } from "@prisma/client"; // Import the User type

interface ConversationListProps {
  initialItems: FullConversationType[];
  currentUser: User | null; // Pass currentUser as a prop
  onSelectConversation: (conversation: FullConversationType) => void; // Handler for conversation selection
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  currentUser,
  onSelectConversation,
}) => {
  const [conversations, setConversations] = useState<FullConversationType[]>(initialItems);
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      setConversations(initialItems);
    }
  }, [initialItems, currentUser]);

  const handleSelectConversation = (conversation: FullConversationType) => {
    onSelectConversation(conversation);
    router.push(`/conversations/${conversation.id}`);
  };

  return (
    <div>
      {conversations.map((conversation) => (
        <ConversationBox
          key={conversation.id}
          data={conversation}
          currentUser={currentUser}
          onClick={() => handleSelectConversation(conversation)}
        />
      ))}
    </div>
  );
};

export default ConversationList;
