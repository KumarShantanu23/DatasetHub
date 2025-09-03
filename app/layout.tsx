import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Press_Start_2P, Orbitron } from "next/font/google"
import { Suspense } from "react"
import Script from "next/script"
import "./globals.css"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-press-start",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  weights: ["400", "500", "700"] as any,
  display: "swap",
  variable: "--font-orbitron",
})

export const metadata: Metadata = {
  title: "DatasetHub",
  description: "Created by Shantanu"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${pressStart.variable} ${orbitron.variable} antialiased`} suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){
            try {
              var t = localStorage.getItem('theme') || 'dark';
              document.documentElement.setAttribute('data-theme', t);
              if (t === 'dark') document.documentElement.classList.add('dark');
              else document.documentElement.classList.remove('dark');
            } catch (e) {}
          })();`}
        </Script>
      </head>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-background text-foreground transition-colors duration-300`}
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){
            try {
              var t = localStorage.getItem('theme') || 'dark';
              document.documentElement.setAttribute('data-theme', t);
              if (t === 'dark') document.documentElement.classList.add('dark');
              else document.documentElement.classList.remove('dark');
            } catch (e) {}
          })();`}
        </Script>
        <Suspense fallback={null}>
          <SiteHeader />
          {children}
          <SiteFooter />
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
