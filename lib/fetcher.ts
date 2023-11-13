export const fetcher = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

export type OrderLinesType = {
  productId: number;
  quantity: number;
};

export const postFetcher = async (
  url: string,
  {
    arg: { lastName, firstName, email, collectDate, orderLines },
  }: {
    arg: {
      lastName: string;
      firstName: string;
      email: string;
      collectDate: string;
      orderLines: OrderLinesType[];
    };
  },
) => {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      lastName,
      firstName,
      email,
      collectDate,
      orderLines,
    }),
  });

  if (res.status === 409) {
    const errorData = await res.json();
    throw new Error(JSON.stringify(errorData));
  }
};
