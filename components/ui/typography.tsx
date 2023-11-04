import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-3xl uppercase font-archivo font-bold",
      h2: "text-2xl uppercase font-archivo font-semibold",
      h3: "text-xl uppercase font-archivo font-medium",
    },
  },
});

export type TypographyProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof typographyVariants> & {};

const Typography = ({ className, variant, ...props }: TypographyProps) => {
  return (
    <div
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  );
};

export { Typography, typographyVariants };
