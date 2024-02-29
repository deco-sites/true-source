import { useOffer } from "$store/sdk/useOffer.ts";
import PixPrice from "$store/islands/PixPrice.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import QuantitySelector from "../ui/QuantitySelector.tsx";
import SubscriptionButtonVTEX from "$store/islands/Subscription.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import type { BreadcrumbList, Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useState } from "preact/hooks";
import SellingPrice from "deco-sites/true-source/islands/Product/SellingPrice.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";

export interface Props {
  product: Product;
  breadcrumbList: BreadcrumbList;
  price: number;
  listPrice?: number;
}

export default function AddToCartArea({
  product,
  breadcrumbList,
  price,
  listPrice,
}: Props) {
  if (!IS_BROWSER) return null;

  const [quantity, setQuantity] = useState(1);

  const {
    productID,
    offers,
  } = product;

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
    <div class="flex flex-col bg-ice rounded-3xl p-6 flex-none gap-4">
      {availability === "https://schema.org/InStock"
        ? (
          <>
            <div class="flex flex-row gap-6 items-stretch">
              <span class="text-dark">
                <PixPrice productId={productID} quantity={quantity} />
                <p class="text-sm font-regular normal-case">à vista no Pix</p>
              </span>
              <SellingPrice productId={productID} quantity={quantity} />
            </div>
            <div class="flex items-center gap-4 border border-light-gray rounded-md">
              <QuantitySelector
                quantity={quantity}
                onChange={(quantity) => {
                  if (quantity < 1) return;
                  if (quantity > 9) return;
                  setQuantity(quantity);
                }}
              />
              <span
                class={`text-sm ${
                  quantity >= 3
                    ? "text-green font-bold"
                    : "text-gray font-regular"
                }`}
              >
                10% OFF para 3 ou mais unidades
              </span>
            </div>
            <div class="flex flex-col gap-2">
              <AddToCartButtonVTEX
                eventParams={{ items: [eventItem] }}
                productID={productID}
                seller={seller}
                quantity={quantity}
              />
              <SubscriptionButtonVTEX
                productID={productID}
                seller={seller}
                quantity={quantity}
                price={price}
              />
            </div>
          </>
        )
        : <OutOfStock productID={productID} />}
    </div>
  );
}
