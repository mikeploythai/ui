import "./globals.css";

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "UI",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en">
    <body
      className="grid min-h-dvh antialiased"
      style={{
        gridTemplateRows: "1fr auto",
        textRendering: "optimizeLegibility",
      }}
    >
      {children}
      <footer className="border-t p-6">
        <Link
          href="https://ploythai.dev"
          className="font-medium text-muted-foreground text-sm"
        >
          ploythai.dev
        </Link>
      </footer>
    </body>
  </html>
);

export default RootLayout;
