interface Navigation {
  /**
   * @title URL
   */
  url: string;
  /**
   * @title Texto
   */
  label: string;
  /**
   * @title Ícone
   * @description Um ícone 16x16 para ser exibido ao lado do texto
   * @format image-uri
   */
  icon: string;
}

interface Props {
  /**
   * @title Navegações
   */
  navigations: Navigation[];
}

export type NavigationLoader = {
  navigations: Navigation[];
  activeIndex: number;
};

export default function loader(
  { navigations }: Props,
  req: Request,
): NavigationLoader {
  return {
    navigations,
    activeIndex: navigations.findIndex((nav) => req.url.startsWith(nav.url)),
  };
}
