import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Image from "apps/website/components/Image.tsx";

interface IconProps {
  srcIcon: ImageWidget;
  iconWidth: number;
  iconHeight: number;
}

interface InfoCardProps {
  titleInfoCard: string;
  descriptionInfoCard: string;
}

export default function InfoCard(
  { srcIcon, iconWidth, iconHeight, titleInfoCard, descriptionInfoCard }:
    & InfoCardProps
    & IconProps,
) {
  return (
    <div class="flex flex-col h-full w-full gap-6 rounded-xl border border-light-gray p-8 md:p-16">
      <div class="flex items-center w-full max-w-[925px] gap-6">
        <Image
          src={srcIcon}
          width={iconHeight}
          height={iconWidth}
          class="h-fit"
        />
        <h2 class="font-lemon-milk flex w-full justify-start text-nowrap leading-normal tracking-tight text-[16px] font-bold text-dark sm:text-[16px]">
          {titleInfoCard}
        </h2>
        {
          /* <div class="flex w-[278px] flex-col gap-6 sm:w-[861px] mt-[7px]">
          <h2 class="font-lemon-milk flex w-full justify-start text-nowrap leading-normal tracking-tight text-[16px] font-bold text-dark sm:text-[16px]">
            {titleInfoCard}
          </h2>
          <p class="font-inter text-[14px] font-normal text-dark tracking-tighter leading-[174%] -ml-[60px] md:ml-0">
            {descriptionInfoCard}
          </p>
        </div> */
        }
      </div>
      <p class="font-inter text-[14px] font-normal text-dark tracking-tighter leading-[174%] md:ml-[65px]">
        {descriptionInfoCard}
      </p>
    </div>
  );
}
