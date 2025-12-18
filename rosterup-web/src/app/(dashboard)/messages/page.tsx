"use client";

import { ChatLayout } from "@/components/chat/ChatLayout";

import { Suspense } from "react";

export default function MessagesPage() {
  return (
    <div className="h-full">
      <Suspense fallback={<div className="flex h-full items-center justify-center">Loading...</div>}>
        <ChatLayout />
      </Suspense>
    </div>
  );
}
