"use client";

import { ReactNode } from "react";
import { AdminSidebar } from "./admin-sidebar";
import { AdminHeader } from "./admin-header";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
  className?: string;
}

export function AdminLayout({ children, className }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader />
        
        {/* Content */}
        <main className={cn("flex-1 overflow-y-auto p-6", className)}>
          {children}
        </main>
      </div>
    </div>
  );
}