"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, RotateCcw, X } from "lucide-react";
import { Timer } from "@/components/timer";
import { formatMinutes } from "@/lib/format";
import { sessionRepository } from "@/lib/session-repository";
import type { DetoxSession } from "@/lib/types";

export default function SessionPage() {
  const router = useRouter();
  const [session, setSession] = useState<DetoxSession | null>(null);
  useEffect(() => { const current = sessionRepository.getActive(); if (!current) router.replace("/"); else setSession(current); }, [router]);
  const finish = useCallback(() => {
    const active = sessionRepository.getActive();
    if (!active) return;
    const saved = sessionRepository.complete(active);
    if ("Notification" in window && Notification.permission === "granted") new Notification("Твоя сессия цифрового детокса завершена.");
    router.replace(`/complete?id=${saved.id}`);
  }, [router]);
  const leaveSession = () => {
    if (!session) return;
    sessionRepository.cancel(session);
    router.replace("/");
  };
  if (!session) return null;
  return <section className="flex min-h-[calc(100dvh-3rem)] flex-col animate-[fade_.35s_ease-out]"><button onClick={leaveSession} className="quiet-button -ml-3 w-fit"><ArrowLeft size={17} className="mr-1 inline"/>К началу</button><div className="my-auto"><p className="text-center text-sm font-semibold tracking-[.16em] text-cyan-800 dark:text-cyan-100">ЦИФРОВОЙ ДЕТОКС</p><h1 className="mt-5 text-center text-xl font-medium">Осталось</h1><div className="mt-5"><Timer endAt={session.plannedEndAt} onEnd={finish}/></div><div className="surface mx-auto mt-12 max-w-sm text-center"><p className="text-sm text-cyan-900/70 dark:text-cyan-100/75">Выбранная активность</p><p className="mt-1 text-xl font-semibold">{session.activity}</p><p className="mt-5 text-sm leading-relaxed text-cyan-950/70 dark:text-cyan-50/75">Телефон может подождать. Это время принадлежит тебе.</p></div><p className="mt-5 text-center text-sm text-cyan-950/60 dark:text-cyan-50/65">Запланировано: {formatMinutes(session.plannedDurationMinutes)}</p></div><div className="mt-auto flex gap-2 pt-8"><button onClick={leaveSession} className="glass-danger flex flex-1 items-center justify-center gap-2"><RotateCcw size={16}/> Сбросить</button><button onClick={leaveSession} className="glass-danger flex flex-1 items-center justify-center gap-2"><X size={16}/> Выйти</button></div><p className="mt-3 text-center text-xs text-cyan-950/55 dark:text-cyan-50/60">В браузере вкладка останется открытой — текущий детокс будет отменён.</p></section>;
}
