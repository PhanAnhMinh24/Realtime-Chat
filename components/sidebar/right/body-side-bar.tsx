"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ImageIcon, Video, FileText, Download, Shield, Ban, Flag, BellOff } from 'lucide-react'
import Image from "next/image"
import { MultimediaStorage } from "@/components/multimedia/multimedia-storage"
import { cn, getFileIcon } from "@/lib/utils"
import { Message, Attachments, MessageType, Conversation, User as UserType } from "@prisma/client"
import { User } from "@prisma/client";
import axios from "axios"

type MediaType = MessageType;
type MessageWithAttachments = Message & {
  attachments: Attachments[];
};

interface IParams {
  conversationId: string;
}

const BodySidebar: React.FC<IParams> = ({ conversationId }) => {
  const [showMultimedia, setShowMultimedia] = useState(false);
    const [activeMediaTab, setActiveMediaTab] = useState<MediaType>("IMAGE");
    const [messages, setMessages] = useState<MessageWithAttachments[]>([]);
  
    useEffect(() => {
      axios.get(`/api/conversations/${conversationId}/attachments`);
      if (activeMediaTab === "IMAGE") {
        axios.post(`/api/conversations/${conversationId}/images`)
      }  
    }, [conversationId]);
  
    /**
     * Fetch media attachments by type
     * @param {MediaType} type
     * @returns {Attachments[]}
     */
    const getMediaAttachments = (type: MediaType) => {
      return messages.flatMap((message) =>
        message.attachments.filter((attachment) => attachment.type === type)
      );
    };

    const renderImageContent = () => {
      if (messages.length === 0) {
        return (
          <p className="text-sm text-muted-foreground text-center py-4">
            Không tìm thấy ảnh nào
          </p>
        );
      }
      return (
        <ScrollArea className="h-[calc(100vw*0.25)] pr-4">
          <div className="grid grid-cols-3 gap-1">
            {messages.map((message) => (
              <div
                key={message.id}
                className="aspect-square bg-muted rounded-md overflow-hidden hover:opacity-80 transition-opacity"
              >
                {message.image ? (
                  <Image
                    src={message.image} // Ensure message.image is not null
                    alt="Message Attachment"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-muted-foreground">No Image</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      );
    };
  
    /**
     * Render media content based on the active tab
     * @returns {JSX.Element}
     */
    const renderMediaContent = () => {
      const mediaAttachments = getMediaAttachments(activeMediaTab);
  
      if (mediaAttachments.length === 0) {
        const noContentMessage =
          activeMediaTab === "IMAGE"
            ? "Không tìm thấy ảnh nào"
            : activeMediaTab === "VIDEO"
            ? "Không tìm thấy video nào"
            : "Không tìm thấy tập tin nào";
  
        return (
          <p className="text-sm text-muted-foreground text-center py-4">
            {noContentMessage}
          </p>
        );
      }
  
      if (activeMediaTab === "FILE") {
        return (
          <div className="space-y-2">
            {mediaAttachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center justify-between p-2 hover:bg-accent rounded-md"
              >
                <div className="flex items-center gap-3">
                  <FileText className={cn("h-8 w-8", getFileIcon(attachment.url))} />
                  <div>
                    <p className="text-sm font-medium">
                      {attachment.url.split("/").pop()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {attachment.url.split(".").pop()?.toUpperCase()}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        );
      }
  
      return (
        <ScrollArea className="h-[calc(100vw*0.25)] pr-4">
          <div className="grid grid-cols-3 gap-1">
            {mediaAttachments.map((attachment) => (
              <div
                key={attachment.id}
                className="aspect-square bg-muted rounded-md overflow-hidden hover:opacity-80 transition-opacity"
              >
                {activeMediaTab === "IMAGE" ? (
                  <Image
                    src={attachment.url}
                    alt="Attachment"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={attachment.url}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      );
    };
  
    /**
     * Get count of media attachments for the given type
     * @param {MediaType} type
     * @returns {number}
     */
    const getMediaCount = (type: MediaType) => getMediaAttachments(type).length;
  
    if (showMultimedia) {
      return (
        <MultimediaStorage
          onClose={() => setShowMultimedia(false)}
          conversationId={conversationId}
        />
      );
    }
  
    return (
      <ScrollArea className="flex-1">
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-between">
            Biệt danh
          </Button>
  
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="files" className="border-none">
              <AccordionTrigger className="py-2 hover:no-underline">
              <Button variant="ghost" className="w-full justify-between">
                    Ảnh, Video, File
                  </Button>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="flex gap-1">
                      <Button
                        variant={activeMediaTab === "IMAGE" ? "default" : "ghost"}
                        className={cn(
                          "flex-1 justify-start gap-2 h-9",
                          activeMediaTab === "IMAGE" ? "bg-accent hover:bg-accent" : ""
                        )}
                        onClick={() => setActiveMediaTab("IMAGE")}
                      >
                        <ImageIcon className="h-4 w-4" />
                        Ảnh
                        {getMediaCount("IMAGE") > 0 && (
                          <span className="ml-auto text-xs text-muted-foreground">
                            {getMediaCount("IMAGE")}
                          </span>
                        )}
                      </Button>
                        {renderImageContent()}
                      <Button
                        variant={activeMediaTab === "VIDEO" ? "default" : "ghost"}
                        className={cn(
                          "flex-1 justify-start gap-2 h-9",
                          activeMediaTab === "VIDEO" ? "bg-accent hover:bg-accent" : ""
                        )}
                        onClick={() => setActiveMediaTab("VIDEO")}
                      >
                        <Video className="h-4 w-4" />
                        Video
                        {getMediaCount("VIDEO") > 0 && (
                          <span className="ml-auto text-xs text-muted-foreground">
                            {getMediaCount("VIDEO")}
                          </span>
                        )}
                      </Button>
                      <Button
                        variant={activeMediaTab === "FILE" ? "default" : "ghost"}
                        className={cn(
                          "flex-1 justify-start gap-2 h-9",
                          activeMediaTab === "FILE" ? "bg-accent hover:bg-accent" : ""
                        )}
                        onClick={() => setActiveMediaTab("FILE")}
                      >
                        <FileText className="h-4 w-4" />
                        File
                        {getMediaCount("FILE") > 0 && (
                          <span className="ml-auto text-xs text-muted-foreground">
                            {getMediaCount("FILE")}
                          </span>
                        )}
                      </Button>
                    </div>
                    
                    {renderMediaContent()}
                  <Button
                    variant="ghost"
                    className="w-full text-sm text-muted-foreground"
                    onClick={() => setShowMultimedia(true)}
                  >
                    Xem tất cả
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
  
            <AccordionItem value="privacy" className="border-none">
              <AccordionTrigger className="py-2 hover:no-underline">
                <Button variant="ghost" className="w-full justify-between">
                  Quyền riêng tư & hỗ trợ
                </Button>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1 pl-2">
                  <Button variant="ghost" className="w-full justify-start h-9">
                    <BellOff className="mr-3 h-4 w-4" />
                    <span className="text-sm">Tắt thông báo</span>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start h-9">
                    <Shield className="mr-3 h-4 w-4" />
                    <span className="text-sm">Hạn chế tin nhắn</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-9 text-red-600 hover:text-red-600"
                  >
                    <Ban className="mr-3 h-4 w-4" />
                    <span className="text-sm">Chặn</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-9 text-red-600 hover:text-red-600"
                  >
                    <Flag className="mr-3 h-4 w-4" />
                    <span className="text-sm">Báo cáo</span>
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ScrollArea>
    );
  };

export default BodySidebar;