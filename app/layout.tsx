import type { Metadata } from "next";
import "./globals.css";
import { Lexend, JetBrains_Mono } from "next/font/google"

// const lexend = Lexend({
//   subsets: ["latin"],
//   style: "normal",
// });

const jetbrainsFont = JetBrains_Mono({
  subsets: ["latin"],
  style: ["normal"]
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
