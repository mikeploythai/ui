import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en">
    <body
      className="grid min-h-dvh antialiased"
      style={{
        gridTemplateRows: "auto 1fr auto",
        textRendering: "optimizeLegibility",
      }}
    >
      {children}
    </body>
  </html>
);

export default RootLayout;
