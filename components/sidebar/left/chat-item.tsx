"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import Avatar from "@/components/message/avatar";
import { Clock, Circle } from "lucide-react";

interface ChatItemProps {
  data: User;
  lastMessage?: string;
  lastMessageTime?: Date;
}

const ChatItem: React.FC<ChatItemProps> = ({
  data,
  lastMessage,
  lastMessageTime,
}) => {
  const router = useRouter();
  const [, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((response) => {
        router.push(`/conversations/${response.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      onClick={handleClick}
      className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
    >
      <Avatar user={data} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900">{data.name}</p>
            {lastMessageTime && (
              <span className="text-xs text-gray-500 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {formatTime(lastMessageTime)}
              </span>
            )}
          </div>
          <div className="flex items-center">
            <Circle className={`w-2 h-2 mr-2 text-green-500`} />
            <p className="text-sm text-gray-500 truncate">
              {lastMessage || "No messages yet"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
