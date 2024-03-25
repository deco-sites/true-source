import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { LoaderContext } from "deco/mod.ts";
import Icon from "deco-sites/true-source/components/ui/Icon.tsx";

/**  @titleBy alt */
export interface Banner {
  /** @description Imagem para desktop */
  desktopSrc: ImageWidget;
  /** @description Altura da imagem para desktop */
  desktopHeight: number;
  /** @description Imagem para mobile */
  mobileSrc: ImageWidget;
  /** @description Altura da imagem para mobile */
  mobileHeight: number;
  /** @description Texto alternativo da imagem */
  alt: string;
}

export interface Content {
  /** @title Texto de destaque acima do título */
  tag?: string;
  /**
   * @title Título
   * @format textarea
   */
  title?: string;
  /**
   * @title Descrição
   * @format textarea
   */
  description?: string;
  /** @title Botão de cta */
  cta?: {
    text: string;
    link: string;
  };
}

export interface Props {
  /** @title Imagens  */
  banner: Banner;
  /** @title Conteúdo do banner */
  content?: Content;
  /** @title Items que ficam ao lado do banner */
  items?: string[];
  /** @description Check this option when this banner is the biggest image on the screen for image optimizations */
  preload?: boolean;
  isMobile?: boolean;
}

function BannerInfoWithItems(
  { banner, preload, isMobile, content, items }: Props,
) {
  const { mobileSrc, desktopSrc, alt, mobileHeight, desktopHeight } = banner;
  const height = isMobile ? mobileHeight : desktopHeight;

  return (
    <div
      class={"w-full  relative"}
    >
      <Picture preload={preload}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={preload ? "high" : "auto"}
          src={mobileSrc}
          width={360}
          height={mobileHeight}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={preload ? "high" : "auto"}
          src={desktopSrc}
          width={1440}
          height={desktopHeight}
        />
        <img
          class="object-cover w-full rounded-b-[20px]"
          loading={preload ? "eager" : "lazy"}
          src={desktopSrc}
          alt={alt}
          style={{ height: `${height}px` }}
        />
      </Picture>

      <div
        class={"absolute top-0 w-full max-w-[1440px] mx-auto h-full grid grid-rows-[auto_auto_40px] md:grid-rows-1 md:grid-cols-2 place-content-center md:items-center right-0 left-0 text-left md:justify-start px-[17px] md:px-20 lg:px-[182px]"}
      >
        <div
          class={"flex flex-col items-start"}
        >
          {content?.tag &&
            (
              <span class="font-inter mb-6 font-lemon-milk font-bold text-[18px] fontWithGradient">
                {content.tag}
              </span>
            )}

          {content?.title &&
            (
              <h2 class="font-lemon-milk font-bold text-ice mb-8 text-[24px] md:text-[40px] leading-[24px] md:leading-[42px]">
                {content.title}
              </h2>
            )}

          {content?.description &&
            (
              <p class="font-inter text-sm md:text-[16px] font-medium leading-[22px] md:leading-[27px] text-ice mb-8">
                {content.description}
              </p>
            )}

          {content?.cta && (
            <a
              href={content.cta.link}
              class="hidden md:flex items-center gap-[10px] uppercase font-lemon-milk font-bold text-[13px] leading-[17px] text-ice py-[15px] px-6 rounded-full 
                bg-gradient-to-r from-[#E4003F] from-35% to-[#e8530e] to-90% max-w-fit group hover:bg-white border 
                border-transparent hover:border-red hover:fontWithGradient cursor-pointer max-h-[40px]"
            >
              {content.cta.text}
              <Icon
                id="ArrowRight"
                size={16}
                class="text-white group-hover:text-red"
              />
            </a>
          )}
        </div>
        <div class="flex flex-col md:flex-row items-center gap-x-4">
          {items?.map((item) => (
            <div class="grid grid-cols-[auto_1fr] md:grid-cols-1 md:grid-rows-[auto_1fr] border-b last:border-b-0 md:last:border-b md:border border-ice md:rounded-[20px] py-6 md:px-6 text-sm md:text-[16px] text-ice leading-[19px] font-medium md:font-bold gap-6 w-full md:w-[185px] md:h-[185px]">
              <Icon id="CheckCircle" size={24} class="text-red md:text-ice" />
              <span>
                {item}
              </span>
            </div>
          ))}
        </div>
        {content?.cta && (
          <a
            href={content.cta.link}
            class="flex md:hidden items-center gap-[10px] uppercase font-lemon-milk font-bold text-[13px] leading-[17px] text-ice py-[15px] px-6 rounded-full 
                bg-gradient-to-r from-[#E4003F] from-35% to-[#e8530e] to-90% max-w-fit group hover:bg-white border 
                border-transparent hover:border-red hover:fontWithGradient cursor-pointer max-h-[40px] whitespace-nowrap"
          >
            {content.cta.text}
            <Icon
              id="ArrowNarrowRight"
              size={16}
              class="text-white group-hover:text-red"
            />
          </a>
        )}
      </div>
    </div>
  );
}

export default BannerInfoWithItems;

export const loader = (
  { ...props }: Props,
  req: Request,
  ctx: LoaderContext,
) => {
  const isMobile = ctx.device === "mobile";

  return { ...props, isMobile };
};
