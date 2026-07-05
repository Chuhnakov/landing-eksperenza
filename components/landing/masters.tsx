"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import { StaggerContainer, StaggerItem } from "./motion-wrapper";

const masters = [
  {
    name: "Анна Волкова",
    role: "Топ-мастер маникюра",
    experience: "6 лет",
    initials: "АВ",
    specialty: "Nail-art, японский маникюр",
  },
  {
    name: "Мария Соколова",
    role: "Косметолог",
    experience: "8 лет",
    initials: "МС",
    specialty: "Аппаратная косметология",
  },
  {
    name: "Елена Кузнецова",
    role: "Стилист",
    experience: "5 лет",
    initials: "ЕК",
    specialty: "Стрижки, окрашивание",
  },
  {
    name: "София Морозова",
    role: "Lash & Brow artist",
    experience: "4 года",
    initials: "СМ",
    specialty: "Ламинирование, наращивание",
  },
];

export function Masters() {
  return (
    <section id="masters" className="bg-esperanza-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Мастера"
          title="Команда профессионалов"
          description="Наши специалисты постоянно повышают квалификацию и следят за мировыми трендами индустрии красоты."
        />

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {masters.map((master) => (
            <StaggerItem key={master.name}>
              <Card className="group overflow-hidden border border-esperanza-pink/30 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <Avatar className="mx-auto mb-4 size-24 border-2 border-esperanza-pink/30 ring-4 ring-esperanza-pink/10">
                    <AvatarFallback className="bg-gradient-to-br from-esperanza-pink to-esperanza-rose text-xl font-light text-white">
                      {master.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-heading text-xl font-normal text-esperanza-charcoal">
                    {master.name}
                  </h3>
                  <p className="mt-1 text-sm text-esperanza-rose">{master.role}</p>
                  <p className="mt-3 text-xs leading-relaxed text-esperanza-charcoal/55">
                    {master.specialty}
                  </p>
                  <p className="mt-4 text-xs font-medium uppercase tracking-wider text-esperanza-gold">
                    Опыт · {master.experience}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
