/* eslint-disable @typescript-eslint/no-unused-vars */
// components/header-buttons.tsx
"use client"

import GroupChatModal from "@/app/conversations/components/group-chat-modal";
import { FullConversationType } from "@/app/types";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { UserPlus } from "lucide-react"; // Import icon UserPlus
import { useState } from "react";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}

const Header: React.FC<ConversationListProps> = ({
  initialItems,
  users,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <GroupChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        users={users}
      />
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsModalOpen(true)}
        >
          <UserPlus className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
};

export default Header;
