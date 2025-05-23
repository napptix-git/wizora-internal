
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Home, FolderOpen, Users, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "My Creatives",
    url: "/creatives",
    icon: FolderOpen,
    active: true,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-wizora bg-clip-text text-transparent">
          WIZORA
        </h1>
      </SidebarHeader>
      
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`w-full justify-start py-3 px-4 rounded-lg mb-2 transition-all duration-200 ${
                      item.active 
                        ? 'bg-gray-800 text-white hover:bg-gray-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <a href={item.url}>
                      <item.icon className="mr-3 h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            PRODUCTS
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-4">
              <div className="bg-gradient-wizora rounded-lg p-4 text-white">
                <h3 className="font-bold text-lg">Quest</h3>
                <p className="text-sm opacity-90">Gaming DSP</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 text-white">
                <h3 className="font-bold text-lg">QuestMap</h3>
                <p className="text-sm opacity-75">Inventory Discovery Tool</p>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            ACCOUNT
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 py-2 px-4">Billing</div>
              <div className="text-sm text-gray-600 py-2 px-4">Account Settings</div>
              <div className="text-sm text-gray-600 py-2 px-4 opacity-50">
                Nealys Media Private Limited
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-gray-600 hover:text-gray-800 hover:bg-gray-100"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
