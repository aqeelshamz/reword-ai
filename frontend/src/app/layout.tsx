import './globals.css'
import type { Metadata } from 'next'
import { Golos_Text } from 'next/font/google'
 
const golos = Golos_Text({
  weight: '400',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={golos.className}>{children}</body>
    </html>
  )
}
