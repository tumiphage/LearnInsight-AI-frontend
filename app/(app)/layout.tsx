import { Sidebar, MobileNav, MobileHeader } from '@/components/navigation';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-w-0 flex flex-col">
          <MobileHeader />
          <main className="flex-1 pb-20 lg:pb-0">
            {children}
          </main>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
