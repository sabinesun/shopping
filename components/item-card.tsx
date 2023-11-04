import { Button } from "@/components/ui/button";

export const ItemCard = () => {
  return (
    <div>
      <div className="bg-muted group flex h-52 items-end justify-center p-3  sm:h-72 sm:p-5 lg:h-96 lg:p-7">
        <Button className="bg-secondBackground text-primary hover:text-accent hover:bg-secondBackground hidden h-9 w-full group-hover:flex sm:h-10 lg:h-11">
          TU
        </Button>
      </div>
      <div className="mx-2 my-2 flex flex-col sm:my-3 lg:my-4">
        <span className="text-base lg:text-lg">T-shirt Blanc</span>
        <span className="text-accent text-sm lg:text-base">19,99€</span>
      </div>
    </div>
  );
};
