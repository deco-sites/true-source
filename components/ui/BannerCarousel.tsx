import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import {
  SendEventOnClick,
  SendEventOnView,
} from "deco-sites/true-source/components/Analytics.tsx";
import Icon from "deco-sites/true-source/components/ui/Icon.tsx";
import Slider from "deco-sites/true-source/components/ui/Slider.tsx";
import BannerCarouselJS from "deco-sites/true-source/islands/BannerCarouselJS.tsx";
import { useId } from "deco-sites/true-source/sdk/useId.ts";

interface ImageProps {
  /**
   * @title Imagem
   */
  src: ImageWidget;
  /**
   * @title Largura
   * @description Largura da imagem
   */
  width: number;
  /**
   * @title Altura
   * @description Altura da imagem
   */
  height: number;
}

/**
 * @title {{alt}}
 */
export interface Banner {
  /**
   * @description Imagem para desktop
   */
  desktop: ImageProps;
  /**
   * @description Imagem para mobile
   */
  mobile: ImageProps;
  /**
   * @description Texto alternativo da imagem
   */
  alt: string;
}

export interface Props {
  /**
   * @title Imagens
   */
  images: Banner[];
  /**
   * @title Pré-carregar
   * @description Ative esta opção quando esse banner é a maior imagem na tela
   * @default false
   */
  preload?: boolean;
  /**
   * @title Intervalo
   * @description Intervalo de tempo que cada imagem ficará na tela, desative deixando o campo vazio
   */
  interval?: number;
}

const DEFAULT_PROPS = {
  images: [
    {
      alt: "/feminino",
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/c007e481-b1c6-4122-9761-5c3e554512c1",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
    },
    {
      alt: "/feminino",
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/c007e481-b1c6-4122-9761-5c3e554512c1",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
    },
    {
      alt: "/feminino",
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/c007e481-b1c6-4122-9761-5c3e554512c1",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
    },
  ],
  preload: false,
};

function BannerItem(
  { image, lcp, id }: { image: Banner; lcp?: boolean; id: string },
) {
  const {
    alt,
    mobile,
    desktop,
  } = image;

  return (
    <div
      id={id}
      class="relative overflow-clip w-full rounded-[35px]"
    >
      <Picture preload={lcp}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile.src}
          width={mobile.width}
          height={mobile.height}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop.src}
          width={desktop.width}
          height={desktop.height}
        />
        <Image
          class="object-cover w-full h-full"
          loading={lcp ? "eager" : "lazy"}
          src={desktop.src}
          alt={alt}
          width={desktop.width}
          height={desktop.height}
        />
      </Picture>
    </div>
  );
}

function BannerCarousel(props: Props) {
  const id = useId();
  const { images, preload, interval } = { ...DEFAULT_PROPS, ...props };

  return (
    <div class="mx-auto max-w-[1440px]">
      <div
        id={id}
        class="flex w-full px-4 relative"
      >
        <ul data-slider class="w-full grid grid-cols-1 grid-rows-1">
          {images.map((image, index) => {
            const params = { promotion_name: image.alt };
            return (
              <li
                id={`${id}::${index}`}
                data-intersecting={index === 0}
                data-item
                class="col-start-1 row-start-1 w-full data-[intersecting='true']:opacity-100 opacity-0 transition-all duration-700 pointer-events-none data-[intersecting='true']:pointer-events-auto"
              >
                <BannerItem
                  image={image}
                  lcp={index === 0 && preload}
                  id={`${id}::${index}`}
                />
                <SendEventOnClick
                  id={`${id}::${index}`}
                  event={{ name: "select_promotion", params }}
                />
                <SendEventOnView
                  id={`${id}::${index}`}
                  event={{ name: "view_promotion", params }}
                />
              </li>
            );
          })}
        </ul>
        <div class="absolute left-10 bottom-4 lg:bottom-6 right-10 flex justify-between lg:justify-end items-center gap-8 z-[1]">
          <ul class="carousel justify-center gap-3">
            {images.map((_, index) => (
              <li data-dot={index} class="carousel-item group">
                <div class="size-1.5 lg:size-2 rounded-full bg-white group-data-[active]:bg-gradient-to-tr from-red to-orange" />
              </li>
            ))}
          </ul>
          <div class="flex justify-center items-center gap-2 text-dark">
            <button
              type="button"
              data-prev={id}
              aria-label="Anterior"
              class="rounded-full bg-white px-2.5 py-1.5 lg:px-4 lg:py-2 flex justify-center items-center"
            >
              <Icon
                class="rotate-180 size-4 lg:size-6"
                id="BannerArrowRight"
                strokeWidth={2}
                strokeLinecap="round"
              />
            </button>
            <button
              type="button"
              data-next={id}
              aria-label="Próximo"
              class="rounded-full bg-white px-2.5 py-1.5 lg:px-4 lg:py-2 flex justify-center items-center"
            >
              <Icon
                class="size-4 lg:size-6"
                id="BannerArrowRight"
                strokeWidth={2}
                strokeLinecap="round"
              />
            </button>
          </div>
        </div>
        <BannerCarouselJS
          rootId={id}
          interval={interval && interval * 1e3}
        />
      </div>
    </div>
  );
}

export default BannerCarousel;
