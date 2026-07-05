"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CtaLink } from "./cta-link";

const navLinks = [
  { href: "#services", label: "Услуги" },
  { href: "#masters", label: "Мастера" },
  { href: "#gallery", label: "Галерея" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#booking", label: "Запись" },
  { href: "#contacts", label: "Контакты" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-esperanza-pink/10 bg-esperanza-cream/90 shadow-soft backdrop-blur-md"
          : "bg-esperanza-cream/80 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <a href="#" className="group flex flex-col leading-none">
          <span className="font-heading text-xl font-light tracking-wide text-esperanza-charcoal sm:text-2xl">
            Эсперанза
          </span>
          <span className="mt-0.5 text-[10px] uppercase tracking-[0.3em] text-esperanza-rose/80">
            студия красоты
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-esperanza-charcoal/70 transition-colors hover:text-esperanza-rose"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <CtaLink
            href="#booking"
            className="rounded-full bg-esperanza-rose px-6 text-white hover:bg-esperanza-rose/90"
          >
            Записаться
          </CtaLink>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full text-esperanza-charcoal lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-esperanza-pink/10 bg-esperanza-cream px-4 py-6 lg:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base text-esperanza-charcoal/80 transition-colors hover:text-esperanza-rose"
              >
                {link.label}
              </a>
            ))}
            <CtaLink
              href="#booking"
              onClick={() => setMobileOpen(false)}
              className="mt-2 w-full justify-center rounded-full bg-esperanza-rose py-3 text-white hover:bg-esperanza-rose/90"
            >
              Записаться
            </CtaLink>
          </nav>
        </div>
      )}
    </header>
  );
}
