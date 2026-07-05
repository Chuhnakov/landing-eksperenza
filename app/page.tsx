import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Services } from "@/components/landing/services";
import { Masters } from "@/components/landing/masters";
import { Gallery } from "@/components/landing/gallery";
import { Reviews } from "@/components/landing/reviews";
import { BookingForm } from "@/components/landing/booking-form";
import { Contacts } from "@/components/landing/contacts";
import { FloatingCta } from "@/components/landing/floating-cta";
import { getSiteImages } from "@/lib/get-site-images";

export default function Home() {
  const { heroImage, galleryImages } = getSiteImages();

  return (
    <>
      <Header />
      <main className="overflow-x-hidden pb-24">
        <Hero heroImage={heroImage} />
        <Services />
        <Masters />
        <Gallery images={galleryImages} />
        <Reviews />
        <BookingForm />
        <Contacts />
      </main>
      <FloatingCta />
    </>
  );
}
