export const ACTIVITIES = ["Прогулка", "Чтение", "Дыхательная практика", "Спорт", "Домашние дела", "Творчество", "Общение с близкими", "Просто отдых"] as const;
export type PresetActivity = (typeof ACTIVITIES)[number];
export type DetoxActivity = PresetActivity | string;
export type SessionStatus = "active" | "completed" | "cancelled";
export type MoodAfter = "calmer" | "good" | "same" | "hard";

export interface DetoxSession {
  id: string;
  startedAt: string;
  plannedEndAt: string;
  completedAt?: string;
  plannedDurationMinutes: number;
  actualDurationMinutes?: number;
  activity: DetoxActivity;
  status: SessionStatus;
  moodAfter?: MoodAfter;
}

export interface DetoxStats {
  completedSessions: number;
  totalMinutes: number;
  lastSevenDaysSessions: number;
  lastSevenDaysMinutes: number;
  currentStreakDays: number;
  longestStreakDays: number;
}
