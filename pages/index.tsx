import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import { ItemCard } from "@/components/item-card";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Layout>
        <div className="m-4 grid grid-cols-2 gap-4 sm:m-8 sm:grid-cols-3 sm:gap-6 lg:m-12 lg:grid-cols-4 lg:gap-8 ">
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </div>
      </Layout>
    </main>
  );
}
