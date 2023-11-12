import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/database";
import { products, users, orderLines, orders } from "@/database/schema";
import { z } from "zod";
import { eq, sql } from "drizzle-orm";
import crypto from "node:crypto";

const bodySchema = z.object({
  lastName: z.string().min(1).max(255),
  firstName: z.string().min(1).max(255),
  email: z.string().email(),
  collectDate: z.string().datetime(),
  orderLines: z.array(
    z.object({ productId: z.number(), quantity: z.number().min(0) }),
  ),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.status(400).json(undefined);
    return;
  }

  const body = bodySchema.parse(JSON.parse(req.body));

  let orderId = crypto.randomUUID();

  let totalPrice = 0;
  for (let orderLine of body.orderLines) {
    const productResult = (
      await db
        .select({ price: products.price })
        .from(products)
        .where(eq(products.id, orderLine.productId))
    )[0];
    totalPrice += Number(productResult.price) * orderLine.quantity;
  }

  await db.transaction(async (tx) => {
    await tx
      .insert(users)
      .values({
        id: crypto.randomUUID(),
        lastName: body.lastName,
        firstName: body.firstName,
        email: body.email,
      })
      .onDuplicateKeyUpdate({ set: { id: sql`id` } });

    const userResult = (
      await tx
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, body.email))
    )[0];

    await tx.insert(orders).values({
      id: orderId,
      userId: userResult.id,
      totalPrice: totalPrice.toString(),
      collectDate: new Date(body.collectDate),
      createdDate: new Date(),
    });

    for (let orderLine of body.orderLines) {
      await tx.insert(orderLines).values({
        id: crypto.randomUUID(),
        orderId: orderId,
        productId: orderLine.productId,
        quantity: orderLine.quantity,
      });

      const result = (
        await tx
          .select({ currentInventory: products.inventory })
          .from(products)
          .where(eq(products.id, orderLine.productId))
      )[0];

      if (result.currentInventory - orderLine.quantity < 0) {
        try {
          tx.rollback();
        } finally {
          res.status(409).json({
            currentInventory: result.currentInventory,
            orderLine: orderLine.quantity,
          });
        }

        return;
      }

      await tx
        .update(products)
        .set({
          inventory: result.currentInventory - orderLine.quantity,
        })
        .where(eq(products.id, orderLine.productId));
    }
  });

  res.status(200).json(undefined);
}
