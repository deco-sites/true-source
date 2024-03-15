import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import { SourceFileBase } from "https://deno.land/x/ts_morph@20.0.0/ts_morph.js";

interface Props {
  loading: boolean;
  currency: string;
  total: number;
  items: AnalyticsItem[];
  type?: "menu" | "header";
  size?: "sm" | "md" | "lg"
}

function CartButton(
  { loading, currency, total, items, type = "header", size = "lg" }: Props,
) {
  const {
    displayCart,
    displayMenu,
    displaySearchPopup,
    displaySearchDrawer,
  } = useUI();
  const totalItems = items.length;

  const onClick = () => {
    sendEvent({
      name: "view_cart",
      params: { currency, value: total, items },
    });
    displayCart.value = true;
    displayMenu.value = false;
    displaySearchPopup.value = false;
    displaySearchDrawer.value = false;
  };

  const sizeMapping = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const iconSize = sizeMapping[size]

  return (
    <div class={`indicator ${type === "menu" ? "w-full" : ""}`}>
      <span
        class={`flex justify-center items-center indicator-item top-[14px] bg-brand text-white h-6 w-6 rounded-full badge-xs ${totalItems === 0 ? "hidden" : ""
          }`}
      >
        {totalItems > 9 ? "9+" : totalItems}
      </span>

      <Button
        class={`${type === "menu" ? "flex text-[11px] uppercase w-full" : " btn-ghost"}`}
        aria-label="open cart"
        data-deco={displayCart.value && "open-cart"}
        loading={type === "menu" ? false : loading}
        onClick={onClick}
      >
        {type === "menu" ? (
          <div class='flex items-center justify-between w-full'>
            <p>Carrinho de Compras</p>
            <Icon id="ShoppingCart" size={iconSize} />
          </div>
        ) : (
          <Icon id="ShoppingCart" size={iconSize} />
        )}
      </Button>
    </div>
  );
}

export default CartButton;
