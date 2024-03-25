import CartButtonVTEX from "deco-sites/true-source/islands/Header/Cart/vtex.tsx";
import type { INavItem } from "./NavItem.tsx";
import Collapsable from "deco-sites/true-source/components/ui/Collapsable.tsx";
import Icon from "deco-sites/true-source/components/ui/Icon.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Help {
  /** @description Texto de ajuda do mobile */
  title: string;
  /** @description Url da página de ajuda mobile e desktop */
  url: string;
  /** @description Items de ajuda do menu mobile */
  children?: {
    title: string;
    url: string;
  }[];
}

/** @titleBy name */
export interface InstitucionalItem {
  name: string;
  url: string;
}

/** @titleBy name */
export interface Socials {
  name: string;
  url: string;
  icon: ImageWidget;
}

export interface Props {
  items: INavItem[];
  institutionalItems: InstitucionalItem[];
  socials: Socials[];
  helpItems: Help;
}

export function Socials({ socials }: { socials: Socials[] }) {
  return (
    <div class="flex gap-[20px] p-6 mt-[76px]">
      {socials.map((item) => (
        <a
          href={item.url}
          class="border border-[#E9530E] rounded-full w-[38.5px] h-[38.5px] flex items-center justify-center"
        >
          <Image
            src={item.icon}
            alt={item.name}
            width={16}
            height={16}
            class="max-w-4 max-h-4"
          />
        </a>
      ))}
    </div>
  );
}

export function MenuInstitutional(
  { institutionalItems }: { institutionalItems: InstitucionalItem[] },
) {
  return (
    <div class="flex flex-col gap-6 mt-12">
      {institutionalItems.map((item) => (
        <a
          href={item.url}
          class="font-lemon-milk text-[11px] text-dark px-6 uppercase font-medium"
        >
          {item.name}
        </a>
      ))}
    </div>
  );
}

function Menu({ items, institutionalItems, socials, helpItems }: Props) {
  const itemsWithChildren = items.filter((item) =>
    item.children && item.children.length > 0
  );
  const itemsWithoutChildren = items.filter((item) =>
    !item.children || item.children.length === 0
  );

  return (
    <div class="flex flex-col h-full w-[308px] px-4 overflow-y-scroll no-scrollbar">
      <div class="flex flex-col">
        {itemsWithChildren.map((navItem, index) => (
          <Collapsable
            class="w-full"
            title={
              <div
                class={`flex relative justify-between py-[15.5px] font-lemon-milk text-[11px] text-dark border border-Stroke px-6 uppercase font-bold 
                ${
                  index === 0 &&
                  "text-white bg-gradient-to-r from-[#E4003F] from-35% to-[#e8530e] to-90% rounded-full group-open:fontWithGradient group-open:border-red"
                }
              after:border-Stroke after:border-l after:absolute after:left-[-1px] after:top-1/2 after:h-[30px] after:-z-10 
              before:border-Stroke before:border-r before:absolute before:right-[-1px] before:top-1/2 before:h-[30px] before:-z-10
                ${index === 1 && "border-t-0"}`}
              >
                <span class={`${navItem.ishighlighted && "fontWithGradient"} `}>
                  {navItem.name}
                </span>
                <Icon
                  id="ChevronDown"
                  size={16}
                  class={`rotate-0 text-neutral-5 group-open:rotate-180 transition-all ease-in-out duration-[400ms] 
                    ${
                    index === 0 ? "text-white group-open:text-red" : "text-dark"
                  }
                  
                  `}
                />
              </div>
            }
          >
            <div class="flex flex-col ">
              {!!navItem.children &&
                navItem.children.map((children) => (
                  <a
                    href={children.url}
                    class="py-[15.5px] pl-[40px] pr-6 font-lemon-milk text-[11px] text-dark font-medium border border-Stroke uppercase flex justify-between items-center first:border-t-0"
                  >
                    {children.name}
                    <Icon id="ChevronRight" size={16} />
                  </a>
                ))}
            </div>
          </Collapsable>
        ))}
        {itemsWithoutChildren.map((item) => (
          <a
            href={item.url}
            class="py-[15.5px] font-lemon-milk text-[11px] text-dark border border-Stroke px-6 uppercase font-bold last:rounded-b-[8px]"
          >
            {item.name}
          </a>
        ))}
      </div>

      <div class="flex flex-col border border-Stroke rounded-[8px] divide-y divide-Stroke mt-6">
        <div class="py-[15.5px] font-lemon-milk text-[11px] text-dark px-6 uppercase font-bold w-full">
          <CartButtonVTEX type="menu" />
        </div>

        <div class="flex justify-between items-center py-[15.5px] font-lemon-milk text-[11px] text-dark px-6 uppercase font-bold">
          <span>Sua conta</span>
          <Icon id="Login" size={20} />
        </div>

        {helpItems.children
          ? (
            <Collapsable
              class="w-full rounded-b-[8px]"
              title={
                <div class="py-[15.5px] px-6 font-lemon-milk text-[11px] text-dark font-bold group-open:border-b border-Stroke uppercase flex justify-between items-center first:border-t-0">
                  <span>
                    {helpItems.title}
                  </span>
                  <Icon
                    id="ChevronDown"
                    size={16}
                    class="rotate-0 text-neutral-5 group-open:rotate-180 transition-all ease-in-out duration-[400ms]"
                  />
                </div>
              }
            >
              <div class="flex flex-col ">
                {!!helpItems.children &&
                  helpItems.children.map((children) => (
                    <a
                      href={children.url}
                      class="py-[15.5px] pl-[40px] pr-6 font-lemon-milk text-[11px] text-dark font-medium uppercase flex justify-between items-center first:border-t-0"
                    >
                      {children.title}
                      <Icon id="ChevronRight" size={16} />
                    </a>
                  ))}
              </div>
            </Collapsable>
          )
          : (
            <a
              class="flex justify-between items-center py-[15.5px] font-lemon-milk text-[11px] text-dark px-6 uppercase font-bold"
              href={helpItems.url}
            >
              <span>{helpItems.title}</span>
            </a>
          )}
      </div>

      <MenuInstitutional institutionalItems={institutionalItems} />
      <Socials socials={socials} />
    </div>
  );
}

export default Menu;
