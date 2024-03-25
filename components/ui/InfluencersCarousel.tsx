import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "deco-sites/true-source/components/ui/Icon.tsx";
import { useId } from "deco-sites/true-source/sdk/useId.ts";
import Slider from "deco-sites/true-source/components/ui/Slider.tsx";
import SliderJS from "deco-sites/true-source/components/ui/SliderJS.tsx";
import { LoaderContext } from "deco/mod.ts";
import RenderHTML from "deco-sites/true-source/components/ui/RenderHTML.tsx";

/** @titleBy name */
export interface Card {
  /** @title Imagem */
  image: ImageWidget;
  /** @title Nome do influenciador */
  name: string;
  /** @title Profissão do influenciador  */
  occupation: string;
  /** @title Texto de descrição do influenciador  */
  description: HTMLWidget;
  user: string;
}

export interface Props {
  /** @title Título */
  title?: string;
  /** @title Cards */
  cards: Card[];
  isMobile?: boolean;
}

function InfluencersCarousel({ title, cards, isMobile }: Props) {
  const id = useId();

  const dotIsPage = isMobile ? false : true;

  return (
    <div
      id={id}
      class="w-full max-w-[1440px] py-6 mx-auto flex flex-col pl-4 md:pl-0"
    >
      {title && (
        <div class="flex flex-col items-center gap-5">
          <div class="flex items-center gap-2">
            {[...Array(5)].map(() => (
              <Icon id="RatingStar" size={13} class="" />
            ))}
          </div>
          <h2 class="text-center font-lemon-milk text-dark font-bold text-[18px] leading-[24px]">
            {title}
          </h2>
        </div>
      )}

      <div class="relative w-full max-w-[1232px] mx-auto">
        <Slider class="carousel gap-2 col-span-full max-w-full md:max-w-[1232px] mx-auto mt-[32px]">
          {cards.map((
            { image, name, occupation, user, description },
            index,
          ) => (
            <Slider.Item index={index} class="flex carousel-item group">
              <div class="relative">
                <Image
                  src={image}
                  alt={name}
                  width={302}
                  height={450}
                  class="w-full h-full max-w-[196px] max-h-[272px] md:max-w-[302px] md:max-h-[450px] rounded-[10px] brightness-90 group-hover:brightness-100 object-cover"
                />
                <div class="flex flex-col gap-4 absolute bottom-0 left-0 p-6 text-white group-hover:opacity-0 transition-all ease-in-out duration-150">
                  <strong class="text-sm">{name}</strong>
                  <span class="text-xs font-medium hidden md:block">
                    {occupation}
                  </span>
                  <span class="text-xs font-medium md:hidden">
                    {occupation.split(" ")[0]}
                  </span>
                  <span class="text-xs font-medium bg-gradient-to-r from-[#E4003F] from-35% to-[#e8530e] to-90% rounded-full p-2 max-w-fit">
                    {user}
                  </span>
                </div>
                <div class="absolute bottom-0 left-0 p-6 text-white text-xs md:text-sm font-medium opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-150">
                  <RenderHTML html={description} />
                </div>
              </div>
            </Slider.Item>
          ))}
        </Slider>

        <>
          <Slider.PrevButton>
            <div class="hidden md:flex absolute top-[calc(50%-16px)] left-3 xl:left-[-60px] w-14 h-14 bg-white border border-stroke hover:bg-light-gray-200 justify-center items-center rounded-full transition-all ease-in-out duration-[400ms] cursor-pointer z-20">
              <Icon
                class="rotate-180"
                width={16}
                height={12}
                id="ArrowNarrowRight"
                strokeWidth={3}
              />
            </div>
          </Slider.PrevButton>
          <Slider.NextButton>
            <div class="hidden md:flex absolute top-[calc(50%-16px)] right-3 xl:right-[-60px] w-14 h-14 bg-white border border-stroke hover:bg-light-gray-200 justify-center items-center rounded-full transition-all ease-in-out duration-[400ms] cursor-pointer z-20 ">
              <Icon
                class=""
                width={16}
                height={12}
                id="ArrowNarrowRight"
                strokeWidth={3}
              />
            </div>
          </Slider.NextButton>

          <div class="mt-8 w-full h-fit grid place-items-center">
            <ul class="carousel z-10 justify-center gap-1 flex-wrap">
              {cards?.map((_, i) => (
                <li class="carousel-item">
                  <Slider.Dot index={i}>
                    <div
                      id={`${id}--${i}`}
                      class="w-[5px] h-[5px] bg-ice rounded-full group-data-[active]:bg-dark duration-300"
                    />
                  </Slider.Dot>
                </li>
              ))}
            </ul>
          </div>
        </>
        <SliderJS rootId={id} dotIsPage={dotIsPage} />
      </div>
    </div>
  );
}

export default InfluencersCarousel;

export const loader = (
  { ...props }: Props,
  req: Request,
  ctx: LoaderContext,
) => {
  const isMobile = ctx.device === "mobile";

  return { ...props, isMobile };
};
