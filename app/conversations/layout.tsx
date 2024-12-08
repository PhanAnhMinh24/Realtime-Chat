// app/conversations/layout.tsx
import { ReactNode } from "react";

interface ConversationsLayoutProps {
  children: ReactNode;
}

export default function ConversationsLayout({
  children,
}: ConversationsLayoutProps) {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
