import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Data } from "@/pages/api/products";
import { ItemCard } from "@/components/item-card";

export const ItemList = () => {
  const { data } = useSWR<Data[]>("/api/products", fetcher);

  return (
    <div className="m-4 grid grid-cols-2 gap-4 sm:m-8 sm:grid-cols-3 sm:gap-6 lg:m-12 lg:grid-cols-4 lg:gap-8 ">
      {data?.map((item: Data) => (
        <ItemCard key={item.id} item={item}></ItemCard>
      ))}
    </div>
  );
};
