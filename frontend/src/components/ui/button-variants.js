import { cva } from "class-variance-authority";

export const buttonVariants = cva("inline-flex items-center ...", {
  variants: {
    variant: { default: "bg-primary ...", destructive: "..." },
    size: { default: "h-9 px-4 py-2", sm: "...", lg: "...", icon: "size-9" },
  },
  defaultVariants: { variant: "default", size: "default" },
});
