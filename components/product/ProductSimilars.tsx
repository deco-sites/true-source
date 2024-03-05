import { invoke } from "../../runtime.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect, useState } from "preact/compat";
import type { Product, PropertyValue } from "apps/commerce/types.ts";

export interface Props {
  product: Product;
  current: PropertyValue[];
}

interface Data {
  id: string;
  url: string;
  name: string;
  selected?: true;
  properties: PropertyValue[];
}

interface Possibilities {
  sizes?: Array<Data>;
  flavours?: Array<Data>;
}

const POSSIBLE_PROPERTIES = ["Tamanho", "Sabor"];

const PROPERTIE_NAMES = {
  sizes: "Tamanho",
  flavours: "Sabor",
};

const renderedValues: string[] = [];

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
  >
    <g clip-path="url(#clip0_2871_41320)">
      <path
        d="M4.37533 7L6.12533 8.75L9.62533 5.25M12.8337 7C12.8337 10.2217 10.222 12.8333 7.00033 12.8333C3.77866 12.8333 1.16699 10.2217 1.16699 7C1.16699 3.77834 3.77866 1.16667 7.00033 1.16667C10.222 1.16667 12.8337 3.77834 12.8337 7Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2871_41320">
        <rect width="14" height="14" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

function splitProperties(properties: PropertyValue[]) {
  return properties.filter((property) => {
    if (!property.name) return false;
    return POSSIBLE_PROPERTIES.includes(property.name);
  });
}

function getSelected(product: Product, current: PropertyValue[]): Data {
  const currentProperties = splitProperties(current);
  return {
    id: product.productID,
    url: product.url || "",
    name: `${currentProperties.map((property) => property.value).join(" - ")}`,
    selected: true,
    properties: currentProperties,
  };
}

function getPossibilities(
  relatedProducts: Product[],
  selected: Data,
  size: string,
  flavour: string,
): Possibilities {
  const possibilities = relatedProducts?.map((related) => {
    const properties = splitProperties(
      related.isVariantOf?.additionalProperty ?? [],
    );
    return {
      id: related.isVariantOf?.productGroupID,
      url: related.url,
      name: `${properties.map((property) => property.value).join(" - ")}`,
      properties,
    };
  });
  const newPossibilities = [selected, ...(possibilities || [])];

  const flavours = newPossibilities.filter((p) => {
    return p.name.indexOf(size) !== -1;
  }).sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  const sizes = newPossibilities.filter((p) => {
    return p.name.indexOf(flavour) !== -1;
  }).sort((a, b) => {
    const nameA = parseInt(a.name.replace(/[^0-9]/gi, ""));
    const nameB = parseInt(b.name.replace(/[^0-9]/gi, ""));
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  return {
    // @ts-expect-error flavours is right
    flavours,
    // @ts-expect-error sizes is right
    sizes,
  };
}

function ProductSimilars({ product, current }: Props) {
  if (!IS_BROWSER) return null;
  const [poss, setPoss] = useState<Possibilities | null>(null);

  useEffect(() => {
    const getData = async () => {
      const {
        isVariantOf: {
          // @ts-ignore additionalProperty exists
          additionalProperty,
        },
      } = product;

      const flavour = additionalProperty.find((p: PropertyValue) =>
        p.name === "Sabor"
      )?.value;
      const size = additionalProperty.find((p: PropertyValue) =>
        p.name === "Tamanho"
      )?.value;

      const selected = getSelected(product, current);
      const relatedProducts = await invoke.vtex.loaders.legacy
        .relatedProductsLoader({
          crossSelling: "similars",
          id: product.inProductGroupWithID,
        });

      if (!relatedProducts) return null;

      const possibilities = getPossibilities(
        relatedProducts,
        selected,
        size,
        flavour,
      );
      setPoss(possibilities);
    };
    getData();
  }, [product]);

  if (!poss) return null;

  // @ts-expect-error renderValues is ok
  const renderValues = Object.keys(poss).filter((k) => poss[k].length > 0);

  if (renderValues.length === 0) return null;

  return (
    <div class="flex flex-col gap-6">
      {poss
        // @ts-ignore poss is ok
        ? Object.keys(poss).map((key) => {
          // @ts-ignore if is ok
          if (poss[key].length <= 1) return null;
          return (
            <div>
              <span class="block font-lemon-milk text-[13px] font-bold uppercase mb-2">
                {/* @ts-ignore PROPERTIE_NAMES is ok */}
                {PROPERTIE_NAMES[key]}
              </span>
              <ul
                id="selector-options"
                class="flex flex-nowrap overflow-x-auto sm:flex-wrap flex-row gap-2"
              >
                {/* @ts-ignore poss with key in object is ok */}
                {poss[key].map((d) => {
                  let name = "";
                  if (key === "flavours") name = d.name.split("-")[0].trim();
                  if (key === "sizes") name = d.name.split("-")[1].trim();
                  return (
                    <li
                      class={`${
                        d.selected
                          ? "bg-brand text-white"
                          : "bg-ice border-light-gray text-dark"
                      } border-2 rounded-full flex-none first:ml-4 first:sm:ml-0 last:mr-4 last:sm:mr-0`}
                    >
                      <a
                        class="flex items-center gap-2 py-2 px-3 text-sm font-bold"
                        href={d.url}
                      >
                        {d.selected && <CheckIcon />}
                        {name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })
        : null}
    </div>
  );
}

export default ProductSimilars;
