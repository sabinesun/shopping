import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { BasketContext } from "@/context/basket-context";
import Layout from "@/components/layout";
import { z } from "zod";

export type BasketItem = {
  id: number;
  price: string;
  name: string;
  quantity: number;
};

const basketSchema = z.record(
  z.object({
    id: z.number(),
    price: z.string(),
    name: z.string(),
    quantity: z.number(),
  }),
);

export default function App({ Component, pageProps }: AppProps) {
  const [basket, setBasket] = useState(new Map<number, BasketItem>());

  useEffect(() => {
    const basketLocalStorage = localStorage.getItem("basket") || "";
    try {
      const parsedBasket = JSON.parse(basketLocalStorage);
      const validatedBasket = basketSchema.parse(parsedBasket);

      const basketInMap = new Map(
        Object.entries(validatedBasket).map(([key, value]) => [
          Number(key),
          value,
        ]),
      );

      setBasket(basketInMap);
    } catch (error) {
      console.error("Error parsing or validating basket:", error);
    }
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem("basket", JSON.stringify(Object.fromEntries(basket)));
  };

  const addProduct = (item: BasketItem) => {
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
    saveToLocalStorage();
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
    saveToLocalStorage();
  };

  return (
    <BasketContext.Provider
      value={{ addProduct: addProduct, products: basket }}
    >
      <Layout deleteBasket={deleteBasket}>
        <Component {...pageProps} />
      </Layout>
    </BasketContext.Provider>
  );
}
