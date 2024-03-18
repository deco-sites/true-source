import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";

interface Image {
  desktop: ImageWidget;
  tablet?: ImageWidget;
  mobile?: ImageWidget;
}

export interface Props {
  /** @default 1 */
  type: "1" | "full";
  title?: HTMLWidget;
  color?: string;
  image?: Image;
  /** @default left */
  textAlign?: "left" | "right";
  /** @default false */
  description: HTMLWidget;
  /** @default #F0F0EE */
  backgroundColor: string;
}

export default function InfoCardHorizontal({
  type = "1",
  title =
    "<p>Complementos alimentares <strong>perfeitos</strong> para quem tem uma rotina de <strong>atividades físicas intensas</strong></p>",
  color = "#3C3C3B",
  image = {
    desktop: "https://tfcucl.vtexassets.com/arquivos/infocard-2.jpg",
  },
  textAlign = "left",
  backgroundColor = "#F0F0EE",
  description =
    "Os suplementos ajudam a melhorar a resistência física, auxiliam no ganho de massa magra e também na recuperação muscular, além de diversos outros benefícios para você que busca hipertrofia ou definição muscular.\n\nProduzidos com substâncias naturais, nossos produtos são desenvolvidos por especialistas de peso e formulados com produtos altamente eficientes e, claro, muito saborosos. Para te ajudar a alcançar seus objetivos de treino, a True Source dispõe de tudo o que você precisa em proteínas, aminoácidos, termogênicos e vitaminas e minerais. Venha com a gente e conheça um pouco mais de nossos suplementos!",
}: Props) {
  if (type === "full") {
    return (
      <div className="md:container">
        <div
          class={`flex ${
            textAlign === "right" ? "justify-end" : "justify-start"
          } lg:items-center relative z-1 rounded-[35px] overflow-hidden min-h-[580px]`}
        >
          <picture>
            <source media="(min-width:1024px)" srcset={image.desktop} />
            <source
              media="(min-width:640px)"
              srcset={image.tablet ? image.tablet : image.desktop}
            />
            <img
              src={image.mobile ? image.mobile : image.desktop}
              class="absolute-center object-cover object-center w-full max-w-unset h-full"
            />
          </picture>
          <div
            class="w-full lg:w-2/5 p-12 relative z-1"
            style={{ color }}
          >
            {title && (
              <h2
                class="custom-category-title text-left"
                dangerouslySetInnerHTML={{ __html: title }}
              />
            )}
            <div
              class={`custom-category-text ${
                !title
                  ? "text-1xl sm:text-2xl font-lemon-milk font-bold leading-6 sm:leading-7"
                  : "text-sm lg:text-base leading-6"
              }`}
            >
              <p dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    const cardTextLeft = "gap-12 flex-col-reverse md:gap-0 md:flex-row";
    const cardTextRight =
      "gap-12 flex-col-reverse md:gap-0 md:flex-row-reverse";

    const alignment = textAlign === "left"
      ? cardTextLeft
      : textAlign === "right"
      ? cardTextRight
      : cardTextLeft;

    return (
      <div className="md:container">
        <div
          class={`flex ${alignment} items-stretch p-6 md:p-12 rounded-[35px]`}
          style={{ backgroundColor }}
        >
          <div class="w-full md:w-1/2 flex items-center justify-center">
            <div class="w-full md:w-3/4">
              {title && (
                <h2
                  class="custom-category-title"
                  style={{ color }}
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              )}
              <div class="custom-category-text text-sm lg:text-base leading-6">
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2">
            <picture>
              <source media="(min-width:1024px)" srcset={image.desktop} />
              <source
                media="(min-width:640px)"
                srcset={image.tablet ? image.tablet : image.desktop}
              />
              <img
                src={image.mobile ? image.mobile : image.desktop}
                class="w-full h-auto md:h-full object-cover object-center rounded-[11px]"
              />
            </picture>
          </div>
        </div>
      </div>
    );
  }
}
