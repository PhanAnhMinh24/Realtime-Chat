/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Settings, MoreVertical } from "lucide-react";
import { SideFooter } from "./side-footer";
import ConversationList from "@/app/conversations/components/conversations-list";
import getConversations from "@/lib/get-conversations";
import { CurrentUser } from "@/lib/current-user";
import getUsers from "@/lib/get-users";
import ChatList from "./chat-list";

export async function LeftSidebar({
  children,
}: {
  children?: React.ReactNode;
}) {
  const items = await getConversations();
  const currentUser = await CurrentUser();
  const users = await getUsers();
  return (
    <div className="w-80 border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
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
      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            className="bg-gray-100 pl-9"
            placeholder="Tìm kiếm trên Messenger"
          />
        </div>
      </div>
      {/* Chat List */}
      <ConversationList currentUser={currentUser} initialItems={items} />
      {/* <ChatList items={users} /> */}
      {/* Children */}
      {children && <div className="flex-1">{children}</div>}
      {/* Footer */}
      <SideFooter />
    </div>
  );
}
