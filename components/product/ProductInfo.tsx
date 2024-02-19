import { SendEventOnView } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "./ProductVariantSelector.tsx";
import AddToCartArea from "$store/islands/AddToCartArea.tsx";
import ProductSimilars from "$store/islands/Product/ProductSimilars.tsx";

interface Props {
  page: ProductDetailsPage | null;
}

function ProductInfo({ page }: Props) {
  const platform = usePlatform();
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
    <div class="flex flex-col gap-y-6" id={id}>
      <Breadcrumb itemListElement={breadcrumb.itemListElement} />
      {/* Code and name */}
      <div class="flex gap-4 justify-between">
        <h1>
          <span class="font-semibold text-2xl uppercase font-lemon-milk">
            {isVariantOf?.name}
          </span>
        </h1>
        <WishlistButtonVtex
          variant="full"
          productID={productID}
          productGroupID={productGroupID}
        />
      </div>
      {/* Brand */}
      <span class="font-medium text-light-gray">{brandName}</span>
      {/* Divider */}
      <div class="border-b border-light-gray-200 w-full" />
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
  );
}

export default ProductInfo;
