import { Typography } from "@/components/ui/typography";
import { ShoppingBasket } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Navbar = () => {
  return (
    <header className="bg-secondBackground flex flex-row items-center px-7 py-2.5">
      <Typography variant="h1" className="w-full text-center">
        The shopping store
      </Typography>
      <Sheet>
        <SheetTrigger className="flex items-center">
          <ShoppingBasket />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="h-full">
            <SheetTitle className="border-accent flex justify-center border-b-2 pb-4">
              Panier
            </SheetTitle>
            <SheetDescription className="flex h-full items-center justify-center">
              Votre panier est vide.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
};
