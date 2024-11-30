/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import useConversation from "@/app/hooks/useConversation";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Camera, ImageIcon, Plus, Send } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import MessageInput from "./message-input";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      message: "", // Đảm bảo giá trị mặc định là rỗng
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await axios.post("/api/messages", {
        ...data,
        conversationId,
      });
      reset(); // Reset form sau khi gửi tin nhắn
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };
  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div className="border-t border-gray-200 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2"
      >
        {/* Các nút bổ sung */}
        <Button variant="ghost" size="icon">
          <Plus className="h-5 w-5" />
        </Button>
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onSuccess={handleUpload}
          uploadPreset="nm3slfqb"
        >
          <ImageIcon className="h-5 w-5" />
        </CldUploadButton>
        <Button variant="ghost" size="icon">
          <Camera className="h-5 w-5" />
        </Button>

        {/* Input cho tin nhắn */}
        <div className="relative flex-1">
          <MessageInput
            id="message"
            register={register}
            required
            placeholder="Write a message"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
            type="submit"
          >
            <Send className="h-5 w-5 text-blue-500" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
