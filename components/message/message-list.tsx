// components/message/message-list.tsx
import { FC } from "react";
import { Message } from "./message-item";

interface Message {
  content: string;
  timestamp: string;
  isUnread: boolean;
  isSent: boolean;
  
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <Message
          key={index}
          content={message.content}
          timestamp={message.timestamp}
          isUnread={message.isUnread}
          isLastMessage={index === messages.length - 1}
          isSent={message.isSent}
        />
      ))}
    </div>
  );
};

export { MessageList };
