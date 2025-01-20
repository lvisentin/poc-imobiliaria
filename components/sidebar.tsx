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
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Building,
  Home,
  PhoneCall,
  PlusCircle
} from "lucide-react";

const routes = [
  { name: "Home", icon: Home, path: "/dashboard" },
  { name: "Properties", icon: Building, path: "/dashboard/properties" },
  {
    name: "Register Property",
    icon: PlusCircle,
    path: "/dashboard/properties/register",
  },
  { name: "Leads", icon: PhoneCall, path: "/dashboard/leads" },
];

export function DashboardSidebar() {
  return (
    <Sidebar className="h-screen bg-primary text-primary-foreground">
      <SidebarHeader>
        <h2 className="text-xl font-bold px-6 py-4 font-heading">
          Real Estate App
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary-foreground/70">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => (
                <SidebarMenuItem key={route.path}>
                  <SidebarMenuButton asChild>
                    <a
                      href={route.path}
                      className="flex items-center space-x-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-md transition-colors"
                    >
                      <route.icon className="h-5 w-5" />
                      <span>{route.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail className="bg-primary-foreground/10" />
    </Sidebar>
  );
}
