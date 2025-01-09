import React, { useState } from "react";
import { useChannelStateContext } from "stream-chat-react";

// Hàm để làm nổi bật các đoạn văn bản trùng khớp
const highlightText = (text: string, query: string) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} className="bg-blue-200">
        {part}
      </span>
    ) : (
      part
    )
  );
};

export default function MessageSearch(): JSX.Element {
  const { channel } = useChannelStateContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMessages, setFilteredMessages] = useState<any[]>([]);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = channel?.state.messages.filter((message) =>
        message.text?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMessages(filtered || []);
    } else {
      setFilteredMessages([]);
    }
  };

  const handleSelectMessage = (messageId: string) => {
    setSelectedMessageId(messageId);
    const messageElement = document.getElementById(messageId);
    messageElement?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        className="border-2 border-gray-300 p-2 rounded-md w-full mb-2"
        placeholder="Search messages..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {searchQuery && filteredMessages.length > 0 && (
        <div className="absolute bg-white shadow-xl rounded-md mt-2 max-h-60 overflow-y-auto w-full border border-gray-300 z-10 animate-popUp">
          <div className="px-3 py-2 text-sm font-semibold text-gray-500">
            Found {filteredMessages.length} results
          </div>
          <div className="divide-y divide-gray-200">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectMessage(message.id)} // Gọi hàm để cuộn đến tin nhắn khi chọn
              >
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-800">
                    {message.user?.name}:
                  </span>
                  <span className="text-gray-600">
                    {highlightText(message.text, searchQuery)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
