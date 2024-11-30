"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog"
import { ChevronRight } from 'lucide-react'
import Image from "next/image"

interface ProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user?: {
    name: string
    username: string
    phone: string
    image: string
    isActive?: boolean
  }
}

export function ProfileDialog({ open, onOpenChange, user }: ProfileDialogProps) {
  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[350px] p-0">
        <div className="flex flex-col items-center p-4 pt-8">
          {/* Profile Image with Messenger Code Border */}
          <div className="relative mb-7">
            <svg className="absolute -inset-5 w-[140px] h-[140px] text-blue-500" viewBox="0 0 100 100">
              {/* Outer circle of dots */}
              {Array.from({ length: 15 }).map((_, i) => {
                const angle = (i * 360) / 15
                const x = 50 + 45 * Math.cos((angle * Math.PI) / 180)
                const y = 50 + 45 * Math.sin((angle * Math.PI) / 180)
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="2"
                    fill="currentColor"
                    opacity="0.5"
                  />
                )
              })}
              {/* Inner decorative elements */}
              <path
                d="M50,5 A45,45 0 1,1 49.9,5"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="3,6"
                opacity="0.3"
              />
              <path
                d="M50,15 A35,35 0 1,1 49.9,15"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="3,6"
                opacity="0.3"
              />
            </svg>
            <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden">
              <Image
                src={user.image || "/placeholder.svg"}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* User Name */}
          <h2 className="text-xl font-semibold mb-6">{user.name}</h2>

          {/* Info List */}
          <div className="w-full space-y-2">
            {/* Active Status */}
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center gap-5">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm">Active Status</span>
              </div>
              <div className="flex items-center text-gray-500">
                <span className="text-sm mr-2">On</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Username */}
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-white text-xs">@</span>
                </div>
                <span className="text-sm">Username</span>
              </div>
              <div className="flex items-center text-gray-500">
                <span className="text-sm mr-2">{user.username}</span>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span className="text-sm">Phone</span>
              </div>
              <div className="flex items-center text-gray-500">
                <span className="text-sm mr-2">{user.phone}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

