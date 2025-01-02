import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react'
import { GitHubCorner } from "@/components/GitHubCorner"
import { NavButton } from "@/components/NavButton"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "复古时钟",
  description: "一个Windwos样式的复古时钟应用",
  keywords: ["时钟", "复古", "Next.js", "React","Windows"],
  authors: [{ name: "Your Name" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "复古时钟",
    description: "一个Windwos样式的复古时钟应用",
    url: "https://windwos-clock.programnotes.cn",
    siteName: "复古时钟",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  other: {
    'msvalidate.01': 'B6FE76A783A1770409EC903DE2C7AC6A',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GitHubCorner repository="yiGmMk/windwos-clock" />
        <NavButton />
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3614504270218797"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Analytics />
      </body>
    </html>
  );
}
