import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { BasketContext } from "@/context/basket-context";
import Layout from "@/components/layout";

export type BasketItem = {
  id: number;
  price: string;
  name: string;
  quantity: number;
};

export default function App({ Component, pageProps }: AppProps) {
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
    <BasketContext.Provider value={{ addBasket: addBasket, basket: basket }}>
      <Layout deleteBasket={deleteBasket}>
        <Component {...pageProps} />
      </Layout>
    </BasketContext.Provider>
  );
}
