import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ProductData } from "@/pages/api/products";
import { useContext } from "react";
import { BasketContext } from "@/context/basket-context";
import { BasketItem } from "@/pages/_app";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

type ItemCardProps = {
  item: ProductData;
};
export const ItemCard = ({ item }: ItemCardProps) => {
  const { data } = useSWR<ProductData[]>("/api/products", fetcher);
  const basket = useContext(BasketContext);
  if (basket === undefined) {
    throw new Error();
  }

  const addProduct = (item: BasketItem) => {
    const totalQuantity = data?.find((product) => product.id == item.id)
      ?.inventory;
    let actualBasketQuantity = basket.products.get(item.id)?.quantity;
    actualBasketQuantity =
      actualBasketQuantity === undefined ? 0 : actualBasketQuantity;
    if (totalQuantity !== undefined) {
      if (totalQuantity > actualBasketQuantity) {
        toast({
          title: `${item.name} a bien été ajouté dans votre panier`,
          description: `${item.price}€`,
        });
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
    <div className="flex flex-col">
      <div className="group flex h-52 items-end justify-center bg-muted p-3  sm:h-72 sm:p-5 lg:h-96 lg:p-7">
        <Button
          className="hidden h-9 w-full bg-secondBackground text-primary hover:bg-secondBackground hover:text-accent group-hover:flex sm:h-10 lg:h-11"
          onClick={() => {
            addProduct({
              id: item.id,
              price: item.price,
              name: item.name,
              quantity: 1,
            });
          }}
          disabled={disabled({
            id: item.id,
            price: item.price,
            name: item.name,
            quantity: 1,
          })}
        >
          TU
        </Button>
      </div>
      <div className="mx-2 my-2 flex flex-col sm:my-3 lg:my-4">
        <span className="overflow-hidden text-ellipsis whitespace-nowrap text-base lg:text-lg">
          {item.name}
        </span>
        <span className="text-sm text-accent lg:text-base">{item.price}€</span>
      </div>
    </div>
  );
};
