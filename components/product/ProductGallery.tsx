import ProductCard, {
  productToProductCardProps,
} from "deco-sites/true-source/components/product/ProductCard.tsx";
import type { Product } from "apps/commerce/types.ts";

export interface Props {
  products: Product[] | null;
  isMobile: boolean;
  showOnlySubscription?: boolean;
}

function ProductGallery({ products, isMobile, showOnlySubscription }: Props) {
  return (
    <div class="gap-x-3.5 gap-y-6 grid grid-cols-2 lg:grid-cols-4 items-center">
      {products?.map((product) => (
        <ProductCard
          {...productToProductCardProps({
            product,
            isMobile,
            showOnlySubscription,
          })}
        />
      ))}
    </div>
  );
}

export default ProductGallery;
