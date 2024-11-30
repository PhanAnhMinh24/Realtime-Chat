"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
  user?: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className="relative inline-block">
      {/* Avatar */}
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        <Image
          alt="avatar"
          src={user?.image || ""}
          fill
          className="object-cover"
        />
      </div>

      {/* Nút xanh hiển thị trạng thái active */}
      <span
        className="
          absolute 
          bg-green-500 
          border-2 
          border-white 
          rounded-full 
          h-3 w-3 md:h-4 md:w-4 
          bottom-0 
          right-0
        "
      ></span>
    </div>
  );
};

export default Avatar;
