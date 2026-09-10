"use client";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BookOpen,
  Video,
  ClipboardList,
  Award,
  TrendingUp,
  MessageSquare,
  Calendar,
} from "lucide-react";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: <LayoutDashboard /> },
  { title: "My Courses", url: "/courses", icon: <BookOpen /> },
  { title: "Live Classes", url: "/live-classes", icon: <Video /> },
  { title: "Assignments", url: "/assignments", icon: <ClipboardList /> },
  { title: "Certificates", url: "/certificates", icon: <Award /> },
  { title: "Progress", url: "/progress", icon: <TrendingUp /> },
  { title: "Messages", url: "/messages", icon: <MessageSquare /> },
  { title: "Calendar", url: "/calendar", icon: <Calendar /> },
];

export function NavMain({
  items = navItems,
}: {
  items?: {
    title: string;
    url: string;
    icon?: React.ReactNode;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem
              key={item.title}
              className="flex items-center gap-2"
            >
              <SidebarMenuButton>
                <a href={item.url} className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
