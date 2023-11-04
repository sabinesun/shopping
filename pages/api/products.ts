import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/database";
import { products } from "@/database/schema";

type Data = {
  id: number;
  name: string;
  price: string;
  inventory: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[] | undefined>,
) {
  if (req.method !== "GET") {
    res.status(404).json(undefined);
    return;
  }

  const result = await db.select().from(products);

  res.status(200).json(result);
}
