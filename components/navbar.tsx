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
  Array.from(basket.products.values()).map(
    (item) => (totalPrice += Number(item.price) * item.quantity),
  );

  const checkoutPath = [
    "/checkout/shipping",
    "/checkout/information",
    "/checkout/payment",
  ];

  return (
    <header className="flex flex-row items-center bg-secondBackground px-7 py-2.5">
      <Link href="/" className="w-full text-center">
        <Typography variant="h1">The shopping store</Typography>
      </Link>
      {!checkoutPath.includes(router.pathname) && (
        <Sheet>
          <SheetTrigger className="flex items-center">
            <ShoppingBasket />
          </SheetTrigger>
          <SheetContent className="flex flex-col justify-between">
            <SheetHeader className="h-5/6">
              <SheetTitle className="flex justify-center border-b-2 border-accent pb-4">
                Panier
              </SheetTitle>
              <Basket deleteBasket={deleteBasket}></Basket>
            </SheetHeader>
            <SheetFooter>
              {basket.products.size !== 0 && (
                <div className="w-full">
                  <div className="flex justify-between text-lg font-semibold">
                    <div>Total</div>
                    <div>{totalPrice.toFixed(2)}€</div>
                  </div>
                  <SheetClose asChild className="w-full">
                    <Link href="/checkout/information">
                      <Button className="my-4 w-full rounded hover:bg-accent">
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
