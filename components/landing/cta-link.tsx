import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";

type CtaLinkProps = ComponentProps<"a"> &
  VariantProps<typeof buttonVariants> & {
    href: string;
  };

/** Ссылка-кнопка — работает без JS, в отличие от shadcn Button + render */
export function CtaLink({
  href,
  variant,
  size,
  className,
  children,
  ...props
}: CtaLinkProps) {
  return (
    <a
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </a>
  );
}
