import { useSignal } from "@preact/signals";
import type { AnalyticsItem, Product } from "apps/commerce/types.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import type { OrderFormItem } from "apps/vtex/utils/types.ts";
import Image from "apps/website/components/Image.tsx";
import { subscriptionOptions } from "deco-sites/true-source/components/product/SubscriptionModal.tsx";
import Button from "deco-sites/true-source/components/ui/Button.tsx";
import Collapsable from "deco-sites/true-source/components/ui/Collapsable.tsx";
import Icon from "deco-sites/true-source/components/ui/Icon.tsx";
import QuantitySelector from "deco-sites/true-source/components/ui/QuantitySelector.tsx";
import Radio from "deco-sites/true-source/components/ui/Radio.tsx";
import { sendEvent } from "deco-sites/true-source/sdk/analytics.tsx";
import { formatPrice } from "deco-sites/true-source/sdk/format.ts";
import { useCallback, useId, useState } from "preact/hooks";

const SubscriptionOptionsMap = {
  none: "Sem recorrência",
  "2W": "2 Semanas",
  "1M": "1 Mês",
  "2M": "2 Meses",
  "3M": "3 Meses",
};

export interface Props {
  fullProduct: Product | undefined;
  item: OrderFormItem;
  index: number;
  locale: string;
  currency: string;
  onUpdateQuantity: (quantity: number, index: number) => Promise<void>;
  itemToAnalyticsItem: (index: number) => AnalyticsItem | null | undefined;
}

function getSubscriptionAttachment(
  attachments: { content: { [key: string]: string }; name: string }[],
) {
  const subscription = attachments.find(({ name }) =>
    name === "vtex.subscription.assinatura"
  )?.content["vtex.subscription.key.frequency"];

  return Object.entries(subscriptionOptions).find(([_, v]) =>
    v.trim() === subscription?.trim()
  )?.[0] as keyof typeof SubscriptionOptionsMap ?? null;
}

function CartItem(
  {
    item,
    index,
    locale,
    currency,
    fullProduct,
    onUpdateQuantity,
    itemToAnalyticsItem,
  }: Props,
) {
  const canBuyWithSubscription = fullProduct?.additionalProperty?.some(
    ({ name }) => name === "activeSubscriptions",
  );

  const price = item.sellingPrice / 100;
  const listPrice = item.listPrice / 100;
  const isGift = price / 100 <= 0.01;
  const [loading, setLoading] = useState(false);
  const selected = useSignal<keyof typeof SubscriptionOptionsMap | null>(null);
  const closeCollapsable = useSignal(true);
  const id = useId();
  const { cart, addItemAttachment, removeItemAttachment } = useCart();

  if (fullProduct && !selected.value) {
    selected.value = getSubscriptionAttachment(
      item.attachments as Parameters<typeof getSubscriptionAttachment>[0],
    );
  }

  const itemId = `${item.name}-${id}`;

  const withLoading = useCallback(
    <A,>(cb: (args: A) => Promise<void>) => async (e: A) => {
      try {
        setLoading(true);
        await cb(e);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  async function changeSubscription(
    subscription: keyof typeof SubscriptionOptionsMap,
    remove: boolean,
  ) {
    const items = cart.value?.items || [];

    const index = items.findIndex((i) => {
      return i.id === fullProduct?.productID;
    });

    if (index === -1) return null;

    const SUBSCRIPTION_KEY = "vtex.subscription.assinatura";
    // @ts-ignore all inputs are checked
    const SUBSCRIPTION_PLAN = subscriptionOptions[subscription];
    const currentDay = new Date().getDate();
    const SUBSCRIPTION_VALUE = {
      "vtex.subscription.key.frequency": SUBSCRIPTION_PLAN,
      "vtex.subscription.key.purchaseday": `${currentDay}`,
    };

    if (remove) {
      await removeItemAttachment({
        index,
        attachment: SUBSCRIPTION_KEY,
        content: SUBSCRIPTION_VALUE,
        noSplitItem: true,
      });

      selected.value = "none";
    } else {
      await addItemAttachment({
        index,
        attachment: SUBSCRIPTION_KEY,
        content: SUBSCRIPTION_VALUE,
        noSplitItem: true,
      });
    }
  }

  // @ts-ignore all inputs are checked
  const changeHandler = (e) => {
    const target = e.target as HTMLInputElement;

    // @ts-ignore all inputs are checked
    if (target.checked && target.value !== "none") {
      selected.value = target.value as keyof typeof subscriptionOptions;
    }
    closeCollapsable.value = !closeCollapsable.value;

    if (canBuyWithSubscription) {
      if (selected.value === null) throw new Error("Unreachable");

      changeSubscription(selected.value, target.value === "none");
    }
  };

  return (
    <div
      class="grid grid-rows-1 gap-4 p-4 border-b border-solid border-[#EDEDED]"
      style={{
        gridTemplateColumns: "48px auto",
      }}
    >
      <Image
        src={item.imageUrl.replace("55-55", "255-255")}
        width={104}
        height={104}
        class="object-contain"
        alt={item.name}
      />

      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center gap-4">
          <span class="font-bold text-sm max-w-[223px] font-inter text-[#3C3C3B] line-clamp-2">
            {item.name}
          </span>
          <Button
            disabled={loading || isGift}
            loading={loading}
            class="-mt-[18px]"
            onClick={withLoading(async () => {
              const analyticsItem = itemToAnalyticsItem(index);

              await onUpdateQuantity(0, index);

              analyticsItem && sendEvent({
                name: "remove_from_cart",
                params: { items: [analyticsItem] },
              });
            })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M2.25 4.5H3.75H15.75M6 4.5V3C6 2.60218 6.15804 2.22064 6.43934 1.93934C6.72064 1.65804 7.10218 1.5 7.5 1.5H10.5C10.8978 1.5 11.2794 1.65804 11.5607 1.93934C11.842 2.22064 12 2.60218 12 3V4.5M7.5 8.25V12.75M10.5 8.25V12.75M14.25 4.5V15C14.25 15.3978 14.092 15.7794 13.8107 16.0607C13.5294 16.342 13.1478 16.5 12.75 16.5H5.25C4.85218 16.5 4.47064 16.342 4.18934 16.0607C3.90804 15.7794 3.75 15.3978 3.75 15V4.5H14.25Z"
                stroke="#3C3C3B"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>
        </div>
        <div class="flex items-center justify-between gap-2">
          <div>
            <QuantitySelector
              disabled={canBuyWithSubscription || loading || isGift}
              quantity={item.quantity}
              onChange={withLoading(async (quantity) => {
                const analyticsItem = itemToAnalyticsItem(index);
                const diff = quantity - item.quantity;

                await onUpdateQuantity(quantity, index);

                if (analyticsItem) {
                  sendEvent({
                    name: diff < 0 ? "remove_from_cart" : "add_to_cart",
                    params: { items: [analyticsItem] },
                  });
                }
              })}
            />
          </div>
          {/* */}
          <div class="flex justify-end gap-x-2">
            <span class="line-through text-xs text-dark">
              {formatPrice(listPrice * item.quantity, currency, locale)}
            </span>
            <span class="text-xs text-green font-bold">
              {isGift
                ? "Grátis"
                : formatPrice(price * item.quantity, currency, locale)}
            </span>
          </div>
        </div>

        {canBuyWithSubscription && (
          <Collapsable
            open={!closeCollapsable.value}
            class={`w-full border  rounded-[20px] py-2 ${
              selected.value && selected.value !== "none"
                ? "border-green"
                : "border-Stroke"
            } `}
            title={
              <div class="flex justify-between items-center px-[14px] text-xs">
                {selected.value && selected.value !== "none"
                  ? (
                    <div class="flex items-center gap-2">
                      <span class="bg-green w-5 h-5 rounded-full flex items-center justify-center">
                        <Icon id="Refresh" size={10} />
                      </span>
                      <span class="">
                        Frequência:{" "}
                        <strong>
                          {SubscriptionOptionsMap[selected.value]}
                        </strong>
                      </span>
                    </div>
                  )
                  : <span>Assine e economize</span>}
                <Icon
                  id="ChevronDown"
                  size={16}
                  class="rotate-0 text-neutral-5 group-open:rotate-180 transition-all ease-in-out duration-[400ms]"
                />
              </div>
            }
          >
            <div class="px-[14px] flex flex-col mt-2 text-dark">
              <div class="flex flex-col gap-y-1">
                {selected.value && (
                  <Radio
                    type="cart"
                    selected={selected.value}
                    changeHandler={changeHandler}
                    name="subscription_option"
                    value="none"
                    id={`${itemId}-none`}
                    text="Sem recorrência"
                  />
                )}

                <Radio
                  type="cart"
                  selected={selected.value}
                  changeHandler={changeHandler}
                  name="subscription_option"
                  value="2W"
                  id={`${itemId}-2W`}
                  text="Frequencia: <strong>2 semanas</strong>"
                />
                <Radio
                  type="cart"
                  selected={selected.value}
                  changeHandler={changeHandler}
                  name="subscription_option"
                  value="1M"
                  id={`${itemId}-1M`}
                  text="Frequencia: <strong>1 mês</strong>"
                />
                <Radio
                  type="cart"
                  selected={selected.value}
                  changeHandler={changeHandler}
                  name="subscription_option"
                  value="2M"
                  id={`${itemId}-2M`}
                  text="Frequencia: <strong>2 meses</strong>"
                />
                <Radio
                  type="cart"
                  selected={selected.value}
                  changeHandler={changeHandler}
                  name="subscription_option"
                  value="3M"
                  id={`${itemId}-3M`}
                  text="Frequencia: <strong>3 meses</strong>"
                />
              </div>
            </div>
          </Collapsable>
        )}
      </div>
    </div>
  );
}

export default CartItem;
