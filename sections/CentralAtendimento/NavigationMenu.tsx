import { NavigationLoader } from "deco-sites/true-source/loaders/centralNavigation.ts";
import Image from "apps/website/components/Image.tsx";

interface Props {
  loader: NavigationLoader;
}

export default function Navigation({ loader }: Props) {
  return (
    <div class="sticky top-[60px] lg:top-[100px] z-20 flex h-[40px] w-full flex-row overflow-hidden bg-white lg:h-[432px] lg:w-[275px] lg:flex-col lg:border-l-2 lg:border-solid lg:border-red lg:px-14 lg:py-10">
      <div class="flex h-full w-full flex-row gap-6 md:flex-col justify-center lg:justify-start lg:gap-8 border-b border-light-gray lg:border-none">
        {loader.navigations.map(({ url, label, icon }, index) => (
          <a
            href={url}
            class={"group flex items-center gap-4 translate-x-px" + (
              index === loader.activeIndex
                ? " border-b-4 border-b-red md:border-b-0"
                : ""
            )}
          >
            <Image
              src={icon}
              width={16}
              height={16}
              alt={label}
            />

            <span class="font-inter font-normal text-[14px] text-nowrap bg-clip-text text-dark group-hover:bg-gradient-to-r group-hover:from-red group-hover:to-orange group-hover:text-transparent">
              {label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
