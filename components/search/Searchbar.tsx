import ProductCard from "$store/components/product/ProductCard.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useSuggestions } from "$store/sdk/useSuggestions.ts";
import { Suggestion } from "apps/commerce/types.ts";
import { Resolved } from "deco/engine/core/resolver.ts";
import { useEffect, useRef, useState } from "preact/compat";
import type { Platform } from "$store/apps/site.ts";
import Image from "apps/website/components/Image.tsx";

// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;

  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;

  platform?: Platform;
}
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;

  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;

  platform?: Platform;
}

function Searchbar({
  placeholder = "O que você procura?",
  action = "/s",
  name = "q",
  loader,
  platform,
}: Props) {
  const id = useId();
  const [searching, setSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setQuery, payload, loading } = useSuggestions(loader);
  const { products = [], searches = [] } = payload.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);

  useEffect(() => {
    if (hasProducts || hasTerms) setSearching(true);
  }, [hasTerms, hasProducts]);

  const focusHandler = () => {
    setSearching(true);
  };

  const blurHandler = () => {
    setTimeout(() => setSearching(false), 300);
  };

  return (
    <>
      <div class="w-full grid items-center overflow-x-hidden  lg:pb-0">
        <form
          id={id}
          action={action}
          class="searchBarForm join border bg-gray-200  border-solid border-Stroke rounded-3xl flex m-auto w-[100%]"
        >
          <input
            ref={searchInputRef}
            id="search-input"
            class="searchbarInput input join-item bg-gray-200 flex-grow focus:outline-none focus:shadow-none focus:border-transparent lg:h-[48px] placeholder:text-[13px] placeholder:text-gray-400 border-0 outline-none"
            name={name}
            onInput={(e) => {
              const value = e.currentTarget.value;

              if (value) {
                sendEvent({
                  name: "search",
                  params: { search_term: value },
                });
              }

              setQuery(value);
            }}
            placeholder={placeholder}
            role="combobox"
            aria-controls="search-suggestion"
            aria-haspopup="listbox"
            aria-expanded={true}
            autocomplete="off"
            onFocus={focusHandler}
            onBlur={blurHandler}
          />
          <Button
            type="submit"
            class="bg-transparent border-0 hover:bg-transparent hover:border-0 pl-[10px] pr-[6px] lg:px-[24px]"
            aria-label="Search"
            for={id}
            tabIndex={-1}
          >
            {loading.value
              ? <span class="loading loading-spinner loading-xs" />
              : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M21 21.5L16.65 17.15M19 11.5C19 15.9183 15.4183 19.5 11 19.5C6.58172 19.5 3 15.9183 3 11.5C3 7.08172 6.58172 3.5 11 3.5C15.4183 3.5 19 7.08172 19 11.5Z"
                    stroke="#E9530E"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
          </Button>
        </form>
      </div>

      <div
        class={`${
          searching
            ? (!hasProducts && !hasTerms)
              ? "hidden"
              : "lg:searching absolute z-50 left-0 lg:left-[unset] lg:max-w-[786px] w-full bg-white rounded-t-sm rounded-bl-[1rem] rounded-br-[1rem] pb-4;"
            : "hidden"
        }`}
      >
        <div class="gap-4 py-3 container flex flex-col sm:flex-row m-auto">
          {searches.length > 0
            ? (
              <div class="flex flex-col md:pt-0 gap-6 overflow-x-hidden px-4 lg:m-0">
                <span
                  class="font-bold text-sm uppercase pt-4"
                  role="heading"
                  aria-level={3}
                >
                  Sugestões
                </span>
                <ul id="search-suggestion" class="flex flex-col gap-6">
                  {searches.map(({ term }) => (
                    <li>
                      <a href={`/s?q=${term}`} class="flex gap-4 items-center">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                          >
                            <path
                              d="M21 21.5L16.65 17.15M19 11.5C19 15.9183 15.4183 19.5 11 19.5C6.58172 19.5 3 15.9183 3 11.5C3 7.08172 6.58172 3.5 11 3.5C15.4183 3.5 19 7.08172 19 11.5Z"
                              stroke="#E9530E"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>
                        <span
                          class="text-sm"
                          dangerouslySetInnerHTML={{ __html: term }}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
            : null}
          {products.length > 0
            ? (
              <div class="flex container flex-col md:pt-0 gap-6 overflow-x-hidden m-auto">
                <span
                  class="font-bold text-sm uppercase pt-4"
                  role="heading"
                  aria-level={3}
                >
                  Produtos sugeridos
                </span>
                <div class="flex flex-col gap-y-4">
                  {products.map((product, index) => (
                    <a class="flex items-center gap-x-6" href={product.url}>
                      <Image
                        src={(product.image && product.image[0].url) ?? ""}
                        alt={product.image && product.image[0].name}
                        width={115}
                        height={96}
                        loading="lazy"
                        decoding="async"
                      />
                      <span class="text-sm">
                        {product.isVariantOf?.name ?? ""}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )
            : null}
        </div>
      </div>
    </>
  );
}
export default Searchbar;
