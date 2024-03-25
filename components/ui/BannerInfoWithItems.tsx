import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { LoaderContext } from "deco/mod.ts";
import RenderHTML from "deco-sites/true-source/components/ui/RenderHTML.tsx";
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

const roundedMapping = {
  bottom: "rounded-b-[20px]",
  top: "rounded-t-[20px]",
  full: "rounded-[20px]",
};

const tagSizeMapping = {
  small: "text-[14px] md:text-[16px]",
  medium: "text-[14px] md:text-[18px]",
};

const tagColorMapping = {
  white: "text-ice",
  gradientRed: "fontWithGradient",
};

const titleSizeMapping = {
  medium: "text-[24px] md:text-[40px] leading-[24px] md:leading-[42px]",
  large: "text-[24px] md:text-[50px] leading-[24px] md:leading-[52px]",
};

export interface Content {
  /** @title Texto de destaque acima do título */
  tag?: {
    text?: string;
    color?: "white" | "gradientRed";
    size?: "small" | "medium";
    /** @title Letras em caixa alta */
    upperCase?: boolean;
    /** @title Letras em caixa alta */
    divider?: boolean;
  };
  /** @title Título */
  title?: HTMLWidget;
  /** @title Tamanho do título */
  titleSize?: "medium" | "large";
  /** @title Descrição */
  description?: HTMLWidget;
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
  /** @title Banner é arredondado? */
  rounded?: "bottom" | "top" | "full";
  /** @title Items que ficam ao lado do banner */
  items?: string[];
  /** @description Check this option when this banner is the biggest image on the screen for image optimizations */
  preload?: boolean;
  isMobile?: boolean;
}

function BannerInfoWithItems(
  { banner, preload, isMobile, rounded, content, items }: Props,
) {
  const { mobileSrc, desktopSrc, alt, mobileHeight, desktopHeight } = banner;
  const height = isMobile ? mobileHeight : desktopHeight;

  return (
    <div
      class={"w-full max-w-[1440px] mx-auto relative"}
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
          height={600}
        />
        <img
          class={`object-cover w-full 
          ${rounded && roundedMapping[rounded]} 
          `}
          loading={preload ? "eager" : "lazy"}
          src={desktopSrc}
          alt={alt}
          style={{ height: `${height}px` }}
        />
      </Picture>

      <div
        class={"absolute top-0 w-full h-full grid grid-rows-[auto_auto_40px] md:grid-rows-1 md:grid-cols-2 place-content-center md:items-center right-0 left-0 text-left md:justify-start px-[17px] md:px-20 lg:px-[126px]"}
      >
        <div
          class={"flex flex-col items-start"}
        >
          {content?.tag &&
            (
              <span
                class={`font-inter font-medium mb-6 
                ${content.tag.upperCase && "font-lemon-milk font-bold"}
                ${
                  content.tag.size
                    ? tagSizeMapping[content.tag.size]
                    : "text-[18px]"
                }
                ${
                  content.tag.color
                    ? tagColorMapping[content.tag.color]
                    : "text-ice"
                }
              `}
              >
                {content.tag.text}
              </span>
            )}

          {content?.tag?.divider && (
            <div class="w-full max-w-[475] border-b border-light-gray mb-8" />
          )}

          {content?.title &&
            (
              <RenderHTML
                html={content.title}
                class={`font-lemon-milk font-bold text-ice mb-8 
                ${
                  content.titleSize
                    ? titleSizeMapping[content.titleSize]
                    : "text-[24px] md:text-[40px] leading-[24px] md:leading-[42px]"
                }`}
              />
            )}

          {content?.description &&
            (
              <RenderHTML
                html={content.description}
                class="font-inter text-sm md:text-[16px] font-medium leading-[22px] md:leading-[27px] text-ice mb-8"
              />
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
            <div class="grid grid-cols-[auto_1fr] md:grid-cols-1 md:grid-rows-[auto_1fr] border-b last:border-b-0 md:last:border-b md:border border-ice md:rounded-[20px] py-6 md:px-6 text-sm md:text-[16px] text-ice leading-[19px] font-medium md:font-bold gap-6 w-full md:w-[185px] min-h-fit">
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
