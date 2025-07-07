'use client'
import { Calendar, Computer, CreditCard, Home, Inbox, Laptop, LayoutDashboard, Plus, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import useProject from "@/hooks/use-project"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Q&A",
    url: "/qa",
    icon: Inbox,
  },
  {
    title: "Meetings",
    url: "/meetings",
    icon: Laptop,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: CreditCard,
  },
]


export function AppSidebar() {
    const pathname = usePathname()
    const { open } = useSidebar()
    const { projects, projectId, setProjectId } = useProject()
  return (
    <Sidebar collapsible="icon" variant="floating">
        <SidebarHeader>
            <div className="flex items-center gap-2">
                <Image src='/logo.png' alt="logo" width={40} height={40}></Image>
                {open && (
                <span className="font-bold font-mono text-xl text-primary/80">Talk2Repo</span>
                )}
            </div>
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className={
                        cn({'!bg-primary !text-white': pathname === item.url}, 'list-none')
                    }>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects?.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                      <div onClick={() => setProjectId(item.id)}>
                        <div className={cn(
                          'rounded-sm border size-6 flex items-center justify-center text-sm bg-white text-primary', 
                            {
                              'bg-primary text-white': item.id === projectId
                            }
                        )}>
                            {item.name[0]}
                        </div>
                        <span>{item.name}</span>
                      </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <div className="h-2"></div>
              {open && (
                <SidebarMenuItem>
                    <Link href='/create'>
                        <Button size='sm' variant={'outline'} className="w-fit">
                            <Plus />
                            Create Project
                        </Button>
                    </Link>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}