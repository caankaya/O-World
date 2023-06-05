import Providers from '@/GlobalRedux/store/provider'
import '../styles/globals.css'
import '../styles/alien-font.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'OWorld',
  description: 'Data of planet earth',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        </body>
    </html>
  )
}
