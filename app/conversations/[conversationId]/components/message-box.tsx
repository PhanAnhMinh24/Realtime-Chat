import React, { useState, useRef, useEffect } from "react";
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
  const isOwn = currentUser?.email === data?.sender?.email; // Kiểm tra xem tin nhắn có phải của bạn không

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(data.body);

  const menuRef = useRef<HTMLDivElement>(null);

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEdit = async () => {
    try {
      const response = await fetch(`/api/conversations/${data.conversationId}/messages`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId: data.id, newContent: editedContent }),
      });

      if (response.ok) {
        const updatedMessage = await response.json();
        setEditedContent(updatedMessage.body);
        setIsEditing(false);
        setIsMenuOpen(false);
      } else {
        console.error("Failed to edit message");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const container = clsx("flex gap-3 p-4 items-start", isOwn && "justify-end");

  return (
    <div className={container}>
      {/* Chỉ hiển thị dấu ba chấm nếu là tin nhắn của bạn */}
      {isOwn && (
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-500 hover:text-gray-700"
          >
            ⋮
          </button>

          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute left-0 top-6 w-32 bg-white shadow-md rounded-md z-10"
            >
              <button className="w-full text-left px-3 py-2 text-black hover:bg-gray-200">
                Trả lời
              </button>
              <button
                className="w-full text-left px-3 py-2 text-black hover:bg-gray-200"
                onClick={() => {
                  setIsEditing(true);
                  setIsMenuOpen(false);
                }}
                disabled={!!data.image}
              >
                Chỉnh sửa
              </button>
              <button className="w-full text-left px-3 py-2 text-black hover:bg-gray-200">
                Chuyển tiếp
              </button>
              <button className="w-full text-left px-3 py-2 text-black hover:bg-gray-200">
                Thu hồi
              </button>
            </div>
          )}
        </div>
      )}

      {/* Nội dung tin nhắn */}
      <div className="flex flex-col">
        <div className="text-sm text-gray-500 flex gap-2">
          <div>{data.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>

        {/* Tin nhắn */}
        <div
          className={clsx(
            "text-sm w-fit overflow-hidden",
            isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
            data.image ? "rounded-md p-0" : "rounded-lg py-2 px-3"
          )}
        >
          {data.image ? (
            <Image
              alt="Image"
              height="288"
              width="288"
              src={data.image}
              className="object-cover"
            />
          ) : isEditing ? (
            <div className="flex flex-col gap-2">
              <textarea
                value={editedContent ?? ""}
                onChange={(e) => setEditedContent(e.target.value)}
                className="border rounded-md p-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleEdit}
                  className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
                >
                  Lưu
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-200 text-black px-4 py-1 rounded-md hover:bg-gray-300"
                >
                  Hủy
                </button>
              </div>
            </div>
          ) : (
            <div>{editedContent}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
