import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Validation() {
  return (
    <div className="flex h-full items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col items-center">
            <BadgeCheck color="#57cc99" size="64" />
            Commande Réussie
          </CardTitle>
          <CardDescription>
            Merci pour avoir passée votre commande
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button>Retour</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
