import type { HTMLWidget } from "apps/admin/widgets.ts";
import RenderHTML from "deco-sites/true-source/components/ui/RenderHTML.tsx";
import Icon from "deco-sites/true-source/components/ui/Icon.tsx";

export interface Props {
  /** @title Título */
  title?: HTMLWidget;
  /** @title Descrição */
  description?: HTMLWidget;
  /** @title Possui ícone no topo */
  hasIcon?: boolean;
  /** @title Possui fundo cinza */
  hasBackgroundColor?: boolean;
  /** @title Possui container */
  hasContainer?: boolean;
  /** @title Botão de ação */
  cta?: {
    text?: string;
    url?: string;
  };
}

function DescriptionWithCta(
  { title, description, cta, hasIcon, hasContainer, hasBackgroundColor }: Props,
) {
  return (
    <div
      class={`w-full px-6 md:px-0 ${
        hasBackgroundColor ? "bg-ice" : "bg-white"
      }`}
    >
      <div
        class={`flex flex-col items-center w-full py-[80px] gap-8 md:gap-10 
      ${hasContainer && "max-w-[1440px] mx-auto rounded-[20px] bg-white "}
      `}
      >
        {hasIcon && (
          <>
            <span class="border-b-[3px] border-red w-[84px]" />
            <Icon id="LogoIcon" size={38} />
          </>
        )}
        {title && (
          <RenderHTML
            html={title}
            class="text-dark font-bold text-[16px] md:text-[40px] font-lemon-milk uppercase leading-[21px] md:leading-[42px] [&_strong]:text-red text-center"
          />
        )}
        {description && (
          <RenderHTML
            html={description}
            class="text-dark font-medium text-center [&_a]:hover:underline [&_a]:text-red"
          />
        )}
        {cta && (
          <a
            href={cta.url}
            class="flex items-center gap-[10px] uppercase font-lemon-milk font-bold text-[13px] leading-[17px] text-ice py-[15px] px-6 rounded-full 
          bg-gradient-to-r from-[#E4003F] from-35% to-[#e8530e] to-90% max-w-fit group hover:bg-white border 
          border-transparent hover:border-red hover:fontWithGradient cursor-pointer max-h-[40px]"
          >
            {cta.text}
            <Icon
              id="ArrowRight"
              size={16}
              class="text-white group-hover:text-red"
            />
          </a>
        )}
      </div>
    </div>
  );
}

export default DescriptionWithCta;
