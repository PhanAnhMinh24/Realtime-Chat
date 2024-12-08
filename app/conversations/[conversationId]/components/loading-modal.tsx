/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ClipLoader } from "react-spinners";

const LoadingModal = () => {
  return (
    <Transition.Root show as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        {/* Nền mờ với độ phủ toàn màn hình */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40"></div>
        </Transition.Child>

        {/* Vòng tải */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Dialog.Panel>
            <ClipLoader size={40} color="#0284c7" />
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LoadingModal;
