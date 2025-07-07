import React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Search } from 'lucide-react'
import { UserButton, UserProfile } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'
import { AppSidebar } from './app-sidebar'

type Props = {
    children: React.ReactNode
}

const SidebarLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full m-2'>
        <div className='flex items-center gap-2 border-sidebar-border bg-sidebar border shadow-rounded-md p-2 px-4'>
            {/* <SearchBar /> */}
            <div className='ml-auto'></div>
            <UserButton />
        </div>
        <div className='h-4'></div>
        <div className='p-2 border-sidebar-border bg-sidebar border shadow rounded-md overflow-y-scroll h-[calc(100vh-6rem)]'>
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}

export default SidebarLayout