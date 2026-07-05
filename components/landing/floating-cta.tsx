import { CalendarDays } from "lucide-react";

export function FloatingCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999] flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2">
      <a
        href="#booking"
        className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#d946ef] px-8 text-base font-medium text-white shadow-[0_4px_24px_rgba(217,70,239,0.45)] active:scale-[0.98]"
      >
        <CalendarDays className="size-5 shrink-0" aria-hidden />
        Записаться
      </a>
    </div>
  );
}
