import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Image from "apps/website/components/Image.tsx";

interface ImgProps {
  img: ImageWidget;
  icon: ImageWidget;
}

interface Props {
  title: string;
  email: string;
}

export default function CardEmail(
  { img, icon, title, email }: ImgProps & Props,
) {
  return (
    <div class="flex h-[128px] w-full flex-row items-center justify-start gap-4 rounded-xl border border-light-gray bg-white p-6 drop-shadow-md">
      <div class="flex h-[80px] w-[297px] flex-col gap-4">
        <div class="flex h-[48px] w-[229px] flex-col justify-center">
          <div class="flex flex-row items-center gap-4 text-nowrap">
            <Image
              src={img}
              width={48}
              height={48}
            />

            <p class="font-lemon-milk bg-gradient-to-r from-[#E4003F] to-[#E9530E] bg-clip-text text-[12px] font-extrabold text-transparent sm:text-[14px]">
              {title}
            </p>
          </div>
        </div>
        <div class="flex h-full w-full flex-row gap-2">
          <Image
            src={icon}
            width={16}
            height={16}
          />

          <p class="font-lemon-milk text-[10px] sm:text-[14px] uppercase underline">
            {email}
          </p>
        </div>
      </div>
    </div>
  );
}
