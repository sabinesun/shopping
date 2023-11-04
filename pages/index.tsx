import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Layout>
        <div>content</div>
      </Layout>
    </main>
  );
}
