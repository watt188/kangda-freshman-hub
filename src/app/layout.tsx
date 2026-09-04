import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KANGDA / 2026 新生资料库",
  description: "康复大学2026级新生个人整理资料库：医学、英语、科研、AI与专业地图。非官方资料。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
