import Icon from "deco-sites/true-source/components/ui/Icon.tsx";
import { sendEvent } from "deco-sites/true-source/sdk/analytics.tsx";
import { useId } from "deco-sites/true-source/sdk/useId.ts";
import { useSuggestions } from "deco-sites/true-source/sdk/useSuggestions.ts";
import type { Suggestion } from "apps/commerce/types.ts";
import type { Resolved } from "deco/engine/core/resolver.ts";
import { useRef } from "preact/compat";
import type { Platform } from "deco-sites/true-source/apps/site.ts";
import { useSignal } from "@preact/signals";

/** @titleBy term */
export interface Suggestions {
  term: string;
}

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
  isMobile: boolean;

  platform?: Platform;
}

function Searchbar({
  placeholder = "O que você procura?",
  action = "/s",
  name = "q",
  loader,
  isMobile,
}: Props) {
  const id = useId();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setQuery } = useSuggestions(loader);

  const ref = useRef<HTMLDivElement>(null);
  const searchValue = useSignal("");

  const iconSize = isMobile ? 12 : 18;

  return (
    <div
      class="flex flex-col flex-1 lg:pb-0 h-full group"
      ref={ref}
      tabIndex={-1}
    >
      <form
        id={id}
        action={action}
        class="relative z-20 flex flex-grow flex-1 items-center bg-ice px-[16px] md:px-[24px] border border-light-gray-200 rounded-full h-full min-h-[40px] group-data-[micro-header='true']/header:min-h-[30px] md:min-h-[48px] overflow-visible"
      >
        <input
          ref={searchInputRef}
          class="group-data-[micro-header='true']/header:pb-[3px] flex-grow bg-ice w-full h-full max-h-[48px] placeholder:font-semibold text-[13px] text-grey md:placeholder:text-[13px] placeholder:text-grey placeholder:text-xs outline-none"
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
            searchValue.value = value;
          }}
          placeholder={placeholder}
          autocomplete="off"
          aria-label="Buscar por produto"
        />
        <button
          type="submit"
          class="flex justify-center items-center h-full focus:outline-none"
          aria-label="Search"
          htmlFor="searchbar"
          tabIndex={-1}
        >
          <Icon
            id="MagnifyingGlass"
            size={iconSize}
            strokeWidth={0.01}
          />
        </button>
      </form>
    </div>
  );
}

export default Searchbar;
