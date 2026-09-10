import AdminNav from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/admin";

export const metadata = {
  title: "Admin — Agent School",
  robots: { index: false, follow: false },
};

// Every admin page reads live rows; nothing here should ever be cached.
export const dynamic = "force-dynamic";

export default async function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();

  return (
    <div className="min-h-dvh bg-panel/40">
      <div className="mx-auto flex max-w-[1440px] flex-col md:flex-row">
        <div className="relative md:min-h-dvh">
          <AdminNav admin={admin} />
        </div>
        <main className="min-w-0 flex-1 px-5 py-8 md:px-10 md:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
