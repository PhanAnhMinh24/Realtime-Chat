import { ScrollArea } from "@/components/ui/scroll-area"
import { MultimediaItem } from "./multimedia-item"

interface MultimediaGridProps {
  items: Array<{
    id: string
    filename: string
    fileType: "IMAGE" | "VIDEO" | "FILE"
    fileSize: number
    url: string
  }>
  type: "IMAGE" | "VIDEO" | "FILE"
}

export function MultimediaGrid({ items,type }: MultimediaGridProps) {
  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="grid grid-cols-3 gap-4 p-4">
        {items.map((item) => (
          <MultimediaItem
            key={item.id}
            item={item}
            type={type}
            onView={() => console.log('View', item.id)}
            onShare={() => console.log('Share', item.id)}
            onDownload={() => console.log('Download', item.id)}
            onDelete={() => console.log('Delete', item.id)}
          />
        ))}
      </div>
    </ScrollArea>
  )
}

