/* eslint-disable @typescript-eslint/no-unused-vars */
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/components/sidebar/right/avatar";
import { Conversation, User } from "@prisma/client";
import { useMemo } from "react";

interface InfoChatAvtProps {
  conversation: Conversation & {
    users: User[];
  };
  currentUser: User | null; // Allow currentUser to be null
}

const InfoChatAvt: React.FC<InfoChatAvtProps> = ({ conversation, currentUser }) => {
  // Add a check to handle the case when currentUser is null
  const otherUser = useOtherUser(conversation, currentUser);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active";
  }, [conversation]);

  return (
    <div
      className="
        bg-white 
        w-full 
        flex 
        border-b-[1px] 
        sm:px-4 
        py-3 
        px-4 
        lg:px-6 
        justify-between 
        items-center 
        shadow-sm
      "
    >
      <div className="flex gap-3 items-center">
        {otherUser ? <Avatar user={otherUser} /> : ""}{" "}
      </div>
    </div>
  );
};

export default InfoChatAvt;
