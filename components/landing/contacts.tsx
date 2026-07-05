"use client";

import { MapPin, Phone, Clock, Camera, MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { FadeIn } from "./motion-wrapper";

const contactItems = [
  {
    icon: MapPin,
    label: "Адрес",
    value: "г. Москва, ул. Тверская, 12",
    href: "https://maps.google.com",
  },
  {
    icon: Phone,
    label: "Телефон",
    value: "+7 (495) 123-45-67",
    href: "tel:+74951234567",
  },
  {
    icon: Clock,
    label: "Режим работы",
    value: "Пн–Вс: 10:00 – 21:00",
    href: null,
  },
];

export function Contacts() {
  return (
    <section id="contacts" className="bg-esperanza-charcoal py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-esperanza-pink">
                Контакты
              </p>
              <h2 className="font-heading text-3xl font-light md:text-4xl lg:text-5xl">
                Ждём вас в гости
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
                Студия красоты «Эсперанза» — место, где забота о вас стоит на
                первом месте. Приходите за красотой и оставайтесь за атмосферой.
              </p>

              <div className="mt-10 space-y-6">
                {contactItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-esperanza-rose/20 text-esperanza-pink">
                      <item.icon className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/40">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="mt-1 text-sm text-white/90 transition-colors hover:text-esperanza-pink"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm text-white/90">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-esperanza-pink hover:text-esperanza-pink"
                  aria-label="Instagram"
                >
                  <Camera className="size-4" />
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-esperanza-pink hover:text-esperanza-pink"
                  aria-label="Telegram"
                >
                  <MessageCircle className="size-4" />
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
              <iframe
                title="Карта — студия красоты Эсперанза"
                src="https://www.openstreetmap.org/export/embed.html?bbox=37.595%2C55.755%2C37.625%2C55.770&layer=mapnik&marker=55.762%2C37.610"
                className="h-72 w-full border-0 sm:h-80 lg:h-full lg:min-h-[360px]"
                loading="lazy"
              />
            </div>
          </div>
        </FadeIn>

        <Separator className="my-12 bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-white/40 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Студия красоты «Эсперанза». Все права защищены.</p>
          <p>Политика конфиденциальности</p>
        </div>
      </div>
    </section>
  );
}
