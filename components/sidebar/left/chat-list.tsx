import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatItem } from "./chat-item";

interface ChatListProps {
  chats?: Array<{
    id: number;
    name: string;
    lastMessage: string;
    time: string;
    isOnline?: boolean;
  }>;
}

export function ChatList({ chats = [] }: ChatListProps) {
  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      {chats.map((chat) => (
        <ChatItem
          key={chat.id}
          id={chat.id}
          name={chat.name}
          lastMessage={chat.lastMessage}
          time={chat.time}
          isOnline={chat.isOnline}
        />
      ))}
    </ScrollArea>
  );
}
