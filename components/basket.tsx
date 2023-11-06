import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BasketItem } from "@/pages/_app";
import { useContext } from "react";
import { BasketContext } from "@/context/basket-context";
import useSWR from "swr";
import { ProductData } from "@/pages/api/products";
import { fetcher } from "@/lib/fetcher";

type BasketProps = {
  deleteBasket: (item: BasketItem) => void;
};
export const Basket = ({ deleteBasket }: BasketProps) => {
  const { data } = useSWR<ProductData[]>("/api/products", fetcher);

  const basket = useContext(BasketContext);
  if (basket === undefined) {
    throw new Error();
  }

  if (basket.products.size === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        Votre panier est vide
      </div>
    );
  }

  const addProduct = (item: BasketItem) => {
    const totalQuantity = data?.find((product) => product.id == item.id)
      ?.inventory;
    const actualBasketQuantity = basket.products.get(item.id)?.quantity;
    if (totalQuantity !== undefined && actualBasketQuantity !== undefined) {
      if (totalQuantity > actualBasketQuantity) {
        basket?.addProduct(item);
      }
    }
  };

  const disabled = (item: BasketItem) => {
    const totalQuantity = data?.find((product) => product.id == item.id)
      ?.inventory;
    const actualBasketQuantity = basket.products.get(item.id)?.quantity;
    if (totalQuantity !== undefined && actualBasketQuantity !== undefined) {
      if (totalQuantity <= actualBasketQuantity) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <div className=" overflow-y-scroll">
      {Array.from(basket.products.values()).map((item) => (
        <div key={item.id} className=" my-4 grid h-44 grid-cols-2 gap-2">
          <div className="bg-muted"></div>
          <div className="flex flex-col justify-between  text-start">
            <div>
              <div className="text-base font-semibold lg:text-lg">
                {item.name}
              </div>
              <div className="text-sm text-accent lg:text-base">
                {item.price} €
              </div>
              <div>Taille : Taille Unique</div>
            </div>
            <div>
              <div className="flex h-10 flex-row flex-wrap content-center justify-between rounded border border-primary">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteBasket(item)}
                >
                  <Minus strokeWidth={1} width={16} />
                </Button>
                <div className="flex items-center">{item.quantity}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    addProduct(item);
                  }}
                  disabled={disabled(item)}
                >
                  <Plus strokeWidth={1} width={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
