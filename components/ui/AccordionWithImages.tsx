import Image from "apps/website/components/Image.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { AppContext } from "deco-sites/true-source/apps/site.ts";
import Icon from "deco-sites/true-source/components/ui/Icon.tsx";
import BannerCarouselJS from "deco-sites/true-source/islands/BannerCarouselJS.tsx";
import { useId } from "deco-sites/true-source/sdk/useId.ts";

interface DesktopImage {
  /**
   * @title Imagem
   * @format image-uri
   */
  src: string;
  /**
   * @title Largura
   * @description É recomendado uma largura de 864px
   */
  width: number;
  /**
   * @title Altura
   * @description É recomendado uma altura de 600px
   */
  height: number;
}

interface MobileImage {
  /**
   * @title Imagem
   * @format image-uri
   */
  src: string;
  /**
   * @title Largura
   * @description É recomendado uma largura de 390px
   */
  width: number;
  /**
   * @title Altura
   * @description É recomendado uma altura de 442px
   */
  height: number;
}

interface ImageProps {
  /**
   * @title Desktop
   * @description Imagem otimizada para telas maiores
   */
  desktop: DesktopImage;
  /**
   * @title Mobile
   * @description Imagem otimizada para telas menores
   */
  mobile: MobileImage;
  /**
   * @title Alt
   * @description Texto alternativo para a imagem
   */
  alt: string;
}

interface Button {
  /**
   * @title Texto
   */
  text: string;
  /**
   * @title Link
   */
  href: string;
}

/**
 * @title {{title}} - {{description}}
 */
interface Section {
  /**
   * @title Título
   */
  title: string;
  /**
   * @title Descrição
   */
  description: string;
  /**
   * @title Texto da Tag
   * @description Texto que será exibido na tag do canto superior esquerdo da imagem
   */
  tag: string;
  /**
   * @title Botão
   */
  button: Button;
  image: ImageProps;
}

interface Props {
  sections: Section[];
  /**
   * @title Pré-carregar imagens
   * @description Ative esta opção quando esse banner é a maior imagem na tela
   */
  preload?: boolean;
}

export function loader(props: Props, _req: Request, ctx: AppContext) {
  return { ...props, isMobile: ctx.device !== "desktop" };
}

export default function AccordionWithImages(
  { sections, preload, isMobile }: ReturnType<typeof loader>,
) {
  if (isMobile) {
    const id = useId();

    return (
      <div class="mx-auto max-w-[1440px]">
        <div
          id={id}
          class="flex w-full relative"
        >
          <ul data-slider class="w-full grid grid-cols-1 grid-rows-1 h-[442px]">
            {sections.map((section, index) => (
              <li
                id={`${id}::${index}`}
                data-intersecting={index === 0}
                data-item
                class="col-start-1 row-start-1 w-full group data-[intersecting='true']:opacity-100 opacity-0 transition-all duration-700 pointer-events-none data-[intersecting='true']:pointer-events-auto"
              >
                <div
                  id={id}
                  class="relative overflow-clip w-full h-full"
                >
                  <span class="bg-gradient-to-t from-black/30 to-transparent inset-0 absolute pointer-events-none" />
                  <span class="absolute bg-ice font-bold text-[13px] uppercase text-dark leading-[18px] p-3 rounded-full top-8 left-8 font-lemon transition-all">
                    {section.tag}
                  </span>
                  <div class="absolute left-8 bottom-[72px] text-ice">
                    <h2 class="font-bold text-lg leading-6 font-lemon mb-2">
                      {section.title}
                    </h2>
                    <p class="text-sm leading-4 mb-2">{section.description}</p>
                    <a
                      class="bg-gradient-to-r w-fit from-red to-orange font-lemon font-bold text-[13px] leading-[18px] flex items-center justify-center gap-4 transition-all py-3 px-6 rounded-full"
                      href={section.button.href}
                    >
                      {section.button.text}
                      <Icon id="BannerArrowRight" strokeWidth={2} size={16} />
                    </a>
                  </div>
                  <Picture preload={preload}>
                    <Source
                      media="(max-width: 767px)"
                      fetchPriority={preload ? "high" : "auto"}
                      src={section.image.mobile.src}
                      width={section.image.mobile.width}
                      height={section.image.mobile.height}
                    />
                    <Source
                      media="(min-width: 768px)"
                      fetchPriority={preload ? "high" : "auto"}
                      src={section.image.desktop.src}
                      width={section.image.desktop.width}
                      height={section.image.desktop.height}
                    />
                    <img
                      class="object-cover w-full h-full"
                      loading={preload ? "eager" : "lazy"}
                      src={section.image.desktop.src}
                      alt={section.image.alt}
                    />
                  </Picture>
                </div>
              </li>
            ))}
          </ul>
          <div class="absolute left-8 bottom-8 right-8 flex justify-between items-center gap-8 z-[1]">
            <ul class="carousel justify-center gap-3">
              {sections.map((_, index) => (
                <li data-dot={index} class="carousel-item group">
                  <div class="size-1.5 lg:size-2 rounded-full bg-white group-data-[active]:bg-gradient-to-tr from-red to-orange" />
                </li>
              ))}
            </ul>
            <div class="flex justify-center items-center gap-2 text-dark">
              <button
                data-prev={id}
                aria-label="Anterior"
                class="rounded-full bg-white px-2.5 py-1.5 lg:px-4 lg:py-2 flex justify-center items-center"
              >
                <Icon
                  class="rotate-180 size-4 lg:size-6"
                  id="BannerArrowRight"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </button>
              <button
                data-next={id}
                aria-label="Próximo"
                class="rounded-full bg-white px-2.5 py-1.5 lg:px-4 lg:py-2 flex justify-center items-center"
              >
                <Icon
                  class="size-4 lg:size-6"
                  id="BannerArrowRight"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </button>
            </div>
          </div>
          <BannerCarouselJS rootId={id} />
        </div>
      </div>
    );
  }

  return (
    <ul
      style={{
        "--flex": `${sections.length}`,
      }}
      class="flex px-10 text-ice max-w-[1400px] mx-auto h-[600px]"
    >
      {sections.map((section, index) => (
        <li
          class={"relative transition-all duration-500 group first:rounded-l-[20px] last:rounded-r-[20px] overflow-clip" +
            (
              index === 0
                ? " has-[~:hover]:flex-[1] flex-[var(--flex)]"
                : " flex-[1] hover:flex-[var(--flex)]"
            )}
          key={section.title}
        >
          <span
            class={"absolute bg-ice font-bold text-[13px] uppercase text-dark leading-[18px] p-3 rounded-full top-10 left-10 font-lemon transition-all z-[1]" +
              (
                index === 0
                  ? " group-has-[~:hover]:opacity-0 opacity-100"
                  : " opacity-0 group-hover:opacity-100"
              )}
          >
            {section.tag}
          </span>
          <div
            class={"absolute bottom-10 z-[1] transition-all" +
              (
                index === 0
                  ? " group-has-[~:hover]:left-[25px] left-10 group-has-[~:hover]:max-w-[185px] max-w-full"
                  : " left-[25px] max-w-[185px] group-hover:max-w-full group-hover:left-10"
              )}
          >
            <h2 class="font-bold text-lg leading-6 font-lemon mb-2">
              {section.title}
            </h2>
            <p class="text-sm leading-4">{section.description}</p>
          </div>
          <a
            class={"bg-gradient-to-r from-red to-orange font-lemon font-bold text-[13px] leading-[18px] flex items-center justify-center gap-4 absolute right-10 bottom-10 transition-all z-[1] py-3 px-6 rounded-full" +
              (
                index === 0
                  ? " group-has-[~:hover]:opacity-0 opacity-100"
                  : " opacity-0 group-hover:opacity-100"
              )}
            href={section.button.href}
          >
            {section.button.text}
            <Icon id="BannerArrowRight" strokeWidth={2} size={16} />
          </a>
          <span
            class={"bg-gradient-to-t from-black/30 inset-0 absolute pointer-events-none" +
              (
                index === 0
                  ? " group-has-[~:hover]:to-black/50 group-has-[~:hover]:from-black/50 to-transparent"
                  : " to-black/50 group-hover:from-black/50 group-hover:to-transparent"
              )}
          />
          <Image
            class="w-full h-full object-cover"
            src={section.image.desktop.src}
            width={section.image.desktop.width}
            height={section.image.desktop.height}
            alt={section.image.alt}
          />
        </li>
      ))}
    </ul>
  );
}
