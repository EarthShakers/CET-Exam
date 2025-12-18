import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "sonner"

export const metadata: Metadata = {
  title: "CET 考试系统",
  description: "CET 四六级考试管理系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
        <Toaster />
        <Sonner />
      </body>
    </html>
  );
}
