import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import RenderHTML from "deco-sites/true-source/components/ui/RenderHTML.tsx";

export default function TextSEO(
  { seoText, logo, copyrightText }: {
    seoText: HTMLWidget;
    logo: ImageWidget;
    copyrightText: string;
  },
) {
  return (
    <div class="flex flex-col items-start gap-10 lg:px-[72px] w-full pb-[117px]">
      <div class="flex flex-col md:flex-row items-start md:items-center gap-5">
        <Image src={logo} alt="logo" width={140} height={64} />
        <RenderHTML
          html={seoText}
          class="max-w-[527px] text-dark text-[11px] leading-[18px]"
        />
      </div>
      <div class="flex flex-col gap-y-10 md:flex-row justify-between items-center w-full">
        <p class=" text-dark text-[11px] leading-[13px] text-center">
          {copyrightText}
        </p>
        <span className="block max-w-[88px] h-auto">
          <img
            src="/image/VtexSeal.webp"
            alt="Vtex"
            width={174}
            height={64}
          />
        </span>
      </div>
    </div>
  );
}
