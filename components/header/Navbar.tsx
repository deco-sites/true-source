import type { Props as SearchbarProps } from "deco-sites/true-source/components/search/Searchbar.tsx";
import { MenuButton } from "deco-sites/true-source/islands/Header/Buttons.tsx";
import CartButtonVTEX from "deco-sites/true-source/islands/Header/Cart/vtex.tsx";
import Searchbar from "deco-sites/true-source/islands/Header/Searchbar.tsx";
import { usePlatform } from "deco-sites/true-source/sdk/usePlatform.tsx";
import Image from "apps/website/components/Image.tsx";
import NavItem, { type INavItem } from "./NavItem.tsx";
import type {
  Buttons,
  Logo,
} from "deco-sites/true-source/components/header/Header.tsx";
import MyAccount from "deco-sites/true-source/islands/Header/MyAccount.tsx";
import { useUser } from "apps/vtex/hooks/useUser.ts";
import Icon from "deco-sites/true-source/components/ui/Icon.tsx";
import type { Help } from "deco-sites/true-source/components/header/Menu.tsx";

export const HIGHLIGHT_ID = "destaque";
export const HIGHLIGHT_BTN = "TODOS OS PRODUTOS";
export const SEEALL = "ver todos";

export interface Props {
  items?: INavItem[];
  searchbar?: SearchbarProps;
  logo?: Logo;
  buttons?: Buttons;
  logoPosition?: "left" | "center";
  isMobile: boolean;
  helpItems: Help;
}

function Navbar(
  {
    items,
    searchbar,
    logo,
    buttons,
    isMobile,
    helpItems,
  }: Props,
) {
  const shortcutItems = items?.filter((item) => item.isShortcut);

  return (
    <>
      {isMobile
        ? (
          <>
            <div class="group-data-[micro-header='true']/header:gap-0 flex flex-col gap-[18px] lg:hidden bg-white group-data-[micro-header='true']/header:shadow-md py-4 group-data-[micro-header='true']/header:rounded-b-[20px] w-full">
              <div class="group-data-[micro-header='true']/header:h-[30px] flex justify-between items-center gap-[10px] px-4">
                {logo && (
                  <a
                    href="/"
                    aria-label="Store logo"
                    class=""
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={100}
                      height={36}
                      class="min-w-[100px] group-data-[micro-header='true']/header:max-w-[86px] group-data-[micro-header='true']/header:max-h-[30px]"
                    />
                  </a>
                )}

                <div class="group-data-[micro-header='true']/header:block hidden w-full max-w-full">
                  <Searchbar searchbar={searchbar} />
                </div>

                <div class="group-data-[micro-header='true']/header:gap-4 flex justify-between items-center gap-[24px]">
                  <div class="group-data-[micro-header='true']/header:hidden">
                    <MyAccount />
                  </div>

                  <a
                    href={helpItems.url}
                    class="group-data-[micro-header='true']/header:hidden"
                  >
                    <Icon id="Help" size={22} />
                  </a>

                  <CartButtonVTEX size="md" />
                  <MenuButton />
                </div>
              </div>

              <div class="group-data-[micro-header='true']/header:hidden mx-auto px-4 w-full max-w-full">
                <Searchbar searchbar={searchbar} />
              </div>

              <div class="flex justify-between items-center gap-4 group-data-[micro-header='true']/header:hidden w-full overflow-x-scroll no-scrollbar">
                {items?.[0].children?.map((item, index) => (
                  <NavItem item={index === 0 ? items[0] : item} />
                ))}
              </div>
            </div>
          </>
        )
        : (
          <>
            <div class="relative bg-white group-data-[micro-header='true']/header:shadow-md px-2 xl:px-0 group-data-[micro-header='true']/header:rounded-b-[20px] w-full">
              <div class="group-data-[micro-header='true']/header:py-2 md:flex items-center gap-1 xl:gap-[32px] hidden mx-auto pt-[24.5px] w-full max-w-[1360px]">
                <div className="flex-none">
                  <a href="/" aria-label="Store logo" className="block">
                    <Image
                      src={logo?.src ?? ""}
                      alt={logo?.alt ?? ""}
                      width={140}
                      height={49}
                      class="group-data-[micro-header='true']/header:h-[34px] group-data-[micro-header='true']/header:w-[98px] w-[200px] lg:w-[140px] lg:h-[49px]"
                    />
                  </a>
                </div>

                <div class="group-data-[micro-header='true']/header:flex hidden">
                  <ul className="flex gap-1 xl:gap-[32px] w-full">
                    {shortcutItems?.map((item) => <NavItem item={item} />)}
                  </ul>
                </div>

                <div class="group-data-[micro-header='true']/header:h-10 w-full max-w-full h-12">
                  <Searchbar searchbar={searchbar} />
                </div>

                <div className="z-50 flex flex-none justify-end items-center gap-6 col-span-1">
                  <MyAccount />

                  {!buttons?.hideWishlistButton && (
                    <a
                      className="flex items-center gap-1 text-xs"
                      href={helpItems.url}
                    >
                      <button
                        type="button"
                        className="flex gap-1 btn btn-circle btn-ghost btn-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="29"
                          viewBox="0 0 28 29"
                          fill="none"
                        >
                          <path
                            d="M11.6667 9.83594C11.8722 9.25159 12.278 8.75884 12.812 8.44497C13.3461 8.1311 13.974 8.01637 14.5845 8.12109C15.1951 8.22582 15.7488 8.54324 16.1478 9.01714C16.5467 9.49104 16.765 10.0908 16.7641 10.7103C16.7641 12.459 14.1411 13.3333 14.1411 13.3333M14.1749 16.8333H14.1866M8.16667 21.5V24.2248C8.16667 24.8464 8.16667 25.1572 8.2941 25.3169C8.40493 25.4557 8.57298 25.5365 8.75063 25.5363C8.9549 25.5361 9.19762 25.3419 9.68305 24.9536L12.4661 22.7271C13.0346 22.2723 13.3189 22.0449 13.6354 21.8832C13.9162 21.7397 14.2152 21.6349 14.5241 21.5715C14.8723 21.5 15.2363 21.5 15.9644 21.5H18.9C20.8602 21.5 21.8403 21.5 22.589 21.1185C23.2475 20.783 23.783 20.2475 24.1185 19.589C24.5 18.8403 24.5 17.8602 24.5 15.9V9.6C24.5 7.63982 24.5 6.65972 24.1185 5.91103C23.783 5.25247 23.2475 4.71703 22.589 4.38148C21.8403 4 20.8602 4 18.9 4H9.1C7.13982 4 6.15972 4 5.41103 4.38148C4.75247 4.71703 4.21703 5.25247 3.88148 5.91103C3.5 6.65972 3.5 7.63982 3.5 9.6V16.8333C3.5 17.9183 3.5 18.4608 3.61926 18.9059C3.94289 20.1137 4.88631 21.0571 6.09413 21.3807C6.53922 21.5 7.0817 21.5 8.16667 21.5Z"
                            stroke="#3C3C3B"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <p className="text-xs">
                        Precisa de<br /> <b>ajuda?</b>
                      </p>
                    </a>
                  )}

                  {!buttons?.hideCartButton && (
                    <div className="flex items-center font-thin text-xs">
                      <CartButtonVTEX size="lg" />
                    </div>
                  )}
                </div>
              </div>

              <div class="md:block hidden group-data-[micro-header='true']/header:hidden mt-[18.5px] mb-3">
                <ul class="flex justify-between items-center mx-auto px-4 w-full max-w-[1360px]">
                  {items?.map((item) => (
                    <>
                      <NavItem item={item} />
                      <li class="last:hidden list-none benefitdot" />
                    </>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
    </>
  );
}

export default Navbar;
