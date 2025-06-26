import React from "react";
import AppHeader from "./_components/AppHeader";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 px-4 md:px-8 py-6 pt-24">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
