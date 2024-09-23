"use client";

import { useEffect, useRef, useState, useTransition, FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader2Icon } from "lucide-react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";

export type Message = {
  id?: string;
  role: "human" | "ai" | "placeholder";
  message: string;
  createdAt: Date;
};

const Chat = ({ id }: { id: string }) => {
  const { user } = useUser();

  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col h-full overflow-scroll">
      <div className="flex-1 w-full"></div>
      <form
        onSubmit={handleSubmit}
        className="flex sticky bottom-0 space-x-2 p-5 bg-indigo-600/75"
      >
        <Input
          placeholder="Ask a question..."
          value={input}
          className="bg-white"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button disabled={!input || isPending}>Ask</Button>
      </form>
    </div>
  );
};

export default Chat;
