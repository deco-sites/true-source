import ProductInfo from "./ProductInfo.tsx";
import Description from "$store/islands/Product/Description.tsx";

import { searchSlugify } from "../utils/slugify.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductMain(props: Props) {
  if (props.page === null) return null;

  const {
    page,
  } = props;

  const { product } = page;
  const { name } = product;
  const slug = name ? searchSlugify(name) : "";

  if (product === null) return null;
  if (!product.isVariantOf) return null;

  return (
    <div>
      <div class="container">
        <ProductInfo page={props.page} />
      </div>
      <Description slug={slug} />
    </div>
  );
}
