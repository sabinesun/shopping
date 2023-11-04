import {
  mysqlTable,
  primaryKey,
  int,
  varchar,
  decimal,
} from "drizzle-orm/mysql-core";

export const products = mysqlTable(
  "Products",
  {
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    inventory: int("inventory").notNull(),
  },
  (table) => {
    return {
      productsId: primaryKey(table.id),
    };
  },
);
