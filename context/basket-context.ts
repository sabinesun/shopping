import { createContext, useState } from "react";
import { BasketItem } from "@/pages/_app";

export const BasketContext = createContext<
  | undefined
  | { addBasket: (item: BasketItem) => void; basket: Map<number, BasketItem> }
>(undefined);
