import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy text
 */
export interface Benefit {
  icon: ImageWidget;
  text: HTMLWidget;
}

export interface BenefitsType {
  benefits: Benefit[];
  color?: string;
}

export default function Benefits({
  benefits = [{
    icon:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4232/b6b56684-9e26-4280-aab8-e403c28dd229",
    text: "Lorem ipsum dolor sit amet, **consectetur adipiscing** elit.",
  }, {
    icon:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4232/1b9160f6-359c-4db7-aec3-38cd90c952d8",
    text: "Lorem ipsum dolor sit amet, **consectetur adipiscing** elit.",
  }, {
    icon:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4232/1447a4af-bff0-4129-bae3-bbef83c72b74",
    text: "Lorem ipsum dolor sit amet, **consectetur adipiscing** elit.",
  }, {
    icon:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4232/5eef14d7-2499-43c9-88b3-e2afc3374604",
    text: "Lorem ipsum dolor sit amet, **consectetur adipiscing** elit.",
  }],
  color = "#3C3C3B",
}: BenefitsType) {
  if (!IS_BROWSER) return null;

  useEffect(() => {
    // @ts-expect-error - swiper exists
    new Swiper("#benefits", {
      spaceBetween: 16,
      slidesPerView: "auto",
      centerInsufficientSlides: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }, []);

  return (
    <div>
      <h2
        class="w-full uppercase text-center text-base lg:text-lg font-bold mb-10 font-lemon-milk"
        style={{ color: color }}
      >
        Principais benefícios
      </h2>
      <div id="benefits" class="swiper">
        <div class="swiper-wrapper">
          {benefits.map((benefit) => {
            const {
              icon,
              text,
            } = benefit;

            return (
              <div class="swiper-slide !w-[238px] sm:!w-[350px]  first:ml-4 last:mr-4">
                <div class="flex flex-none items-center gap-6 bg-ice px-4 py-3 rounded-lg text-sm lg:text-base h-full">
                  <div class="w-[48px] sm:w-[80px] flex-none">
                    <img
                      class="w-[48px] sm:w-[80px] h-auto"
                      width={80}
                      height={80}
                      src={icon}
                    />
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: text }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div class="swiper-pagination" />
    </div>
  );
}
