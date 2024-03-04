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
          if (poss[key].length === 0) return null;
          return (
            <div>
              <span class="block font-lemon-milk text-[13px] font-bold uppercase mb-2">
                {/* @ts-ignore PROPERTIE_NAMES is ok */}
                {PROPERTIE_NAMES[key]}
              </span>
              <ul class="flex flex-wrap flex-row gap-2">
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
                      } border-2 rounded-full`}
                    >
                      <a
                        class="block py-2 px-3 text-sm font-bold"
                        href={d.url}
                      >
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
