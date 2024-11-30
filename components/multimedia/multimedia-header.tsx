import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ImageIcon, Video, FileText, X } from 'lucide-react'

interface MultimediaHeaderProps {
  onClose: () => void;
}

export function MultimediaHeader({ onClose }: MultimediaHeaderProps) {
  return (
    <div className="border-b p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Multimedia storage</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Photos <span className="text-muted-foreground ml-1">125</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Videos <span className="text-muted-foreground ml-1">125</span>
            </TabsTrigger>
            <TabsTrigger value="files" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Files <span className="text-muted-foreground ml-1">125</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}

