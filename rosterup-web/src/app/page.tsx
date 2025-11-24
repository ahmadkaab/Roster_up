import { MainLayout } from "@/components/layout/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center space-y-8 py-12 text-center lg:py-24">
        <h1 className="text-4xl font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl">
          RosterUp Web
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Find your dream team. Manage recruitments. Build your legacy.
        </p>
        <div className="mt-8 p-6 border border-border rounded-xl bg-card">
            <p className="text-card-foreground">Welcome to the new web experience.</p>
        </div>
      </div>
    </MainLayout>
  );
}
