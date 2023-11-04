import Layout from "@/components/layout";
import { ItemList } from "@/components/item-list";
import { useState } from "react";
import { Data } from "@/pages/api/products";

export type BasketItem = {
  id: number;
  price: string;
  name: string;
  quantity: number;
};

export default function Home() {
  const [basket, setBasket] = useState(new Map<number, BasketItem>());

  const addBasket = (item: BasketItem) => {
    setBasket((prevBasket) => {
      if (!prevBasket.has(item.id)) {
        prevBasket.set(item.id, item);
        return new Map(prevBasket);
      }

      const previousItem = prevBasket.get(item.id)!;
      const updatedItem = {
        ...previousItem,
        quantity: previousItem?.quantity + 1,
      };
      prevBasket.set(item.id, updatedItem);
      return new Map(prevBasket);
    });
  };

  const deleteBasket = (item: BasketItem) => {
    setBasket((prevBasket) => {
      const previousItem = prevBasket.get(item.id)!;
      const updatedItem = {
        ...previousItem,
        quantity: previousItem?.quantity - 1,
      };
      if (updatedItem.quantity === 0) {
        prevBasket.delete(item.id);
        return new Map(prevBasket);
      }
      prevBasket.set(item.id, updatedItem);

      return new Map(prevBasket);
    });
  };

  return (
    <main className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Layout basket={basket} addBasket={addBasket} deleteBasket={deleteBasket}>
        <ItemList addBasket={addBasket}></ItemList>
      </Layout>
    </main>
  );
}
