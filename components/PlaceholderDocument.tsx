"use client";
import React from "react";
import { Button } from "./ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const PlaceholderDocument = () => {
  const router = useRouter();

  const handleClick = () => {
    // check if user free tier and if they're over the file limit push to upgrade page
    router.push("/dashboard/upload");
  };
  return (
    <Button
      className="flex flex-col items-center justify-center w-64 h-80 rounded-xl bg-gray-200 dark:bg-gray-700 drop-shadow-md text-gray-600 dark:text-gray-300"
      onClick={handleClick}
    >
      <PlusCircleIcon className="h-16 w-16" />
      <p>Add a document</p>
    </Button>
  );
};

export default PlaceholderDocument;
