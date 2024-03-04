import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";

interface Props {
  loading: boolean;
  currency: string;
  total: number;
  items: AnalyticsItem[];
  type?: "menu" | "header";
}

function CartButton(
  { loading, currency, total, items, type = "header" }: Props,
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

  if (type === "menu") {
    return (
      <div class="indicator">
        <span
          class={`flex justify-center items-center indicator-item top-[14px] bg-brand text-white h-6 w-6 rounded-full badge-xs ${
            totalItems === 0 ? "hidden" : ""
          }`}
        >
          {totalItems > 9 ? "9+" : totalItems}
        </span>

        <button
          class="flex text-[11px] uppercase"
          style="width: max-content;"
          aria-label="open cart"
          data-deco={displayCart.value && "open-cart"}
          // loading={loading}
          onClick={onClick}
        >
          <p>Carrinho de Compras</p>
          <svg
            style="margin-left:49px;"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M1.66602 1.66675H2.75449C2.9595 1.66675 3.06201 1.66675 3.1445 1.70445C3.2172 1.73767 3.2788 1.7911 3.32197 1.85837C3.37096 1.9347 3.38546 2.03618 3.41445 2.23913L3.80887 5.00008M3.80887 5.00008L4.68545 11.4429C4.79669 12.2605 4.85231 12.6693 5.04777 12.977C5.22 13.2482 5.46692 13.4638 5.75881 13.5979C6.09007 13.7501 6.50264 13.7501 7.32777 13.7501H14.4593C15.2448 13.7501 15.6375 13.7501 15.9585 13.6088C16.2415 13.4842 16.4842 13.2833 16.6596 13.0286C16.8585 12.7398 16.9319 12.354 17.0789 11.5824L18.1819 5.79149C18.2337 5.51992 18.2595 5.38414 18.222 5.278C18.1892 5.18489 18.1243 5.10649 18.039 5.05676C17.9417 5.00008 17.8035 5.00008 17.527 5.00008H3.80887ZM8.33268 17.5001C8.33268 17.9603 7.95959 18.3334 7.49935 18.3334C7.03911 18.3334 6.66602 17.9603 6.66602 17.5001C6.66602 17.0398 7.03911 16.6667 7.49935 16.6667C7.95959 16.6667 8.33268 17.0398 8.33268 17.5001ZM14.9993 17.5001C14.9993 17.9603 14.6263 18.3334 14.166 18.3334C13.7058 18.3334 13.3327 17.9603 13.3327 17.5001C13.3327 17.0398 13.7058 16.6667 14.166 16.6667C14.6263 16.6667 14.9993 17.0398 14.9993 17.5001Z"
              stroke="#E4003F"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    );
  }

  if (type === "header") {
    return (
      <div class="indicator">
        <span
          class={`flex justify-center items-center indicator-item top-[14px] bg-brand text-white h-6 w-6 rounded-full badge-xs ${
            totalItems === 0 ? "hidden" : ""
          }`}
        >
          {totalItems > 9 ? "9+" : totalItems}
        </span>

        <Button
          class="btn-circle btn-sm btn-ghost"
          aria-label="open cart"
          data-deco={displayCart.value && "open-cart"}
          loading={loading}
          onClick={onClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="29"
            viewBox="0 0 28 29"
            fill="none"
          >
            <path
              d="M2.33594 2.83301H3.8598C4.14682 2.83301 4.29033 2.83301 4.40582 2.88579C4.50759 2.9323 4.59384 3.0071 4.65428 3.10128C4.72286 3.20814 4.74316 3.35021 4.78375 3.63435L5.33594 7.49967M5.33594 7.49967L6.56314 16.5196C6.71888 17.6643 6.79674 18.2366 7.07039 18.6674C7.31151 19.047 7.6572 19.3489 8.06585 19.5366C8.52961 19.7497 9.10721 19.7497 10.2624 19.7497H20.2466C21.3462 19.7497 21.8961 19.7497 22.3454 19.5518C22.7416 19.3774 23.0814 19.0962 23.3269 18.7396C23.6054 18.3352 23.7082 17.7951 23.914 16.7149L25.4582 8.60765C25.5306 8.22745 25.5669 8.03735 25.5144 7.88876C25.4683 7.75841 25.3775 7.64864 25.2581 7.57903C25.1219 7.49967 24.9284 7.49967 24.5414 7.49967H5.33594ZM11.6693 24.9997C11.6693 25.644 11.1469 26.1663 10.5026 26.1663C9.85827 26.1663 9.33594 25.644 9.33594 24.9997C9.33594 24.3553 9.85827 23.833 10.5026 23.833C11.1469 23.833 11.6693 24.3553 11.6693 24.9997ZM21.0026 24.9997C21.0026 25.644 20.4803 26.1663 19.8359 26.1663C19.1916 26.1663 18.6693 25.644 18.6693 24.9997C18.6693 24.3553 19.1916 23.833 19.8359 23.833C20.4803 23.833 21.0026 24.3553 21.0026 24.9997Z"
              stroke="#E4003F"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Button>
      </div>
    );
  }

  return null;
}

export default CartButton;
