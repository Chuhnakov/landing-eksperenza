"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";
import { CtaLink } from "./cta-link";

export function Hero({ heroImage }: { heroImage: string | null }) {
  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden bg-esperanza-cream pt-20">
      <div className="pointer-events-none absolute -right-32 -top-32 size-[500px] rounded-full bg-esperanza-purple/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 size-[400px] rounded-full bg-esperanza-pink/20 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-esperanza-gold/30 bg-white/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-esperanza-gold backdrop-blur-sm">
            <Sparkles className="size-3.5" />
            Премиум студия красоты
          </div>

          <h1 className="font-heading text-4xl font-light leading-[1.15] tracking-tight text-esperanza-charcoal sm:text-5xl lg:text-6xl">
            Красота, которая{" "}
            <span className="bg-gradient-to-r from-esperanza-rose to-esperanza-purple bg-clip-text text-transparent">
              вдохновляет
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-esperanza-charcoal/65 sm:text-lg">
            Студия «Эсперанза» — пространство нежности и безупречного сервиса.
            Маникюр, уход за кожей и образы, созданные с любовью к деталям.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <CtaLink
              href="#booking"
              className="h-14 rounded-full bg-esperanza-rose px-10 text-base font-medium text-white shadow-soft hover:bg-esperanza-rose/90"
            >
              Записаться
            </CtaLink>
            <CtaLink
              href="#services"
              variant="outline"
              className="h-14 rounded-full border-esperanza-pink/40 px-8 text-base text-esperanza-charcoal hover:bg-esperanza-pink/10"
            >
              Наши услуги
            </CtaLink>
          </div>

          <div className="mt-12 flex flex-wrap gap-8 border-t border-esperanza-pink/15 pt-8">
            {[
              { value: "8+", label: "лет опыта" },
              { value: "12", label: "мастеров" },
              { value: "4.9", label: "рейтинг" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-2xl text-esperanza-gold">{stat.value}</p>
                <p className="text-sm text-esperanza-charcoal/55">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-esperanza-purple/20 via-esperanza-pink/10 to-esperanza-gold/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] shadow-soft ring-1 ring-esperanza-pink/20">
            {heroImage ? (
              <Image
                src={heroImage}
                alt="Интерьер студии красоты Эсперанза"
                width={800}
                height={900}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[4/5] w-full object-cover"
                priority
              />
            ) : (
              <div className="flex aspect-[4/5] w-full items-center justify-center bg-marble-texture">
                <p className="font-heading text-lg text-esperanza-charcoal/40">
                  Эсперанза
                </p>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-esperanza-charcoal/20 to-transparent" />
          </div>
          <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white/90 px-5 py-4 shadow-soft backdrop-blur-sm sm:-bottom-6 sm:-left-6">
            <p className="font-heading text-lg text-esperanza-charcoal">Эсперанза</p>
            <p className="text-xs text-esperanza-rose">студия красоты</p>
          </div>
        </div>
      </div>
    </section>
  );
}
