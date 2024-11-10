// components/LeftSidebar.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Settings, MoreVertical } from "lucide-react";
import { ChatList } from "./chat-list";
import { SideFooter } from "./side-footer";

export function LeftSidebar() {
  const chats = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    lastMessage: "Latest message preview...",
    time: `${i + 1}h`,
    isOnline: i % 2 === 0,
  }));

  return (
    <div className="w-80 border-r border-gray-200 flex flex-col h-full">
      <div className="flex h-16 items-center justify-between px-4">
        <h1 className="text-xl font-semibold">Đoạn chat</h1>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            className="bg-gray-100 pl-9"
            placeholder="Tìm kiếm trên Messenger"
          />
        </div>
      </div>
      <ChatList chats={chats} />
      {/* Thêm SideFooter ở đây */}
      <SideFooter />
    </div>
  );
}
