import { Typography } from "@/components/ui/typography";
import { Baby, ShoppingBasket } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BasketItem } from "@/pages";
import { Basket } from "@/components/basket";
import { Button } from "@/components/ui/button";

type NavbarProps = {
  basket: Map<number, BasketItem>;
  addBasket: (item: BasketItem) => void;
  deleteBasket: (item: BasketItem) => void;
};

export const Navbar = ({ basket, addBasket, deleteBasket }: NavbarProps) => {
  let totalPrice = 0;
  Array.from(basket.values()).map(
    (item) => (totalPrice += Number(item.price) * item.quantity),
  );
  return (
    <header className="bg-secondBackground flex flex-row items-center px-7 py-2.5">
      <Typography variant="h1" className="w-full text-center">
        The shopping store
      </Typography>

      <Sheet>
        <SheetTrigger className="flex items-center">
          <ShoppingBasket />
        </SheetTrigger>
        <SheetContent className="flex flex-col justify-between">
          <SheetHeader className="h-5/6">
            <SheetTitle className="border-accent flex justify-center border-b-2 pb-4">
              Panier
            </SheetTitle>
            <Basket
              basket={basket}
              addBasket={addBasket}
              deleteBasket={deleteBasket}
            ></Basket>
          </SheetHeader>
          <SheetFooter>
            {basket.size !== 0 && (
              <div className="w-full">
                <div className="flex justify-between text-lg font-semibold">
                  <div>Total</div>
                  <div>{totalPrice.toFixed(2)}€</div>
                </div>
                <Button className="hover:bg-accent my-4 w-full rounded">
                  Payer
                </Button>
              </div>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </header>
  );
};
