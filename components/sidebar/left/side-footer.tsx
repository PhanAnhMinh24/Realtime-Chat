// components/SideFooter.tsx
import { UserButton } from "@clerk/nextjs";

export function SideFooter() {
  return (
    <div className="border-t border-gray-200 p-4 flex justify-center h-[80px]">
      {/* Nút UserButton của Clerk */}
      <UserButton showName afterSignOutUrl="/" />
    </div>
  );
}
