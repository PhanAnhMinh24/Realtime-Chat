/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Gear, Mic, Speaker } from "../Icons";
import { useChatContext } from "stream-chat-react";
import { useClerk, UserButton } from "@clerk/nextjs";

export default function ChannelListBottomBar(): JSX.Element {
  const { client } = useChatContext();
  const [micActive, setMicActive] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { signOut, user } = useClerk();

  return (
    <>
      <div className="mt-auto p-2 bg-light-gray w-full flex items-center space-x-3 relative">
        <button
          className="flex flex-1 items-center space-x-2 p-1 pr-2 rounded-md hover:bg-hover-gray"
          onClick={() => setProfileOpen(true)}
        >
          {client.user?.image && (
            <div
              className={`relative ${client.user?.online ? "online-icon" : ""}`}
            >
              <UserButton showName={false} afterSignOutUrl="/" />
            </div>
          )}
          <p className="flex flex-col items-start space-y-1">
            <span className="block max-w-24 text-gray-700 text-sm font-medium -mb-1.5 tracking-tight text-ellipsis overflow-x-clip">
              {client.user?.name}
            </span>
            <span className="text-xs text-gray-500 inline-block">
              {client.user?.online ? "Online" : "Offline"}
            </span>
          </p>
        </button>
        <button
          className={`w-7 h-7 p-1 flex items-center justify-center relative rounded-lg hover:bg-gray-300 transition-all duration-100 ease-in-out ${
            !micActive ? "inactive-icon text-red-400" : "text-gray-700"
          }`}
          onClick={() => setMicActive((currentValue) => !currentValue)}
        >
          <Mic />
        </button>
        <button
          className={`w-7 h-7 p-1 flex items-center justify-center relative rounded-lg hover:bg-gray-300 transition-all duration-100 ease-in-out ${
            !audioActive ? "inactive-icon text-red-400" : "text-gray-700"
          }`}
          onClick={() => setAudioActive((currentValue) => !currentValue)}
        >
          <Speaker />
        </button>
        <button className="w-7 h-7 p-1 flex items-center justify-center relative rounded-md hover:bg-gray-300 transition-all duration-100 ease-in-out text-gray-700">
          <Gear className="w-full h-full" />
        </button>
      </div>
      {profileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-full">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <div className="mb-4">
              <img
                src={user?.imageUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto"
              />
            </div>
            <div className="mb-4">
              <p className="font-semibold">Name: {user?.fullName}</p>
              <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setProfileOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
