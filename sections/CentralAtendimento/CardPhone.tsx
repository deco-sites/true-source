import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Image from "apps/website/components/Image.tsx";

interface ImgProps {
  img: ImageWidget;
  imgWidth: number;
  imgHeight: number;
  icon1: ImageWidget;
  icon2: ImageWidget;
}

interface Props {
  title: string;
  number1: string;
  number2: string;
}

export default function CardPhone(
  { img, imgWidth, imgHeight, icon1, icon2, title, number1, number2 }: ImgProps & Props,
) {
  return (
    <div class="flex w-full">
      <div class="flex h-[107px] justify-center items-center w-full flex-row gap-4 bg-white p-6 border rounded-xl border-light-gray drop-shadow-md">
          <Image
            src={img}
            width={imgWidth}
            height={imgHeight}
          />
        <div class="flex w-full h-full flex-col justify-start">
          <p class="font-lemon-milk text-[12px] sm:text-[14px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#E4003F] to-[#E9530E] text-nowrap">
            {title}
          </p>
          <div class="flex flex-row gap-2">
            <Image
              src={icon1}
              width={16}
              height={16}
            />
            <p class="font-lemon-milk left-[24px] text-[14px] underline">
              {number1}
            </p>
          </div>

          <div class="flex flex-row gap-2">
            <span class="[&>svg]:h-[16px] [&>svg]:w-[16px] [&>svg]:fill-[#128c7e]">
              <Image
                src={icon2}
                width={16}
                height={16}
              />
            </span>
            <p class="font-lemon-milk left-[24px] text-[14px] underline">
              {number2}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
