import type { Props as MenuProps } from "deco-sites/true-source/components/header/Menu.tsx";
import Cart from "deco-sites/true-source/components/minicart/Cart.tsx";
import type { Props as SearchbarProps } from "deco-sites/true-source/components/search/Searchbar.tsx";
import Drawer from "deco-sites/true-source/components/ui/Drawer.tsx";
import Icon from "deco-sites/true-source/components/ui/Icon.tsx";
import { useUI } from "deco-sites/true-source/sdk/useUI.ts";
import { useUser } from "apps/vtex/hooks/useUser.ts";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";

const Menu = lazy(() =>
  import("deco-sites/true-source/components/header/Menu.tsx")
);
const Searchbar = lazy(() =>
  import("deco-sites/true-source/components/search/Searchbar.tsx")
);

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

  return <></>;
};

const Aside = (
  { title, onClose, children }: {
    title: string;
    onClose?: () => void;
    children: ComponentChildren;
  },
) => (
  <div class="bg-base-100 grid grid-rows-[auto_1fr] h-full w-full max-w-[308px] rounded-l-[20px]">
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

function Drawers({ menu, searchbar, children }: Props) {
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
            <Cart />
          </Aside>
        }
      >
        {children}
      </Drawer>
    </Drawer>
  );
}

export default Drawers;
