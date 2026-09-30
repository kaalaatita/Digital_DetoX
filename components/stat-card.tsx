export function StatCard({ value, label }: { value: string | number; label: string }) {
  return <div className="surface p-4"><p className="text-2xl font-semibold text-[#244231] dark:text-[#e6f3e9]">{value}</p><p className="mt-1 text-sm text-[#65756b] dark:text-[#a6b5aa]">{label}</p></div>;
}
