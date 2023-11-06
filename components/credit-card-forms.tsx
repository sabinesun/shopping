import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/forms";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CreditCardForms = () => {
  const formSchema = z.object({
    cardnumber: z.string().regex(/^\d{13,19}$/, {
      message: "Entrez un numéro de carte valide",
    }),
    cardname: z.string().min(1, {
      message: "Entrez votre nom exactement comme il est écrit sur votre carte",
    }),
    expirationdate: z.string().min(4, {
      message: "",
    }),
    securitycode: z.string().min(3, {
      message: "Il doit avoir exactement 5 chiffres",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardnumber: "",
      cardname: "",
      expirationdate: "",
      securitycode: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-center space-y-3"
      >
        <FormField
          control={form.control}
          name="cardnumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Numéro de carte" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cardname"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Nom sur la carte" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expirationdate"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Date d'expiration (MM/YY)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="securitycode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Code de sécurité" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
