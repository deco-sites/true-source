import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import { MenuButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import Button from "$store/components/ui/Button.tsx";
import { Buttons, Logo } from "$store/components/header/Header.tsx";
import MyAccount from "$store/islands/Header/MyAccount.tsx";
import { useUser } from "apps/vtex/hooks/useUser.ts";

export const HIGHLIGHT_ID = "destaque";
export const HIGHLIGHT_BTN = "TODOS OS PRODUTOS";
export const SEEALL = "ver todos";

function Navbar(
  { items, searchbar, logo, buttons, logoPosition = "left" }: {
    items?: SiteNavigationElement[] | null;
    item?: SiteNavigationElement;
    searchbar?: SearchbarProps;
    logo?: Logo;
    buttons?: Buttons;
    logoPosition?: "left" | "center";
  },
) {
  const platform = usePlatform();
  const { user } = useUser();
  const isUserLoggedIn = Boolean(user.value?.email);

  return (
    <>
      {/* Mobile Version */}
      <div class={`lg:hidden z-50`}>
        <div
          className={`wrapper-header-mobile container justify-between flex py-4 `}
        >
          <div className="flex flex-row items-center">
            <a
              id="logoMobile"
              href="/"
              className="logo inline-flex items-center justify-start"
              aria-label="Store logo"
            >
              {!logo ? null : (
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={86}
                  height={30}
                />
              )}
            </a>
          </div>
          <div id="searchBarMobileOnSticky">
            <Searchbar searchbar={searchbar} />
          </div>
          <div id="stickyHeaderLinks">
            <div className="mt-[5px] mr-[5px] md:mr-0 md:mt-0">
              <CartButtonVTEX />
            </div>
            <div className="">
              <MenuButton />
            </div>
          </div>
          <div id="nonStickyHeaderLinks">
            <MyAccount />
            <a
              className="flex items-center text-xs gap-1"
              href="/precisa-de-ajuda"
              aria-label="Wishlist"
            >
              <button className="flex btn btn-circle btn-sm btn-ghost gap-1">
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
            </a>
            <div className="mt-[5px] mr-[5px] md:mr-0 md:mt-0">
              <CartButtonVTEX />
            </div>
            <div>
              <MenuButton />
            </div>
          </div>
        </div>
        <div>
          <div id="searchBarMobile">
            <Searchbar searchbar={searchbar} />
          </div>
          <div>
            {!items ? null : (
              <>
                {
                  // @ts-ignore children exists
                  items.children?.map((item) => (
                    <li key={item.url}>
                      <a href={item.url}>
                        <span className="text-xs">{item.name}</span>
                      </a>
                    </li>
                  ))
                }
              </>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Version */}
      <div id="navBarWrapper">
        <div
          id="navBar"
          className={`hidden container lg:flex gap-[32px] items-center px-6`}
        >
          <div
            className={`flex ${
              logoPosition === "left"
                ? "justify-start -order-1"
                : "justify-start"
            }`}
          >
            <a
              id="logo"
              href="/"
              aria-label="Store logo"
              className="logo block"
            >
              <Image
                src={logo?.src ?? ""}
                alt={logo?.alt ?? ""}
                width={140}
                height={49}
              />
            </a>
          </div>
          <div id="menuCompact">
            <ul className="flex gap-[20px] ">
              {items &&
                items.slice(0, 3).map((item, index) => (
                  <NavItem key={index} item={item} />
                ))}
            </ul>
          </div>
          <div id="searchBar">
            <Searchbar searchbar={searchbar} />
          </div>
          <div className="flex-none flex items-center justify-end gap-6 col-span-1 z-50">
            <MyAccount />
            {!buttons?.hideWishlistButton && (
              <a
                className="flex items-center text-xs gap-1"
                href="/precisa-de-ajuda"
              >
                <button className="flex btn btn-circle btn-sm btn-ghost gap-1">
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
              <div className="flex items-center text-xs font-thin">
                <CartButtonVTEX />
              </div>
            )}
          </div>
        </div>
        <div id="quickMenu">
          <ul
            id="menuHeader"
            className="container flex justify-between items-center"
          >
            {items &&
              items.map((item, index) => <NavItem key={index} item={item} />)}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
