"use client";

import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SectionHeading } from "./section-heading";
import { StaggerContainer, StaggerItem } from "./motion-wrapper";

const reviews = [
  {
    name: "Кристина Л.",
    initials: "КЛ",
    text: "Лучший маникюр в городе! Атмосфера невероятная — как в дорогом spa. Мастера внимательные, результат держится три недели.",
    rating: 5,
    service: "Маникюр",
  },
  {
    name: "Ольга П.",
    initials: "ОП",
    text: "Пришла на уход за лицом и осталась в восторге. Кожа сияет, а процедура прошла в полной расслабленности. Обязательно вернусь!",
    rating: 5,
    service: "Косметология",
  },
  {
    name: "Дарья М.",
    initials: "ДМ",
    text: "Эсперанза — моя находка года. Стильный интерьер, приятный кофе и безупречный сервис. Рекомендую всем подругам.",
    rating: 5,
    service: "Стрижка",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="size-4 fill-esperanza-gold text-esperanza-gold" />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="bg-esperanza-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Отзывы"
          title="Что говорят наши гости"
          description="Более 500 довольных клиентов доверяют нам свою красоту каждый месяц."
        />

        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <StaggerItem key={review.name}>
              <Card className="h-full border border-esperanza-pink/30 bg-white shadow-soft">
                <CardContent className="flex h-full flex-col p-6">
                  <Stars count={review.rating} />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-esperanza-charcoal/70">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-esperanza-pink/10 pt-5">
                    <Avatar className="size-10">
                      <AvatarFallback className="bg-esperanza-pink/30 text-xs text-esperanza-rose">
                        {review.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-esperanza-charcoal">
                        {review.name}
                      </p>
                      <p className="text-xs text-esperanza-charcoal/50">{review.service}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
