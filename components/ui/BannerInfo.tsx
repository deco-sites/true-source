import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { LoaderContext } from "deco/mod.ts";
import RenderHTML from "deco-sites/true-source/components/ui/RenderHTML.tsx";
import Icon from "deco-sites/true-source/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";

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

const textPositionMapping = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-left justify-end",
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
  /** @title Imagem acima do título */
  image?: {
    src?: ImageWidget;
    width?: number;
    height?: number;
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
  /** @title Posição do texto */
  textPosition?: "left" | "center" | "right";
  /** @title Conteúdo do banner */
  content?: Content;
  /** @title Banner é arredondado? */
  rounded?: "bottom" | "top" | "full";
  /** @title Banner com espaçamento nas laterais */
  hasPadding?: boolean;
  /** @description Check this option when this banner is the biggest image on the screen for image optimizations */
  preload?: boolean;
  isMobile?: boolean;
}

function BannerInfo(
  { banner, preload, isMobile, rounded, content, textPosition, hasPadding }:
    Props,
) {
  const { mobileSrc, desktopSrc, alt, mobileHeight, desktopHeight } = banner;
  const height = isMobile ? mobileHeight : desktopHeight;

  return (
    <div
      class={`w-full max-w-[1440px] mx-auto relative ${
        hasPadding && "px-[17px] md:px-10"
      } `}
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
        class={`absolute top-0 w-full h-full flex items-center right-0 left-0 
        ${
          hasPadding
            ? "px-[30px] md:px-20 lg:px-[166px]"
            : "px-[30px] md:px-20 lg:px-[126px]"
        } 
        ${
          textPosition
            ? textPositionMapping[textPosition]
            : "text-center justify-center"
        }`}
      >
        <div
          class={`flex flex-col  
        ${textPosition === "center" ? "items-center" : "items-start"}`}
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

          {content?.image &&
            (
              <Image
                src={content?.image.src || ""}
                width={content?.image.width || 0}
                height={content?.image.height || 0}
                alt=""
                class={`mb-6`}
              />
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
              class="flex items-center gap-[10px] uppercase font-lemon-milk font-bold text-[13px] leading-[17px] text-ice py-[15px] px-6 rounded-full 
                bg-gradient-to-r from-[#E4003F] from-35% to-[#e8530e] to-90% max-w-fit group hover:bg-white border 
                border-transparent hover:border-red hover:fontWithGradient cursor-pointer max-h-[40px]"
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
    </div>
  );
}

export default BannerInfo;

export const loader = (
  { ...props }: Props,
  req: Request,
  ctx: LoaderContext,
) => {
  const isMobile = ctx.device === "mobile";

  return { ...props, isMobile };
};
