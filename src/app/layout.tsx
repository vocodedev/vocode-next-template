import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { BottomNavBar } from "@/components/bottom-nav-bar"


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vocode Next.js Vercel Template',
  description: 'Discover the potential of voice-based large language models at Vocode',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <ModeToggle />
            {children}
            <BottomNavBar />
          </ThemeProvider>
        </body>
      </html>
  )
}
