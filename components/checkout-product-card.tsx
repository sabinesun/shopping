import { BasketItem } from "@/pages/_app";

type CheckoutProductCardProps = {
  product: BasketItem;
};
export const CheckoutProductCard = ({ product }: CheckoutProductCardProps) => {
  return (
    <div className="bg-secondBackground flex h-24 min-w-[300px] flex-col flex-wrap justify-center rounded border border-[#F3EDE7] p-2 ">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <div className="bg-muted relative h-16 w-16 rounded">
            <div className="bg-thirdBackground absolute right-0 top-0 flex h-5 w-5 -translate-y-1/3 translate-x-1/3 items-center justify-center rounded-full text-sm text-white ">
              {product.quantity}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="font-semibold"> {product.name}</div>
            <div className="text-sm">TU</div>
          </div>
        </div>
        <div className="flex items-center">
          {(Number(product.price) * product.quantity).toFixed(2)}€
        </div>
      </div>
    </div>
  );
};
