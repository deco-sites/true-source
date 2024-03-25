import type { Props as SearchbarProps } from "deco-sites/true-source/components/search/Searchbar.tsx";
import Drawers from "deco-sites/true-source/islands/Header/Drawers.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Alert, { type AlertProps } from "./Alert.tsx";
import MicroHeaderSetup from "deco-sites/true-source/components/ui/MicroHeaderSetup.tsx";
import type { LoaderContext } from "deco/mod.ts";
import Navbar from "deco-sites/true-source/components/header/Navbar.tsx";
import type { INavItem } from "deco-sites/true-source/components/header/NavItem.tsx";
import type {
  Help,
  InstitucionalItem,
  Socials,
} from "deco-sites/true-source/components/header/Menu.tsx";

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

export type Theme = "light" | "dark";

export interface Props {
  /** @title Logo */
  logo: Logo;
  /** @title Mensagens do topo */
  alerts?: AlertProps[];
  /** @title Barra de pesquisa */
  searchbar: Omit<SearchbarProps, "platform">;
  /**
   * @title Navegação
   * @description Itens do menu de navegação desktop e mobile
   */
  navItems: INavItem[];
  /**
   * @title Institucionais
   * @description Links institucionais do menu mobile
   */
  institutionalItems: InstitucionalItem[];
  /**
   * @title Redes sociais
   * @description Links para as redes sociais do menu mobile
   */
  socials: Socials[];
  /**
   * @title Ajuda
   * @description Links dos itens de ajuda
   */
  helpItems: Help;
  /**
   * @title Frete grátis
   * @description Valor para ganhar frete grátis
   */
  freeShippingTarget?: number;
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
  freeShippingTarget,
  socials,
  helpItems,
  logo,
  theme = "light",
  isMobile,
}: Props) {
  const items = navItems ?? [];

  return (
    <header id="header" class="group/header h-[211px] md:h-[193px]">
      <Drawers
        menu={{ items, institutionalItems, socials, helpItems }}
        searchbar={searchbar}
        freeShippingTarget={freeShippingTarget}
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
            helpItems={helpItems}
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
