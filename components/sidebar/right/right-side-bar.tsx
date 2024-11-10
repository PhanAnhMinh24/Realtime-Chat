import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Bell, ChevronDown, MessageCircle, Smile, Users } from "lucide-react";
import Image from "next/image";

export function RightSidebar() {
  return (
    <div className="w-80 border-l border-gray-200">
      <div className="flex h-16 items-center justify-between px-4">
        <h2 className="text-lg font-semibold">Chat Info</h2>
        <Button variant="ghost" size="icon">
          <ChevronDown className="h-5 w-5" />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="px-4 py-6">
          <div className="flex flex-col items-center gap-4">
            <Image
              alt="Chat Avatar"
              className="h-20 w-20 rounded-full"
              src=""
            />
            <h3 className="text-xl font-semibold">Chat Name</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Users className="mr-2 h-4 w-4" />
                View Profile
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="mr-2 h-4 w-4" />
                Mute
              </Button>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Customize Chat</h4>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <MessageCircle className="mr-2 h-4 w-4" />
                Change Theme
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Smile className="mr-2 h-4 w-4" />
                Change Emoji
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
