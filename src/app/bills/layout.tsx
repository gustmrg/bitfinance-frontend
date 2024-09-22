import Header from "@/components/ui/header";
import Sidebar from "@/components/ui/sidebar";

export default function BillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden overflow-y-auto">
        <Header />
        <main className="container mx-auto p-4">{children}</main>
      </div>
    </section>
  );
}
