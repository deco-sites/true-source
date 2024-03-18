import ProductCard from "deco-sites/true-source/components/product/ProductCard.tsx";
import { Product } from "apps/commerce/types.ts";

export interface Props {
  products: Product[] | null;
  offset: number;
  isMobile: boolean;
}

function ProductGallery({ products, offset, isMobile }: Props) {
  return (
    <div class="gap-x-3.5 gap-y-6 grid grid-cols-2 lg:grid-cols-4 items-center">
      {products?.map((product, index) => (
        <ProductCard
          product={product}
          preload={index === 0}
          index={offset + index}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
}

export default ProductGallery;
