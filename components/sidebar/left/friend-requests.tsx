import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Check, ArrowLeft } from "lucide-react";
import Image from "next/image";

interface FriendRequest {
  id: string;
  name: string;
  avatar: string;
  mutualFriends: number;
}

const initialFriendRequests: FriendRequest[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "",
    mutualFriends: 5,
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "",
    mutualFriends: 3,
  },
  {
    id: "3",
    name: "Mike Johnson",
    avatar: "",
    mutualFriends: 7,
  },
  {
    id: "4",
    name: "Emily Brown",
    avatar: "",
    mutualFriends: 2,
  },
  {
    id: "5",
    name: "Alex Wilson",
    avatar: "",
    mutualFriends: 4,
  },
];

export function FriendRequests({ onBack }: { onBack: () => void }) {
  const [friendRequests, setFriendRequests] = useState(initialFriendRequests);

  const handleAccept = (id: string) => {
    setFriendRequests(friendRequests.filter((request) => request.id !== id));
    // Here you would typically also send an API request to accept the friend request
  };

  const handleReject = (id: string) => {
    setFriendRequests(friendRequests.filter((request) => request.id !== id));
    // Here you would typically also send an API request to reject the friend request
  };

  return (
    <div className="w-80 border-r border-gray-200 flex flex-col h-screen">
      <div className="flex items-center h-16 px-4 border-b border-gray-200">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-semibold">Friend Requests</h2>
      </div>
      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-4">
          {friendRequests.map((request) => (
            <div key={request.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  src={request.avatar ? "" : ""}
                  alt={request.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium">{request.name}</p>
                  <p className="text-sm text-gray-500">
                    {request.mutualFriends} mutual friends
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleAccept(request.id)}
                  aria-label={`Accept friend request from ${request.name}`}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleReject(request.id)}
                  aria-label={`Reject friend request from ${request.name}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
