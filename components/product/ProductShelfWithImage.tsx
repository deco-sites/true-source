import type { ImageWidget } from "apps/admin/widgets.ts";
import type { Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import type { AppContext } from "deco-sites/true-source/apps/site.ts";
import ProductCard from "deco-sites/true-source/components/product/ProductCard.tsx";
import Icon from "deco-sites/true-source/components/ui/Icon.tsx";
import Slider from "deco-sites/true-source/components/ui/Slider.tsx";
import SliderJS from "deco-sites/true-source/islands/SliderJS.tsx";
import { GrayBackgroundProps } from "deco-sites/true-source/sdk/types.ts";
import { useId } from "deco-sites/true-source/sdk/useId.ts";

interface ImageProps {
  /**
   * @title Imagem
   */
  src: ImageWidget;
  /**
   * @title Titulo
   */
  title: string;
}

export interface Props extends GrayBackgroundProps {
  /**
   * @title Produtos
   */
  products: Product[] | null;
  desktop: ImageProps;
  mobile: ImageProps;
  /**
   * @title Banner URL
   * @description URL do banner
   */
  bannerUrl?: string;
}

function ProductShelf({
  products,
  isMobile,
  desktop,
  mobile,
  bannerUrl,
  bottomRounded,
  grayBackground,
  topRounded,
}: ReturnType<typeof loader>) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  const Wrapper = bannerUrl ? "a" : "div";
  const props = bannerUrl ? { href: bannerUrl } : {};

  return (
    <div
      class={"flex flex-col lg:flex-row items-center justify-between md:px-10 px-4 gap-x-10 gap-y-6 pt-16 pb-24 max-w-[1448px] mx-auto" +
        (
          grayBackground ? " bg-ice" : ""
        ) + (
          topRounded ? " rounded-t-[20px] md:rounded-t-[40px]" : ""
        ) + (
          bottomRounded ? " rounded-b-[20px] md:rounded-b-[40px]" : ""
        )}
      id={id}
    >
      <Wrapper
        {...props}
        class="block relative rounded-[20px] overflow-hidden max-lg:w-[95%] max-lg:mx-auto max-lg:max-w-[500px]"
      >
        <Icon
          id="ShelfWithImageChevron"
          width={30}
          height={60}
          class="text-white absolute top-1/2 -translate-y-1/2 right-10"
        />
        <Image
          src={isMobile ? mobile.src : desktop.src}
          alt={isMobile ? mobile.title : desktop.title}
          width={isMobile ? 450 : 320}
          height={isMobile ? 260 : 450}
          class="h-[260px] max-lg:w-full lg:h-[450px] object-cover"
        />
        <span class="text-white font-bold font-lemon text-lg leading-6 max-w-[200px] absolute bottom-10 left-10">
          {isMobile ? mobile.title : desktop.title}
        </span>
      </Wrapper>

      <div class="w-full max-w-[800px] lg:max-w-[600px] xl:max-w-[860px] flex flex-col gap-8">
        <div class="relative mx-auto w-[95%]">
          <Slider class="carousel gap-4 w-full">
            {products?.map((product, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-[calc(75%-18px+(18px/2))] sm:w-[calc(42.5%-18px+(18px/2))] xl:w-[calc(33.333333%-18px+((18px)/3))]"
              >
                <ProductCard
                  product={product}
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
                <div
                  class={"w-2 h-2 rounded-full group-data-[active]:bg-dark transition-colors" +
                    (
                      grayBackground ? " bg-gray" : " bg-ice"
                    )}
                />
              </Slider.Dot>
            ))}
          </div>

          <SliderJS rootId={id} dotIsPage />
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
