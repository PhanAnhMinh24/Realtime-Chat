import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, ImageIcon, Plus, Send } from "lucide-react";

export function ChatInput() {
  return (
    <div className="border-t border-gray-200 p-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Plus className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <ImageIcon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Camera className="h-5 w-5" />
        </Button>
        <div className="relative flex-1">
          <Input
            className="bg-gray-100 pr-10"
            placeholder="Aa"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
          >
            <Send className="h-5 w-5 text-blue-500" />
          </Button>
        </div>
      </div>
    </div>
  );
}
