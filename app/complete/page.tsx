"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { formatMinutes } from "@/lib/format";
import { sessionRepository } from "@/lib/session-repository";
import type { DetoxSession, MoodAfter } from "@/lib/types";

const moods: { value: MoodAfter; label: string }[] = [{ value: "calmer", label: "😌 Спокойнее" }, { value: "good", label: "🙂 Хорошо" }, { value: "same", label: "😐 Без изменений" }, { value: "hard", label: "😓 Было сложно" }];
export default function CompletePage() {
  const [session, setSession] = useState<DetoxSession | null>(null);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    if (id) setSession(sessionRepository.getById(id));
  }, []);
  if (!session) return <section className="pt-20 text-center"><p>Эта сессия не найдена.</p><Link href="/" className="primary-button mt-6 inline-flex items-center justify-center">На главную</Link></section>;
  const chooseMood = (mood: MoodAfter) => { sessionRepository.setMood(session.id, mood); setSession({ ...session, moodAfter: mood }); setSaved(true); };
  return <section className="pt-12 text-center animate-[fade_.35s_ease-out]"><CheckCircle2 className="mx-auto text-[#55755f] dark:text-[#b9d3be]" size={56}/><h1 className="mt-6 text-4xl font-semibold tracking-[-.04em]">Готово.</h1><p className="mx-auto mt-4 max-w-xs text-lg leading-relaxed">Ты провёл {formatMinutes(session.actualDurationMinutes ?? session.plannedDurationMinutes)} без телефона.</p>{!saved && !session.moodAfter ? <div className="mt-12 text-left"><h2 className="text-xl font-semibold">Как ты себя чувствуешь?</h2><div className="mt-5 grid gap-2">{moods.map((mood) => <button onClick={() => chooseMood(mood.value)} key={mood.value} className="choice">{mood.label}</button>)}</div></div> : <div className="surface mt-12"><p className="text-lg">Спасибо, что отметил это.</p><p className="mt-2 text-sm text-[#65756b] dark:text-[#a6b5aa]">Небольшая пауза уже имеет значение.</p></div>}<Link href="/" className="primary-button mt-7 inline-flex items-center justify-center">Вернуться на главную</Link></section>;
}
