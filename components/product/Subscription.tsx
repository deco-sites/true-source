import { formatPrice } from "$store/sdk/format.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { IconAsterisk } from "../ui/CustomIcons.tsx";

import SubscriptionModal from "deco-sites/true-source/components/product/SubscriptionModal.tsx";

export interface Props {
  productID: string;
  seller: string;
  quantity: number;
  listPrice: number;
  price: number;
}

export interface TimelineCalcProps {
  selected: SubscriptionOptions | null;
}

export type SubscriptionOptions = "2W" | "1M" | "2M" | "3M";

export default function SubscriptionButtonVTEX({
  productID,
  seller,
  quantity,
  price,
  listPrice,
}: Props) {
  const { displaySubscriptionPopup } = useUI();

  const discount = price * 0.2;

  return (
    <>
      <button
        class="flex items-center justify-center gap-4 bg-dark-green text-white font-bold text-xs sm:text-[13px] h-12 px-4 rounded-md font-lemon-milk"
        onClick={() => displaySubscriptionPopup.value = true}
      >
        ASSINE COM {formatPrice(discount)} de desconto
        <span class="flex-none max-[400px]:hidden">
          <IconAsterisk />
        </span>
      </button>
    </>
  );
}
