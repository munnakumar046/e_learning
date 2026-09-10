import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "./data.json";
import WelcomeBanner from "@/components/welcome-banner";
import ContinueLearning from "@/components/continue-learning";
import CalendarCard from "@/components/calender-card";
import LearningProgressCard from "@/components/learning-progress-card";

export default function Page() {
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
        <div className="grid grid-cols-12 gap-4 px-4 py-4">
          <div className="col-span-8">
            <WelcomeBanner />
            <div className="gap-4 py-4">
              <ContinueLearning />
            </div>
            <div>{/* <ChartAreaInteractive /> */}</div>
            {/* <DataTable data={data} /> */}
          </div>

          <div className="col-span-4">
            <CalendarCard />
            <div className="py-4">
              <LearningProgressCard />
            </div>
            {/* <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
              </div>
            </div> */}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
