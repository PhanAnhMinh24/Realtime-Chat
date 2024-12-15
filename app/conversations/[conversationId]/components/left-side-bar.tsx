"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Settings, MoreVertical } from "lucide-react";
import ConversationList from "@/app/conversations/components/conversations-list";
import { useState, useEffect } from "react";
import { Message } from "@prisma/client";
import { SideFooter } from "@/components/sidebar/left/side-footer";

// Client Component cho phép gọi API và lấy dữ liệu
export default function LeftSidebar({ children }: { children?: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Message[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any | null>(null);

  // Gọi API để lấy dữ liệu người dùng và cuộc trò chuyện khi component mount
  useEffect(() => {
    async function fetchData() {
      try {
        // Lấy dữ liệu người dùng hiện tại
        const userResponse = await fetch("/api/current-user");
        if (userResponse.ok) {
          const user = await userResponse.json();
          setCurrentUser(user);
        }

        // Lấy danh sách cuộc trò chuyện
        const convResponse = await fetch("/api/conversations");
        if (convResponse.ok) {
          const convData = await convResponse.json();
          setConversations(convData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // Hàm gọi API tìm kiếm tin nhắn
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]); // Nếu không có từ khóa, xóa kết quả tìm kiếm
      return;
    }

    try {
      const response = await fetch(`/api/messages?searchTerm=${query}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error("Error searching messages");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Cập nhật kết quả tìm kiếm khi người dùng nhập
  useEffect(() => {
    if (searchQuery.trim()) {
      const timeoutId = setTimeout(() => {
        handleSearch(searchQuery);
      }, 300); // Delay 300ms sau mỗi lần gõ để tránh gọi API quá nhiều
      return () => clearTimeout(timeoutId); // Dọn dẹp khi component unmount hoặc searchQuery thay đổi
    } else {
      setSearchResults([]); // Nếu query rỗng, reset searchResults
    }
  }, [searchQuery]);

  const handleConversationSelect = (conversation: any) => {
    setSelectedConversation(conversation);
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query})`, "gi"); // Tạo regex để tìm kiếm từ khóa (không phân biệt chữ hoa chữ thường)
    return text.replace(regex, "<strong>$1</strong>"); // Thay thế phần trùng khớp bằng <strong> để in đậm
  };

  return (
    <div className="w-80 border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4">
        <h1 className="text-xl font-semibold">Đoạn chat</h1>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            className="bg-gray-100 pl-9"
            placeholder="Tìm kiếm trên Messenger"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Hiển thị kết quả tìm kiếm hoặc danh sách cuộc trò chuyện */}
      <div className="p-4 flex-1 overflow-auto">
        {searchQuery.trim() === "" ? (
          <ConversationList
            currentUser={currentUser}
            initialItems={conversations}
            onSelectConversation={handleConversationSelect}
          />
        ) : (
          <div>
            {searchResults.length > 0 ? (
              <div>
                <h3 className="font-semibold mb-2">Kết quả tìm kiếm:</h3>
                <ul>
                  {searchResults.map((message) => (
                    <li key={message.id} className="py-2 border-b border-gray-200">
                      <div className="text-sm font-medium">
                        <strong>{message.senderId}</strong> -{" "}
                        <span className="text-gray-500">
                          {new Date(message.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{
                          __html: highlightText(message.body || "", searchQuery),
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-gray-500">Không tìm thấy tin nhắn nào.</div>
            )}
          </div>
        )}
      </div>

      {children && <div className="flex-1">{children}</div>}

      {/* Footer */}
      <SideFooter />
    </div>
  );
}