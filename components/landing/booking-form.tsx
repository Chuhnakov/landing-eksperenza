"use client";

import { useState } from "react";
import { Calendar, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import { FadeIn } from "./motion-wrapper";

const serviceOptions = [
  "Маникюр & Педикюр",
  "Уход за кожей",
  "Стрижки & Укладки",
  "Брови & Ресницы",
];

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="booking" className="bg-marble-texture py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Запись"
          title="Забронируйте визит"
          description="Оставьте заявку — администратор свяжется с вами в течение 15 минут для подтверждения времени."
        />

        <FadeIn className="mx-auto max-w-xl">
          <Card className="border border-esperanza-pink/30 bg-white shadow-soft backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <CheckCircle2 className="mb-4 size-12 text-esperanza-rose" />
                  <h3 className="font-heading text-2xl text-esperanza-charcoal">
                    Заявка отправлена!
                  </h3>
                  <p className="mt-2 text-sm text-esperanza-charcoal/60">
                    Мы скоро свяжемся с вами для подтверждения записи.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-esperanza-charcoal"
                    >
                      Ваше имя
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Анна"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-sm font-medium text-esperanza-charcoal"
                    >
                      Телефон
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+7 (999) 000-00-00"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="mb-1.5 block text-sm font-medium text-esperanza-charcoal"
                    >
                      Услуга
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      className="input-field"
                    >
                      <option value="">Выберите услугу</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="date"
                      className="mb-1.5 block text-sm font-medium text-esperanza-charcoal"
                    >
                      Желаемая дата
                    </label>
                    <div className="relative">
                      <Calendar className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-esperanza-rose/60" />
                      <input
                        id="date"
                        name="date"
                        type="date"
                        className="input-field pl-11"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="comment"
                      className="mb-1.5 block text-sm font-medium text-esperanza-charcoal"
                    >
                      Комментарий
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      rows={3}
                      placeholder="Пожелания или вопросы..."
                      className="input-field resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="h-12 w-full rounded-full bg-esperanza-rose text-base font-medium text-white transition-colors hover:bg-esperanza-rose/90"
                  >
                    Отправить заявку
                  </button>
                </form>
              )}
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}
