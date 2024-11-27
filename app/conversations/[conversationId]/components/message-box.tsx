/* eslint-disable @typescript-eslint/no-unused-vars */
import { FullMessageType } from "@/app/types";
import Avatar from "@/components/message/avatar";
import { User } from "@prisma/client";
import clsx from "clsx";
import { format } from "date-fns";
import Image from "next/image";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
  currentUser: User | null;
}

const MessageBox: React.FC<MessageBoxProps> = ({
  data,
  isLast,
  currentUser,
}) => {
  const isOwn = currentUser?.email === data?.sender?.email;

  const container = clsx("flex gap-3 p-4 items-start", isOwn && "justify-end");

  const avatar = clsx("flex-shrink-0", isOwn && "order-2");

  const body = clsx("flex flex-col", isOwn && "items-end");

  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
      {/* Avatar */}
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>

      {/* Nội dung tin nhắn */}
      <div className={body}>
        {/* Tên và thời gian */}
        <div className="text-sm text-gray-500 flex gap-2">
          <div>{data.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>

        {/* Tin nhắn */}
        <div className={message}>
          {data.image ? (
            <Image
              alt="Image"
              height="288"
              width="288"
              src={data.image}
              className="
                object-cover
                cursor-pointer
                hover:scale-110
                transition
                translate
              "
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
