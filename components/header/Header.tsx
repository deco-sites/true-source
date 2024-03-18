import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Alert from "./Alert.tsx";
import MicroHeaderSetup from "$store/components/ui/MicroHeaderSetup.tsx";
import { LoaderContext } from "deco/mod.ts";
import Navbar from "$store/components/header/Navbar.tsx";
import type { INavItem } from "$store/components/header/NavItem.tsx";
import { InstitucionalItem, Socials } from "$store/components/header/Menu.tsx";

export interface Buttons {
  hideSearchButton?: boolean;
  hideAccountButton?: boolean;
  hideWishlistButton?: boolean;
  hideCartButton?: boolean;
}

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}

/** @titleBy text */
export interface AlertProps {
  text: string;
  icons?: ImageWidget;
  link?: string;
}

export type Theme = "light" | "dark";

export interface Props {
  /** @title Logo */
  logo: Logo;
  /** @title Mensagens do topo */
  alerts?: AlertProps[];
  /** @title Barra de pesquisa */
  searchbar: Omit<SearchbarProps, "platform">;
  /** @title Itens do menu de navegação */
  navItems: INavItem[];
  /** @title Links institucionais do menu mobile */
  institutionalItems: InstitucionalItem[];
  /** @title Redes sociais do menu mobile */
  socials: Socials[];
  theme?: Theme;
  /**
   * @ignore
   */
  isMobile: boolean;
}

function Header({
  alerts,
  searchbar,
  navItems = [],
  institutionalItems,
  socials,
  logo,
  theme = "light",
  isMobile,
}: Props) {
  const items = navItems ?? [];

  return (
    <header id="header" class="group/header h-[211px] md:h-[193px]">
      <Drawers
        menu={{ items, institutionalItems, socials }}
        searchbar={searchbar}
      >
        <div class="bg-white fixed w-full z-50">
          {alerts && alerts.length > 0 && (
            <Alert alerts={alerts} theme={theme} isMobile={isMobile} />
          )}
          <Navbar
            items={navItems}
            searchbar={searchbar && { ...searchbar, isMobile }}
            logo={logo}
            isMobile={isMobile}
          />
        </div>
      </Drawers>
      <MicroHeaderSetup rootId="header" threshold={120} />
    </header>
  );
}

export default Header;

export const loader = (
  { ...props }: Props,
  req: Request,
  ctx: LoaderContext,
) => {
  const isMobile = ctx.device === "mobile";

  return { ...props, isMobile };
};
