import Icon from "$store/components/ui/Icon.tsx";
import { formatPrice } from "$store/sdk/format.ts";

interface Props {
  total: number;
  target: number;
  locale: string;
  currency: string;
}

function FreeShippingProgressBar({ target, total, currency, locale }: Props) {
  const remaining = target - total;
  const percent = Math.floor((total / target) * 100);

  const progressClasses = `w-full bg-gray-200 rounded-full`;

  return (
    <div class="flex flex-col w-full gap-4">
      <progress
        value={percent}
        max={100}
      />
      <div class="flex justify-center items-center gap-2 text-primary">
        {remaining > 0
          ? (
            <span class="font-bold text-dark text-xs">
              Faltam {formatPrice(remaining, currency, locale)}{" "}
              para frete grátis!
            </span>
          )
          : (
            <span class="font-bold text-dark text-xs">
              Você ganhou frete grátis!
            </span>
          )}
      </div>
    </div>
  );
}

export default FreeShippingProgressBar;
