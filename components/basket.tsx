import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BasketItem } from "@/pages/_app";
import { useContext } from "react";
import { BasketContext } from "@/context/basket-context";

type BasketProps = {
  deleteBasket: (item: BasketItem) => void;
};
export const Basket = ({ deleteBasket }: BasketProps) => {
  const addBasket = useContext(BasketContext);
  if (addBasket === undefined) {
    throw new Error();
  }

  if (addBasket.basket.size === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        Votre panier est vide
      </div>
    );
  }

  return (
    <div className=" overflow-y-scroll">
      {Array.from(addBasket.basket.values()).map((item) => (
        <div key={item.id} className=" my-4 grid h-44 grid-cols-2 gap-2">
          <div className="bg-muted"></div>
          <div className="flex flex-col justify-between  text-start">
            <div>
              <div className="text-base font-semibold lg:text-lg">
                {item.name}
              </div>
              <div className="text-accent text-sm lg:text-base">
                {item.price} €
              </div>
              <div>Taille : Taille Unique</div>
            </div>
            <div>
              <div className="border-primary flex h-10 flex-row flex-wrap content-center justify-between rounded border">
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
                  onClick={() => addBasket?.addBasket(item)}
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
