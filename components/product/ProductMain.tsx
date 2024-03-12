import { Section } from "deco/blocks/section.ts";
import { searchSlugify } from "$store/components/utils/slugify.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";

import ProductInfo from "./ProductInfo.tsx";
import Description from "./Description/Description.tsx";
import Trustvox from "$store/islands/Product/Trustvox.tsx";

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
        <ProductInfo page={props.page} />
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

export function loader(props: Props, req: Request) {
  const description = (props.descriptions ?? []).find(
    (d) =>
      new URLPattern({ pathname: d.matcher }).test(
        req.url,
      ),
  );

  return {
    ...props,
    description,
  };
}
