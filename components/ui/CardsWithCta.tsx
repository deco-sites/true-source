import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import RenderHTML from "deco-sites/true-source/components/ui/RenderHTML.tsx";
import Icon from "deco-sites/true-source/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import { useId } from "deco-sites/true-source/sdk/useId.ts";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";
import { AppContext } from "deco-sites/true-source/apps/site.ts";

/** @titleBy text */
export interface Card {
  /** @title Ícone */
  icon: {
    src: ImageWidget;
    width: number;
    height: number;
  };
  /** @title Título */
  text?: string;
  /** @title Título com destaque */
  hasGradientColor?: boolean;
  /** @title Descrição */
  description?: string;
}

export interface Props {
  /** @title Título */
  title?: HTMLWidget;
  /** @title Descrição */
  description?: string;
  /** @title Conteúdo do card */
  cards: Card[];
  /** @title Botão de ação */
  cta?: {
    text?: string;
    url?: string;
  };
}

function CardsWithCta(
  { title, cta, cards, description, isMobile }: ReturnType<typeof loader>,
) {
  const id = useId();

  return (
    <div id={id} class="flex flex-col items-center py-16">
      {title && (
        <RenderHTML
          html={title}
          class="text-dark font-bold text-2xl md:text-[40px] uppercase font-lemon-milk md:leading-[42px] [&_strong]:text-red text-center max-w-[580px]"
        />
      )}
      {description && (
        <h2 class="font-lemon-milk text-dark font-bold text-center text-sm md:text-[18px] leading-[24px] mt-6 max-w-[580px]">
          {description}
        </h2>
      )}

      <div class="flex items-center gap-6 mt-8 md:mt-14 relative max-w-full">
        <ul data-carousel className="carousel carousel-center gap-4">
          {cards?.map((card, index) => (
            <li
              data-item={index}
              data-active={index === 0 ? "true" : "false"}
              className="carousel-item group flex items-center justify-center first:ml-[50%] last:mr-[50%] md:first:ml-0 md:last:mr-0"
            >
              <div class="w-[250px] h-full flex flex-col justify-center items-center bg-ice rounded-[20px] p-6">
                <Image
                  src={card.icon.src}
                  width={card.icon.width}
                  height={card.icon.height}
                  alt="icon"
                />
                <h3
                  class={`uppercase font-bold font-lemon-milk mt-[27px] text-center ${
                    card.hasGradientColor &&
                    "fontWithGradient text-[14px] md:text-[18px]"
                  }`}
                >
                  {card.text}
                </h3>
                {card.description && (
                  <p class="text-dark text-sm md:text-base font-medium mt-6 leading-[27px] text-center">
                    {card.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full h-fit grid place-items-center md:hidden">
          <ul data-dots class="carousel z-10 justify-center gap-2 flex-wrap">
            {cards?.map((_, index) => (
              <li
                data-dot={index}
                data-active={index === 0}
                class="size-[5px] bg-light-gray rounded-full data-[active='true']:bg-dark transition-all duration-300 cursor-pointer data-[active='true']:cursor-auto"
              />
            ))}
          </ul>
        </div>
      </div>

      {cta && (
        <a
          href={cta.url}
          class="flex items-center gap-[10px] uppercase font-lemon-milk font-bold text-[13px] leading-[17px] text-ice py-[15px] px-6 rounded-full 
          bg-gradient-to-r from-[#E4003F] from-35% to-[#e8530e] to-90% max-w-fit group hover:bg-white border 
          border-transparent hover:border-red hover:fontWithGradient cursor-pointer max-h-[40px] mt-10"
        >
          {cta.text}
          <Icon
            id="ArrowRight"
            size={16}
            class="text-white group-hover:text-red"
          />
        </a>
      )}
      <script defer src={scriptAsDataURI(script, { rootId: id, isMobile })} />
    </div>
  );
}

export function loader(props: Props, _req: Request, ctx: AppContext) {
  return { ...props, isMobile: ctx.device === "mobile" };
}

export default CardsWithCta;

interface ScriptProps {
  rootId: string;
  isMobile?: boolean;
}

function script({ rootId, isMobile }: ScriptProps) {
  const throttle = <R, A extends unknown[]>(
    fn: (...args: A) => R,
    delay: number,
  ): (...args: A) => R | undefined => {
    let wait = false;

    return ((...args: A) => {
      if (wait) return;

      const val = fn(...args);

      wait = true;

      setTimeout(() => {
        wait = false;
      }, delay);

      return val;
    });
  };

  const ATTRIBUTES = {
    CAROUSEL: "data-carousel",
    ITEM: "data-item",
    PREV: "data-prev",
    NEXT: "data-next",
    DOTS: "data-dots",
    DOT: "data-dot",
  };

  const query = (attribute: string, value?: string) =>
    value ? `[${attribute}="${value}"]` : `[${attribute}]`;

  function getElements(rootId: string) {
    const root = document.getElementById(rootId);
    if (!root) {
      throw new Error(`Element with id ${rootId} not found`);
    }

    const carouselQuery = query(ATTRIBUTES.CAROUSEL);
    const carousel = root.querySelector<HTMLElement>(carouselQuery);
    if (!carousel) {
      throw new Error(`Element with ${carouselQuery} not found`);
    }
    const prev = root.querySelector<HTMLElement>(query(ATTRIBUTES.PREV));
    const next = root.querySelector<HTMLElement>(query(ATTRIBUTES.NEXT));
    const dotsContainer = root.querySelector<HTMLElement>(
      query(ATTRIBUTES.DOTS),
    );
    const items = carousel.querySelectorAll<HTMLElement>(
      `:scope > ${query(ATTRIBUTES.ITEM)}`,
    );
    const dots = dotsContainer?.querySelectorAll<HTMLElement>(
      query(ATTRIBUTES.DOT),
    );

    return {
      carousel,
      prev,
      next,
      items,
      dots,
    };
  }

  const {
    carousel,
    prev,
    next,
    items,
    dots,
  } = getElements(rootId);
  let index = Math.floor(items.length / 2);

  if (isMobile) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.getAttribute("data-item") || "0");
        for (const [i, item] of items.entries()) {
          item.dataset.active = `${i === index}`;

          if (dots && dots.item(i)) {
            dots.item(i).dataset.active = `${i === index}`;
          }
        }
      }
    });

    for (const item of items) {
      observer.observe(item);
    }
  }

  function computeScroll() {
    const slide = items.item(Math.min(Math.max(index, 0), items.length - 1));
    if (!slide) {
      return;
    }

    for (const [i, item] of items.entries()) {
      item.dataset.active = `${i === index}`;

      if (dots && dots.item(i)) {
        dots.item(i).dataset.active = `${i === index}`;
      }
    }

    const carouselMargin = parseInt(
      getComputedStyle(carousel).getPropertyValue("margin-left"),
    ) || 0;
    const carouselWidth = carousel.offsetWidth;
    const slideWidth = slide.offsetWidth;
    const centerPos = (carouselWidth - slideWidth) / 2;
    const nextPos = slide.offsetLeft - carousel.offsetLeft + carouselMargin;
    const adjustedPos = nextPos - centerPos;
    carousel.scrollTo({
      left: adjustedPos,
      behavior: "smooth",
    });
  }

  if (dots) {
    for (const dot of dots) {
      dot.addEventListener("click", () => {
        index = parseInt(dot.dataset.dot || "0");
        computeScroll();
      });
    }
  }

  function handleNextClick() {
    index = (index + 1) % items.length;
    computeScroll();
  }

  function handlePrevClick() {
    index = (index - 1 + items.length) % items.length;
    computeScroll();
  }

  const prevClick = throttle(handlePrevClick, 500);
  const nextClick = throttle(handleNextClick, 500);

  if (prev) {
    prev.addEventListener("click", prevClick);
  }
  if (next) {
    next.addEventListener("click", nextClick);
  }
  computeScroll();
}
