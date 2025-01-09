import { Emoji, PencilIcon, TrashIcon } from "@/components/ChannelList/Icons";
import { Dispatch, SetStateAction } from "react";

export default function MessageOptions({
  showEmojiReactions,
  onEdit,
  onDelete,
}: {
  showEmojiReactions: Dispatch<SetStateAction<boolean>>;
  onEdit?: () => void;
  onDelete?: () => void;
}): JSX.Element {
  return (
    <div className="absolute flex items-center -top-4 right-2 rounded-full bg-white border border-gray-200 shadow-lg space-x-3 p-2">
      {/* Nút Emoji */}
      <button
        className="p-2 bg-gray-100 rounded-full transition-all duration-200 hover:bg-blue-100 hover:scale-110"
        onClick={() => showEmojiReactions((currentValue) => !currentValue)}
      >
        <Emoji className="w-6 h-6 text-blue-500" />
      </button>
      {/* Nút Edit (Cây bút) */}
      <button
        className="p-2 bg-gray-100 rounded-full transition-all duration-200 hover:bg-blue-100 hover:scale-110"
        onClick={onEdit}
      >
        <PencilIcon className="w-6 h-6 text-blue-500" />
      </button>
      {/* Nút Xóa (Thùng rác) */}
      <button
        className="p-2 bg-gray-100 rounded-full transition-all duration-200 hover:bg-red-100 hover:scale-110"
        onClick={onDelete}
      >
        <TrashIcon className="w-6 h-6 text-red-500" />
      </button>
    </div>
  );
}
