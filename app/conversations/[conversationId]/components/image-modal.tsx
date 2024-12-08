/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Modal from "@/components/modal";
import Image from "next/image";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  if (!src) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image alt="Image" className="object-contain" fill src={src} />
      </div>
    </Modal>
  );
};

export default ImageModal;