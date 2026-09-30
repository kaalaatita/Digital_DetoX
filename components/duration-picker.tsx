"use client";

const presets = [30, 60, 90, 120];
export function DurationPicker({ value, onChange }: { value: number | null; onChange: (value: number | null) => void }) {
  return <div className="grid grid-cols-2 gap-3">{presets.map((minutes) => <button key={minutes} onClick={() => onChange(minutes)} className={`choice ${value === minutes ? "choice-selected" : ""}`}><span>{minutes} минут</span>{value === minutes && <span>✓</span>}</button>)}<label className={`choice col-span-2 ${value && !presets.includes(value) ? "choice-selected" : ""}`}><span>Своё время</span><input aria-label="Своё время в минутах" type="number" min="5" max="480" placeholder="минут" value={value && !presets.includes(value) ? value : ""} onChange={(event) => { const next = Number(event.target.value); onChange(next >= 5 && next <= 480 ? next : null); }} className="w-24 bg-transparent text-right outline-none placeholder:text-[#91a198]" /></label></div>;
}
