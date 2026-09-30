"use client";

import Link from "next/link";
import { BarChart3, Home, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [{ href: "/", label: "Детокс", icon: Home }, { href: "/progress", label: "Прогресс", icon: BarChart3 }, { href: "/settings", label: "Настройки", icon: Settings }];
export function BottomNav() {
  const pathname = usePathname();
  if (pathname === "/session" || pathname === "/complete") return null;
  return <nav className="fixed bottom-0 left-1/2 flex w-full max-w-md -translate-x-1/2 justify-around border-t border-[#dce4da] bg-[#f5f7f1]/90 px-3 pb-[max(.65rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur dark:border-[#314238] dark:bg-[#16201c]/90">{items.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={`flex min-w-20 flex-col items-center gap-1 rounded-xl px-3 py-1 text-xs ${pathname === href ? "text-[#315a41] dark:text-[#b9d3be]" : "text-[#718078] dark:text-[#91a198]"}`}><Icon size={20} strokeWidth={pathname === href ? 2.5 : 2} />{label}</Link>)}</nav>;
}
