import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { AddToCartParams } from "apps/commerce/types.ts";
import { useState } from "preact/hooks";
import { IconButtonCart } from "../../ui/CustomIcons.tsx";
import { useSignal } from "@preact/signals";

export interface Props {
  /** @description: sku name */
  eventParams: AddToCartParams;
  onAddItem: () => Promise<void>;
}

export const useAddToCart = ({ eventParams, onAddItem }: Props) => {
  const loading = useSignal(false);
  const { displayCart } = useUI();

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      loading.value = true;

      await onAddItem();

      sendEvent({
        name: "add_to_cart",
        params: eventParams,
      });

      displayCart.value = true;
    } finally {
      loading.value = false;
    }
  };

  return { onClick, loading, "data-deco": "add-to-cart" };
};

export default function AddToCartButton(props: Props) {
  const { loading, ...btnProps } = useAddToCart(props);

  return (
    <Button
      {...btnProps}
      loading={loading.value}
      class="flex items-center justify-center gap-4 bg-green hover:bg-green rounded-md text-xs sm:text-[13px] font-bold uppercase font-lemon-milk text-white border-0"
    >
      Comprar
      <IconButtonCart />
    </Button>
  );
}
