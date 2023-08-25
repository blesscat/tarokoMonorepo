import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover'
}



export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title> taroko monorepo </title>
      </head>
      <body className='flex flex-col'>{children}</body>
    </html>
  )
}
