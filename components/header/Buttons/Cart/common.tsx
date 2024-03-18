import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import Loading from "deco-sites/true-source/components/ui/Loading.tsx";

interface Props {
  loading: boolean;
  currency: string;
  total: number;
  items: AnalyticsItem[];
  type?: "menu" | "header";
  size?: "sm" | "md" | "lg";
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

  return (
    <div class={`indicator ${type === "menu" ? "w-full" : ""}`}>
      <span
        class={`flex justify-center items-center indicator-item top-[14px] bg-brand text-white h-5 w-5 font-normal rounded-full badge-xs ${
          totalItems === 0 ? "hidden" : ""
        }`}
      >
        {totalItems > 9 ? "9+" : totalItems}
      </span>

      <button
        class="w-9 h-9 flex justify-center items-center"
        aria-label="open cart"
        data-deco={displayCart.value && "open-cart"}
        onClick={onClick}
      >
        {loading
          ? <Loading />
          : <Icon id="ShoppingCart" size={24} class="text-red" />}
      </button>
    </div>
  );
}

export default CartButton;
