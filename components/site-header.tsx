"use client";

import React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Code } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex h-12 sm:h-14 items-center px-4 sm:px-6">
        <div className="mr-4 flex">
          <a href="/" className="flex items-center space-x-2">
            <Code className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="font-bold text-sm sm:text-base">Pretty Code Screenshots</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
} 