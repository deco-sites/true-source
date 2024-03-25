import { useId } from "deco-sites/true-source/sdk/useId.ts";
import Icon from "deco-sites/true-source/components/ui/Icon.tsx";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";
import desktopScript from "deco-sites/true-source/components/ui/CategoryList/DesktopScript.ts";
import mobileScript from "deco-sites/true-source/components/ui/CategoryList/MobileScript.ts";
import type { AppContext } from "deco-sites/true-source/apps/site.ts";

interface Category {
  /**
   * @title Text
   */
  label: string;
  /**
   * @title Link
   */
  href: string;
}

interface Props {
  /**
   * @title Título
   * @description Título da seção
   * @format textarea
   */
  title: string;
  /**
   * @title Categorias
   * @description Lista de categorias
   */
  categories: Category[];
}

const DEFAULT: ReturnType<typeof loader> = {
  title: "SUPLEMENTOS PARA TODAS AS FASES DA SUA VIDA",
  categories: [
    {
      label: "Todos os produtos",
      href: "/produtos?O=OrderByTopSaleDESC",
    },
    {
      label: "Whey Protein",
      href: "/produtos/whey-protein?O=OrderByTopSaleDESC",
    },
    {
      label: "Proteína Vegana",
      href: "/produtos/proteina-vegana?O=OrderByTopSaleDESC",
    },
  ],
  isMobile: false,
};

export function loader(props: Props, _req: Request, ctx: AppContext) {
  return {
    ...props,
    isMobile: ctx.device !== "desktop",
  };
}

export default function CategoryList(
  { title, categories, isMobile }: ReturnType<typeof loader> = DEFAULT,
) {
  const id = useId();

  return (
    <div
      id={id}
      data-root
      class="flex flex-col items-center my-11 mx-auto px-4 w-full max-w-[1264px]"
    >
      <h2 class="text-dark text-lg font-bold tracking-[-0.01em] leading-6 text-center uppercase font-lemon max-[992px]:max-w-[228px] max-[992px]:leading-5 max-[992px]:text-sm">
        {title}
      </h2>
      <div class="flex gap-4 h-[88px] justify-center mt-8 overflow-y-clip w-full items-center">
        {!isMobile && (
          <button
            type="button"
            data-prev
            aria-label="Categoria Anterior"
            class="justify-center items-center size-12 hidden lg:flex"
          >
            <Icon
              size={24}
              class="rotate-180"
              id="StrokeArrowRight"
              strokeLinecap="round"
              strokeWidth={2}
            />
          </button>
        )}
        <ul
          data-carousel
          class="[--gap:8px] lg:[--gap:24px] gap-[var(--gap,8px)] carousel text-dark text-sm font-bold text-center leading-[17px] items-center"
          style={{
            "--items": Math.min(categories.length, 3),
            "--items-md": Math.min(categories.length, 5),
            "--items-lg": Math.min(categories.length, 6),
            "--items-xl": Math.min(categories.length, 7),
          }}
        >
          {categories.map((category, index) => (
            <li
              data-item={index}
              class="group/item shrink-0 rounded-full flex justify-center items-center h-[88px] bg-light-gray-200 hover:bg-gradient-to-r from-red to-orange transition-all duration-300 w-[calc((100%/var(--items,3))-var(--gap,8px)+(var(--gap,8px)/var(--items,3)))] min-[769px]:[--items:var(--items-md)] min-[1100px]:[--items:var(--items-lg)] xl:[--items:var(--items-xl)]"
              key={category.href}
            >
              <a
                class="group-hover/item:bg-white transition-all duration-300 h-[calc(100%_-_4px)] w-[calc(100%_-_4px)] float-left flex cursor-pointer bg-ice rounded-full justify-center items-center px-6"
                href={category.href}
              >
                {category.label}
              </a>
            </li>
          ))}
        </ul>
        {!isMobile && (
          <button
            type="button"
            data-next
            aria-label="Próxima Categoria"
            class="justify-center items-center size-12 hidden lg:flex"
          >
            <Icon
              size={24}
              id="StrokeArrowRight"
              strokeLinecap="round"
              strokeWidth={2}
            />
          </button>
        )}
      </div>
      {isMobile && (
        <ul
          data-dots
          class="carousel gap-3 justify-center items-center h-2 w-full mt-6"
        >
          <li
            data-dot-template
            class="w-[5px] h-[5px] bg-ice rounded-full data-[active]:bg-dark transition-all duration-300"
          />
        </ul>
      )}
      <script
        defer
        src={scriptAsDataURI(isMobile ? mobileScript : desktopScript, {
          rootId: id,
        })}
      />
    </div>
  );
}
