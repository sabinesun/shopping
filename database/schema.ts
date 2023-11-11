import {
  mysqlTable,
  primaryKey,
  int,
  varchar,
  decimal,
  text,
  date,
  datetime,
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

export const users = mysqlTable("Users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  lastName: text("last_name").notNull(),
  firstName: text("first_name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
});

export const orders = mysqlTable("Orders", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  createdDate: datetime("created_date"),
  collectDate: date("collect_date"),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
});

export const orderLines = mysqlTable("OrderLines", {
  id: varchar("id", { length: 255 }).primaryKey(),
  productId: int("product_id").references(() => products.id),
  quantity: int("quantity").notNull(),
  orderId: varchar("order_id", { length: 255 })
    .references(() => orders.id, {
      onDelete: "cascade",
    })
    .notNull(),
});
