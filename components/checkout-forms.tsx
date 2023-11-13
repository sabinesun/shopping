import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/forms";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { OrderLinesType, postFetcher } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";
import { useContext } from "react";
import { BasketContext } from "@/context/basket-context";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  lastName: z.string().min(1, {
    message: "Le nom doit contenir au moins 1 caractères",
  }),
  firstName: z.string().min(1, {
    message: "Le prénom doit contenir au moins 1 caractères",
  }),
  email: z.string().email({
    message: "Ce n'est pas une adresse email valide.",
  }),
  collectDate: z.date().min(new Date(), {
    message: "Ce n'est pas une date valide",
  }),
});

export const CheckoutForms = () => {
  const router = useRouter();

  const basket = useContext(BasketContext);
  if (basket === undefined) {
    throw new Error();
  }

  let orderLines: OrderLinesType[] = [];

  basket.products.forEach((value, key) => {
    orderLines.push({ productId: value.id, quantity: value.quantity });
  });

  const { trigger, data, error } = useSWRMutation("/api/checkout", postFetcher);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      email: "",
      collectDate: new Date(),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await trigger({
        lastName: values.lastName,
        firstName: values.firstName,
        email: values.email,
        collectDate: values.collectDate.toISOString(),
        orderLines: orderLines,
      });
      localStorage.clear();
      basket.products.clear();
      router.push("/checkout/validation");
    } catch (error) {
      if (error instanceof Error) {
        localStorage.setItem("error", error.message);
        router.push("/checkout/error");
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-center space-y-3"
      >
        <FormField
          control={form.control}
          name="lastName"
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
          name="firstName"
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
          name="collectDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full rounded-md pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Choisir une date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Choisissez la date pour votre Click & Collect.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-10 w-full rounded uppercase">
          Valider
        </Button>
      </form>
    </Form>
  );
};
