import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, Phone, Video } from "lucide-react";
import Image from "next/image";

export function ChatHeader() {
  return (
    <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
      <div className="flex items-center gap-3">
        <Image
          alt="Chat Avatar"
          className="h-10 w-10 rounded-full"
          src=""
        />
        <div>
          <h2 className="font-semibold">Chat Name</h2>
          <p className="text-sm text-gray-500">Active now</p>
        </div>
      </div>
      <div className="flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Voice call</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Video call</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Info className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Chat info</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
