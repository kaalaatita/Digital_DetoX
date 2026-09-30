"use client";

import { useEffect, useState } from "react";
import { Bell, Moon, Settings } from "lucide-react";

export default function SettingsPage() {
  const [dark, setDark] = useState(false);
  const [notifications, setNotifications] = useState<NotificationPermission | "unsupported">("default");
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setNotifications("Notification" in window ? Notification.permission : "unsupported");
  }, []);
  const toggleTheme = () => { const next = !dark; setDark(next); document.documentElement.classList.toggle("dark", next); localStorage.setItem("detox.theme", next ? "dark" : "light"); };
  const enableNotifications = async () => { if ("Notification" in window) setNotifications(await Notification.requestPermission()); };
  return <section className="animate-[fade_.35s_ease-out]"><div className="mb-9 flex items-center gap-3 text-[#55755f] dark:text-[#b9d3be]"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#e1ebdf] dark:bg-[#294033]"><Settings size={21}/></span><span className="text-sm font-semibold tracking-wide">НАСТРОЙКИ</span></div><h1 className="text-4xl font-semibold tracking-[-.04em]">Настроить спокойно</h1><div className="mt-8 space-y-3"><div className="surface flex items-center justify-between gap-4"><div><p className="font-semibold">Тёмная тема</p><p className="mt-1 text-sm text-[#65756b] dark:text-[#a6b5aa]">Комфортнее вечером</p></div><button aria-label="Переключить тёмную тему" onClick={toggleTheme} className={`grid h-11 w-11 place-items-center rounded-2xl ${dark ? "bg-[#315a41] text-white" : "bg-[#e8f0e6] text-[#315a41] dark:bg-[#294033] dark:text-[#b9d3be]"}`}><Moon size={19}/></button></div><div className="surface"><div className="flex items-center gap-3"><Bell className="text-[#55755f] dark:text-[#b9d3be]" size={21}/><div><p className="font-semibold">Уведомление о завершении</p><p className="mt-1 text-sm leading-relaxed text-[#65756b] dark:text-[#a6b5aa]">Только одно — когда сессия закончится.</p></div></div>{notifications === "granted" ? <p className="mt-4 text-sm font-medium text-[#315a41] dark:text-[#b9d3be]">Уведомления включены</p> : notifications === "unsupported" ? <p className="mt-4 text-sm text-[#65756b] dark:text-[#a6b5aa]">В этом браузере уведомления недоступны.</p> : <button onClick={enableNotifications} className="quiet-button mt-3 -ml-3">Включить уведомление</button>}</div></div><p className="mt-8 text-sm leading-relaxed text-[#718078] dark:text-[#91a198]">Браузер может не доставить уведомление, если приложение полностью закрыто. При следующем открытии результат сессии всё равно сохранится.</p></section>;
}
