import { MainChatArea } from "@/components/main/main-chat-area";
import { LeftSidebar } from "@/components/sidebar/left/left-side-bar";
import { RightSidebar } from "@/components/sidebar/right/right-side-bar";

export default function Home() {
  return (
    <div className="flex h-screen bg-white text-gray-900 overflow-hidden">
      <LeftSidebar />
      <MainChatArea/>
      <RightSidebar />
    </div>
  );
}
