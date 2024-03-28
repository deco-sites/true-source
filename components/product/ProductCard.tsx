import type { Product } from "apps/commerce/types.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import Image from "apps/website/components/Image.tsx";
import ProductStarCard from "deco-sites/true-source/components/product/ProductStarCard.tsx";
import Icon from "deco-sites/true-source/components/ui/Icon.tsx";
import Loading from "deco-sites/true-source/components/ui/Loading.tsx";
import { clx } from "deco-sites/true-source/sdk/clx.ts";
import { formatPrice } from "deco-sites/true-source/sdk/format.ts";
import { relative } from "deco-sites/true-source/sdk/url.ts";
import useBuyProduct from "deco-sites/true-source/sdk/useBuyProduct.ts";
import { useOffer } from "deco-sites/true-source/sdk/useOffer.ts";
import { useUI } from "deco-sites/true-source/sdk/useUI.ts";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";

type Props =
  & {
    /** Preload card image */
    preload?: boolean;

    isMobile: boolean;
  }
  & Pick<
    Product,
    "url" | "productID" | "name"
  >
  & {
    price: number;
    listPrice: number;
    seller: string;
    isAvailable: boolean;
    productGroupID?: string;
    isBestSeller: boolean;
    canBuyWithSubscription: boolean;
    priceCurrency?: string;
    image: string;
    alt: string;
  };

const WIDTH = 350;
const HEIGHT = 350;

export default function ProductCard({
  preload,
  isMobile,
  url,
  productID,
  name,
  image,
  alt,
  priceCurrency,
  productGroupID,
  price,
  listPrice,
  seller,
  isAvailable,
  isBestSeller,
  canBuyWithSubscription,
}: Props) {
  const id = `product-card-${productID}`;
  const { displayCart } = useUI();
  const { cart } = useCart();
  const { currentSubscription } = useUI();

  const discountPercentage = Math.round(
    ((listPrice - price) / listPrice) * 100,
  );

  const isInCart = cart.value?.items.some((item) => item.id === productID);

  const buyProduct = useBuyProduct({
    eventParams: { items: [] },
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
      <figure class="relative overflow-hidden aspect-[13/15] flex justify-center items-center bg-ice rounded-[20px]">
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
            <h2 class="rounded-full bg-orange text-white text-xs font-bold px-3 py-1.5 whitespace-nowrap">
              Mais vendidos
            </h2>
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
            src={image}
            alt={alt}
            width={WIDTH}
            height={HEIGHT}
            class="mix-blend-multiply"
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
        </a>
      </figure>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col gap-2 lg:px-4 lg:gap-4 mt-4">
        <h3 class="text-dark text-sm text-ellipsis font-bold line-clamp-2 h-10">
          {name}
        </h3>

        {/* Price and rating */}
        <div class="flex gap-2 h-7 lg:h-6">
          <div class="flex flex-col gap-x-2 lg:flex-row justify-center">
            {listPrice > price && (
              <div class="line-through text-gray text-xs lg:text-sm">
                {formatPrice(listPrice, priceCurrency)}
              </div>
            )}
            <div class="text-dark text-xs lg:text-sm">
              {formatPrice(price, priceCurrency)}
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
          disabled={buyProduct.loading.value || !isAvailable}
          onClick={isInCart
            ? buyProduct.remove(productID)
            : canBuyWithSubscription
            ? () => {
              currentSubscription.value = {
                productID,
                seller,
                quantity: 1,
                listPrice,
                price,
              };
            }
            : buyProduct.add}
          class={clx(
            "flex justify-center items-center gap-4 rounded text-xs sm:text-sm font-bold h-10 group/card",
            !isAvailable
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
                : !!isAvailable &&
                  // Show in desktop if product have subscription
                  ((!isMobile && canBuyWithSubscription) ||
                    // Show in mobile if product doesn't have subscription
                    (isMobile && !canBuyWithSubscription)) &&
                  (
                    <Icon
                      id="ShoppingCart"
                      width={16}
                      height={16}
                      class="text-green group-hover/card:text-white delay-75"
                    />
                  )}

              {!isAvailable
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

export function productToProductCardProps(
  { product, isMobile }: {
    itemListName?: string;
    product: Product;
    isMobile: boolean;
  },
) {
  const {
    url,
    productID,
    name,
    image,
    offers,
    isVariantOf,
    additionalProperty,
  } = product;
  const { price = 0, listPrice = 0, seller = "1", availability } =
    useOffer(offers) || {};

  const productGroupID = isVariantOf?.productGroupID;

  const isBestSeller = additionalProperty?.some(
    ({ value }) => value && /best-seller/i.test(value),
  );

  const canBuyWithSubscription = additionalProperty?.some(
    ({ name }) => name === "activeSubscriptions",
  );

  return {
    isMobile: isMobile,
    url: url,
    productID: productID,
    name: name,
    image: image?.[0].url ?? "",
    alt: image?.[0].alternateName ?? "",
    price: price,
    listPrice: listPrice,
    seller: seller,
    isAvailable: availability === "https://schema.org/InStock",
    productGroupID: productGroupID,
    canBuyWithSubscription: !!canBuyWithSubscription,
    isBestSeller: !!isBestSeller,
    priceCurrency: offers?.priceCurrency,
  };
}
