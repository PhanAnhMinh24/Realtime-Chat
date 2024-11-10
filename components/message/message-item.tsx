import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Image from "next/image";

interface MessageProps {
  content: string;
  timestamp: string;
  isLastMessage: boolean;
  isUnread: boolean;
}

export function Message({
  content,
  timestamp,
  isLastMessage,
  isUnread,
}: MessageProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-3">
        <Image
          alt="Avatar"
          className="h-8 w-8 rounded-full"
          src=""
        />
        <Card
          className={`max-w-[80%] rounded-3xl rounded-tl-none p-3 ${
            isUnread ? "bg-blue-100" : "bg-gray-100"
          }`}
        >
          <p>{content}</p>
        </Card>
      </div>
      <div className="flex items-center gap-2 pl-11 text-xs text-gray-500">
        <span>{timestamp}</span>
        {isLastMessage && (
          <span className="flex items-center gap-1">
            <Check className="h-3 w-3" />
            Seen
          </span>
        )}
        {isUnread && <span className="text-blue-500 font-semibold">New</span>}
      </div>
    </div>
  );
}
