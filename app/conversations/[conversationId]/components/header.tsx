/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/components/message/avatar";
import { Conversation, User } from "@prisma/client";
import { useMemo, useState } from "react";
import ProfileDrawer from "./profile-drawer";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import AvatarGroup from "@/components/message/avatar-group";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
  currentUser: User | null;
}

const Header: React.FC<HeaderProps> = ({ conversation, currentUser }) => {
  // Add a check to handle the case when currentUser is null
  const otherUser = useOtherUser(conversation, currentUser);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active";
  }, [conversation]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        currentUser={currentUser}
        onClose={() => setDrawerOpen(false)}
      />
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
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            otherUser ? <Avatar user={otherUser} /> : null
          )}
          {/* Make sure Avatar can handle null or undefined */}
          <div className="flex flex-col">
            <div className="">{conversation.name || otherUser?.name}</div>
          </div>
          <div className="text-sm font-light text-neutral-500">
            {statusText}
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="
                text-sky-500
                cursor-pointer
                hover:text-sky-600
                transition
              "
        />
      </div>
    </>
  );
};

export default Header;
