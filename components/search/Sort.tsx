import { useMemo } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";
import type { JSX } from "preact";
import { useId } from "deco-sites/true-source/sdk/useId.ts";
import { clx } from "deco-sites/true-source/sdk/clx.ts";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(
      globalThis.window.location?.search,
    );
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (sort: string) => {
  const urlSearchParams = new URLSearchParams(
    globalThis.window.location.search,
  );

  urlSearchParams.set(SORT_QUERY_PARAM, sort);
  globalThis.window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions"> & {
  isMobile: boolean;
};

// TODO: move this to the loader
const portugueseMappings = {
  "relevance:desc": "Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais vendidos",
  "name:desc": "Z - A",
  "name:asc": "A - Z",
  "release:desc": "Data de Lançamento",
  "discount:desc": "Maior desconto",
};

function Sort({ sortOptions, isMobile }: Props) {
  const sort = useSort();

  if (isMobile) {
    return (
      <div class="flex flex-col items-start divide-y divide-light-gray-200">
        {sortOptions.map(({ value, label }) => ({
          value,
          label: portugueseMappings[label as keyof typeof portugueseMappings] ??
            label,
        })).filter(({ label }) => label).map(({ value, label }) => {
          const selected = value === sort;
          const id = useId();

          return (
            <button
              type="button"
              onClick={() => applySort(value)}
              class="flex items-center gap-4 text-sm text-dark p-3 w-full"
            >
              <input
                type="checkbox"
                id={id}
                checked={selected}
                class="peer hidden"
              />
              <label
                for={id}
                class={clx(
                  "size-4 border-2 border-dark rounded-full flex justify-center items-center",
                  selected && "bg-dark",
                )}
              >
                {selected && (
                  <span class="size-2 absolute bg-white rounded-full" />
                )}
              </label>
              <span class="text-sm">{label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <label for="sort" class="sr-only">Ordenar por</label>
      <select
        id="sort"
        name="sort"
        onInput={(e) => applySort(e.currentTarget.value)}
        class="w-min h-[36px] px-1 rounded m-2 text-base-content cursor-pointer outline-none"
      >
        {sortOptions.map(({ value, label }) => ({
          value,
          label: portugueseMappings[label as keyof typeof portugueseMappings] ??
            label,
        })).filter(({ label }) => label).map(({ value, label }) => (
          <option key={value} value={value} selected={value === sort}>
            <span class="text-sm">{label}</span>
          </option>
        ))}
      </select>
    </>
  );
}

export default Sort;
