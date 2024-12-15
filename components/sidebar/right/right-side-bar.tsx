/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Settings, MoreVertical } from "lucide-react";
import ConversationList from "@/app/conversations/components/conversations-list";
import getConversations from "@/lib/get-conversations";
import { CurrentUser } from "@/lib/current-user";
import getUsers from "@/lib/get-users";

export async function RightSidebar({
  children,
}: {
  children?: React.ReactNode;
}) {
  const items = await getConversations();
  const currentUser = await CurrentUser();
  const users = await getUsers();
  
}
