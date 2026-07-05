"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { SiteImage } from "@/lib/get-site-images";
import { SectionHeading } from "./section-heading";
import { FadeIn } from "./motion-wrapper";

export function Gallery({ images }: { images: SiteImage[] }) {
  return (
    <section id="gallery" className="bg-esperanza-marble py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Галерея"
          title="Пространство красоты"
          description="Светлые тона, мягкие акценты и продуманная каждая деталь — именно так мы создаём атмосферу, в которую хочется возвращаться."
        />

        {images.length === 0 ? (
          <p className="text-center text-sm text-esperanza-charcoal/50">
            Фото скоро появятся
          </p>
        ) : (
          <FadeIn>
            <Carousel
              opts={{ align: "start", loop: true }}
              className="mx-auto max-w-6xl px-12"
            >
              <CarouselContent className="-ml-3 md:-ml-4">
                {images.map((item) => (
                  <CarouselItem
                    key={item.src}
                    className="basis-[85%] pl-3 sm:basis-1/2 md:pl-4 lg:basis-1/3"
                  >
                    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-esperanza-pink/20">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={600}
                        height={750}
                        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                        className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-esperanza-charcoal/70 to-transparent px-4 py-3">
                        {item.caption && (
                          <p className="text-sm font-medium text-white">
                            {item.caption}
                          </p>
                        )}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 border-esperanza-pink/30 bg-white shadow-soft hover:bg-esperanza-pink/10" />
              <CarouselNext className="right-0 border-esperanza-pink/30 bg-white shadow-soft hover:bg-esperanza-pink/10" />
            </Carousel>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
