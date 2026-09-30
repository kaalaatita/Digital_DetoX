import type { DetoxSession, DetoxStats, MoodAfter } from "./types";

const ACTIVE_KEY = "detox.active-session";
const HISTORY_KEY = "detox.sessions";
const canUseStorage = () => typeof window !== "undefined";

function readHistory(): DetoxSession[] {
  if (!canUseStorage()) return [];
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]") as DetoxSession[]; } catch { return []; }
}

function writeHistory(sessions: DetoxSession[]) {
  if (canUseStorage()) localStorage.setItem(HISTORY_KEY, JSON.stringify(sessions));
}

export const sessionRepository = {
  getActive(): DetoxSession | null {
    if (!canUseStorage()) return null;
    try { return JSON.parse(localStorage.getItem(ACTIVE_KEY) ?? "null") as DetoxSession | null; } catch { return null; }
  },
  start(durationMinutes: number, activity: string): DetoxSession {
    const startedAt = new Date();
    const session: DetoxSession = {
      id: crypto.randomUUID(), startedAt: startedAt.toISOString(),
      plannedEndAt: new Date(startedAt.getTime() + durationMinutes * 60_000).toISOString(),
      plannedDurationMinutes: durationMinutes, activity, status: "active",
    };
    localStorage.setItem(ACTIVE_KEY, JSON.stringify(session));
    return session;
  },
  complete(session: DetoxSession): DetoxSession {
    const existing = readHistory().find((item) => item.id === session.id);
    if (existing) { localStorage.removeItem(ACTIVE_KEY); return existing; }
    const finished: DetoxSession = { ...session, status: "completed", completedAt: new Date().toISOString(), actualDurationMinutes: session.plannedDurationMinutes };
    writeHistory([...readHistory(), finished]);
    localStorage.removeItem(ACTIVE_KEY);
    return finished;
  },
  cancel(session: DetoxSession) {
    const cancelled: DetoxSession = { ...session, status: "cancelled", completedAt: new Date().toISOString() };
    writeHistory([...readHistory(), cancelled]);
    localStorage.removeItem(ACTIVE_KEY);
    return cancelled;
  },
  setMood(id: string, moodAfter: MoodAfter) {
    writeHistory(readHistory().map((session) => session.id === id ? { ...session, moodAfter } : session));
  },
  getById(id: string) { return readHistory().find((session) => session.id === id) ?? null; },
  getHistory() { return readHistory().filter((session) => session.status === "completed"); },
};

const dayKey = (value: string) => {
  const date = new Date(value);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
};

export function calculateStats(sessions: DetoxSession[]): DetoxStats {
  const completed = sessions.filter((session) => session.status === "completed");
  const totalMinutes = completed.reduce((total, session) => total + (session.actualDurationMinutes ?? session.plannedDurationMinutes), 0);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const sevenDaysAgo = today.getTime() - 6 * 86_400_000;
  const week = completed.filter((session) => dayKey(session.completedAt ?? session.startedAt) >= sevenDaysAgo);
  const days = [...new Set(completed.map((session) => dayKey(session.completedAt ?? session.startedAt)))].sort((a, b) => b - a);
  const streakFrom = (start: number) => { let count = 0; let cursor = start; while (days.includes(cursor)) { count++; cursor -= 86_400_000; } return count; };
  const currentStreakDays = days.includes(today.getTime()) ? streakFrom(today.getTime()) : 0;
  const longestStreakDays = days.reduce((longest, day) => Math.max(longest, streakFrom(day)), 0);
  return { completedSessions: completed.length, totalMinutes, lastSevenDaysSessions: week.length, lastSevenDaysMinutes: week.reduce((total, session) => total + (session.actualDurationMinutes ?? session.plannedDurationMinutes), 0), currentStreakDays, longestStreakDays };
}
