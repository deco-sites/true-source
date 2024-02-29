import { Gallery } from "./Gallery.tsx";
import { Benefits } from "./Benefits.tsx";
import { InfoCard } from "./InfoCard.tsx";
import { Comparison } from "./Comparison.tsx";
import { NutritionalTable } from "./NutritionalTable.tsx";
import { NutritionalHighlights } from "./NutritionalHighlights.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect, useState } from "preact/hooks";
import { invoke } from "../../../runtime.ts";
import type { PropertyValue } from "apps/commerce/types.ts";

export interface Props {
  slug: string;
}

const COMPONENT = /([a-z0-9]*)[:]/i;
const ONLY_IMAGE = /[\[](.+)[\]]/gim;
const VALUE = /.+(["].+(?:\n.+)*["])/gim;

export default function Description({
  slug = "",
}: Props) {
  if (!IS_BROWSER) return null;

  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await invoke.vtex.loaders.legacy
        .productDetailsPage({ slug });

      if (response) {
        const {
          product: {
            isVariantOf: {
              // @ts-ignore additionalProperty is checked
              additionalProperty,
            },
          },
        } = response;

        const customDesc = additionalProperty
          .find((p: PropertyValue) => p.name === "Custom Description")?.value;

        if (customDesc) {
          setDescription(customDesc);
        }
      }
    };
    getData();
  }, []);

  if (!description) return null;

  const descriptionLines = description.trim().split(/\,\r\n/i);
  if (descriptionLines.length === 0) return null;

  let ingredients_table = false;
  let have_dontHave_haveImage = false;
  let nutritionalHighlights_youtubeURL = false;

  const color = descriptionLines.find((line) => line.includes("color"))
    ?.replace(/.*\"(.*)\"/i, "$1");

  const have = descriptionLines.find((line) => line.includes("have"));
  const dontHave = descriptionLines.find((line) => line.includes("dontHave"));
  const haveImage = descriptionLines.find((line) => line.includes("haveImage"));

  const table = descriptionLines.find((line) => line.includes("table")) || "";
  const ingredients =
    descriptionLines.find((line) => line.includes("ingredients")) || "";

  const youtubeURL =
    descriptionLines.find((line) => line.includes("youtubeURL")) || "";
  const nutritionalHighlights =
    descriptionLines.find((line) => line.includes("nutritionalHighlights")) ||
    "";

  return (
    <div class="flex flex-col">
      {descriptionLines.map((line) => {
        if (line === "space") return <div class="my-7" />;
        const componentMatch = line.match(COMPONENT);
        if (componentMatch === null) return;
        const component = componentMatch[1];
        const value = line
          .replace(/\n/g, "<br/>")
          .replace(VALUE, "$1")
          .replace(/^["]/g, "")
          .replace(/["]$/g, "");
        switch (component) {
          case "benefits": {
            const items = value.split("|").map((item) => {
              const [icon, text] = item.split(";");
              return { icon, text };
            });
            return <Benefits items={items} color={color} />;
          }
          case "youtubeURL":
          case "nutritionalHighlights": {
            if (nutritionalHighlights_youtubeURL) return null;
            if (!nutritionalHighlights && !youtubeURL) return null;

            const nutritionalHighlightsValue = nutritionalHighlights
              .replace(/\n/g, "<br/>")
              .replace(VALUE, "$1")
              .replace(/^["]/g, "")
              .replace(/["]$/g, "")
              .split("|");
            const youtubeURLValue = youtubeURL
              .replace(/\n/g, "<br/>")
              .replace(VALUE, "$1")
              .replace(/^["]/g, "")
              .replace(/["]$/g, "");
            const items = nutritionalHighlightsValue.map((item) => {
              const [value, name] = item.split(";");
              return { value, name };
            });
            nutritionalHighlights_youtubeURL = true;
            if (!nutritionalHighlights && youtubeURL) {
              return (
                <NutritionalHighlights
                  youtubeURL={youtubeURLValue}
                  color={color}
                />
              );
            } else if (nutritionalHighlights && !youtubeURL) {
              return <NutritionalHighlights items={items} color={color} />;
            } else {
              return (
                <NutritionalHighlights
                  items={items}
                  youtubeURL={youtubeURLValue}
                  color={color}
                />
              );
            }
          }
          case "infoCard1TextLeft":
          case "infoCard1TextRight":
          case "infoCard2TextLeft":
          case "infoCard2TextRight":
          case "infoCardFullTextLeftWhite":
          case "infoCardFullTextRightWhite":
          case "infoCardFullTextCenterWhite":
          case "infoCardFullTextLeftBlack":
          case "infoCardFullTextRightBlack":
          case "infoCardFullTextCenterBlack": {
            if (value.split("|").length === 2) {
              const [images, text] = value.split("|");
              return (
                <InfoCard
                  type={component}
                  images={images}
                  description={text}
                  color={color}
                />
              );
            } else {
              const [images, title, text] = value.split("|");
              return (
                <InfoCard
                  type={component}
                  images={images}
                  description={text}
                  title={title}
                  color={color}
                />
              );
            }
          }
          case "gallery": {
            const images = value.split("|");
            return <Gallery images={images} />;
          }
          case "have":
          case "dontHave":
          case "haveImage": {
            if (have_dontHave_haveImage) return null;
            if (!have || !dontHave || !haveImage) return null;
            const haveValue = have
              .replace(/\n/g, "<br/>")
              .replace(VALUE, "$1")
              .replace(/^["]/g, "")
              .replace(/["]$/g, "")
              .split("|");
            const dontHaveValue = dontHave
              .replace(/\n/g, "<br/>")
              .replace(VALUE, "$1")
              .replace(/^["]/g, "")
              .replace(/["]$/g, "")
              .split("|");
            const haveImageValue = haveImage
              .replace(/\n/g, "")
              .replace(VALUE, "$1")
              .replace(/^["]/g, "")
              .replace(/["]$/g, "")
              .replace(ONLY_IMAGE, "$1");
            have_dontHave_haveImage = true;
            return (
              <Comparison
                have={haveValue}
                dontHave={dontHaveValue}
                haveImage={haveImageValue}
                color={color}
              />
            );
          }
          case "ingredients":
          case "table": {
            if (ingredients_table) return null;
            if (!ingredients && !table) return null;
            const ingredientsValue = ingredients
              .replace(/\n/g, "<br/>")
              .replace(VALUE, "$1")
              .replace(/^["]/g, "")
              .replace(/["]$/g, "");
            const tableValue = table
              .replace(/\n/g, "<br/>")
              .replace(VALUE, "$1")
              .replace(/^["]/g, "")
              .replace(/["]$/g, "")
              .split("|").map((item) => {
                return item.split(";").map((i) => i.trim());
              });
            ingredients_table = true;
            return (
              <NutritionalTable
                ingredients={ingredientsValue}
                table={tableValue}
                color={color}
              />
            );
          }
          default: {
            return null;
          }
        }
      })}
    </div>
  );
}
