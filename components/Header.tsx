"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { FilePlus2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const topLineVariants = {
    closed: { rotate: 0, y: -5 },
    open: { rotate: 45, y: 0 },
  };

  const bottomLineVariants = {
    closed: { rotate: 0, y: 5 },
    open: { rotate: -45, y: 0 },
  };

  return (
    <div className="flex justify-between items-center bg-white dark:bg-black shadow-sm p-5 border-b border-gray-200 dark:border-gray-700">
      <Link href="/dashboard" className="text-2xl z-10">
        Chat<span className="text-purple-500">PDF</span>
      </Link>

      <SignedIn>
        <div className="hidden md:flex items-center space-x-2">
          <Button asChild variant="link">
            <Link href="/dashboard/upgrade">Pricing</Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/dashboard">My Documents</Link>
          </Button>

          <Button asChild variant="outline" className="border-primary">
            <Link href="/dashboard/upload">
              <FilePlus2 className="text-primary" />
            </Link>
          </Button>

          <ThemeToggle />

          <UserButton />
        </div>

        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <UserButton />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="z-20 p-2"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <motion.span
                variants={topLineVariants}
                animate={isMenuOpen ? "open" : "closed"}
                transition={{ type: "keyframes", stiffness: 260, damping: 0 }}
                className="w-6 h-0.5 bg-current block absolute"
              />
              <motion.span
                variants={bottomLineVariants}
                animate={isMenuOpen ? "open" : "closed"}
                transition={{ type: "keyframes", stiffness: 260, damping: 20 }}
                className="w-6 h-0.5 bg-current block absolute"
              />
            </div>
          </Button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-y-0 right-0 w-64 bg-white dark:bg-black z-10 flex flex-col items-start justify-start p-5 shadow-lg"
              >
                <div className="w-full pt-14 flex flex-col space-y-4">
                  <Button
                    asChild
                    variant="link"
                    onClick={toggleMenu}
                    className="w-full justify-center"
                  >
                    <Link href="/dashboard/upgrade">Pricing</Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    onClick={toggleMenu}
                    className="w-full justify-start"
                  >
                    <Link href="/dashboard">My Documents</Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="border-primary w-full justify-start"
                    onClick={toggleMenu}
                  >
                    <Link href="/dashboard/upload">
                      <FilePlus2 className="text-primary mr-2" />
                      Upload Document
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SignedIn>
    </div>
  );
}
