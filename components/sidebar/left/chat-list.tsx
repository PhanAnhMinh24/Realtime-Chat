import { ScrollArea } from "@/components/ui/scroll-area";
import  ChatItem  from "./chat-item";
import { User } from "@prisma/client";

interface ChatListProps {
  items: User[];
}

const ChatList: React.FC<ChatListProps> = ({ items }) => {
  return <ScrollArea className="h-[calc(100vh-8rem)]">
    {items.map((item) => (
    <ChatItem key={item.id} data={item} />
    ))}
  </ScrollArea>;
};

export default ChatList;
