import type { Product } from "apps/commerce/types.ts";
import type { AppContext } from "deco-sites/true-source/apps/site.ts";
import ProductCard from "deco-sites/true-source/components/product/ProductCard.tsx";
import Icon from "deco-sites/true-source/components/ui/Icon.tsx";
import Slider from "deco-sites/true-source/components/ui/Slider.tsx";
import SliderJS from "deco-sites/true-source/islands/SliderJS.tsx";
import { useId } from "deco-sites/true-source/sdk/useId.ts";

export interface Props {
  products: Product[] | null;
  title?: string;
}

function ProductShelf({
  products,
  title,
  isMobile,
}: ReturnType<typeof loader>) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full max-w-[1440px] mx-auto flex flex-col gap-8 pt-16 pb-24">
      <h2 class="text-dark font-bold text-lg font-lemon text-center">
        {title}
      </h2>

      <div id={id} class="relative mx-auto w-[95%]">
        <Slider class="carousel gap-4 w-full">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[calc(75%-18px+(18px/2))] sm:w-[calc(42.5%-18px+(18px/3))] md:w-[calc(33.333333%-18px+((18px)/3))] lg:w-[calc(25%-18px+((18px)/4))] xl:w-[calc(20%-18px+((18px)/5))] first:ml-auto last:mr-auto"
            >
              <ProductCard
                product={product}
                itemListName={title}
                index={index}
                isMobile={isMobile}
              />
            </Slider.Item>
          ))}
        </Slider>

        <Slider.PrevButton class="hidden lg:flex absolute top-1/2 -left-8 -translate-y-1/2 w-14 h-14 bg-white border-2  border-Stroke rounded-full justify-center items-center disabled:pointer-events-none disabled:opacity-0 transition-opacity">
          <Icon size={24} id="ArrowRight" class="text-dark rotate-180" />
        </Slider.PrevButton>

        <Slider.NextButton class="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 w-14 h-14 bg-white border-2  border-Stroke rounded-full justify-center items-center disabled:pointer-events-none disabled:opacity-0 transition-opacity">
          <Icon size={24} id="ArrowRight" class="text-dark" />
        </Slider.NextButton>

        <div class="absolute top-[calc(100%+48px)] left-1/2 -translate-x-1/2 flex items-center gap-3">
          {products.map((_, index) => (
            <Slider.Dot index={index} class="group">
              <div class="w-2 h-2 rounded-full bg-ice group-data-[active]:bg-dark transition-colors" />
            </Slider.Dot>
          ))}
        </div>

        <SliderJS rootId={id} dotIsPage />
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
