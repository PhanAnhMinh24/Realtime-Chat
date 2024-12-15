import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFileType(url: string): "IMAGE" | "VIDEO" | "FILE" {
  const extension = url.split('.').pop()?.toLowerCase()
  
  if (!extension) return "FILE"
  
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']
  const videoExtensions = ['mp4', 'webm', 'ogg', 'mov']
  
  if (imageExtensions.includes(extension)) return "IMAGE"
  if (videoExtensions.includes(extension)) return "VIDEO"
  return "FILE"
}

export function getFileIcon(filename: string): string {
  const extension = filename.split('.').pop()?.toLowerCase() || ''
  
  switch(extension) {
    case 'pdf':
      return 'text-red-500'
    case 'doc':
    case 'docx':
      return 'text-blue-500'
    case 'xls':
    case 'xlsx':
      return 'text-green-500'
    case 'ppt':
    case 'pptx':
      return 'text-orange-500'
    default:
      return 'text-gray-500'
  }
}

