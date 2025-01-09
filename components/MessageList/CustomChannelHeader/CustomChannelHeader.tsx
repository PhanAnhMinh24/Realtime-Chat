import React, { useState } from "react";
import { useChannelStateContext } from "stream-chat-react";
import MessageSearch from "../MessageSearch/MessageSearch";

export default function CustomChannelHeader(): JSX.Element {
  const { channel } = useChannelStateContext();
  const { name } = channel?.data || {};

  return (
    <div className="sticky top-0 bg-white z-10 shadow-sm">
      {/* Header */}
      <div className="flex items-center space-x-3 p-3 border-b-2 border-b-gray-200">
        <span className="text-3xl text-gray-500">#</span>
        <span className="font-bold lowercase">{name}</span>
        <MessageSearch />
      </div>
    </div>
  );
}
