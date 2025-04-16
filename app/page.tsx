"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { CodePreview } from "@/components/code-preview";
import { CodeSettings } from "@/components/code-settings";

const exampleCode = `function greet(name) {
  return \`Hello, \${name}!\`;
}

// Call the function
console.log(greet("World"));`;

export default function Home() {
  const [code, setCode] = useState(exampleCode);
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("dracula");
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [padding, setPadding] = useState(32);
  const [borderRadius, setBorderRadius] = useState(8);
  const [fileName, setFileName] = useState("example.js");
  const [showMacBar, setShowMacBar] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 w-full px-4 sm:px-6 py-4 sm:py-8">
        <div className="flex flex-col gap-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter">
              Pretty Screenshots
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Create beautiful screenshots of your code in seconds.
            </p>
          </div>
          
          <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
            <div className="order-2 lg:order-1 w-full">
              <CodeSettings
                code={code}
                setCode={setCode}
                language={language}
                setLanguage={setLanguage}
                theme={theme}
                setTheme={setTheme}
                showLineNumbers={showLineNumbers}
                setShowLineNumbers={setShowLineNumbers}
                padding={padding}
                setPadding={setPadding}
                borderRadius={borderRadius}
                setBorderRadius={setBorderRadius}
                fileName={fileName}
                setFileName={setFileName}
                showMacBar={showMacBar}
                setShowMacBar={setShowMacBar}
              />
            </div>
            <div className="order-1 lg:order-2 w-full">
              <CodePreview
                code={code}
                language={language}
                theme={theme}
                showLineNumbers={showLineNumbers}
                padding={padding}
                borderRadius={borderRadius}
                fileName={fileName}
                setFileName={setFileName}
                showMacBar={showMacBar}
              />
            </div>
          </div>
        </div>
      </main>
      <footer className="py-4 sm:py-6 border-t">
        <div className="px-4 sm:px-6 flex flex-col items-center justify-center gap-2 text-center text-xs sm:text-sm">
          <p className="text-muted-foreground">
            Made with{" "}
            <span role="img" aria-label="heart">
              ❤️
            </span>{" "}
            by{" "}
            <a
              href="https://simoneruggiero.com"
              target="_blank"
              rel="noopener"
              className="text-primary hover:underline"
            >
              Simone Ruggiero
            </a>{" "}
            using Next.js, Tailwind CSS and shadcn/ui
          </p>
        </div>
      </footer>
    </div>
  );
}
