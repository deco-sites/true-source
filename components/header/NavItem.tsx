import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { HIGHLIGHT_BTN, HIGHLIGHT_ID, SEEALL } from "./Navbar.tsx";
import Icon from "deco-sites/true-source/components/ui/Icon.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";

/** @titleBy name */
export interface Children {
  name: string;
  url: string;
  isBold?: boolean;
}

/** @titleBy name */
export interface INavItem {
  /** @title Texto */
  name: string;
  /** @title Link */
  url: string;
  /** @title Filhos */
  children?: Children[];
  /** @title Imagem */
  image?: {
    src: ImageWidget;
    alt: string;
  };
  /** @title Fixar ao diminuir o header? */
  isShortcut?: boolean;
  /** @title Item possui destaque? */
  ishighlighted?: boolean;
}

interface Props {
  item: INavItem;
}

function NavItem({ item }: Props) {
  const { url, name, children, image } = item;

  // TODO: implement border gradient
  return (
    <li className="group flex items-center">
      <ul class="flex items-center justify-between">
        <a
          href={url}
          class={`flex items-center gap-2 font-bold text-[11px] md:text-[13px] leading-[14px] md:leading-[17.5px] uppercase h-[25px] md:h-[40px] rounded-full font-lemon-milk text-dark group-first:text-white group-first:bg-gradient-to-r from-[#E4003F] from-35% to-[#e8530e] to-90% group-first:px-2 md:group-first:px-6 group-hover:bg-gradient-to-r group-hover:text-transparent group-hover:bg-clip-text border border-transparent group-first:hover:border-red whitespace-nowrap
          ${item.ishighlighted && "fontWithGradient"}
          ${children && children.length > 0 ? "has-submenu" : ""}`}
        >
          {name}
          {children && children.length > 0 && (
            <Icon
              id="ChevronDown"
              size={20}
              class="text-dark group-first:text-white group-hover:text-red group-hover:rotate-180 duration-300 hidden md:block"
            />
          )}
        </a>
      </ul>

      {children && children.length > 0 && (
        <div className="absolute top-full group-data-[micro-header='true']/header:top-[48px] left-0 right-0 hidden md:group-hover:block z-50 items-start justify-center gap-6 rounded-b-[20px] bg-white w-full py-8 shadow-md">
          <div className="flex justify-between items-start border-l border-solid border-red max-w-[1360px] mx-auto">
            <ul className="flex flex-col lg:w-[377px] px-[32px]">
              {children.slice(0, 8).map((node) => (
                <li className="group/icon border-b border-solid border-Stroke py-[13px] ease-in-out duration-300 hover:bg-[#f0f0ee] hover:px-[16px] hover:rounded-[8px]">
                  <a
                    className="flex justify-between items-center"
                    href={node.url}
                  >
                    <span
                      class={`text-sm leading-[22px] text-dark font-medium ${
                        node.isBold &&
                        "uppercase font-bold font-lemon-milk text-[13px] leading-[17px]"
                      } `}
                    >
                      {node.name}
                    </span>
                    <Icon
                      id="ArrowNarrowRight"
                      size={16}
                      class="text-dark group-hover/icon:text-red"
                    />
                  </a>
                </li>
              ))}
            </ul>
            {children.length > 8 && (
              <ul className="flex flex-col lg:w-[377px]">
                {children.slice(8, 16).map((node) => (
                  <li className="group/icon border-b border-solid border-Stroke py-[13px] ease-in-out duration-300 hover:bg-[#f0f0ee] hover:px-[16px] hover:rounded-[8px]">
                    <a
                      className="flex justify-between items-center"
                      href={node.url}
                    >
                      <span
                        class={`text-sm leading-[22px] text-dark font-medium ${
                          node.isBold &&
                          "uppercase font-bold font-lemon-milk text-[13px] leading-[17px]"
                        } `}
                      >
                        {node.name}
                      </span>
                      <Icon
                        id="ArrowNarrowRight"
                        size={16}
                        class="text-dark group-hover/icon:text-red"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <ul>
              {image && (
                <Image
                  className="rounded-[20px] cover"
                  src={image.src}
                  alt={image.alt}
                  width={526}
                  height={392}
                  loading="lazy"
                />
              )}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
}

export default NavItem;
