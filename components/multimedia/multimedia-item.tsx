import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Eye, MoreVertical, Download, Share2, Trash2 } from "lucide-react";

interface MultimediaItem {
  id: string;
  filename: string;
  fileType: "IMAGE" | "VIDEO" | "FILE";
  fileSize: number;
  url: string;
}

interface MultimediaItemProps {
  item: MultimediaItem; // Updated to include item object
  type: "IMAGE" | "VIDEO" | "FILE";
  onView?: () => void;
  onShare?: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
}

export function MultimediaItem({
  item,
  type,
  onView,
  onShare,
  onDownload,
  onDelete,
}: MultimediaItemProps) {
  return (
    <div className="group relative aspect-square rounded-lg overflow-hidden bg-muted">
      <Image
        src={item.url}
        alt={item.filename}
        fill
        className="object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:text-white"
            onClick={onView}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:text-white">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={onShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onDelete}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
