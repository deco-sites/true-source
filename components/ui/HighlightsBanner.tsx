import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { GrayBackgroundProps } from "deco-sites/true-source/sdk/types.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

/** @titleBy productName */
export interface Card {
  /** @title Imagem */
  image: {
    desktopSrc: ImageWidget;
    mobileSrc: ImageWidget;
    alt: string;
  };
  /** @title Tag */
  tag?: string;
  /** @title Nome do produto */
  productName?: string;
  /** @title Descrição do produto */
  productDescription?: string;
  /** @title Url do produto */
  url?: string;
}

export interface Props extends GrayBackgroundProps {
  /** @title Título */
  title?: string;
  /** @title Cards */
  cards?: Card[];
}

function HighlightsBanner(
  { title, cards, bottomRounded, grayBackground, topRounded }: Props,
) {
  return (
    <div
      class={"w-full max-w-[1448px] mx-auto flex flex-col gap-8 p-4 md:p-10" + (
        grayBackground ? " bg-ice" : ""
      ) + (
        topRounded ? " rounded-t-[20px] md:rounded-t-[40px]" : ""
      ) + (
        bottomRounded ? " rounded-b-[20px] md:rounded-b-[40px]" : ""
      )}
    >
      {title && (
        <h2 class="md:block hidden font-bold font-lemon text-[18px] text-center text-dark leading-[24px]">
          {title}
        </h2>
      )}
      <div class="flex md:flex-row flex-col justify-between items-center gap-4">
        {cards?.map(({ image, tag, productName, productDescription, url }) => (
          <a
            href={url}
            class="relative rounded-[20px] w-full overflow-clip group"
          >
            <Picture>
              <Source
                width={660}
                height={450}
                media="(min-width: 768px)"
                src={image.desktopSrc}
              />
              <Source
                width={358}
                height={217}
                media="(max-width: 767px)"
                src={image.mobileSrc}
              />
              <img
                src={image.desktopSrc}
                alt={image.alt}
                class="group-hover:scale-105 rounded-[20px] w-full transition-all duration-500 object-cover"
              />
            </Picture>
            <span class="top-6 md:top-10 left-6 md:left-10 absolute bg-ice px-3 py-2 rounded-full font-bold font-lemon-milk text-[13px] text-dark leading-[17px]">
              {tag}
            </span>

            <div class="bottom-6 md:bottom-10 left-6 md:left-10 absolute flex flex-col max-w-[175px]">
              <strong class="text-ice">{productName}</strong>
              <span class="text-ice text-sm">{productDescription}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default HighlightsBanner;
