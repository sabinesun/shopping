import { useContext, useState } from "react";
import { CheckoutProductCard } from "@/components/checkout-product-card";
import { BasketContext } from "@/context/basket-context";
import { Typography } from "@/components/ui/typography";
import { CheckoutForms } from "@/components/checkout-forms";

export default function Information() {
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
        <div className="m-2 flex items-center justify-center text-xs text-muted">
          <div className={"flex items-center text-accent"}>
            <div className="uppercase">Information</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row-reverse sm:justify-around sm:gap-28">
          <div className="flex flex-col">
            <div className="flex flex-col gap-2 border-b border-primary py-6">
              {Array.from(basket.products.values()).map((product) => (
                <CheckoutProductCard
                  key={product.id}
                  product={product}
                ></CheckoutProductCard>
              ))}
            </div>

            <div className="flex justify-between border-b py-6">
              <Typography variant="h3">Total</Typography>
              <div className="flex gap-4">
                <div>EUR</div>
                <Typography variant="h3"> {totalPrice.toFixed(2)}€</Typography>
              </div>
            </div>
          </div>

          <div className="flex flex-col py-6 sm:w-full">
            <Typography variant="h3" className="pb-4">
              Coordonnées
            </Typography>
            <CheckoutForms />
          </div>
        </div>
      </div>
    </div>
  );
}
