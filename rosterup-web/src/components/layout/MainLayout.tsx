import { BottomNav } from "./BottomNav";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar (Desktop) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Top Bar */}
        <TopBar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 pb-20 lg:p-8">
          {children}
        </main>
      </div>

      {/* Bottom Nav (Mobile) */}
      <BottomNav />
    </div>
  );
}
