import type { Platform } from "$store/apps/site.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import ProductStarCard from "$store/components/product/ProductStarCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Loading from "$store/components/ui/Loading.tsx";
import { clx } from "$store/sdk/clx.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { relative } from "$store/sdk/url.ts";
import useBuyProduct from "$store/sdk/useBuyProduct.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useUI } from "$store/sdk/useUI.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import Image from "apps/website/components/Image.tsx";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  isMobile: boolean;
}

const WIDTH = 350;
const HEIGHT = 350;

function ProductCard({
  product,
  preload,
  itemListName,
  index,
  isMobile,
}: Props) {
  const { url, productID, name, image: images, offers, isVariantOf } = product;
  const { seller = "1", availability } = useOffer(offers) ?? {};
  const id = `product-card-${productID}`;
  const productGroupID = isVariantOf?.productGroupID;
  const [front] = images ?? [];
  const { listPrice = 0, price = 0 } = useOffer(offers) || {};
  const { displayCart } = useUI();
  const { cart } = useCart();
  const { currentSubscription } = useUI();

  const isBestSeller = product.additionalProperty?.some(
    ({ value }) => value && /best-seller/i.test(value),
  );

  const canBuyWithSubscription = product.additionalProperty?.some(
    ({ name }) => name === "activeSubscriptions",
  );
  const discountPercentage = Math.round(
    ((listPrice - price) / listPrice) * 100,
  );

  const isInCart = cart.value?.items.some((item) => item.id === productID);
  const isUnavailable = availability !== "https://schema.org/InStock";

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: {
      "@type": "BreadcrumbList",
      numberOfItems: 0,
      itemListElement: [],
    },
    price,
    listPrice,
  });

  const buyProduct = useBuyProduct({
    eventParams: { items: [eventItem] },
    productID,
    seller,
    quantity: 1,
    onSuccess: () => {
      displayCart.value = true;
    },
  });

  return (
    <div
      id={id}
      data-deco="view-product"
      class="w-full lg:max-w-[260px]"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />
      <figure class="relative overflow-hidden aspect-[13/15] flex justify-center items-center">
        {/* Wishlist button */}
        <div class="absolute top-4 right-4 z-10 flex items-center">
          <WishlistButtonVtex
            productGroupID={productGroupID}
            productID={productID}
          />
        </div>

        <div class="absolute top-2.5 left-2.5 flex flex-col items-start gap-2">
          {/* Best seller */}
          {isBestSeller && (
            <div class="rounded-full bg-orange text-white text-xs font-bold px-3 py-1.5 whitespace-nowrap">
              Mais vendidos
            </div>
          )}

          {/* Discount % */}
          {listPrice && price && discountPercentage > 0 && (
            <div class="rounded-full bg-green text-white text-xs font-bold px-3 py-1.5 whitespace-nowrap">
              {discountPercentage}% OFF
            </div>
          )}
        </div>

        {/* Product Images */}
        <a
          href={url && relative(url)}
          aria-label="view product"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class=""
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
        </a>
      </figure>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col gap-2 lg:px-4 lg:gap-4 mt-4">
        <h2 class="text-dark text-sm text-ellipsis font-bold line-clamp-2 h-10">
          {name}
        </h2>

        {/* Price and rating */}
        <div class="flex gap-2 h-7 lg:h-6">
          <div class="flex flex-col lg:flex-row justify-center">
            {listPrice > price && (
              <div class="line-through text-gray text-xs lg:text-sm">
                {formatPrice(listPrice, offers?.priceCurrency)}
              </div>
            )}
            <div class="text-dark text-xs lg:text-sm">
              {formatPrice(price, offers?.priceCurrency)}
            </div>
          </div>

          <div class="ml-auto">
            <ProductStarCard
              storeId="113397"
              productId={productGroupID ?? ""}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={isInCart
            ? buyProduct.remove(productID)
            : canBuyWithSubscription
            ? () =>
              currentSubscription.value = {
                productID,
                seller,
                quantity: 1,
                listPrice,
                price,
              }
            : buyProduct.add}
          class={clx(
            "flex justify-center items-center gap-4 rounded text-xs sm:text-sm font-bold h-10 group/card",
            isUnavailable
              ? "text-[#666] bg-[#ccc]"
              : isInCart
              ? "bg-green text-white"
              : "text-green hover:bg-green hover:text-white transition-colors duration-[200ms] border-2 border-green",
          )}
        >
          {buyProduct.loading.value ? <Loading /> : (
            <>
              {isInCart
                ? (
                  <Icon
                    id="CheckCircle"
                    width={16}
                    height={16}
                    class="text-white"
                  />
                )
                : !isUnavailable && (canBuyWithSubscription ||
                  (isMobile && !canBuyWithSubscription)) &&
                  (
                    <Icon
                      id="ShoppingCart"
                      width={16}
                      height={16}
                      class="text-green group-hover/card:text-white delay-75"
                    />
                  )}

              {isUnavailable
                ? "Em breve"
                : isInCart
                ? "Adicionado"
                : canBuyWithSubscription
                ? "Assinar com desconto"
                : isMobile
                ? "Comprar"
                : "Adicionar ao carrinho"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
