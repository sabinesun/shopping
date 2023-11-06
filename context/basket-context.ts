import { createContext, useState } from "react";
import { BasketItem } from "@/pages/_app";

export const BasketContext = createContext<
  | undefined
  | {
      addProduct: (item: BasketItem) => void;
      products: Map<number, BasketItem>;
    }
>(undefined);
