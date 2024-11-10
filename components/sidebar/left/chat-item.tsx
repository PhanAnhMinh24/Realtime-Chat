import Image from "next/image";

interface ChatItemProps {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  isOnline?: boolean;
}

export function ChatItem({
  id,
  name,
  lastMessage,
  time,
  isOnline,
}: ChatItemProps) {
  return (
    <div
      key={id}
      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
    >
      <div className="relative">
        <Image
          alt="Avatar"
          className="h-12 w-12 rounded-full"
          src="/placeholder.svg"
          width={50}
          height={50}
        />
        {isOnline && (
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between">
          <p className="font-medium">{name}</p>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="truncate text-sm text-gray-500">{lastMessage}</p>
      </div>
    </div>
  );
}
