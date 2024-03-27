import { NavigationLoader } from "deco-sites/true-source/loaders/centralNavigation.ts";
import Image from "apps/website/components/Image.tsx";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";

interface Props {
  loader: NavigationLoader;
}

export default function Navigation({ loader }: Props) {
  const rootId = "central-navigation";

  return (
    <>
      <div
        id={rootId}
        class="top-[99px] z-20 sticky flex flex-row xl:flex-col bg-white xl:py-10 xl:pl-14 xl:border-red xl:border-l-2 xl:border-solid w-full xl:w-[300px] h-[40px] xl:h-fit overflow-hidden"
      >
        <nav class="flex flex-row xl:flex-col gap-6 xl:gap-8 border-b border-light-gray xl:border-none w-full h-full overflow-x-scroll xl:overflow-x-clip no-scrollbar">
          {loader.navigations.map(({ url, label, icon, activeIcon }, index) => {
            const isActive = index === loader.activeIndex;
            return (
              <a
                data-active={isActive}
                key={url}
                href={url}
                class={"group flex items-center gap-4 translate-x-px shrink-0 border-b-[3px]" +
                  (
                    isActive
                      ? " border-b-red md:border-b-0"
                      : " border-b-transparent"
                  )}
              >
                {isActive && activeIcon
                  ? (
                    <Image
                      src={activeIcon}
                      width={16}
                      height={16}
                      alt={label}
                    />
                  )
                  : (
                    <>
                      <Image
                        src={icon}
                        width={16}
                        height={16}
                        alt={label}
                        class={activeIcon && "group-hover:hidden"}
                      />
                      {activeIcon && (
                        <Image
                          src={activeIcon}
                          width={16}
                          height={16}
                          alt={label}
                          class="group-hover:block hidden"
                        />
                      )}
                    </>
                  )}
                <span
                  class={"font-inter text-[14px] text-nowrap bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red group-hover:to-orange group-hover:text-transparent" +
                    (
                      isActive
                        ? " text-transparent bg-gradient-to-r from-red to-orange font-bold"
                        : " text-dark"
                    )}
                >
                  {label}
                </span>
              </a>
            );
          })}
        </nav>
      </div>
      <script defer src={scriptAsDataURI(script, rootId)} />
    </>
  );
}

const script = (rootId: string) => {
  const root = document.getElementById(rootId);
  if (!root) return;

  const nav = root.querySelector<HTMLDivElement>("nav");
  if (!nav) return;
  const active = root.querySelector<HTMLAnchorElement>("a[data-active='true']");
  if (!active) return;

  // the timeout is necessary to wait for the fonts to load, so the scrollLeft is calculated correctly
  setTimeout(() => {
    nav.scrollLeft = active.offsetLeft;
  }, 300);
};
