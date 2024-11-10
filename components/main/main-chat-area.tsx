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
      },
      {
        content: "I'm doing well, thanks! How about you?",
        timestamp: "10:32 AM",
        isUnread: false,
      },
      {
        content: "Pretty good. Did you see the latest updates?",
        timestamp: "10:33 AM",
        isUnread: false,
      },
      {
        content: "No, I haven't. What's new?",
        timestamp: "10:35 AM",
        isUnread: false,
      },
      {
        content:
          "They've added some cool new features. I'll send you the details.",
        timestamp: "10:36 AM",
        isUnread: false,
      },
      {
        content: "Sounds interesting! Can't wait to check it out.",
        timestamp: "10:38 AM",
        isUnread: false,
      },
      {
        content: "By the way, are we still on for lunch tomorrow?",
        timestamp: "10:40 AM",
        isUnread: false,
      },
      {
        content: "Yes, definitely! Same place as last time?",
        timestamp: "10:41 AM",
        isUnread: false,
      },
      {
        content: "Perfect. Looking forward to it!",
        timestamp: "10:42 AM",
        isUnread: false,
      },
      {
        content: "Oh, before I forget, did you finish that report?",
        timestamp: "10:45 AM",
        isUnread: false,
      },
      {
        content: "Almost done. I'll send it over by end of day.",
        timestamp: "10:47 AM",
        isUnread: false,
      },
      {
        content:
          "Great, thanks! No rush, but it would be good to have it for the meeting on Friday.",
        timestamp: "10:48 AM",
        isUnread: false,
      },
      {
        content: "No problem, it'll be ready well before then.",
        timestamp: "10:50 AM",
        isUnread: false,
      },
      {
        content: "Awesome. You're always so reliable!",
        timestamp: "10:51 AM",
        isUnread: false,
      },
      { content: "I try my best! 😊", timestamp: "10:52 AM", isUnread: false },
      {
        content: "By the way, have you heard about the new project?",
        timestamp: "11:00 AM",
        isUnread: true,
      },
      {
        content: "No, what new project?",
        timestamp: "11:02 AM",
        isUnread: true,
      },
      {
        content: "I'll fill you in at lunch tomorrow. It's pretty exciting!",
        timestamp: "11:03 AM",
        isUnread: true,
      },
      {
        content: "Now I'm really looking forward to our lunch!",
        timestamp: "11:05 AM",
        isUnread: true,
      },
      {
        content: "Me too! See you then!",
        timestamp: "11:06 AM",
        isUnread: true,
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
