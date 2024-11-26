"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserPlus, MessageCircle, ArrowLeft, Check, X } from "lucide-react";
import { FriendStatus } from "@prisma/client";
import Image from "next/image";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  is_online: boolean;
}

interface FriendRequest {
  id: string;
  user_id: string;
  friend_id: string;
  status: FriendStatus;
}

export default function FriendSearch({
  onBack,
  currentUserId,
}: {
  onBack: () => void;
  currentUserId: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);

  useEffect(() => {
    fetchUsers();
    fetchFriendRequests();
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

  const fetchFriendRequests = async () => {
    try {
      const response = await fetch(
        `/api/friend-requests?userId=${currentUserId}`
      );
      const data = await response.json();
      setFriendRequests(data);
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  };

  const handleSendRequest = async (friendId: string) => {
    try {
      const response = await fetch("/api/friend-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: currentUserId, friend_id: friendId }),
      });
      if (response.ok) {
        fetchFriendRequests();
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const handleRespondToRequest = async (
    requestId: string,
    status: FriendStatus
  ) => {
    try {
      const response = await fetch("/api/friend-requests", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, status }),
      });
      if (response.ok) {
        fetchFriendRequests();
      }
    } catch (error) {
      console.error("Error responding to friend request:", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 border-r border-gray-200 flex flex-col h-screen">
      <div className="flex items-center h-16 px-4 border-b border-gray-200">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-semibold">Find Friends</h2>
      </div>
      <div className="p-4">
        <Input
          placeholder="Search friends..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {filteredUsers.map((user) => (
            <FriendItem
              key={user.id}
              user={user}
              currentUserId={currentUserId}
              friendRequests={friendRequests}
              onSendRequest={handleSendRequest}
              onRespondToRequest={handleRespondToRequest}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function FriendItem({
  user,
  currentUserId,
  friendRequests,
  onSendRequest,
  onRespondToRequest,
}: {
  user: User;
  currentUserId: string;
  friendRequests: FriendRequest[];
  onSendRequest: (friendId: string) => void;
  onRespondToRequest: (requestId: string, status: FriendStatus) => void;
}) {
  const friendRequest = friendRequests.find(
    (req) =>
      (req.user_id === currentUserId && req.friend_id === user.id) ||
      (req.user_id === user.id && req.friend_id === currentUserId)
  );

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="relative">
          <Image
            src={user.avatar_url || "/placeholder.svg?height=40&width=40"}
            alt={`${user.first_name} ${user.last_name}`}
            width={40}
            height={40}
            className="rounded-full"
          />
          {user.is_online && (
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
          )}
        </div>
        <div className="ml-3">
          <p className="font-medium">{`${user.first_name} ${user.last_name}`}</p>
          <p className="text-sm text-gray-500">
            {user.is_online ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      {!friendRequest && (
        <Button
          variant="default"
          size="sm"
          onClick={() => onSendRequest(user.id)}
          className="w-24 flex justify-center items-center"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          <span>Add</span>
        </Button>
      )}
      {friendRequest &&
        friendRequest.status === FriendStatus.PENDING &&
        friendRequest.user_id === currentUserId && (
          <Button
            variant="outline"
            size="sm"
            disabled
            className="w-24 flex justify-center items-center"
          >
            <span>Pending</span>
          </Button>
        )}
      {friendRequest &&
        friendRequest.status === FriendStatus.PENDING &&
        friendRequest.friend_id === currentUserId && (
          <div className="flex space-x-2">
            <Button
              variant="default"
              size="sm"
              onClick={() =>
                onRespondToRequest(friendRequest.id, FriendStatus.ACCEPTED)
              }
              className="w-10 flex justify-center items-center"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                onRespondToRequest(friendRequest.id, FriendStatus.DECLINED)
              }
              className="w-10 flex justify-center items-center"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      {friendRequest && friendRequest.status === FriendStatus.ACCEPTED && (
        <Button
          variant="outline"
          size="sm"
          className="w-24 flex justify-center items-center"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          <span>Message</span>
        </Button>
      )}
    </div>
  );
}
