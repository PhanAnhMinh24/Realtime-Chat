"use client";

import { useState } from "react"
import { User } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TbUserSquareRounded } from "react-icons/tb";
import { BellOff, Search } from "lucide-react";
import { ProfileDialog } from "@/components/profile/profile-dialog"

interface AvatarProps {
  user?: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const [showProfile, setShowProfile] = useState(false)

  return (
    <div className="p-6 border-b">
      <h2 className="text-xl font-semibold text-center mb-6">Thông tin đoạn chat</h2>
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="relative inline-block rounded-full overflow-hidden h-10 w-10 md:h-12 md:w-12">
            <Image
              alt="profile"
              src={user?.image || '/images/placeholder.jpg'}
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
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
        <div>
          <h4 className="text-sm font-medium">{user?.name || "User Name"}</h4>
        </div>
        <div className="flex gap-12 mt-4">
          <Button variant="ghost" size="icon" className="flex flex-col items-center gap-1"
          onClick={() => setShowProfile(true)} >
            <TbUserSquareRounded className="h-5 w-5" />
            <span className="text-xs whitespace-nowrap">Trang cá nhân</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex flex-col items-center gap-2">
            <BellOff className="h-5 w-5" />
            <span className="text-xs whitespace-nowrap">Tắt thông báo</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex flex-col items-center gap-2">
            <Search className="h-5 w-5" />
            <span className="text-xs whitespace-nowrap">Tìm kiếm</span>
          </Button>
        </div>
      </div>
      <ProfileDialog 
        open={showProfile}
        onOpenChange={setShowProfile}
        user={user}
      />
    </div>
  );
};

export default Avatar;