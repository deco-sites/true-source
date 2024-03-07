import ProductInfo from "./ProductInfo.tsx";

import { ProductDetailsPage } from "apps/commerce/types.ts";
import { Section } from "deco/blocks/section.ts";
import CustomDescription from "deco-sites/true-source/components/product/Description/CustomDescription.tsx";
import { searchSlugify } from "$store/components/utils/slugify.ts";

/**
 * @titleBy matcher
 */
interface Description {
  matcher: string;
  sections: Section[];
}

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  descriptions: Description[];
}

export default function ProductMain(props: ReturnType<typeof loader>) {
  if (props.page === null) return null;

  const { page } = props;

  const { product } = page;

  if (product === null) return null;
  if (!product.isVariantOf) return null;

  return (
    <div>
      <div class="container">
        <ProductInfo page={props.page} />
      </div>
      {/* <Description slug={slug} /> */}
      <CustomDescription sections={props.description?.sections ?? []} />
    </div>
  );
}

export function loader(props: Props, req: Request) {
  const description = (props.descriptions ?? []).find(
    (d) =>
      new URLPattern({ pathname: `/${searchSlugify(d.matcher)}/p` }).test(
        req.url,
      ),
  );

  return {
    ...props,
    description,
  };
}
