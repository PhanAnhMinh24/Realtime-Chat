"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, MoreVertical, Eye, Share2, Download, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

interface MultimediaStorageProps {
  onClose?: () => void;
}

export function MultimediaStorage({ onClose }: MultimediaStorageProps) {
  return (
    <div className="w-80 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b">
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
        <h2 className="text-lg font-semibold">Multimedia storage</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-4 border-b">
        <Button variant="outline" className="flex-1">
          Photos <span className="ml-1 text-muted-foreground">125</span>
        </Button>
        <Button variant="outline" className="flex-1">
          Videos <span className="ml-1 text-muted-foreground">125</span>
        </Button>
        <Button variant="outline" className="flex-1">
          Files <span className="ml-1 text-muted-foreground">125</span>
        </Button>
      </div>

      {/* Grid */}
      <ScrollArea className="flex-1 p-4">
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="group relative aspect-square bg-muted rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg"
                alt={`Media ${i + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
