import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Toaster } from "@/components/ui/toaster";
import { BasketItem } from "@/pages/_app";

export default function Layout({
  children,
  basket,
  deleteBasket,
}: {
  readonly children: React.ReactNode;
  readonly basket: Map<number, BasketItem>;
  readonly deleteBasket: (item: BasketItem) => void;
}) {
  return (
    <>
      <Navbar basket={basket} deleteBasket={deleteBasket} />
      <main>{children}</main>
      <Toaster />
      <Footer />
    </>
  );
}
