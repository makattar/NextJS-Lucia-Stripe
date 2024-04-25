import DashboardNav from "@/components/dashboard/DashboardNav";

interface Props {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
  return (
    <div className="container min-h-[calc(100vh-180px)] px-2 pt-6 md:px-4">
      <div className="flex flex-col gap-6 md:flex-row lg:gap-10">
        <main className="w-full space-y-4">
          <DashboardNav />
          <div className="m-auto max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
