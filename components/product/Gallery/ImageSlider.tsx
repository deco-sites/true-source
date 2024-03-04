import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

const imageURL =
  /(https:\/\/bravtexfashionstore\.vtexassets\.com\/arquivos\/ids\/)([0-9]*)(\/.*)/;

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();

  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: { product: { image: images = [] } },
    // layout: { width, height },
  } = props;
  // const aspectRatio = `${width} / ${height}`;

  return (
    <div id={id} class="flex flex-col">
      {/* Image Slider */}
      <div class="relative">
        <Slider class="carousel carousel-center gap-6 w-full sm:w-[40vw]">
          {images.map((img, index) => {
            if (!img.url) return null;
            const optimizedURL = img.url.replace(imageURL, "$1$2-664-664$3");
            return (
              <Slider.Item
                index={index}
                class="carousel-item w-full"
              >
                <Image
                  class="w-full"
                  sizes="(max-width: 640px) 100vw, 40vw"
                  // style={{ aspectRatio }}
                  src={optimizedURL}
                  alt={img.alternateName}
                  width={664}
                  height={664}
                  // Preload LCP image for better web vitals
                  preload={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </Slider.Item>
            );
          })}
        </Slider>

        {
          /* <Slider.PrevButton
          class="no-animation absolute left-2 top-1/2 btn btn-circle btn-outline"
          disabled
        >
          <Icon size={24} id="ChevronLeft" strokeWidth={3} />
        </Slider.PrevButton>

        <Slider.NextButton
          class="no-animation absolute right-2 top-1/2 btn btn-circle btn-outline"
          disabled={images.length < 2}
        >
          <Icon size={24} id="ChevronRight" strokeWidth={3} />
        </Slider.NextButton> */
        }

        <div class="absolute top-2 right-2 bg-base-100 rounded-full">
          <ProductImageZoom
            images={images}
            width={664}
            height={664}
          />
        </div>
      </div>

      {/* Dots */}
      <ul class="flex flex-wrap gap-1 px-4 sm:px-0">
        {images.map((img, index) => {
          if (!img.url) return null;
          const optimizedURL = img.url.replace(imageURL, "$1$2-160-160$3");
          return (
            <li class="carousel-item">
              <Slider.Dot index={index}>
                <Image
                  // style={{ aspectRatio }}
                  class="group-disabled:border-base-300 border rounded object-cover object-center w-[160px] h-[90px]"
                  src={optimizedURL}
                  width={160}
                  height={90}
                  alt={img.alternateName}
                />
              </Slider.Dot>
            </li>
          );
        })}
      </ul>

      <SliderJS rootId={id} />
    </div>
  );
}
