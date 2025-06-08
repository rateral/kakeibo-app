import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "家計簿アプリ - シンプルな家計管理",
  description: "収入と支出を簡単に記録・管理できる家計簿アプリです。月別サマリーや残高管理で、あなたの家計を見える化します。",
  keywords: ["家計簿", "家計管理", "収入", "支出", "残高管理", "家計アプリ"],
  authors: [{ name: "家計簿アプリ開発チーム" }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}