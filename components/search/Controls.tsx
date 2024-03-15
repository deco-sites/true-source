import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";
import useModal from "deco-sites/true-source/components/ui/useModal.tsx";

export type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
    url: string;
    title: string;
    productsCount: number;
    isMobile: boolean;
  };

function SearchControls(
  {
    filters,
    breadcrumb,
    displayFilter,
    sortOptions,
    url,
    title,
    isMobile,
    productsCount,
  }: Props,
) {
  const sortModal = useModal();
  const filterModal = useModal();

  return (
    <div class="flex flex-col">
      <div class="flex flex-row items-center justify-between sm:gap-4 sm:border-none">
        <h1 class="text-2xl font-bold text-dark font-lemon">
          {title} <span class="font-light">({productsCount})</span>
        </h1>
        {sortOptions.length > 0 && !isMobile && (
          <Sort sortOptions={sortOptions} isMobile={isMobile} />
        )}
      </div>

      <div class="w-full h-px bg-light-gray-200 my-6" />

      <div class="mb-6">
        <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
      </div>

      {isMobile && (
        <div class="flex items-center justify-between mb-4">
          <div>
            <filterModal.Toggle class="px-3 py-2 rounded-full bg-ice flex justify-center items-center gap-2 text-xs font-bold text-dark">
              Filtrar
              <Icon id="ChevronDown" width={16} height={16} />
            </filterModal.Toggle>

            <filterModal.Modal class="group/modal fixed top-0 left-0 w-full h-full pointer-events-none peer-checked:pointer-events-auto z-50">
              <filterModal.Toggle class="absolute w-full h-full bg-black/50 opacity-0 peer-checked:group-[]/modal:opacity-100 transition-all" />

              <div class="-translate-x-full peer-checked:group-[]/modal:translate-x-0 transition-all w-full h-full max-w-[308px] rounded-tr-[20px] rounded-br-[20px] bg-white p-6 overflow-y-auto overscroll-contain">
                <filterModal.Toggle class="absolute top-6 right-4">
                  <div class="size-9 rounded-full border-2 border-red flex justify-center items-center">
                    <Icon id="X" width={20} height={20} class="text-red" />
                  </div>
                </filterModal.Toggle>

                <div class="mt-4">
                  <Filters filters={filters} url={url} noCollapsable />
                </div>
              </div>
            </filterModal.Modal>
          </div>

          <div>
            <sortModal.Toggle class="px-3 py-2 rounded-full bg-ice flex justify-center items-center gap-2 text-xs font-bold text-dark">
              Ordenar por
              <Icon id="ChevronDown" width={16} height={16} />
            </sortModal.Toggle>

            <sortModal.Modal class="group/modal fixed top-0 left-0 w-full h-full pointer-events-none peer-checked:pointer-events-auto z-50">
              <sortModal.Toggle class="absolute w-full h-full bg-black/50 opacity-0 peer-checked:group-[]/modal:opacity-100 transition-all" />

              <div class="absolute top-0 right-0 translate-x-[100vw] peer-checked:group-[]/modal:translate-x-0 transition-all w-full h-full max-w-[308px] rounded-tl-[20px] rounded-bl-[20px] bg-white p-6 overflow-y-auto overscroll-contain">
                <sortModal.Toggle class="absolute top-6 right-4">
                  <div class="size-9 rounded-full border-2 border-red flex justify-center items-center">
                    <Icon id="X" width={20} height={20} class="text-red" />
                  </div>
                </sortModal.Toggle>

                <div class="mt-4">
                  <span class="text-dark font-medium text-sm font-lemon block mb-4">
                    Ordenar por
                  </span>

                  <Sort sortOptions={sortOptions} isMobile={isMobile} />
                </div>
              </div>
            </sortModal.Modal>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchControls;
