import { marky } from "marky";
import { DescriptionImage } from "./Image.tsx";

type InfoCardType =
  | "infoCard1TextLeft"
  | "infoCard1TextRight"
  | "infoCard2TextLeft"
  | "infoCard2TextRight"
  | "infoCardFullTextLeftWhite"
  | "infoCardFullTextRightWhite"
  | "infoCardFullTextCenterWhite"
  | "infoCardFullTextLeftBlack"
  | "infoCardFullTextRightBlack"
  | "infoCardFullTextCenterBlack";

interface Props {
  type: InfoCardType;
  images: string;
  description: string;
  title?: string;
  color?: string;
}

export function InfoCard(
  { type, images, description, title, color = "#3C3C3B" }: Props,
) {
  if (type === "infoCard1TextLeft") {
    return (
      <div class="flex flex-col-reverse md:flex-row items-stretch bg-ice">
        <div class="w-full md:w-1/2 flex items-center justify-center">
          <div class="w-full md:w-3/4 py-16 lg:py-0 px-8 md:px-0">
            <h2
              class="text-2xl lg:text-4xl uppercase mb-3 font-bold font-lemon-milk"
              style={{ color }}
            >
              {title}
            </h2>
            <p dangerouslySetInnerHTML={{ __html: marky(description) }} />
          </div>
        </div>
        <div class="w-full md:w-1/2">
          <DescriptionImage
            images={images}
            className="w-full h-auto md:h-full object-cover object-center"
          />
        </div>
      </div>
    );
  }
  if (type === "infoCard1TextRight") {
    return (
      <div class="flex flex-col-reverse md:flex-row items-stretch bg-ice">
        <div class="w-full md:w-1/2">
          <DescriptionImage
            images={images}
            className="w-full h-auto md:h-full object-cover object-center"
          />
        </div>
        <div class="w-full md:w-1/2 flex items-center justify-center">
          <div class="w-full md:w-3/4 py-16 lg:py-0 px-8 md:px-0">
            <h2
              class="text-2xl lg:text-4xl uppercase mb-3 font-bold font-lemon-milk"
              style={{ color }}
            >
              {title}
            </h2>
            <p dangerouslySetInnerHTML={{ __html: marky(description) }} />
          </div>
        </div>
      </div>
    );
  }
  if (type === "infoCard2TextLeft") {
    return (
      <div class="w-full px-6 md:max-w-[80vw] md:px-0 flex flex-col md:flex-row items-center gap-8 sm:gap-24 mx-auto">
        <div
          class="text-sm md:text-base"
          dangerouslySetInnerHTML={{ __html: marky(description) }}
        />
        <div class="overflow-hidden w-full md:w-2/5 shadow-[0_0_20px_rgba(0,0,0,0.3)] rounded-3xl flex-none">
          <DescriptionImage images={images} className="w-full h-auto" />
        </div>
      </div>
    );
  }
  if (type === "infoCard2TextRight") {
    return (
      <div class="w-full px-6 md:max-w-[80vw] md:px-0 flex flex-col md:flex-row items-center gap-8 sm:gap-24 mx-auto">
        <div class="overflow-hidden w-full md:w-2/5 shadow-[0_0_20px_rgba(0,0,0,0.3)] rounded-3xl flex-none">
          <DescriptionImage images={images} className="w-full h-auto" />
        </div>
        <div
          class="text-sm md:text-base"
          dangerouslySetInnerHTML={{ __html: marky(description) }}
        />
      </div>
    );
  }
  if (type.indexOf("infoCardFull") !== -1) {
    let infoCardTextColor = "";
    let infoCardTextPosition = "absolute-center m-0 ";
    if (type.indexOf("White") !== -1) infoCardTextColor += "text-white";
    if (type.indexOf("Black") !== -1) infoCardTextColor += "text-dark";

    if (type.indexOf("infoCardFullTextLeft") !== -1) {
      infoCardTextPosition += " absolute-top-center !left-0 mx-40";
    }
    if (type.indexOf("infoCardFullTextRight") !== -1) {
      infoCardTextPosition += " absolute-top-center !right-0 mx-40";
    }
    return (
      <div class={`relative z-1`}>
        <DescriptionImage
          images={images}
          className="object-cover object-center w-full h-[712px] max-w-unset"
        />
        <div
          class={`${infoCardTextPosition} w-full lg:w-[585px] px-10 lg:px-0`}
        >
          {title && (
            <h2
              class={`text-2xl lg:text-4xl uppercase font-bold font-lemon-milk mb-8 ${
                type.indexOf("infoCardFullTextCenter") !== -1
                  ? "text-center"
                  : "text-left"
              } ${infoCardTextColor}`}
            >
              {title}
            </h2>
          )}
          <p
            class={`${
              !title
                ? "text-1xl sm:text-2xl font-lemon-milk font-bold leading-6 sm:leading-7"
                : "text-base leading-6"
            } ${
              type.indexOf("infoCardFullTextCenter") !== -1
                ? "text-center"
                : "text-left"
            } ${infoCardTextColor}`}
            dangerouslySetInnerHTML={{ __html: marky(description) }}
          />
        </div>
      </div>
    );
  }
  return null;
}
