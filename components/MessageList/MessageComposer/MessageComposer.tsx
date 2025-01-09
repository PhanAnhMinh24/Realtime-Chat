import { PlusCircle } from "@/components/ChannelList/Icons";
import { useState } from "react";
import { SendButton, useChatContext } from "stream-chat-react";
import { CldUploadButton } from "next-cloudinary";

export default function MessageComposer(): JSX.Element {
  const [plusMenuOpen, setPlusMenuOpen] = useState(false);
  const { channel } = useChatContext();
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUploadSuccess = (result: any) => {
    if (result.event === "success") {
      const fileUrl = result.info.secure_url;
      const isImage = result.info.resource_type === "image";
      channel?.sendMessage({
        text: message || result.info.original_filename, // Hiển thị tên file/hình ảnh
        attachments: [
          {
            type: isImage ? "image" : "file",
            asset_url: fileUrl,
            title: result.info.original_filename, // Tên file hoặc hình ảnh
          },
        ],
      });
      setMessage("");
      setUploading(false);
    }
  };

  const handleUploadStart = () => {
    setUploading(true);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      channel?.sendMessage({ text: message.trim() });
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex mx-6 my-6 px-4 py-1 bg-composer-gray items-center justify-center space-x-4 rounded-md text-gray-600 relative">
      {/* Nút Plus Menu */}
      <button onClick={() => setPlusMenuOpen((menuOpen) => !menuOpen)}>
        <PlusCircle className="w-8 h-8 hover:text-gray-800" />
      </button>
      {plusMenuOpen && (
        <div className="absolute p-2 z-10 -left-6 bottom-12">
          <div className="bg-white p-2 shadow-lg rounded-md w-40 flex flex-col">
            <CldUploadButton
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              onSuccess={handleUploadSuccess}
              className="cursor-pointer mt-2 flex items-center space-x-2"
            >
              <span className="flex items-center text-sm text-gray-600 hover:text-gray-800">
                <PlusCircle className="w-6 h-6" />
                Upload File
              </span>
            </CldUploadButton>
          </div>
        </div>
      )}
      <input
        className="border-transparent bg-transparent outline-none text-sm font-semibold m-0 text-gray-normal flex-grow"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message #general"
      />
      <SendButton
        sendMessage={handleSendMessage}
        disabled={uploading}
        className={`${
          uploading ? "opacity-50 cursor-not-allowed" : ""
        } w-8 h-8`}
      />
    </div>
  );
}
