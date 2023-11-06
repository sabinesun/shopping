import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ProductData } from "@/pages/api/products";
import { useContext } from "react";
import { BasketContext } from "@/context/basket-context";

type ItemCardProps = {
  item: ProductData;
};
export const ItemCard = ({ item }: ItemCardProps) => {
  const basket = useContext(BasketContext);
  if (basket === undefined) {
    throw new Error();
  }
  return (
    <div className="flex flex-col">
      <div className="bg-muted group flex h-52 items-end justify-center p-3  sm:h-72 sm:p-5 lg:h-96 lg:p-7">
        <Button
          className="bg-secondBackground text-primary hover:text-accent hover:bg-secondBackground hidden h-9 w-full group-hover:flex sm:h-10 lg:h-11"
          onClick={() => {
            toast({
              title: `${item.name} a bien été ajouté dans votre panier`,
              description: `${item.price}€`,
            });
            basket?.addProduct({
              id: item.id,
              price: item.price,
              name: item.name,
              quantity: 1,
            });
          }}
        >
          TU
        </Button>
      </div>
      <div className="mx-2 my-2 flex flex-col sm:my-3 lg:my-4">
        <span className="overflow-hidden text-ellipsis whitespace-nowrap text-base lg:text-lg">
          {item.name}
        </span>
        <span className="text-accent text-sm lg:text-base">{item.price}€</span>
      </div>
    </div>
  );
};
