import type { Product } from "apps/commerce/types.ts";
import { AppContext } from "deco-sites/true-source/apps/site.ts";
import ProductCard from "deco-sites/true-source/components/product/ProductCard.tsx";
import Icon from "deco-sites/true-source/components/ui/Icon.tsx";
import Slider from "deco-sites/true-source/components/ui/Slider.tsx";
import SliderJS from "deco-sites/true-source/islands/SliderJS.tsx";
import { useId } from "deco-sites/true-source/sdk/useId.ts";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface ImageProps {
  src: ImageWidget;
  title: string;
}

export interface Props {
  products: Product[] | null;
  image: ImageProps;
}

function ProductShelf({
  products,
  isMobile,
  image,
}: ReturnType<typeof loader>) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class='flex flex-col sm:flex-row items-center justify-center gap-10'>
      <div class="relative rounded-[20px] overflow-hidden -translate-y-4">
        <Image src={image.src} alt={image.title} width={320} height={450} class='h-[450px]' />
        <span class="text-white font-bold font-lemon text-lg leading-6 max-w-[200px] absolute bottom-10 left-10">
          {image.title}
        </span>
      </div>

      <div class="w-full max-w-[860px] flex flex-col gap-8 pt-16 pb-24">
        <div id={id} class="relative mx-auto w-[95%]">
          <Slider class="carousel gap-4 w-full">
            {products?.map((product, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-[calc(50%-18px+(18px/2))] md:w-[calc(33.333333%-18px+((18px)/3))]"
              >
                <ProductCard
                  product={product}
                  index={index}
                  isMobile={isMobile}
                />
              </Slider.Item>
            ))}
          </Slider>

          <Slider.PrevButton class="absolute top-1/2 -left-8 -translate-y-1/2 w-14 h-14 bg-white border-2  border-Stroke rounded-full flex justify-center items-center disabled:pointer-events-none disabled:opacity-0 transition-opacity">
            <Icon size={24} id="ArrowRight" class="text-dark rotate-180" />
          </Slider.PrevButton>

          <Slider.NextButton class="absolute top-1/2 -right-4 -translate-y-1/2 w-14 h-14 bg-white border-2  border-Stroke rounded-full flex justify-center items-center disabled:pointer-events-none disabled:opacity-0 transition-opacity">
            <Icon size={24} id="ArrowRight" class="text-dark" />
          </Slider.NextButton>

          <div class="absolute top-[calc(100%+48px)] left-1/2 -translate-x-1/2 flex items-center gap-3">
            {products.map((_, index) => (
              <Slider.Dot index={index} class="group">
                <div class="w-2 h-2 rounded-full bg-ice group-disabled:bg-dark transition-colors" />
              </Slider.Dot>
            ))}
          </div>

          <SliderJS rootId={id} />
        </div>
      </div>
    </div>
  );
}

export function loader(props: Props, req: Request, ctx: AppContext) {
  return {
    ...props,
    isMobile: ctx.device !== "desktop",
  };
}

export default ProductShelf;
