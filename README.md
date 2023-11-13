
# Shopping

## About The Project


### Build With
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Node.js](https://nodejs.org/)
- [Radix UI](https://www.radix-ui.com/primitives)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zod](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Drizzle](https://orm.drizzle.team/)
- [MySQL](https://www.mysql.com/fr/)

## Getting Started

### Prerequisites

- `docker`
- `git`
- `node`
- `npm`

### Installation

   ```shell
   git clone git@github.com:sabinesun/shopping.git
   npm install
   ```








## Run Locally

```shell
docker compose up web

# visit http://localhost:3000/

   ```
OR

```shell
docker compose up database
npm run dev

# visit http://localhost:3000/
   ```


## Features

1. **Shopping Cart**

   Users can add products to their shopping cart, respecting the available stock limit.

2. **Checkout Page**

   Once products are added, users can navigate to a checkout page to complete their order.

3. **Orders**

   After placing an order, an entry will be created in the database with the total price and each item in the order. The product stock will also be updated.
