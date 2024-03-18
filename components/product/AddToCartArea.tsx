import { useOffer } from "deco-sites/true-source/sdk/useOffer.ts";
import PixPrice from "deco-sites/true-source/islands/PixPrice.tsx";
import OutOfStock from "deco-sites/true-source/islands/OutOfStock.tsx";
import QuantitySelector from "../ui/QuantitySelector.tsx";
import SubscriptionButtonVTEX from "deco-sites/true-source/islands/Subscription.tsx";
import AddToCartButtonVTEX from "deco-sites/true-source/islands/AddToCartButton/vtex.tsx";
import type { BreadcrumbList, Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useState } from "preact/hooks";
import SellingPrice from "deco-sites/true-source/islands/Product/SellingPrice.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Cashback } from "deco-sites/true-source/components/ui/CustomIcons.tsx";
import { formatPrice } from "deco-sites/true-source/sdk/format.ts";

export interface Props {
  product: Product;
  breadcrumbList: BreadcrumbList;
  price: number;
  listPrice?: number;
}

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
  >
    <g clip-path="url(#clip0_1203_31881)">
      <path
        d="M4.37533 7L6.12533 8.75L9.62533 5.25M12.8337 7C12.8337 10.2217 10.222 12.8333 7.00033 12.8333C3.77866 12.8333 1.16699 10.2217 1.16699 7C1.16699 3.77834 3.77866 1.16667 7.00033 1.16667C10.222 1.16667 12.8337 3.77834 12.8337 7Z"
        stroke="#8CBF3C"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1203_31881">
        <rect width="14" height="14" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default function AddToCartArea({
  product,
  breadcrumbList,
  price,
  listPrice = 0,
}: Props) {
  if (!IS_BROWSER) return null;

  const [quantity, setQuantity] = useState(1);

  const {
    additionalProperty,
    productID,
    offers,
  } = product;

  const {
    offers: {
      // @ts-ignore offers exists
      offers: [
        {
          inventoryLevel: {
            value: inventoryLevelValue,
          },
        },
      ],
    },
  } = product;

  const activeSubscription = additionalProperty?.find((p) =>
    p.name === "activeSubscriptions"
  )?.value;

  const {
    seller = "1",
    availability,
  } = useOffer(offers) || {};

  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  return (
    <div class="flex flex-col bg-ice rounded-3xl p-6 flex-none gap-4 max-w-[484px]">
      {availability === "https://schema.org/InStock"
        ? (
          <>
            <div
              class={`flex ${
                listPrice > price
                  ? "flex-row-reverse sm:flex-col-reverse gap-4 sm:gap-2 justify-between items-center sm:items-stretch"
                  : "flex-row-reverse sm:flex-row gap-4 sm:gap-6 justify-between items-center sm:items-stretch"
              }`}
            >
              <span class="text-dark">
                <PixPrice
                  productId={productID}
                  quantity={quantity}
                  sellingPrice={price}
                  listPrice={listPrice}
                />
                <p class="text-xs sm:text-sm font-regular normal-case">
                  à vista no Pix
                </p>
              </span>
              <SellingPrice
                productId={productID}
                quantity={quantity}
                sellingPrice={price}
                listPrice={listPrice}
              />
            </div>
            <div class="flex items-center gap-4 border-2 border-light-gray rounded-md">
              <QuantitySelector
                type="pdp"
                quantity={quantity}
                onChange={(quantity) => {
                  if (quantity < 1) return;
                  if (quantity > 9 || quantity > inventoryLevelValue) {
                    return;
                  }
                  setQuantity(quantity);
                }}
              />
              <span
                class={`flex items-center gap-3 text-sm ${
                  quantity >= 3
                    ? "text-green font-bold"
                    : "text-gray font-regular"
                }`}
              >
                {quantity >= 3 && (
                  <span class="inline max-[400px]:hidden">
                    <CheckIcon />
                  </span>
                )}
                <span class="hidden sm:inline">
                  <strong>10% OFF</strong> para <strong>3 ou mais</strong>{" "}
                  unidades
                </span>
                <span class="inline sm:hidden text-xs">
                  <strong>10% OFF</strong> para <strong>3 ou mais</strong> un.
                </span>
              </span>
            </div>
            <div class="flex flex-col gap-2">
              <AddToCartButtonVTEX
                eventParams={{ items: [eventItem] }}
                productID={productID}
                seller={seller}
                quantity={quantity}
              />
              {activeSubscription && (
                <SubscriptionButtonVTEX
                  productID={productID}
                  seller={seller}
                  quantity={quantity}
                  price={price}
                  listPrice={listPrice}
                />
              )}
              <div class="flex items-center justify-between pb-2 pt-4">
                <p class="text-xs sm:text-sm">
                  Compre e receba até <br />
                  <strong>
                    {formatPrice(parseFloat((price * .05).toFixed(2)))}
                  </strong>{" "}
                  de volta!
                </p>
                <Cashback />
              </div>
            </div>
          </>
        )
        : <OutOfStock productID={productID} />}
    </div>
  );
}
