"use client";

import React, { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import * as themes from "react-syntax-highlighter/dist/esm/styles/prism";
import { toPng } from "html-to-image";

interface CodePreviewProps {
  code: string;
  language: string;
  theme: string;
  showLineNumbers: boolean;
  padding: number;
  borderRadius: number;
  fileName: string;
  setFileName: (name: string) => void;
  showMacBar?: boolean;
}

export function CodePreview({
  code,
  language,
  theme,
  showLineNumbers,
  padding,
  borderRadius,
  fileName,
  setFileName,
  showMacBar = true,
}: CodePreviewProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditingFileName, setIsEditingFileName] = useState(false);
  const [tempFileName, setTempFileName] = useState(fileName);
  const fileNameInputRef = useRef<HTMLInputElement>(null);

  const downloadImage = () => {
    if (elementRef.current) {
      setIsGenerating(true);
      toPng(elementRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          // Use the fileName if available, otherwise use 'code'
          const baseFileName = fileName ? fileName.trim() : 'code';
          // Remove file extension if present
          const nameWithoutExtension = baseFileName.split('.')[0];
          // Create the final filename with -screenshot suffix
          link.download = `${nameWithoutExtension}-screenshot.png`;
          link.href = dataUrl;
          link.click();
          setIsGenerating(false);
        })
        .catch((err) => {
          console.error("Error generating image:", err);
          setIsGenerating(false);
        });
    }
  };

  const handleFileNameClick = () => {
    setIsEditingFileName(true);
    setTempFileName(fileName);
    setTimeout(() => {
      fileNameInputRef.current?.focus();
      fileNameInputRef.current?.select();
    }, 0);
  };

  const handleFileNameBlur = () => {
    setIsEditingFileName(false);
    if (tempFileName.trim()) {
      setFileName(tempFileName);
    }
  };

  const handleFileNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (tempFileName.trim()) {
        setFileName(tempFileName);
      }
      setIsEditingFileName(false);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setTempFileName(fileName);
      setIsEditingFileName(false);
    }
  };

  // @ts-ignore - themes typing issue
  const selectedTheme = themes[theme] || themes.dracula;

  return (
    <div className="w-full h-full flex flex-col">
      <div 
        ref={elementRef}
        className="w-full overflow-hidden rounded-md shadow-sm"
        style={{ 
          padding: showMacBar ? `0px` : `${padding}px`, 
          borderRadius: `${borderRadius}px`, 
          backgroundColor: 'var(--card-background)'
        }}
      >
        {showMacBar && (
          <div className="mac-window-bar flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
            <div className="flex space-x-1.5 sm:space-x-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 text-center mx-2">
              {isEditingFileName ? (
                <input
                  ref={fileNameInputRef}
                  type="text"
                  value={tempFileName}
                  onChange={(e) => setTempFileName(e.target.value)}
                  onBlur={handleFileNameBlur}
                  onKeyDown={handleFileNameKeyDown}
                  className="w-full max-w-[200px] mx-auto text-center text-xs bg-transparent border-b border-gray-400 dark:border-gray-600 focus:outline-none px-1 py-0 text-gray-700 dark:text-gray-300"
                />
              ) : (
                <span 
                  onClick={handleFileNameClick}
                  className="text-xs text-gray-600 dark:text-gray-400 font-medium truncate cursor-text hover:text-gray-800 dark:hover:text-gray-200"
                >
                  {fileName || "untitled.js"}
                </span>
              )}
            </div>
          </div>
        )}
        <div className="w-full max-w-full overflow-auto" style={{ padding: showMacBar ? `${padding}px` : '0' }}>
          <SyntaxHighlighter
            language={language}
            style={selectedTheme}
            showLineNumbers={showLineNumbers}
            wrapLines={true}
            customStyle={{
              margin: 0,
              borderRadius: 4,
              fontSize: "14px",
              width: '100%'
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={downloadImage}
          disabled={isGenerating}
          className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium w-full sm:w-auto disabled:opacity-70 flex items-center justify-center"
        >
          {isGenerating ? "Generating..." : "Download Screenshot"}
        </button>
      </div>
    </div>
  );
} 