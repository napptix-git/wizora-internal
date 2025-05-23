
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
import { Home, FolderOpen, Users, Settings, LogOut, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate, useLocation } from "react-router-dom"

export function AppSidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const handleLogout = () => {
    // Handle logout logic here
    navigate("/login")
  }
  
  // Determine which menu item should be active based on current route
  const menuItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      active: location.pathname === "/dashboard"
    },
    {
      title: "My Creatives",
      url: "/dashboard/creatives",
      icon: FolderOpen,
      active: location.pathname === "/dashboard/creatives"
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: Users,
      active: location.pathname === "/dashboard/users"
    },
    {
      title: "Repository",
      url: "/dashboard/repository",
      icon: Database,
      active: location.pathname === "/dashboard/repository"
    },
  ]
  
  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="p-6">
        <img 
          src="/lovable-uploads/70d07a7b-2745-48c7-a3ac-550181ac6682.png" 
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
      </SidebarContent>
      
      <SidebarFooter className="p-4 mt-auto">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 font-product">
            ACCOUNT
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-1 font-product mb-4">
              <div className="text-sm text-gray-600 py-2 px-4">Billing</div>
              <div className="text-sm text-gray-600 py-2 px-4">Account Settings</div>
              <div className="text-sm text-gray-600 py-2 px-4 opacity-50">
                Nealys Media Private Limited
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        
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
