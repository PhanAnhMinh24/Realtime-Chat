import {
  ReactionSelector,
  ReactionsList,
  useMessageContext,
  useChatContext,
} from "stream-chat-react";
import Image from "next/image";
import { useState } from "react";
import MessageOptions from "./MessageOptions";

export default function CustomMessage(): JSX.Element {
  const { message } = useMessageContext();
  const { client } = useChatContext();
  const [showOptions, setShowOptions] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState<string>(message.text || "");
  const [popupImage, setPopupImage] = useState<string | null>(null); // Trạng thái cho popup hình ảnh

  const handleEdit = async () => {
    if (message.deleted_at || !message.id || message.user?.id !== client.userID)
      return;

    if (editedText.trim() === "" || editedText === message.text) return;

    try {
      await client.updateMessage({
        id: message.id,
        text: editedText,
        user: message.user,
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  const handleDelete = async () => {
    if (!message.id) {
      console.error("Message ID is invalid.");
      return;
    }

    try {
      await client.deleteMessage(message.id);
      console.log("Message deleted successfully.");
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setPopupImage(imageUrl); // Hiển thị popup với hình ảnh
  };

  const closePopup = () => {
    setPopupImage(null); // Đóng popup
  };

  return (
    <>
      <div
        id={message.id}
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
        className={`flex relative space-x-2 p-2 rounded-md transition-colors ease-in-out duration-200 ${
          message.deleted_at ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
      >
        <Image
          className="rounded-full aspect-square object-cover w-10 h-10"
          width={40}
          height={40}
          src={message.user?.image || "https://getstream.io/random_png/"}
          alt="User avatar"
        />
        <div>
          {!message.deleted_at && showOptions && (
            <MessageOptions
              showEmojiReactions={setShowReactions}
              onEdit={
                message.user?.id === client.userID
                  ? () => setIsEditing(true)
                  : undefined
              }
              onDelete={
                message.user?.id === client.userID ? handleDelete : undefined
              }
            />
          )}
          {showReactions && (
            <div className="absolute">
              <ReactionSelector />
            </div>
          )}
          <div className="space-x-2">
            <span className="font-semibold text-sm text-black">
              {message.user?.name || "Unknown User"}
            </span>
          </div>
          {isEditing ? (
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onBlur={handleEdit}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleEdit();
                }
              }}
              className="text-sm text-gray-700 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            />
          ) : message.deleted_at ? (
            <p className="text-sm italic text-gray-500">
              Tin nhắn đã được thu hồi.
            </p>
          ) : (
            <>
              <p className="text-sm text-gray-700">{message.text}</p>
              {message.attachments?.map((attachment, index) => (
                <div key={index} className="mt-2">
                  {attachment.type === "image" ? (
                    <Image
                      src={attachment.asset_url || ""}
                      alt={attachment.title || "Image"}
                      width={300}
                      height={300}
                      className="rounded-md max-w-full cursor-pointer"
                      onClick={() => handleImageClick(attachment.asset_url!)} // Thêm xử lý click
                    />
                  ) : attachment.type === "video" ? (
                    <video
                      controls
                      src={attachment.asset_url || ""}
                      className="rounded-md max-w-full"
                    />
                  ) : (
                    <a
                      href={attachment.asset_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 p-2 border border-gray-300 rounded-md hover:bg-gray-100"
                    >
                      <span className="text-gray-700 text-sm">
                        {attachment.title || "Download File"}
                      </span>
                    </a>
                  )}
                </div>
              ))}
            </>
          )}
          <ReactionsList />
        </div>
      </div>

      {/* Popup hiển thị hình ảnh */}
      {popupImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closePopup}
        >
          <div className="relative">
            <Image
              src={popupImage}
              alt="Popup Image"
              width={800}
              height={800}
              className="max-w-full max-h-screen rounded-md"
            />
            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold"
              onClick={closePopup}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
