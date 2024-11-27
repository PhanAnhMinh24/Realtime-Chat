import getConversationById from "@/lib/get-conversation-by-id";
import getMessages from "@/lib/get-message";
import Header from "./components/header";
import { CurrentUser } from "@/lib/current-user";
import { LeftSidebar } from "@/components/sidebar/left/left-side-bar";
import { RightSidebar } from "@/components/sidebar/right/right-side-bar"; // Import RightSidebar
import { MainChatArea } from "@/components/main/main-chat-area";
import Body from "./components/body";
import Form from "./components/form";

/* eslint-disable @typescript-eslint/no-unused-vars */
interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const currentUser = await CurrentUser();
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="h-full flex flex-col">
        <MainChatArea />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar */}
      <LeftSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Header conversation={conversation} currentUser={currentUser} />
        <Body initialMessages={messages} currentUser={currentUser} />
        <Form />
      </div>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
};

export default ConversationId;
