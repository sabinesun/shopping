import { createContext, useState } from "react";
import { BasketItem } from "@/pages/_app";

export const AddBasketContext = createContext<
  undefined | ((item: BasketItem) => void)
>(undefined);
