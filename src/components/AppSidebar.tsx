
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
import { useNavigate } from "react-router-dom"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "My Creatives",
    url: "/dashboard/creatives",
    icon: FolderOpen,
    active: true,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
  },
]

export function AppSidebar() {
  const navigate = useNavigate()
  
  const handleLogout = () => {
    // Handle logout logic here
    navigate("/login")
  }
  
  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="p-6">
        <img 
          src="/lovable-uploads/90b46b0c-2812-4d9c-9364-fb334c5e6ce2.png" 
          alt="WIZORA Logo" 
          className="h-8" 
        />
      </SidebarHeader>
      
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`w-full justify-start py-3 px-4 rounded-lg mb-2 transition-all duration-200 font-product ${
                      item.active 
                        ? 'bg-gradient-wizora text-white hover:opacity-90' 
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
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 font-product">
            PRODUCTS
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-4">
              <div className="bg-gradient-wizora rounded-lg p-4 text-white">
                <h3 className="font-bold text-lg font-product">Quest</h3>
                <p className="text-sm opacity-90 font-product">Gaming DSP</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 text-white">
                <h3 className="font-bold text-lg font-product">QuestMap</h3>
                <p className="text-sm opacity-75 font-product">Inventory Discovery Tool</p>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 font-product">
            ACCOUNT
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-1 font-product">
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
          className="w-full justify-start text-gray-600 hover:text-gray-800 hover:bg-gray-100 font-product"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
