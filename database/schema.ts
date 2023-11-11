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
  id: int("id").autoincrement().primaryKey(),
  lastName: text("last_name").notNull(),
  firstName: text("first_name").notNull(),
  email: text("email").notNull(),
});

export const orders = mysqlTable("Orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").references(() => users.id, { onDelete: "cascade" }),
  createdDate: datetime("created_date"),
  collectDate: date("collect_date"),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
});

export const orderLines = mysqlTable("OrderLines", {
  id: int("id").autoincrement().primaryKey(),
  productId: int("product_id").references(() => products.id),
  quantity: int("quantity").notNull(),
  orderId: int("order_id").references(() => orders.id, { onDelete: "cascade" }),
});
