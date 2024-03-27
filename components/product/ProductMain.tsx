import type { Section } from "deco/blocks/section.ts";
import { searchSlugify } from "deco-sites/true-source/components/utils/slugify.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";

import ProductInfo from "./ProductInfo.tsx";
import Description from "./Description/Description.tsx";
import Trustvox from "deco-sites/true-source/islands/Product/Trustvox.tsx";
import { AppContext } from "deco-sites/true-source/apps/site.ts";

/**
 * @titleBy matcher
 */
interface TypeDescription {
  matcher: string;
  sections: Section[];
}

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  descriptions: TypeDescription[];
}

export default function ProductMain(props: ReturnType<typeof loader>) {
  if (props.page === null) return null;

  const { page } = props;

  const { product } = page;

  const {
    image,
    inProductGroupWithID,
    isVariantOf: {
      // @ts-expect-error - name exists
      name: productName,
    },
  } = product;

  if (product === null) return null;
  if (!product.isVariantOf) return null;

  return (
    <div>
      <div class="container">
        <ProductInfo page={props.page} isMobile={props.isMobile} />
      </div>
      <Description sections={props.description?.sections ?? []} />
      <Trustvox
        productName={productName}
        productId={inProductGroupWithID ?? ""}
        storeId={"113397"}
        image={!image ? "" : image[0].url ?? ""}
      />
    </div>
  );
}

export function loader(props: Props, req: Request, ctx: AppContext) {
  const description = (props.descriptions ?? []).find(
    (d) =>
      new URLPattern({ pathname: d.matcher }).test(
        req.url,
      ),
  );

  return {
    ...props,
    description,
    isMobile: ctx.device !== "desktop",
  };
}
