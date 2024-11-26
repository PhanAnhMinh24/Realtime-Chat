"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Settings, MoreVertical, UserPlus, Bell } from "lucide-react";
import FriendSearch from "./friend-search";
import { FriendRequests } from "./friend-requests";
import Image from "next/image";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  is_online: boolean;
}

interface LeftSidebarProps {
  currentUserId: string;
}

export function LeftSidebar({ currentUserId }: LeftSidebarProps) {
  const [showFriendSearch, setShowFriendSearch] = useState(false);
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data.filter((user: User) => user.id !== currentUserId));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(localSearchQuery.toLowerCase())
  );

  if (showFriendSearch) {
    return (
      <FriendSearch
        onBack={() => setShowFriendSearch(false)}
        currentUserId={currentUserId}
      />
    );
  }

  if (showFriendRequests) {
    return <FriendRequests onBack={() => setShowFriendRequests(false)} />;
  }

  return (
    <div className="w-80 border-r border-gray-200 flex flex-col h-screen">
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold">Chats</h1>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowFriendSearch(true)}
          >
            <UserPlus className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowFriendRequests(true)}
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <Input
          className="bg-gray-100"
          placeholder="Search in Messenger"
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
        />
      </div>
      <ScrollArea className="flex-grow">
        <div className="p-2">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3 px-2 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              <div className="relative">
                <Image
                  alt={`${user.first_name} ${user.last_name}'s avatar`}
                  className="h-12 w-12 rounded-full object-cover"
                  src={user.avatar_url || "/placeholder.svg?height=48&width=48"}
                  width={48}
                  height={48}
                />
                {user.is_online && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{`${user.first_name} ${user.last_name}`}</p>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {user.is_online ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
