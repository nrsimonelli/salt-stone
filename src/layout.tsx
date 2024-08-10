import { ReactNode } from 'react'

export const Layout = ({ children }: { children: ReactNode }) => {
  return <div className='min-h-screen font-sans antialiased'>{children}</div>
}
