"use client";

import { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import { formatMinutes } from "@/lib/format";
import { calculateStats, sessionRepository } from "@/lib/session-repository";
import type { DetoxStats } from "@/lib/types";

const empty: DetoxStats = { completedSessions: 0, totalMinutes: 0, lastSevenDaysSessions: 0, lastSevenDaysMinutes: 0, currentStreakDays: 0, longestStreakDays: 0 };
export default function ProgressPage() {
  const [stats, setStats] = useState(empty);
  useEffect(() => setStats(calculateStats(sessionRepository.getHistory())), []);
  return <section className="animate-[fade_.35s_ease-out]"><div className="mb-9 flex items-center gap-3 text-[#55755f] dark:text-[#b9d3be]"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#e1ebdf] dark:bg-[#294033]"><BarChart3 size={21}/></span><span className="text-sm font-semibold tracking-wide">МОЙ ПРОГРЕСС</span></div><h1 className="text-4xl font-semibold tracking-[-.04em]">Твоё время для себя</h1><div className="surface mt-8"><p className="text-sm font-semibold uppercase tracking-wider text-[#65756b] dark:text-[#a6b5aa]">На этой неделе</p><p className="mt-3 text-3xl font-semibold">{formatMinutes(stats.lastSevenDaysMinutes)}</p><p className="mt-1 text-sm text-[#65756b] dark:text-[#a6b5aa]">{stats.lastSevenDaysSessions} сессий без телефона</p></div><div className="mt-4 grid grid-cols-2 gap-3"><StatCard value={stats.completedSessions} label="завершённых сессий"/><StatCard value={formatMinutes(stats.totalMinutes)} label="всего без телефона"/><StatCard value={stats.currentStreakDays} label="дней подряд"/><StatCard value={stats.longestStreakDays} label="лучшая серия"/></div><p className="mt-8 text-center text-sm leading-relaxed text-[#718078] dark:text-[#91a198]">Здесь нет оценок и соревнования — только твой собственный ритм.</p></section>;
}
