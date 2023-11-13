import // ... (other imports remain the same)
"@/components/ui/card";
import { BadgeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { BasketContext } from "@/context/basket-context";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ErrorData {
  productId: number;
  orderLine: number;
  currentInventory: number;
}

export default function ErrorPage() {
  const basket = useContext(BasketContext);
  if (basket === undefined) {
    throw new Error();
  }

  let error = "";
  let errorParsed: ErrorData = {
    productId: 0,
    orderLine: 0,
    currentInventory: 0,
  };

  if (typeof window !== "undefined") {
    error = localStorage.getItem("error") || "";
    try {
      const parsedError = JSON.parse(error);
      if (parsedError && typeof parsedError === "object") {
        errorParsed = parsedError;
      }
    } catch (e) {}
  }

  let productName = Array.from(basket.products.values()).find(
    (product) => product.id == errorParsed.productId,
  )?.name;

  let basketLocal = "";

  if (typeof window !== "undefined") {
    basketLocal = localStorage.getItem("basket") || "";
  }

  const deleteObjectById = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("basket");

      let newObject = JSON.parse(basketLocal);
      for (let key in newObject) {
        if (newObject[key].id === errorParsed.productId) {
          delete newObject[key];
          break;
        }
      }

      localStorage.setItem("basket", JSON.stringify(newObject));
      basket.products.delete(errorParsed.productId);
      localStorage.removeItem("error");
    }
  };

  return (
    <div className="flex h-full items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col items-center">
            <BadgeX color="#d90429" size="64" />
            Commande Échouée
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            <li>
              Vous avez essayé de commander
              {errorParsed.orderLine} {productName}.
            </li>
            <li>
              Il reste {errorParsed.currentInventory} {productName} en stock.
            </li>
            <li>Cet article va être supprimé de votre panier.</li>
          </ul>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button onClick={() => deleteObjectById()}>Retour</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
