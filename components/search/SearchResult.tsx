import { SendEventOnView } from "$store/components/Analytics.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery from "../product/ProductGallery.tsx";
import { renderSection } from "apps/website/pages/Page.tsx";
import { ReturnSectionSEO } from "deco-sites/true-source/loaders/PLPSectionsSEO.ts";
import { AppContext } from "$store/apps/site.ts";

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;

  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;

  sectionsSEO: ReturnSectionSEO;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

function Result({
  page,
  startingPage = 0,
  sectionsSEO,
  url,
  isMobile,
}: ReturnType<typeof loader>) {
  if (!page) throw new Error("Unreachable");

  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo.recordPerPage || products.length;

  const id = useId();

  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  const URLi = new URL(url);

  const title = `${URLi.pathname.split("/").pop() ?? ""} (${pageInfo.records})`;

  return (
    <>
      <div class="container px-4 sm:py-10">
        <SearchControls
          sortOptions={sortOptions}
          filters={filters}
          breadcrumb={breadcrumb}
          displayFilter
          url={url}
          title={title}
          isMobile={isMobile}
        />

        <div class="flex flex-row">
          {filters.length > 0 && !isMobile && (
            <aside class="w-min min-w-[250px]">
              <Filters filters={filters} url={url} />
            </aside>
          )}
          <div class="flex-grow" id={id}>
            <ProductGallery
              products={products}
              offset={offset}
              isMobile={isMobile}
            />
          </div>
        </div>

        <div class="flex justify-center my-4">
          <div class="join">
            <a
              aria-label="previous page link"
              rel="prev"
              href={pageInfo.previousPage ?? "#"}
              class="btn btn-ghost join-item"
            >
              <Icon id="ChevronLeft" size={24} strokeWidth={2} />
            </a>
            <span class="btn btn-ghost join-item">
              Page {zeroIndexedOffsetPage + 1}
            </span>
            <a
              aria-label="next page link"
              rel="next"
              href={pageInfo.nextPage ?? "#"}
              class="btn btn-ghost join-item"
            >
              <Icon id="ChevronRight" size={24} strokeWidth={2} />
            </a>
          </div>
        </div>

        <div class="flex flex-col border-t border-t-light-gray max-w-[1340px] w-[95%] container">
          {sectionsSEO.map(renderSection)}
        </div>
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
            item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: ReturnType<typeof loader>) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export function loader(props: Props, req: Request, ctx: AppContext) {
  const sectionsSEO = props.sectionsSEO.sections?.find(
    (section) => new URLPattern({ pathname: section.matcher }).test(req.url),
  )?.sections ?? [];

  return {
    ...props,
    sectionsSEO,
    url: req.url,
    isMobile: ctx.device !== "desktop",
  };
}

export default SearchResult;
