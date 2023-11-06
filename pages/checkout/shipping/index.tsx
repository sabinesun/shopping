import { useContext } from "react";
import { BasketContext } from "@/context/basket-context";
import { ChevronRight } from "lucide-react";
import { CheckoutProductCard } from "@/components/checkout-product-card";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Truck } from "lucide-react";
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
        <div className="text-muted m-2 flex items-center justify-center text-xs">
          <div className={" flex items-center"}>
            <div className="uppercase">Information</div>
            <ChevronRight strokeWidth={1} width={16} />
          </div>
          <div className={"text-accent flex items-center"}>
            <div className="uppercase">Expédition</div>
            <ChevronRight strokeWidth={1} width={16} />
          </div>
          <div className={"flex items-center uppercase"}>Paiement</div>
        </div>

        <div className="flex flex-col sm:flex-row-reverse sm:justify-around sm:gap-28">
          <div className="flex flex-col">
            <div className="border-primary flex flex-col gap-2 border-b py-6">
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
                <div className="text-muted font-archivo text-sm">Contact</div>
                <Link
                  href="/checkout/information"
                  className="font-archivo text-xs"
                >
                  Changement
                </Link>
              </div>
              <div className="border-b pb-2">email</div>
              <div className="flex justify-between pt-2">
                <div className="text-muted font-archivo text-sm">Envoyez à</div>
                <Link
                  href="/checkout/information"
                  className="font-archivo text-xs"
                >
                  Changement
                </Link>
              </div>
              <div>adresse</div>
            </div>
            <Typography variant="h3" className="py-4">
              Mode de livraison
            </Typography>
            <div className="rounded border p-4">
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label
                    htmlFor="option-one"
                    className=" font-archivo flex w-full justify-between"
                  >
                    <div className="flex items-center">
                      <Truck className="mr-2" />
                      <div className="text-muted">
                        Livraison domicile offerte
                      </div>
                    </div>
                    <div className="flex items-center">Offert</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <Link href="/checkout/payment" className=" mt-10 w-full ">
              <Button type="submit" className="w-full rounded uppercase">
                Continuer vers l'expédition
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
