import { Albert_Sans } from 'next/font/google'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'

import { cn } from '@/utils/classnames'
import { QueryClientProvider } from '@/providers/query-client-provider'
import './globals.css'
import { Header } from '@/components/Header/header'

const albertSans = Albert_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Social media app',
  description: 'This is a practice repository for a social media app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          albertSans.className,
          'flex min-h-screen flex-col items-center bg-zinc-50 font-medium text-zinc-800',
        )}
      >
        <QueryClientProvider>
          <Header />
          {children}
          <Toaster />
        </QueryClientProvider>
      </body>
    </html>
  )
}
