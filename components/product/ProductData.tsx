import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";

interface Props {
  page: ProductDetailsPage | null;
}

export function ProductData({ page }: Props) {
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
    isVariantOf,
  } = product;

  if (!isVariantOf) return null;

  const productGroupID = isVariantOf?.productGroupID ?? "";

  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  return (
    <div>
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
      <div class="hidden sm:block border-b border-light-gray-200 w-full" />
    </div>
  );
}
