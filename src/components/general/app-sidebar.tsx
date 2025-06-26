import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { PackageIcon, UserIcon } from "lucide-react"
import Link from "next/link"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarMenuButton asChild>
          <Link href={'/customers'}>
            <UserIcon />
            Customers
          </Link>
        </SidebarMenuButton>
        <SidebarMenuButton asChild>
          <Link href={'/orders'}>
            <PackageIcon />
            Orders
          </Link>
        </SidebarMenuButton>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
