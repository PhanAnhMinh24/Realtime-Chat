import Form from "./components/form";
import Body from "./components/body";
import Header from "./components/header";
import InfoChatAvt from "./components/infochatavt";
import { LeftSidebar } from "@/components/sidebar/left/left-side-bar";
import { MainChatArea } from "@/components/main/main-chat-area";
import getMessages from "@/lib/get-message";
import { CurrentUser } from "@/lib/current-user";
import getConversationById from "@/lib/get-conversation-by-id";
import BodyRightSidebar from "./components/body-right-side-bar";
import { RightSidebar } from "@/components/sidebar/right/right-side-bar";
// ... rest of your imports

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
      <LeftSidebar />
      <div className="flex-1 flex flex-col">
        <Header conversation={conversation} currentUser={currentUser} />
        <Body initialMessages={messages} currentUser={currentUser} />
        <Form />
      </div>
      <RightSidebar />
      <div>
        <InfoChatAvt conversation={conversation} currentUser={currentUser} />
        <BodyRightSidebar conversationId={conversation?.id} />
      </div>
    </div>
  );
};

export default ConversationId;

