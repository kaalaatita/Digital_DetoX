"use client";

import { useEffect, useState } from "react";
import { formatTime } from "@/lib/format";

export function Timer({ endAt, onEnd }: { endAt: string; onEnd: () => void }) {
  const getRemaining = () => new Date(endAt).getTime() - Date.now();
  const [remaining, setRemaining] = useState(getRemaining);
  useEffect(() => {
    const tick = () => { const next = getRemaining(); setRemaining(next); if (next <= 0) onEnd(); };
    tick();
    const interval = window.setInterval(tick, 1000);
    document.addEventListener("visibilitychange", tick);
    return () => { window.clearInterval(interval); document.removeEventListener("visibilitychange", tick); };
  }, [endAt, onEnd]);
  return <time className="block text-center text-6xl font-light tracking-[-.08em] tabular-nums text-[#244231] dark:text-[#e6f3e9] sm:text-7xl">{formatTime(remaining)}</time>;
}
