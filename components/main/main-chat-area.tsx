"use client";

import { useEffect, useMemo, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import { MessageList } from "@/components/message/message-list";

export function MainChatArea() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Memoize the messages array
  const messages = useMemo(
    () => [
      {
        content: "Hey, how's it going?",
        timestamp: "10:30 AM",
        isUnread: false,
        isSent: false,
      },
      {
        content: "Hey, how's it going?",
        timestamp: "10:30 AM",
        isUnread: false,
        isSent: false,
      },
      {
        content: "Hey, how's it going?",
        timestamp: "10:30 AM",
        isUnread: false,
        isSent: false,
      },
      {
        content: "Hey, how's it going?",
        timestamp: "10:30 AM",
        isUnread: false,
        isSent: true,
      },
      {
        content: "Hey, how's it going?",
        timestamp: "10:30 AM",
        isUnread: false,
        isSent: true,
      },
      {
        content: "Hey, how's it going?",
        timestamp: "10:30 AM",
        isUnread: false,
        isSent: false,
      },
    ],
    []
  ); // Empty dependency array to memoize the messages array.

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]); // The useEffect hook depends on messages, but messages will not change unnecessarily.

  return (
    <div className="flex flex-1 flex-col">
      <ChatHeader />
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <MessageList messages={messages} />
      </ScrollArea>
      <ChatInput />
    </div>
  );
}
