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
  test: string;
  properties: PropertyValue[];
}

const POSSIBLE_PROPERTIES = ["Sabor", "Tamanho"];
const renderedValues: string[] = [];

function splitProperties(properties: PropertyValue[]) {
  return properties.filter((property) => {
    if (!property.name) return false;
    return POSSIBLE_PROPERTIES.includes(property.name);
  });
}

function ProductSimilars({ product, current }: Props) {
  if (!IS_BROWSER) return null;
  const [data, setData] = useState<Data[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      // console.log("product", product);
      const currentProperties = splitProperties(current);
      const selected = {
        id: product.productID,
        url: product.url,
        test: `${
          currentProperties.map((property) => property.value).join(" - ")
        }`,
        active: true,
        properties: currentProperties,
      };
      // console.log("selected", selected);
      const relatedProducts = await invoke.vtex.loaders.legacy
        .relatedProductsLoader({
          crossSelling: "similars",
          id: product.inProductGroupWithID,
        });
      console.log("relatedProducts", relatedProducts);
      const possibilities = relatedProducts?.map((related) => {
        const properties = splitProperties(
          related.isVariantOf?.additionalProperty ?? [],
        );
        return {
          id: related.isVariantOf?.productGroupID,
          url: related.url,
          test: `${properties.map((property) => property.value).join(" - ")}`,
          properties,
        };
      });
      const newPossibilities = [selected, ...(possibilities || [])];
      // console.log("newPossibilities", newPossibilities);
      const sorted = newPossibilities?.sort((a, b) => {
        if (a.test < b.test) return -1;
        if (a.test > b.test) return 1;
        return 0;
      });
      // console.log("sorted", sorted);
      // @ts-ignore - TS doesn't like this
      setData(sorted);
    };
    getData();
  }, [product]);

  return (
    <div class="flex flex-col gap-6">
      {POSSIBLE_PROPERTIES.map((propertyName) => (
        <div>
          <span class="block font-lemon-milk text-[13px] font-bold uppercase mb-2">
            {propertyName}
          </span>
          <ul class="flex flex-wrap flex-row gap-2">
            {data?.map((possibility) => {
              const value = possibility.properties.find((property) =>
                property.name === propertyName
              )?.value;
              if (!value) return null;
              if (renderedValues.includes(value)) return null;
              renderedValues.push(value);
              return (
                <li class="bg-ice border-2 border-light-gray rounded-full">
                  <a
                    class="block py-2 px-3 text-sm font-bold"
                    href={possibility.url}
                  >
                    {value}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ProductSimilars;
