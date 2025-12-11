"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItem = (path: string, label: string) => (
    <Link
      href={path}
      className={`block px-4 py-2 rounded-md transition-all ${
        pathname === path
          ? "bg-blue-600 text-white"
          : "text-gray-300 hover:bg-blue-800 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-gray-200 flex flex-col p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

        <nav className="flex flex-col gap-2">
          {navItem("/employees", "Employees")}
          {navItem("/users", "Users")}
          {navItem("/departments", "Departments")}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
