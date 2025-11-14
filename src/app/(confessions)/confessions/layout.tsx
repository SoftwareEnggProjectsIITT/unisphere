import { ReactNode } from "react";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

interface ConfessionsLayoutProps {
  children: ReactNode;
}

export default function ConfessionsLayout({
  children,
}: ConfessionsLayoutProps) {
  return (
    <div className="flex h-screen w-screen">
      {/* Left Sidebar */}
      <NavigationSidebar />

      {/* Main content */}
      <main className="flex-1 bg-background-light dark:bg-background-dark overflow-auto p-6">
        {children}
      </main>
    </div>
  );
}
