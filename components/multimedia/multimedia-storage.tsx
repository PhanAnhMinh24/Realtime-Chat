"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ImageIcon, Video, FileText, Download } from 'lucide-react'
import Image from "next/image"
import { cn, getFileIcon } from "@/lib/utils"
import { Message, Attachments, MessageType } from "@prisma/client"

interface MultimediaStorageProps {
  onClose?: () => void;
  conversationId: string;
}

type AttachmentType = MessageType

type MessageWithAttachments = Message & {
  attachments: Attachments[]
}

export function MultimediaStorage({ onClose, conversationId }: MultimediaStorageProps) {
  const [activeTab, setActiveTab] = useState<AttachmentType>("IMAGE")
  const [messages, setMessages] = useState<MessageWithAttachments[]>([])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/conversations/${conversationId}/messages`)
        if (!response.ok) {
          throw new Error('Failed to fetch messages')
        }
        const data = await response.json()
        console.log('Fetched data in MultimediaStorage:', data)
        setMessages(data)
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }

    fetchMessages()
  }, [conversationId])

  const getMediaAttachments = (type: AttachmentType) => {
    const attachments = messages.flatMap(message => 
      message.attachments.filter(attachment => attachment.type === type)
    )
    console.log(`Attachments for ${type} in MultimediaStorage:`, attachments)
    return attachments
  }

  const renderContent = () => {
    const mediaAttachments = getMediaAttachments(activeTab)

    if (activeTab === "FILE") {
      return (
        <div className="space-y-2">
          {mediaAttachments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Không tìm thấy tập tin nào
            </p>
          ) : (
            mediaAttachments.map((attachment) => (
              <div key={attachment.id} className="flex items-center justify-between p-2 hover:bg-accent rounded-md">
                <div className="flex items-center gap-3">
                  <FileText className={cn("h-8 w-8", getFileIcon(attachment.url))} />
                  <div>
                    <p className="text-sm font-medium">{attachment.url.split('/').pop()}</p>
                    <p className="text-xs text-muted-foreground">
                      {attachment.url.split('.').pop()?.toUpperCase()}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      )
    }

    if (mediaAttachments.length === 0) {
      return (
        <p className="text-sm text-muted-foreground text-center py-4">
          {activeTab === "IMAGE" ? "Không tìm thấy ảnh nào" : "Không tìm thấy video nào"}
        </p>
      )
    }

    return (
      <div className="grid grid-cols-3 gap-1">
        {mediaAttachments.map((attachment) => (
          <div 
            key={attachment.id} 
            className="aspect-square bg-muted rounded-md overflow-hidden hover:opacity-80 transition-opacity"
          >
            {activeTab === "IMAGE" ? (
              <Image
                src={attachment.url}
                alt="Attachment"
                width={150}
                height={150}
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
    )
  }

  const getMediaCount = (type: AttachmentType) => {
    return getMediaAttachments(type).length
  }

  return (
    <div className="w-[400px] h-full flex flex-col bg-background border-l border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b">
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="-ml-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
        <h2 className="text-lg font-semibold">Kho lưu trữ đa phương tiện</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-2 border-b">
        <Button
          variant={activeTab === "IMAGE" ? "default" : "ghost"}
          className={cn(
            "flex-1 justify-start gap-2 h-9",
            activeTab === "IMAGE" ? "bg-accent hover:bg-accent" : ""
          )}
          onClick={() => setActiveTab("IMAGE")}
        >
          <ImageIcon className="h-4 w-4" />
          Ảnh
          {getMediaCount("IMAGE") > 0 && (
            <span className="ml-auto text-xs text-muted-foreground">
              {getMediaCount("IMAGE")}
            </span>
          )}
        </Button>
        <Button
          variant={activeTab === "VIDEO" ? "default" : "ghost"}
          className={cn(
            "flex-1 justify-start gap-2 h-9",
            activeTab === "VIDEO" ? "bg-accent hover:bg-accent" : ""
          )}
          onClick={() => setActiveTab("VIDEO")}
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
          variant={activeTab === "FILE" ? "default" : "ghost"}
          className={cn(
            "flex-1 justify-start gap-2 h-9",
            activeTab === "FILE" ? "bg-accent hover:bg-accent" : ""
          )}
          onClick={() => setActiveTab("FILE")}
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

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {renderContent()}
        </div>
      </ScrollArea>
    </div>
  )
}

