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

export const CheckoutForms = () => {
  const formSchema = z.object({
    lastname: z.string().min(1, {
      message: "Le nom doit contenir au moins 1 caractères",
    }),
    firstname: z.string().min(1, {
      message: "Le prénom doit contenir au moins 1 caractères",
    }),
    address: z.string().min(0, {
      message: "",
    }),
    zipCode: z.string().regex(/^\d{5}$/, {
      message: "Il doit avoir exactement 5 chiffres",
    }),
    city: z.string().min(0, {
      message: "",
    }),
    email: z.string().email({
      message: "Ce n'est pas une adresse email valide.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastname: "",
      address: "",
      firstname: "",
      zipCode: "",
      city: "",
      email: "",
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
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Prénom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Addresse" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full gap-3">
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem className="sm:w-full">
                <FormControl>
                  <Input placeholder="Code Postal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="sm:w-full">
                <FormControl>
                  <Input placeholder="Ville" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="rounded uppercase">
          Continuer vers l'expédition
        </Button>
      </form>
    </Form>
  );
};
