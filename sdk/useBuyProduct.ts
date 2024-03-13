import { useSignal } from "@preact/signals";
import { sendEvent } from "deco-sites/true-source/sdk/analytics.tsx";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import { AddToCartParams } from "apps/commerce/types.ts";

type Props = {
  seller: string;
  productID: string;
  quantity: number;
  eventParams: AddToCartParams;
  onError?: () => void;
  onSuccess?: () => void;
  onFinally?: () => void;
};

const { addItems, updateItems, cart } = useCart();

export default function useBuyProduct(
  { seller, productID, quantity, eventParams, onError, onSuccess, onFinally }:
    Props,
) {
  const loading = useSignal(false);

  async function add() {
    try {
      loading.value = true;

      await addItems({
        orderItems: [{
          id: productID,
          seller: seller,
          quantity,
        }],
      });

      sendEvent({
        name: "add_to_cart",
        params: eventParams,
      });

      onSuccess?.();
    } catch {
      onError?.();
    } finally {
      loading.value = false;
      onFinally?.();
    }
  }

  return {
    add,
    loading,
    remove: (productID: string) => {
      return async () => {
        if (!cart.value?.items.length) return;

        loading.value = true;

        const index = cart.value?.items.findIndex((item) =>
          item.id === productID
        );

        await updateItems({
          orderItems: [{
            index,
            quantity: 0,
          }],
        });

        loading.value = false;
      };
    },
  };
}
