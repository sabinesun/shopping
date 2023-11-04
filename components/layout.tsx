import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Toaster } from "@/components/ui/toaster";
import { BasketItem } from "@/pages/_app";

export default function Layout({
  children,
  deleteBasket,
}: {
  readonly children: React.ReactNode;
  readonly deleteBasket: (item: BasketItem) => void;
}) {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Navbar deleteBasket={deleteBasket} />
      <main>{children}</main>
      <Toaster />
      <Footer />
    </div>
  );
}
