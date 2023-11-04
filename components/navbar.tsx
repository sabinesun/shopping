import { Typography } from "@/components/ui/typography";
import { ShoppingBasket } from "lucide-react";
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
import { Basket } from "@/components/basket";
import { Button } from "@/components/ui/button";
import { BasketItem } from "@/pages/_app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { BasketContext } from "@/context/basket-context";

type NavbarProps = {
  deleteBasket: (item: BasketItem) => void;
};

export const Navbar = ({ deleteBasket }: NavbarProps) => {
  const basket = useContext(BasketContext);
  const router = useRouter();

  if (basket === undefined) {
    throw new Error();
  }

  let totalPrice = 0;
  Array.from(basket.basket.values()).map(
    (item) => (totalPrice += Number(item.price) * item.quantity),
  );
  return (
    <header className="bg-secondBackground flex flex-row items-center px-7 py-2.5">
      <Typography variant="h1" className="w-full text-center">
        The shopping store
      </Typography>
      {router.pathname !== "/checkout" && (
        <Sheet>
          <SheetTrigger className="flex items-center">
            <ShoppingBasket />
          </SheetTrigger>
          <SheetContent className="flex flex-col justify-between">
            <SheetHeader className="h-5/6">
              <SheetTitle className="border-accent flex justify-center border-b-2 pb-4">
                Panier
              </SheetTitle>
              <Basket deleteBasket={deleteBasket}></Basket>
            </SheetHeader>
            <SheetFooter>
              {basket.basket.size !== 0 && (
                <div className="w-full">
                  <div className="flex justify-between text-lg font-semibold">
                    <div>Total</div>
                    <div>{totalPrice.toFixed(2)}€</div>
                  </div>
                  <SheetClose asChild className="w-full">
                    <Link href="/checkout">
                      <Button className="hover:bg-accent my-4 w-full rounded">
                        Payer
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </header>
  );
};
