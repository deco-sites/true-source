import Icon, {
  AvailableIcons,
} from "deco-sites/true-source/components/ui/Icon.tsx";
import Step, {
  Props as StepProps,
} from "deco-sites/true-source/components/ui/Timeline/Step.tsx";

/**
 * @title Com rodapé
 */
interface Footer {
  /**
   * @title Texto
   * @format html
   */
  text: string;
  /**
   * @title Ícone
   * @format icon-select
   * @options deco-sites/true-source/loaders/availableIcons.ts
   */
  icon: string;
  /**
   * @title Tamanho do ícone
   * @default 24
   */
  iconSize?: number;
  /**
   * @title Cor do ícone
   * @format color-input
   */
  iconColor?: string;
}

/**
 * @title Sem rodapé
 */
type NoFooter = null;

interface Props {
  /**
   * @title Título
   * @description Título da seção
   */
  title: string;
  /**
   * @title Passos
   * @maxItems 3
   * @minItems 1
   */
  steps: StepProps[];
  /**
   * @title Rodapé
   */
  footer: NoFooter | Footer;
}

export default function Timeline({ title, steps, footer }: Props) {
  return (
    <div class="flex flex-col items-center gap-6 px-5">
      <h2 class="text-sm leading-[18px] md:text-lg md:leading-6 font-bold font-lemon text-center">
        {title}
      </h2>
      <div class="flex justify-between w-full max-w-[1100px] flex-col md:flex-row">
        {steps.map((step, index) => (
          <Step key={index} {...step} index={index + 1} />
        ))}
      </div>
      {footer && (
        <div class="max-w-[950px] w-full flex gap-8 justify-center items-center border-t border-t-light-gray-200 pt-8 pb-6 md:pt-14 md:pb-10">
          <Icon
            id={footer.icon as AvailableIcons}
            strokeWidth={2}
            size={footer.iconSize ?? 24}
            style={{
              color: footer.iconColor ?? "currentColor",
            }}
            class="shrink-0"
          />
          <div
            class="max-w-[549px] text-sm leading-6 font-medium"
            dangerouslySetInnerHTML={{ __html: footer.text }}
          />
        </div>
      )}
    </div>
  );
}
