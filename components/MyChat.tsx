import { useClient } from "@/hooks/useClient";
import { User } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import { ScrollArea } from "@/components/ui/scroll-area";

import CustomChannelList from "@/components/ChannelList/CustomChannelList";
import ServerList from "@/components/ServerList/ServerList";
import MessageComposer from "@/components/MessageList/MessageComposer/MessageComposer";
import CustomDateSeparator from "@/components/MessageList/CustomDateSeparator/CustomDateSeparator";
import CustomMessage from "@/components/MessageList/CustomMessage/CustomMessage";
import { customReactionOptions } from "@/components/MessageList/CustomReactions/CustomReactionsSelector";
import { useVideoClient } from "@/hooks/useVideoClient";
import { StreamVideo } from "@stream-io/video-react-sdk";
import { useDiscordContext } from "@/contexts/DiscordContext";
import MyCall from "@/components/MyCall/MyCall";
import CustomChannelHeader from "./MessageList/CustomChannelHeader/CustomChannelHeader";

export default function MyChat({
  apiKey,
  user,
  token,
}: {
  apiKey: string;
  user: User;
  token: string;
}) {
  const chatClient = useClient({
    apiKey,
    user,
    tokenOrProvider: token,
  });
  const videoClient = useVideoClient({
    apiKey,
    user,
    tokenOrProvider: token,
  });
  const { callId } = useDiscordContext();

  if (!chatClient) {
    return <div>Error, please try again later.</div>;
  }

  if (!videoClient) {
    return <div>Video Error, please try again later.</div>;
  }

  return (
    <StreamVideo client={videoClient}>
      <Chat client={chatClient} theme="str-chat__theme-light">
        <section className="flex h-screen w-screen layout overflow-hidden">
          {/* Server List */}
          <div className="h-full">
            <ServerList />
          </div>

          {/* Channel List */}
          <div className="h-full">
            <ChannelList List={CustomChannelList} sendChannelsToList={true} />
          </div>

          {/* Main Content */}
          <div className="flex flex-col flex-1 overflow-hidden">
            {callId && <MyCall callId={callId} />}
            {!callId && (
              <Channel
                Message={CustomMessage}
                Input={MessageComposer}
                DateSeparator={CustomDateSeparator}
                reactionOptions={customReactionOptions}
              >
                <Window>
                  <div className="flex flex-col h-full">
                    <CustomChannelHeader />
                    {/* Message List */}
                    <ScrollArea className="flex-grow">
                      <MessageList />
                    </ScrollArea>
                    {/* Message Input */}
                    <div className="w-full bg-white shadow">
                      <MessageInput />
                    </div>
                  </div>
                </Window>
                <Thread />
              </Channel>
            )}
          </div>
        </section>
      </Chat>
    </StreamVideo>
  );
}
