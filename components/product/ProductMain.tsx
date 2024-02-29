import ProductInfo from "./ProductInfo.tsx";
import Description from "$store/islands/Product/Description.tsx";
import GallerySlider from "./Gallery/ImageSlider.tsx";
import { searchSlugify } from "../utils/slugify.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

const YOUTUBE_URL = "https://www.youtube.com/";
const YOUTUBE_URL_REGEX =
  /https:\/\/www\.youtube\.com\/(watch\?v=)([a-zA-Z0-9]*)/gi;

export default function ProductMain(props: Props) {
  if (props.page === null) return null;
  const { product } = props.page;
  const { name } = product;
  const slug = name ? searchSlugify(name) : "";

  if (product === null) return null;
  if (!product.isVariantOf) return null;

  return (
    <div>
      <div class="container flex flex-col lg:flex-row lg:gap-8 py-12">
        <GallerySlider page={props.page} />
        <ProductInfo page={props.page} />
      </div>
      <Description slug={slug} />
    </div>
  );
}
