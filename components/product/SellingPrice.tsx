import { useCart } from "apps/vtex/hooks/useCart.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useEffect, useState } from "preact/hooks";
import type { UnitPriceSpecification } from "apps/commerce/types.ts";

export type Props = {
  productId: string;
  quantity: number;
  type?: "subscription" | "productInfo";
};

interface Installment {
  value: number;
  price: number;
  installments: Array<{
    value: number;
  }>;
  paymentGroupName: string;
}

const installmentToString = (
  installment: Installment,
  sellingPrice: number,
) => {
  const billingDuration = installment.installments.length;
  const billingIncrement = installment.installments[billingDuration - 1].value;
  const price = installment.value;

  const withTaxes = sellingPrice < price;

  return `<strong>${billingDuration}x</strong> de <strong>${
    formatPrice(billingIncrement / 100, "BRL")
  }</strong> ${withTaxes ? "com juros" : "sem juros"}`;
};

export default function SellingPrice({
  productId,
  quantity,
  type = "productInfo",
}: Props) {
  const { simulate } = useCart();
  const [price, setPrice] = useState<number | null>(null);
  const [installment, setInstallment] = useState(null);

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
        RnbBehavior: 0,
      });

      const total = response.totals.reduce((prev, curr) => {
        return prev + curr.value;
      }, 0);
      // console.log("response", response);
      setPrice(total / 100);

      // @ts-ignore Type InstallmentOptions is not assignable to type Installment
      const installmentOptions: Installment[] =
        response.paymentData.installmentOptions;

      const installments = installmentOptions.reduce((
        prev: null | Installment,
        curr: Installment,
      ) => {
        if (curr.paymentGroupName !== "creditCardPaymentGroup") {
          return prev;
        }

        if (!prev) {
          return curr;
        }

        if (prev.value < total) return curr;
        if (curr.value < total) return prev;

        if (prev.value > curr.value) {
          return curr;
        }

        if (prev.price < curr.price) {
          return prev;
        }

        if (prev.installments.length && curr.installments.length) {
          if (prev.installments.length < curr.installments.length) {
            return curr;
          }
        }

        return prev;
      }, null);
      // @ts-ignore installments is checked
      const installmentString = installmentToString(installments, total);
      // @ts-ignore installments is checked
      setInstallment(installmentString);
    };
    getData();
  }, [quantity]);

  if (!price && !installment) return null;
  if (type === "subscription") {
    return (
      <span class="text-sm text-gray line-through">
        {/* @ts-ignore price is checked */}
        De <strong>{formatPrice(price, "BRL")}</strong>
        <br />
        ou{" "}
        <span
          class="text-sm text-gray"
          // @ts-ignore installment is checked
          dangerouslySetInnerHTML={{ __html: installment }}
        />
      </span>
    );
  }

  return (
    <span class="text-sm text-gray pl-4 border-l border-light-gray">
      {/* @ts-ignore price is checked */}
      ou <strong>{formatPrice(price, "BRL")}</strong> em até
      <p
        class="text-sm text-gray"
        // @ts-ignore installment is checked
        dangerouslySetInnerHTML={{ __html: installment }}
      />
    </span>
  );
}
