import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import LiveClassesSection from "@/components/live-classes-section";
import { Toaster } from "@/components/ui/sonner";
import { getCurrentUser } from "@/lib/session";
import { getMyLiveClasses } from "@/lib/live-classes";

export default async function LiveClassesPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const liveClasses = await getMyLiveClasses(user.id);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="px-4 py-4">
          <LiveClassesSection initialLiveClasses={liveClasses} />
        </div>
      </SidebarInset>
      <Toaster position="top-right" />
    </SidebarProvider>
  );
}
