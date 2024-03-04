import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import GallerySlider from "./Gallery/ImageSlider.tsx";
import AddToCartArea from "$store/islands/AddToCartArea.tsx";
import ProductSimilars from "$store/islands/Product/ProductSimilars.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";

import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { SendEventOnView } from "$store/components/Analytics.tsx";
import { BreadcrumbList, ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

interface Props {
  page: ProductDetailsPage | null;
}

interface ProductDataProps {
  name: string;
  brandName: string;
  productID: string;
  productGroupID: string;
}

function ProductData({
  name,
  productID,
  productGroupID,
  brandName,
}: ProductDataProps) {
  return (
    <>
      {/* Code and name */}
      <div class="flex items-center gap-4 justify-between">
        <h1>
          <span class="font-semibold text-2xl uppercase font-lemon-milk">
            {name}
          </span>
        </h1>
        <div class="hidden sm:block">
          <WishlistButtonVtex
            variant="full"
            productID={productID}
            productGroupID={productGroupID}
          />
        </div>
      </div>
      {/* Brand */}
      <div class="flex items-center justify-between">
        <span class="font-medium text-light-gray">{brandName}</span>
        <div class="block sm:hidden">
          <WishlistButtonVtex
            variant="full"
            productID={productID}
            productGroupID={productGroupID}
          />
        </div>
      </div>
      {/* Divider */}
      <div class="hidden sm:block border-b border-light-gray-200 w-full" />
    </>
  );
}

function ProductInfo({ page }: Props) {
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;

  const {
    productID,
    brand: {
      // @ts-ignore - brandName exists
      name: brandName,
    },
    offers,
    name = "",
    gtin,
    isVariantOf,
    additionalProperty = [],
  } = product;
  const description = product.description || isVariantOf?.description;
  if (!isVariantOf) return null;
  const {
    name: productName = "",
    additionalProperty: currentVariantProperties = [],
  } = isVariantOf;
  if (!offers) return null;
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers) || {};
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  return (
    <div class="flex flex-col md:flex-row gap-6 md:gap-8 mt-4 mb-14" id={id}>
      <div class="order-2 sm:order-1 w-full lg:max-w-[664px]">
        <GallerySlider page={page} />
      </div>
      <div class="flex md:hidden flex-col gap-y-4 order-1 sm:order-2">
        <Breadcrumb itemListElement={breadcrumb.itemListElement} />
        <ProductData
          name={productName}
          brandName={brandName}
          productID={productID}
          productGroupID={productGroupID}
        />
      </div>
      <div class="flex flex-col gap-y-4 order-3">
        <div class="hidden md:flex flex-col gap-y-4">
          <Breadcrumb itemListElement={breadcrumb.itemListElement} />
          <ProductData
            name={productName}
            brandName={brandName}
            productID={productID}
            productGroupID={productGroupID}
          />
        </div>
        {/* Sku Selector */}
        <ProductSimilars product={product} current={currentVariantProperties} />
        {/* Add to Cart and Favorites button | Prices */}
        <AddToCartArea
          product={product}
          breadcrumbList={breadcrumbList}
          price={price}
          listPrice={listPrice}
        />
        {/* Shipping Simulation */}
        <ShippingSimulation
          items={[
            {
              id: Number(product.sku),
              quantity: 1,
              seller: seller,
            },
          ]}
        />
        {/* Analytics Event */}
        <SendEventOnView
          id={id}
          event={{
            name: "view_item",
            params: {
              item_list_id: "product",
              item_list_name: "Product",
              items: [eventItem],
            },
          }}
        />
      </div>
    </div>
  );
}

export default ProductInfo;
