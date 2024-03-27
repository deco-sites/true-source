import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { GrayBackgroundProps } from "deco-sites/true-source/sdk/types.ts";

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
        <h2 class="text-center font-lemon-milk text-dark font-bold text-[18px] leading-[24px]">
          {title}
        </h2>
      )}
      <div class="flex flex-col items-center md:flex-row gap-4 justify-between">
        {cards?.map(({ image, tag, productName, productDescription, url }) => (
          <a href={url} class="relative w-full">
            <Image
              src={image.desktopSrc}
              alt={image.alt}
              width={660}
              height={450}
              class="rounded-[20px] w-full object-cover hidden md:block"
            />
            <Image
              src={image.mobileSrc}
              alt={image.alt}
              width={358}
              height={217}
              class="rounded-[20px] w-full object-cover md:hidden"
            />

            <span class="absolute top-6 left-6 md:top-10 md:left-10 font-bold font-lemon-milk text-[13px] leading-[17px] text-dark bg-ice rounded-full p-3">
              {tag}
            </span>

            <div class="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex flex-col max-w-[175px]">
              <strong class="text-ice">{productName}</strong>
              <span class="text-sm text-ice ">{productDescription}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default HighlightsBanner;
