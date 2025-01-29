import type { Metadata } from "next";
import "./globals.css";
import { JetBrains_Mono } from "next/font/google"

const jetbrainsFont = JetBrains_Mono({
  subsets: ["latin"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "Encifher",
  description: "Encifher",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jetbrainsFont.className}>
        {children}
      </body>
    </html>
  );
}
