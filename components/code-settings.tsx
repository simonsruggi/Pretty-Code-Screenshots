"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as themes from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeSettingsProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
  showLineNumbers: boolean;
  setShowLineNumbers: (show: boolean) => void;
  padding: number;
  setPadding: (padding: number) => void;
  borderRadius: number;
  setBorderRadius: (radius: number) => void;
  fileName: string;
  setFileName: (name: string) => void;
  showMacBar: boolean;
  setShowMacBar: (show: boolean) => void;
}

export function CodeSettings({
  code,
  setCode,
  language,
  setLanguage,
  theme,
  setTheme,
  showLineNumbers,
  setShowLineNumbers,
  padding,
  setPadding,
  borderRadius,
  setBorderRadius,
  fileName,
  setFileName,
  showMacBar,
  setShowMacBar,
}: CodeSettingsProps) {
  const languages = [
    "javascript",
    "typescript",
    "jsx",
    "tsx",
    "html",
    "css",
    "python",
    "java",
    "c",
    "cpp",
    "csharp",
    "go",
    "rust",
    "ruby",
    "php",
    "swift",
    "kotlin",
    "scala",
    "bash",
    "sql",
    "json",
    "yaml",
    "markdown",
  ];

  const themeNames = Object.keys(themes).sort();

  return (
    <div className="w-full overflow-hidden">
      <Tabs defaultValue="code" className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="code" className="text-xs sm:text-sm">Code</TabsTrigger>
          <TabsTrigger value="theme" className="text-xs sm:text-sm">Theme</TabsTrigger>
          <TabsTrigger value="options" className="text-xs sm:text-sm">Options</TabsTrigger>
        </TabsList>
        <TabsContent value="code">
          <Card>
            <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs sm:text-sm font-medium mb-1 block">
                    Language
                  </label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="text-xs sm:text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[40vh]">
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang} className="text-xs sm:text-sm">
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium mb-1 block">
                    Your Code
                  </label>
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="h-36 sm:h-60 font-mono text-xs sm:text-sm"
                    placeholder="Paste your code here..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="theme">
          <Card>
            <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs sm:text-sm font-medium mb-1 block">
                    Syntax Theme
                  </label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger className="text-xs sm:text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[40vh]">
                      {themeNames.map((themeName) => (
                        <SelectItem key={themeName} value={themeName} className="text-xs sm:text-sm">
                          {themeName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="options">
          <Card>
            <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-medium">Show Line Numbers</label>
                  <Toggle
                    pressed={showLineNumbers}
                    onPressedChange={setShowLineNumbers}
                    size="sm"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-medium">Show macOS Window Bar</label>
                  <Toggle
                    pressed={showMacBar}
                    onPressedChange={setShowMacBar}
                    size="sm"
                  />
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium mb-1 block">
                    Padding (px)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="128"
                    value={padding}
                    onChange={(e) => setPadding(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-xs mt-1">{padding}px</div>
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium mb-1 block">
                    Border Radius (px)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="32"
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-xs mt-1">{borderRadius}px</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 