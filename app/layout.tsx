import type { Metadata } from "next";
import "./globals.css";
import { Lexend } from "next/font/google"

const lexend = Lexend({
  subsets: ["latin"],
  style: "normal",
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
      <body className={lexend.className}>
        {children}
      </body>
    </html>
  );
}
