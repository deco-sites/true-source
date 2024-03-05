import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import Cart from "$store/components/minicart/Cart.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Button from "$store/components/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";
import { useUser } from "apps/vtex/hooks/useUser.ts";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));
const Searchbar = lazy(() => import("$store/components/search/Searchbar.tsx"));

const MENU_TITLE = "Menu";
const SEARCH_TITLE = "Buscar";
const MINICART_TITLE = "Sacola";

export interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  platform: ReturnType<typeof usePlatform>;
}
interface HeaderProps {
  closeFunction: {
    onClose: () => void;
  };
}

const HeaderLogin = (props: HeaderProps) => {
  const { user } = useUser();
  const { closeFunction: { onClose } } = props;
  // Validar
  const isUserLoggedIn = Boolean(user.value?.email);

  return (
    <div class="flex justify-end items-center py-6 px-4">
      {onClose && (
        <button onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
          >
            <path
              d="M22.5 13.5L13.5 22.5M13.5 13.5L22.5 22.5M33 18C33 26.2843 26.2843 33 18 33C9.71573 33 3 26.2843 3 18C3 9.71573 9.71573 3 18 3C26.2843 3 33 9.71573 33 18Z"
              stroke="url(#paint0_linear_69_10386)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_69_10386"
                x1="33"
                y1="18"
                x2="3"
                y2="18"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#E9530E" />
                <stop offset="1" stop-color="#E4003F" />
              </linearGradient>
            </defs>
          </svg>
        </button>
      )}
    </div>
  );
};

const SearchHeader = (props: HeaderProps) => {
  const { closeFunction: { onClose } } = props;

  return (
    <div class="flex justify-end items-center px-4">
      <div class="flex items-center gap-x-2 text-white fill-white text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18.677"
          height="18.677"
          viewBox="0 0 18.677 18.677"
        >
          <path
            id="Caminho_29"
            data-name="Caminho 29"
            d="M18.645,17.546l-4.867-4.867a7.784,7.784,0,1,0-1.1,1.1l4.867,4.867ZM7.764,13.982a6.217,6.217,0,1,1,6.217-6.217,6.217,6.217,0,0,1-6.217,6.217Z"
            transform="translate(0.032 0.032)"
          />
        </svg>
        Buscar
      </div>
      {onClose && (
        <button class="py-3 text-white" onClick={onClose}>
          <Icon id="XMark" size={24} strokeWidth={2} />
        </button>
      )}
    </div>
  );
};

const MinicartHeader = (props: HeaderProps) => {
  const { closeFunction: { onClose } } = props;

  return (
    <div class="flex justify-between items-center py-4 px-6 border-b border-Stroke">
      <div class="flex items-center gap-2 text-lg text-black uppercase font-medium">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <g clip-path="url(#clip0_887_10823)">
            <path
              d="M1.5 1.5H2.47962C2.66414 1.5 2.75639 1.5 2.83064 1.53393C2.89606 1.56383 2.95151 1.61192 2.99036 1.67246C3.03445 1.74116 3.0475 1.83249 3.07359 2.01515L3.42857 4.5M3.42857 4.5L4.21749 10.2986C4.3176 11.0344 4.36766 11.4023 4.54357 11.6793C4.69858 11.9233 4.92081 12.1173 5.18352 12.238C5.48165 12.375 5.85296 12.375 6.59558 12.375H13.014C13.7209 12.375 14.0744 12.375 14.3632 12.2478C14.6179 12.1357 14.8364 11.9549 14.9942 11.7257C15.1732 11.4657 15.2393 11.1185 15.3716 10.4241L16.3643 5.21227C16.4109 4.96786 16.4342 4.84565 16.4004 4.75012C16.3708 4.66633 16.3124 4.59576 16.2357 4.55101C16.1481 4.5 16.0237 4.5 15.7749 4.5H3.42857ZM7.5 15.75C7.5 16.1642 7.16421 16.5 6.75 16.5C6.33579 16.5 6 16.1642 6 15.75C6 15.3358 6.33579 15 6.75 15C7.16421 15 7.5 15.3358 7.5 15.75ZM13.5 15.75C13.5 16.1642 13.1642 16.5 12.75 16.5C12.3358 16.5 12 16.1642 12 15.75C12 15.3358 12.3358 15 12.75 15C13.1642 15 13.5 15.3358 13.5 15.75Z"
              stroke="#E4003F"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_887_10823">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span class="font-bold text-[13px] uppercase">
          CARRINHO
        </span>
      </div>
      {onClose && (
        <button class="text-black" onClick={onClose}>
          <Icon id="XMark" size={24} strokeWidth={2} />
        </button>
      )}
    </div>
  );
};

const Aside = (
  { title, onClose, children }: {
    title: string;
    onClose?: () => void;
    children: ComponentChildren;
  },
) => (
  <div class="bg-base-100 grid grid-rows-[auto_1fr] h-full max-w-[100vw] rounded-l-[20px]">
    {title === MENU_TITLE && onClose && (
      <HeaderLogin closeFunction={{ onClose }} />
    )}
    {title === SEARCH_TITLE && onClose && (
      <SearchHeader closeFunction={{ onClose }} />
    )}
    {title === MINICART_TITLE && onClose && (
      <MinicartHeader closeFunction={{ onClose }} />
    )}

    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

function Drawers({ menu, searchbar, children, platform }: Props) {
  const { displayCart, displayMenu, displaySearchDrawer } = useUI();

  return (
    <Drawer // left drawer
      class="drawer-end"
      open={displayMenu.value || displaySearchDrawer.value}
      onClose={() => {
        displayMenu.value = false;
        displaySearchDrawer.value = false;
      }}
      aside={
        <Aside
          onClose={() => {
            displayMenu.value = false;
            displaySearchDrawer.value = false;
          }}
          title={displayMenu.value ? MENU_TITLE : SEARCH_TITLE}
        >
          {displayMenu.value && <Menu {...menu} />}
          {searchbar && displaySearchDrawer.value && (
            <div class="w-screen">
              <Searchbar {...searchbar} />
            </div>
          )}
        </Aside>
      }
    >
      <Drawer // right drawer
        class="drawer-end"
        open={displayCart.value !== false}
        onClose={() => displayCart.value = false}
        aside={
          <Aside
            title={MINICART_TITLE}
            onClose={() => displayCart.value = false}
          >
            <Cart platform={platform} />
          </Aside>
        }
      >
        {children}
      </Drawer>
    </Drawer>
  );
}

export default Drawers;
