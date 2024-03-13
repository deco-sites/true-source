import ProductCard from "$store/components/product/ProductCard.tsx";
import { Product } from "apps/commerce/types.ts";

export interface Props {
  products: Product[] | null;
  offset: number;
}

function ProductGallery({ products, offset }: Props) {
  return (
    <div class="flex flex-wrap gap-x-3.5 gap-y-6">
      {products?.map((product, index) => (
        <ProductCard
          product={product}
          preload={index === 0}
          index={offset + index}
        />
      ))}
    </div>
  );
}

export default ProductGallery;
