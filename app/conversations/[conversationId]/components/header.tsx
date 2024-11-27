/* eslint-disable @typescript-eslint/no-unused-vars */
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/components/message/avatar";
import { Conversation, User } from "@prisma/client";
import { useMemo } from "react";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
  currentUser: User | null; // Allow currentUser to be null
}

const Header: React.FC<HeaderProps> = ({ conversation, currentUser }) => {
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
        {/* Make sure Avatar can handle null or undefined */}
        <div className="flex flex-col">
          <div className="">{conversation.name || otherUser?.name}</div>
        </div>
        <div className="text-sm font-light text-neutral-500">{statusText}</div>
      </div>
    </div>
  );
};

export default Header;
