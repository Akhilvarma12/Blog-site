import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ReduxProvider } from "@/components/ReduxProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Redux-Saga Blog",
  description: "A blog application built with Next.js, Redux, and Redux-Saga",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <div className="min-h-screen bg-background">
            <header className="border-b">
              <div className="container mx-auto px-4 py-4">
                <h1 className="text-2xl font-bold">Redux-Saga Blog</h1>
              </div>
            </header>
            <main className="container mx-auto px-4 py-8">{children}</main>
          </div>
        </ReduxProvider>
      </body>
    </html>
  )
}
