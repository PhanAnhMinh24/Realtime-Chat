"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Search, User, FileText, Download, Shield, Ban, Flag, BellOff } from 'lucide-react'
import Image from "next/image"
import { ProfileDialog } from "@/components/profile/profile-dialog"
import { MultimediaStorage } from "@/components/multimedia/multimedia-store"

export function RightSidebar() {
  const [showMultimedia, setShowMultimedia] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  // Mock user data - in a real app this would come from your backend
  const currentUser = {
    name: "Jacob West",
    username: "jacob.west",
    phone: "+1 202 555 0147",
    image: "/placeholder.svg",
    isActive: true
  }

  if (showMultimedia) {
    return <MultimediaStorage onClose={() => setShowMultimedia(false)} />;
  }

  return (
    <>
      <div className="w-80 border-l border-gray-200 flex flex-col h-full">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-center mb-4">Conversation Info</h2>
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <Image
                src="/placeholder.svg"
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <h3 className="font-medium">Florencio Dorrance</h3>
            <p className="text-sm text-muted-foreground">Được mời hôm đầu cuối</p>
            <div className="flex gap-8 mt-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="flex flex-col items-center gap-1"
                onClick={() => setShowProfile(true)}
              >
                <User className="h-5 w-5" />
                <span className="text-xs">Profile</span>
              </Button>
              <Button variant="ghost" size="icon" className="flex flex-col items-center gap-1">
                <BellOff className="h-5 w-5" />
                <span className="text-xs">Mute</span>
              </Button>
              <Button variant="ghost" size="icon" className="flex flex-col items-center gap-1">
                <Search className="h-5 w-5" />
                <span className="text-xs">Search</span>
              </Button>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4">
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-between">
                Nickname
              </Button>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="customize" className="border-none">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <Button variant="ghost" className="w-full justify-between">
                      Customize chat
                    </Button>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pl-4">
                      <Button variant="ghost" className="w-full justify-start">Change theme</Button>
                      <Button variant="ghost" className="w-full justify-start">Change emoji</Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="files" className="border-none">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <Button variant="ghost" className="w-full justify-between">
                      Photo, Video, File
                    </Button>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex gap-1">
                        <Button variant="outline" className="flex-1">
                          Photos <span className="text-muted-foreground">15</span>
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Videos <span className="text-muted-foreground">8</span>
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Files <span className="text-muted-foreground">5</span>
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 hover:bg-accent rounded-md">
                          <div className="flex items-center gap-3">
                            <FileText className="h-8 w-8 text-red-500" />
                            <div>
                              <p className="text-sm font-medium">i9.pdf</p>
                              <p className="text-xs text-muted-foreground">PDF · 9mb</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between p-2 hover:bg-accent rounded-md">
                          <div className="flex items-center gap-3">
                            <FileText className="h-8 w-8 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium">sharefile.docx</p>
                              <p className="text-xs text-muted-foreground">DOC · 555kb</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        className="w-full text-sm text-muted-foreground"
                        onClick={() => setShowMultimedia(true)}
                      >
                        View all
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="privacy" className="border-none">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <Button variant="ghost" className="w-full justify-between">
                      Privacy & support
                    </Button>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pl-4">
                      <Button variant="ghost" className="w-full justify-start">
                        <BellOff className="mr-2 h-4 w-4" />
                        Turn off notifications
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Shield className="mr-2 h-4 w-4" />
                        Limited messages
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-600">
                        <Ban className="mr-2 h-4 w-4" />
                        Block
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-600">
                        <Flag className="mr-2 h-4 w-4" />
                        Report
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </ScrollArea>
      </div>

      <ProfileDialog 
        open={showProfile}
        onOpenChange={setShowProfile}
        user={currentUser}
      />
    </>
  )
}

