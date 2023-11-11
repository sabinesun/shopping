import { useContext } from "react";
import { BasketContext } from "@/context/basket-context";
import { ChevronRight } from "lucide-react";
import { CheckoutProductCard } from "@/components/checkout-product-card";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Truck, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <div className="m-2 flex items-center justify-center text-xs text-muted">
          <div className={" flex items-center"}>
            <Link href="/checkout/information">
              <div className="uppercase">Information</div>
            </Link>
            <ChevronRight strokeWidth={1} width={16} />
          </div>
          <div className={"flex items-center text-accent"}>
            <div className="uppercase">Collect</div>
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
              Récapitulatif
            </Typography>
            <div className="rounded border p-4">
              <div className="flex justify-between">
                <div className="font-archivo text-sm text-muted">Contact</div>
                <Link
                  href="/checkout/information"
                  className="font-archivo text-xs"
                >
                  Changement
                </Link>
              </div>
              <div className="border-b pb-2">email</div>
              <div className="flex justify-between pt-2">
                <div className="font-archivo text-sm text-muted">
                  Venir le chercher le
                </div>
                <Link
                  href="/checkout/information"
                  className="font-archivo text-xs"
                >
                  Changement
                </Link>
              </div>
              <div>date</div>
            </div>
            <Typography variant="h3" className="py-4">
              Mode de livraison
            </Typography>
            <div className=" space-y-4 rounded border p-4">
              <RadioGroup defaultValue="option-one">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label
                      htmlFor="option-one"
                      className="mx-2 flex w-full justify-between font-archivo"
                    >
                      <div className="flex items-center">
                        <ShoppingBag className="mr-2" />
                        <div>Click & Collect</div>
                      </div>
                      <div className="flex items-center">Offert</div>
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem
                      value="option-two"
                      id="option-two"
                      disabled={true}
                    />
                    <Label
                      htmlFor="option-two"
                      className="mx-2 flex w-full justify-between font-archivo"
                    >
                      <div className="flex items-center">
                        <Truck className="mr-2" />
                        <div
                          className="text-muted line-through
"
                        >
                          Livraison domicile offerte
                        </div>
                      </div>
                      <div className="flex items-center text-muted">
                        Bientôt disponible
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            <Button type="submit" className="mt-10 w-full rounded uppercase">
              Valider le panier
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
