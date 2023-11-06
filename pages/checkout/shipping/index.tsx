import { useContext } from "react";
import { BasketContext } from "@/context/basket-context";
import { ChevronRight } from "lucide-react";
import { CheckoutProductCard } from "@/components/checkout-product-card";
import { Typography } from "@/components/ui/typography";
import { CheckoutForms } from "@/components/checkout-forms";

export default function Shipping() {
  const basket = useContext(BasketContext);
  if (basket === undefined) {
    throw new Error();
  }

  let totalPrice = 0;
  Array.from(basket.products.values()).map(
    (item) => (totalPrice += Number(item.price) * item.quantity),
  );

  return (
    <div className="flex w-full justify-center">
      <div className="p-4 sm:flex sm:w-2/3 sm:flex-col ">
        <div className="text-muted m-2 flex items-center justify-center text-xs">
          <div className={"flex items-center"}>
            <div className="uppercase">Information</div>
            <ChevronRight strokeWidth={1} width={16} />
          </div>
          <div className={" text-accent flex items-center"}>
            <div className="uppercase">Expédition</div>
            <ChevronRight strokeWidth={1} width={16} />
          </div>
          <div className={"flex items-center uppercase"}>Paiement</div>
        </div>
      </div>
    </div>
  );
}
