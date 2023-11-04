import Layout from "@/components/layout";
import { ItemList } from "@/components/item-list";

export default function Home() {
  return (
    <main className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Layout>
        <ItemList></ItemList>
      </Layout>
    </main>
  );
}
