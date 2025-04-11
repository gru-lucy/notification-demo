"use client";

import Notification from "./notification";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-sm bg-white border-b">
      <div className="text-2xl font-bold tracking-tight">Notification Demo</div>
      <Notification />
    </nav>
  );
}
