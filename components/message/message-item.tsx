import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Image from "next/image";

interface MessageProps {
  content: string;
  timestamp: string;
  isLastMessage: boolean;
  isUnread: boolean;
  isSent: boolean;
}

export function Message({
  content,
  timestamp,
  isLastMessage,
  isUnread,
  isSent,
}: MessageProps) {
  return (
    <div className={`flex flex-col gap-1 ${isSent ? "items-end" : ""}`}>
      <div className={`flex gap-3 ${isSent ? "flex-row-reverse" : ""}`}>
        {!isSent && (
          <Image alt="Avatar" className="h-8 w-8 rounded-full" src="" />
        )}
        <Card
          className={`max-w-[80%] p-3 ${
            isSent
              ? "bg-blue-500 text-white rounded-3xl rounded-tr-none"
              : `${
                  isUnread ? "bg-blue-100" : "bg-gray-100"
                } rounded-3xl rounded-tl-none`
          }`}
        >
          <p>{content}</p>
        </Card>
      </div>
      <div
        className={`flex items-center gap-2 text-xs text-gray-500 ${
          isSent ? "justify-end" : "pl-11"
        }`}
      >
        <span>{timestamp}</span>
        {isLastMessage && isSent && (
          <span className="flex items-center gap-1">
            <Check className="h-3 w-3" />
            Seen
          </span>
        )}
        {isUnread && !isSent && (
          <span className="text-blue-500 font-semibold">New</span>
        )}
      </div>
    </div>
  );
}
