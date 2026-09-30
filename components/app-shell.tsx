"use client";

import { useEffect } from "react";
import { BottomNav } from "./bottom-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const savedTheme = localStorage.getItem("detox.theme");
    const dark = savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => undefined);
  }, []);
  return <main className="mx-auto min-h-dvh max-w-md px-5 pb-24 pt-[max(1.5rem,env(safe-area-inset-top))]">{children}<BottomNav /></main>;
}
