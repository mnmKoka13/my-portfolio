import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "小門真愛のポートフォリオ",
  description: "フリーランスエンジニア小門真愛のポートフォリオサイト。Web開発の実績・スキルをご紹介します。",
  keywords: ["フリーランス", "エンジニア", "Next.js", "React", "ポートフォリオ"],
  authors: [{ name: "小門真愛" }],
  openGraph: {
    title: "小門真愛 | ポートフォリオ",
    description: "フリーランスエンジニア小門真愛のポートフォリオ",
    type: "website",
    locale: "ja_JP",
  },
};

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
        <Header />
        {children}
      </body>
    </html>
  );
}
