import { cn } from "@/lib/utils";

export function SectionHeading({
  label,
  title,
  description,
  className,
  align = "center",
}: {
  label: string;
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "mx-auto max-w-2xl text-center",
        align === "left" && "max-w-xl text-left",
        className
      )}
    >
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-esperanza-rose">
        {label}
      </p>
      <h2 className="font-heading text-3xl font-light tracking-tight text-esperanza-charcoal md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-esperanza-charcoal/65 md:text-lg">
          {description}
        </p>
      )}
      <div
        className={cn(
          "mt-6 h-px w-16 bg-gradient-to-r from-esperanza-gold to-esperanza-pink",
          align === "center" && "mx-auto"
        )}
      />
    </div>
  );
}
