import PriceRange from "$store/components/ui/PriceRange.tsx";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import { capitalize } from "apps/utils/capitalize.ts";
import useCollapsable from "deco-sites/true-source/components/ui/useCollapsable.tsx";
import Icon from "deco-sites/true-source/components/ui/Icon.tsx";
import { useId } from "deco-sites/true-source/sdk/useId.ts";
import { clx } from "deco-sites/true-source/sdk/clx.ts";

interface Props {
  filters: ProductListingPage["filters"];
  url: string;
  noCollapsable?: boolean;
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label }: FilterToggleValue,
) {
  const id = useId();

  return (
    <a
      href={url}
      rel="nofollow"
      class="flex items-center gap-4 text-sm text-dark py-4 w-full"
    >
      <input type="checkbox" id={id} checked={selected} class="peer hidden" />
      <label
        for={id}
        class={clx(
          "size-4 border-2 border-dark rounded-full flex justify-center items-center",
          selected && "bg-dark",
        )}
      >
        {selected && <span class="size-2 absolute bg-white rounded-full" />}
      </label>
      <span class="text-sm">{label}</span>
    </a>
  );
}

function FilterValues(
  { key, values, label, noCollapsable }: FilterToggle & {
    noCollapsable?: boolean;
  },
) {
  const collapsable = useCollapsable();
  const categoryCollapsable = useCollapsable();

  const NO_DIVIDER = [/^category/, /^price/];

  return (
    <collapsable.Collapsable open>
      {noCollapsable
        ? (
          <span class="text-dark font-medium text-sm font-lemon">
            {label.toLowerCase() === "categoria" ? "Produtos" : label}
          </span>
        )
        : (
          <collapsable.Trigger class="flex items-center gap-3 text-dark font-medium text-sm font-lemon group/trigger">
            {label.toLowerCase() === "categoria" ? "Produtos" : label}
            <Icon
              id="ChevronRight"
              width={32}
              height={32}
              class="rotate-90 peer-checked:group-[]/trigger:-rotate-90 transition-transform"
            />
          </collapsable.Trigger>
        )}
      <collapsable.ContentWrapper class="mt-6">
        <collapsable.Content
          class={clx(
            "flex flex-col items-start",
            NO_DIVIDER.some((re) => re.test(key))
              ? "gap-2"
              : "divide-y divide-light-gray-200",
          )}
        >
          {(() => {
            if (label === "Preço") {
              const [min, max] = values.map(({ value }) =>
                parseRange(value) || { from: 0, to: 0 }
              ).reduce((acc, curr) => {
                return [Math.min(acc[0], curr.from), Math.max(acc[1], curr.to)];
              }, [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]);

              return <PriceRange min={min} max={max} />;
            }

            if (label === "Categoria") {
              return (
                <div class="border-b border-b-light-gray-200 pb-8 flex flex-col gap-2 items-start">
                  {values.slice(0, 10).map((
                    { url, quantity, label, selected },
                  ) => (
                    <a
                      href={url}
                      class={clx(
                        "flex justify-center items-center px-3 py-1.5 rounded-full font-bold text-sm hover:text-white hover:bg-dark hover:border-dark transition-colors",
                        selected
                          ? "text-white bg-dark"
                          : "text-dark bg-white border-2 border-light-gray-200",
                      )}
                    >
                      {capitalize(label.toLowerCase()).split(" ").map((
                        word,
                      ) =>
                        word.length === 1 || word.length === 2
                          ? word.toLowerCase()
                          : word
                      ).join(" ")} ({quantity})
                    </a>
                  ))}
                  {values.length > 10 && (
                    <categoryCollapsable.Collapsable>
                      <categoryCollapsable.ContentWrapper>
                        <categoryCollapsable.Content class="flex flex-col gap-2 items-start">
                          {values.slice(10).map(({ url, quantity, label }) => (
                            <a
                              href={url}
                              class="flex justify-center items-center px-3 py-1.5 border-2 border-light-gray-200 rounded-full text-dark font-bold text-sm"
                            >
                              {capitalize(label.toLowerCase()).split(" ").map((
                                word,
                              ) =>
                                word.length === 1 || word.length === 2
                                  ? word.toLowerCase()
                                  : word
                              ).join(" ")} ({quantity})
                            </a>
                          ))}
                        </categoryCollapsable.Content>
                      </categoryCollapsable.ContentWrapper>

                      <categoryCollapsable.Trigger class="flex items-center gap-3 text-dark font-bold text-sm group/categorytrigger mt-5 font-inter">
                        <span class="block peer-checked:group-[]/categorytrigger:hidden">
                          Ver todas as categorias +
                        </span>
                        <span class="hidden peer-checked:group-[]/categorytrigger:block">
                          Ver menos categorias -
                        </span>
                      </categoryCollapsable.Trigger>
                    </categoryCollapsable.Collapsable>
                  )}
                </div>
              );
            }

            return values.map((item) => {
              return <ValueItem {...item} />;
            });
          })()}
        </collapsable.Content>
      </collapsable.ContentWrapper>
    </collapsable.Collapsable>
  );
}

function Filters({ filters: f, url, noCollapsable }: Props) {
  const filters = f
    .filter(isToggle)
    .filter(({ values, label }) =>
      values.length > 0 && label !== "Departamento"
    )
    .sort((a, b) => a.label === "produtos" ? -1 : 1);

  //   const allProducts = filters.find(({ label }) => label === "Departamento")
  //     ?.values.find(({ label }) => label.toLowerCase() === "produtos");

  //   if (allProducts) {
  //     allProducts.label = "Todos os produtos";

  //     for (const f of filters) {
  //       if (f.label === "produtos") {
  //         f.values.unshift(allProducts);
  //       }
  //     }
  //   }

  return (
    <ul class="flex flex-col gap-6 mr-14">
      {filters
        .map((filter) => (
          <li class="flex flex-col gap-4">
            <FilterValues {...filter} noCollapsable={noCollapsable} />
          </li>
        ))}
    </ul>
  );
}

export default Filters;
