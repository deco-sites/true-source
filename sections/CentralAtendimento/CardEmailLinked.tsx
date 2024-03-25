import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Image from "apps/website/components/Image.tsx";

interface ImgProps {
  img: ImageWidget;
  icon: ImageWidget;
  linkIcon: ImageWidget;
}

interface Props {
  title: string;
  email: string;
  link: string;
  linkText: string;
}

export default function CardEmailLinked(
  { img, icon, linkIcon, title, email, link, linkText }: ImgProps & Props,
) {
  return (
    <div class="flex h-[128px] w-full flex-row items-center justify-start gap-4 rounded-xl border border-light-gray bg-white p-6 drop-shadow-md">
      <div class="flex h-[80px] w-[297px] flex-col gap-4">
        <div class="flex h-[48px] w-[229px] flex-col justify-center">
          <div class="flex flex-row items-center gap-4">
            <Image
              src={img}
              width={32}
              height={40}
            />

            <div>
              <p class="font-lemon-milk bg-gradient-to-r from-[#E4003F] to-[#E9530E] bg-clip-text text-[12px] font-extrabold text-transparent sm:text-[14px]">
                {title}
              </p>

              <div class="flex flex-row gap-4 items-center">
                <Image
                  src={linkIcon}
                  width={16}
                  height={16}
                />
                <div class="flex w-full">
                  <a
                    href={link}
                    class="font-inter bg-gradient-to-r from-[#E4003F] to-[#E9530E] flex-wrap bg-clip-text text-[14px] font-bold text-transparent"
                  >
                    {linkText}
                  </a>
                </div>
              </div>
            </div>
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
