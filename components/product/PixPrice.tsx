import { useCart } from "apps/vtex/hooks/useCart.ts";
import { useEffect, useState } from "preact/hooks";
import { formatPrice } from "$store/sdk/format.ts";

export type Props = {
  productId: string;
  quantity: number;
};

export default function PixPrice({
  productId,
  quantity,
}: Props) {
  const { simulate } = useCart();
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const getData = async () => {
      const id = parseInt(productId);
      const response = await simulate({
        items: [{
          id,
          quantity,
          seller: "1",
        }],
        postalCode: "89218220",
        country: "BRA",
        RnbBehavior: 0
        // paymentData: {
        //   id: "paymentData",
        //   payments: [{
        //     paymentSystem: "125",
        //   }],
        // },
      });

      const total = response.totals.reduce((prev, curr) => {
        return prev + curr.value;
      }, 0);

      setPrice(total / 100);
    };
    getData();
  }, [quantity]);

  return (
    <>
      {price !== null && (
        <span class="font-bold text-2xl font-lemon-milk">
          {formatPrice(price, "BRL")}
        </span>
      )}
    </>
  );
}
