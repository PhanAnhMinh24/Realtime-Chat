"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatInput } from "./chat-input";
import { MessageList } from "@/components/message/message-list";

export function MainChatArea() {
  return (
    <div className="flex flex-1 flex-col h-[620px]">
      <ScrollArea className="flex-1 p-4">
        <div className="conversation-details">
          <p>Conversation ID: Placeholder</p>
          <MessageList messages={[]} />
        </div>
      </ScrollArea>
      {/* Set chiều cao cố định cho phần nhập liệu */}
      <ChatInput /> 
    </div>
  );
}
