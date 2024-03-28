import type { ImageWidget } from "apps/admin/widgets.ts";
import type { Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import type { AppContext } from "deco-sites/true-source/apps/site.ts";
import ProductCard, {
  productToProductCardProps,
} from "deco-sites/true-source/components/product/ProductCard.tsx";
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
  /**
   * @title Remover espaçamento do topo
   * @default false
   */
  removePaddingTop?: boolean;
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
  removePaddingTop = false,
}: ReturnType<typeof loader>) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  const Wrapper = bannerUrl ? "a" : "div";
  const props = bannerUrl ? { href: bannerUrl } : {};

  return (
    <div
      class={"flex flex-col lg:flex-row items-center justify-start md:px-10 px-4 gap-x-10 gap-y-6 pb-24 max-w-[1448px] mx-auto" +
        (
          grayBackground ? " bg-ice" : ""
        ) + (
          topRounded ? " rounded-t-[20px] md:rounded-t-[40px]" : ""
        ) + (
          bottomRounded ? " rounded-b-[20px] md:rounded-b-[40px]" : ""
        ) + (
          removePaddingTop ? " pt-0" : " pt-16"
        )}
      id={id}
    >
      <Wrapper
        {...props}
        class="block relative max-lg:mx-auto rounded-[20px] max-lg:w-[95%] max-lg:max-w-[500px] overflow-hidden"
      >
        <Icon
          id="ShelfWithImageChevron"
          width={30}
          height={60}
          class="top-1/2 right-10 absolute text-white -translate-y-1/2"
        />
        <Image
          src={isMobile ? mobile.src : desktop.src}
          alt={isMobile ? mobile.title : desktop.title}
          width={isMobile ? 450 : 320}
          height={isMobile ? 260 : 450}
          class="max-lg:w-full h-[260px] lg:h-[450px] object-cover"
        />
        <span class="bottom-10 left-10 absolute max-w-[200px] font-bold font-lemon text-lg text-white leading-6">
          {isMobile ? mobile.title : desktop.title}
        </span>
      </Wrapper>

      <div class="flex flex-col gap-8 w-full max-w-[800px] lg:max-w-[600px] xl:max-w-[860px]">
        <div class="relative mx-auto w-[95%]">
          <Slider class="carousel gap-4 w-full">
            {products?.map((product, index) => {
              return (
                <Slider.Item
                  index={index}
                  class="carousel-item w-[calc(75%-18px+(18px/2))] sm:w-[calc(42.5%-18px+(18px/2))] xl:w-[calc(33.333333%-18px+((18px)/3))]"
                >
                  <ProductCard
                    {...productToProductCardProps({ product, isMobile })}
                  />
                </Slider.Item>
              );
            })}
          </Slider>

          <Slider.PrevButton class="top-1/2 -left-8 absolute lg:flex justify-center items-center border-2 border-Stroke hidden bg-white disabled:opacity-0 rounded-full w-14 h-14 transition-opacity -translate-y-1/2 disabled:pointer-events-none">
            <Icon size={24} id="ArrowRight" class="text-dark rotate-180" />
          </Slider.PrevButton>

          <Slider.NextButton class="top-1/2 -right-4 absolute lg:flex justify-center items-center border-2 border-Stroke hidden bg-white disabled:opacity-0 rounded-full w-14 h-14 transition-opacity -translate-y-1/2 disabled:pointer-events-none">
            <Icon size={24} id="ArrowRight" class="text-dark" />
          </Slider.NextButton>

          <div class="top-[calc(100%+48px)] left-1/2 absolute flex items-center gap-3 -translate-x-1/2">
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
