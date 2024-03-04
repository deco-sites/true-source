import { marky } from "marky";
import { asset, IS_BROWSER } from "$fresh/runtime.ts";
import { useId } from "$store/sdk/useId.ts";
import { useEffect } from "preact/hooks";

export interface BenefitsType {
  items: Array<{
    icon: string;
    text: string;
  }>;
  color?: string;
}

export function Benefits({ items = [], color = "#3C3C3B" }: BenefitsType) {
  const id = useId();

  if (!IS_BROWSER) return null;

  useEffect(() => {
    // @ts-expect-error swiper exists
    new Swiper("#benefitsSlider", {
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      spaceBetween: 16,
      slidesPerView: "auto",
    });
  }, []);

  return (
    <div class="container">
      <div id={id} class="flex flex-wrap">
        <h2
          class="w-full uppercase text-center text-base lg:text-lg font-bold mb-10 font-lemon-milk"
          style={{ color: color }}
        >
          Principais benefícios
        </h2>
        <div
          id="benefitsSlider"
          class="w-full h-auto relative overflow-x-hidden"
        >
          <div
            class={`swiper-wrapper items-stretch ${
              items.length <= 4 && "flex justify-center"
            }`}
          >
            {items.map((item) => {
              const {
                icon,
                text,
              } = item;
              return (
                <div class="swiper-slide !w-[238px] sm:!w-[350px]">
                  <div class="h-full flex flex-none items-center gap-6 bg-ice px-4 py-3 rounded-lg text-sm lg:text-base">
                    <div class="w-[48px] sm:w-[80px] flex-none">
                      <img
                        class="w-[48px] sm:w-[80px] h-auto"
                        width={80}
                        height={80}
                        src={asset(
                          `/image/description/benefits-icons/${icon}.svg`,
                        )}
                      />
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: marky(text) }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div class="swiper-pagination" />
        </div>
      </div>
    </div>
  );
}
