"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { ActivityPicker } from "@/components/activity-picker";
import { DurationPicker } from "@/components/duration-picker";
import { sessionRepository } from "@/lib/session-repository";

export default function HomePage() {
  const router = useRouter();
  const [duration, setDuration] = useState<number | null>(null);
  const [activity, setActivity] = useState("");
  const [step, setStep] = useState<"duration" | "activity">("duration");
  useEffect(() => { if (sessionRepository.getActive()) router.replace("/session"); }, [router]);
  const start = () => { if (!duration || !activity.trim()) return; sessionRepository.start(duration, activity.trim()); router.push("/session"); };
  return <section className="animate-[fade_.35s_ease-out]"><div className="mb-10 flex items-center gap-3 text-[#55755f] dark:text-[#b9d3be]"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#e1ebdf] dark:bg-[#294033]"><Clock3 size={21}/></span><span className="text-sm font-semibold tracking-wide">ЦИФРОВОЙ ДЕТОКС</span></div>{step === "duration" ? <><h1 className="max-w-sm text-4xl font-semibold leading-tight tracking-[-.04em]">Сколько времени ты хочешь провести без телефона?</h1><p className="mt-4 text-base leading-relaxed text-[#65756b] dark:text-[#a6b5aa]">Выбери отрезок времени, который действительно можешь посвятить себе.</p><div className="mt-9"><DurationPicker value={duration} onChange={setDuration}/></div><button disabled={!duration} onClick={() => setStep("activity")} className="primary-button mt-7 flex items-center justify-center gap-2">Продолжить <ArrowRight size={19}/></button></> : <><button onClick={() => setStep("duration")} className="quiet-button -ml-3 mb-7 flex items-center gap-1"><ArrowLeft size={17}/> Назад</button><h1 className="text-4xl font-semibold leading-tight tracking-[-.04em]">Чем ты хочешь заняться?</h1><p className="mt-4 text-base leading-relaxed text-[#65756b] dark:text-[#a6b5aa]">Пусть это будет что-то вне экрана.</p><div className="mt-8"><ActivityPicker value={activity} onChange={setActivity}/></div><button disabled={!activity.trim()} onClick={start} className="primary-button mt-7">Начать детокс</button></>}</section>;
}
