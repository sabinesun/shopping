import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Toaster } from "@/components/ui/toaster";
import { BasketItem } from "@/pages";

export default function Layout({
  children,
  basket,
  addBasket,
  deleteBasket,
}: {
  readonly children: React.ReactNode;
  readonly basket: Map<number, BasketItem>;
  readonly addBasket: (item: BasketItem) => void;
  readonly deleteBasket: (item: BasketItem) => void;
}) {
  return (
    <>
      <Navbar
        basket={basket}
        addBasket={addBasket}
        deleteBasket={deleteBasket}
      />
      <main>{children}</main>
      <Toaster />
      <Footer />
    </>
  );
}
