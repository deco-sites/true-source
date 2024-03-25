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
    <div class="flex h-[306px] w-full flex-row gap-6 rounded-xl border border-light-gray p-14 sm:h-[223px]">
      <div class="flex relative h-[95px] w-[925px] gap-6">
        <Image
          src={srcIcon}
          width={iconHeight}
          height={iconWidth}
        />
        <div class="flex w-[278px] flex-col gap-6 sm:h-[95px] sm:w-[861px]">
          <div class="flex flex-row gap-6">
            <h2 class="font-lemon-milk flex w-full justify-start text-nowrap leading-normal tracking-tight text-[16px] font-bold text-dark sm:text-[16px] absolute top-2 sm:static">
              {titleInfoCard}
            </h2>
          </div>
          <p class="font-inter text-[14px] font-normal text-dark tracking-tighter leading-[174%] absolute top-14 left-1  sm:static">
            {descriptionInfoCard}
          </p>
        </div>
      </div>
    </div>
  );
}
