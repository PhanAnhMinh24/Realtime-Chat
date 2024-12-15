/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useCallback } from "react";
import clsx from "clsx";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import { useRouter } from "next/navigation";
import Avatar from "@/components/message/avatar";
import { User } from "@prisma/client";
import { format } from "date-fns";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
  currentUser: User | null; // Current user details
  onClick?: () => void; // Optional click handler for parent component to use
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
  currentUser,
  onClick, // Destructure optional onClick handler
}) => {
  const router = useRouter();

  // Hook để lấy thông tin user còn lại trong cuộc trò chuyện
  const otherUser = useOtherUser(data, currentUser);

  // Nếu không có onClick, mặc định sẽ điều hướng đến trang trò chuyện
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(); // Ưu tiên sử dụng onClick được truyền vào
    } else {
      router.push(`/conversations/${data.id}`);
    }
  }, [onClick, router, data.id]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1] || null;
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return currentUser?.email || "";
  }, [currentUser]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;

    const seenArray = lastMessage.seen || [];
    return seenArray.some((user) => user.email === userEmail);
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (!lastMessage) return "No messages yet";
    if (lastMessage.image) return "Sent an image";
    if (lastMessage.body) return lastMessage.body;
    return "Started a conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "w-full",
        "relative",
        "flex",
        "items-center",
        "space-x-3",
        "hover:bg-neutral-100",
        "rounded-lg",
        "transition",
        "cursor-pointer",
        "p-3",
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      {/* Render avatar của người dùng */}
      {otherUser ? (
        <Avatar user={otherUser} />
      ) : (
        <div className="w-10 h-10 bg-gray-300 rounded-full" />
      )}

      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {data.name || otherUser?.name || "Unknown"}
            </p>
            <p className="text-xs text-gray-400 font-light">
              {lastMessage?.createdAt
                ? format(new Date(lastMessage.createdAt), "p")
                : ""}
            </p>
          </div>
          <p
            className={clsx(
              "truncate",
              "text-sm",
              hasSeen ? "text-gray-500" : "text-black font-medium"
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
