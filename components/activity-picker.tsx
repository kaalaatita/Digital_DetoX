"use client";

import { ACTIVITIES } from "@/lib/types";

export function ActivityPicker({ value, onChange }: { value: string; onChange: (activity: string) => void }) {
  const own = value && !ACTIVITIES.includes(value as (typeof ACTIVITIES)[number]);
  return <div className="grid gap-2">{ACTIVITIES.map((activity) => <button key={activity} onClick={() => onChange(activity)} className={`choice ${value === activity ? "choice-selected" : ""}`}><span>{activity}</span>{value === activity && <span>✓</span>}</button>)}<label className={`choice ${own ? "choice-selected" : ""}`}><span>Своя цель</span><input aria-label="Своя цель" placeholder="Например, рисование" value={own ? value : ""} onChange={(event) => onChange(event.target.value)} className="w-40 bg-transparent text-right text-sm outline-none placeholder:text-[#91a198]" /></label></div>;
}
