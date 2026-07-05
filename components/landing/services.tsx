"use client";

import { Scissors, Sparkles, Hand, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "./section-heading";
import { StaggerContainer, StaggerItem } from "./motion-wrapper";

const services = [
  {
    icon: Hand,
    title: "Маникюр & Педикюр",
    description:
      "Классический, аппаратный и комбинированный уход. Покрытие гель-лаком премиум-брендов.",
    price: "от 1 800 ₽",
    tag: "Хит",
  },
  {
    icon: Sparkles,
    title: "Уход за кожей",
    description:
      "Профессиональные процедуры для сияния и здоровья кожи лица и тела.",
    price: "от 3 500 ₽",
    tag: null,
  },
  {
    icon: Scissors,
    title: "Стрижки & Укладки",
    description:
      "Стильные образы от наших стилистов — от повседневной элегантности до вечернего glam.",
    price: "от 2 200 ₽",
    tag: null,
  },
  {
    icon: Heart,
    title: "Брови & Ресницы",
    description:
      "Архитектура бровей, ламинирование, наращивание ресниц — взгляд, который говорит.",
    price: "от 1 500 ₽",
    tag: "Новинка",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-marble-texture py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Услуги"
          title="Забота о вашей красоте"
          description="Каждая процедура — это ритуал. Мы используем только проверенные бренды и создаём атмосферу, в которой хочется оставаться."
        />

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <Card className="group h-full border border-esperanza-pink/30 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
                <CardHeader>
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-esperanza-pink/20 text-esperanza-rose transition-colors group-hover:bg-esperanza-rose group-hover:text-white">
                      <service.icon className="size-5" />
                    </div>
                    {service.tag && (
                      <Badge className="border-none bg-esperanza-purple/10 text-esperanza-purple">
                        {service.tag}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="font-heading text-lg font-normal text-esperanza-charcoal">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="text-sm leading-relaxed text-esperanza-charcoal/60">
                    {service.description}
                  </p>
                  <p className="mt-auto font-medium text-esperanza-gold">{service.price}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
