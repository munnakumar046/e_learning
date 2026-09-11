import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import CertificatesSection from "@/components/certificates-section";
import { getCurrentUser } from "@/lib/session";
import { getMyCertificates } from "@/lib/certificate";

export default async function CertificatesPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const certificates = await getMyCertificates(user.id);

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
          <CertificatesSection initialCertificates={certificates} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
