import Modal from "../ui/Modal.tsx";
import Radio from "$store/islands/Radio.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useState } from "preact/hooks";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { IconAsterisk, Timeline } from "../ui/CustomIcons.tsx";

import type { ComponentChildren } from "preact";
import SellingPrice from "deco-sites/true-source/components/product/SellingPrice.tsx";

const subscriptionOptions = {
  "2W": "2 week",
  "1M": " 1 month",
  "2M": " 2 month",
  "3M": " 3 month",
};

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

type SubscriptionOptions = "2W" | "1M" | "2M" | "3M";

function TimelineCalc({
  selected,
}: TimelineCalcProps) {
  if (!selected) return null;

  const today = new Date();
  const actualDay = today.getDate();
  const actualMonth = today.getMonth();
  const actualYear = today.getFullYear();
  const daySimulation = [actualDay, actualDay, actualDay];

  const periods = {
    "2W": 15,
    "1M": 30,
    "2M": 60,
    "3M": 90,
  };

  let cumulativeMonth = actualMonth;

  return (
    <div class="flex flex-col gap-y-6">
      <p class="text-sm text-dark font-bold">Simulação de envios</p>
      <div class="flex items-center justify-between">
        {daySimulation.map((d, i) => {
          const shippingDay = ++i;
          if (selected === "2W") {
            const actualDate = new Date(
              actualYear,
              // No caso de ser o mes final, pega sempre o mes subsequente
              i === 3 ? cumulativeMonth + 1 : cumulativeMonth,
              // Vamos calcular data apenas na segunda posição do array
              i === 2 ? actualDay + 15 : actualDay,
              // A expectativa de retorno aqui, considerando que hoje é dia 05
              // Seria: 05/03/2024, 20/03/2024 e 05/04/2024
            );
            const day = actualDate.getDate();
            const month = actualDate.getMonth() + 1;
            const year = actualDate.getFullYear();
            return (
              <div class="flex flex-col font-bold text-sm text-red">
                {shippingDay}º ENVIO
                <span class="text-dark font-bold">
                  {day <= 9 ? `0${day}` : day}/
                  {month <= 9 ? `0${month}` : month}/
                  {year}
                </span>
              </div>
            );
          } else {
            if (i > 1 && selected === "1M") {
              cumulativeMonth = cumulativeMonth + 1;
            }
            if (i > 1 && selected === "2M") {
              cumulativeMonth = cumulativeMonth + 2;
            }
            if (i > 1 && selected === "3M") {
              cumulativeMonth = cumulativeMonth + 3;
            }
            const actualDate = new Date(
              cumulativeMonth > 11 ? actualYear + 1 : actualYear,
              cumulativeMonth > 11 ? cumulativeMonth - 11 : cumulativeMonth,
              actualDay,
            );
            const day = actualDate.getDate();
            const month = actualDate.getMonth() + 1;
            const year = actualDate.getFullYear();
            return (
              <div class="flex flex-col font-bold text-sm text-red">
                {shippingDay}º ENVIO
                <span class="text-dark font-light">
                  {day <= 9 ? `0${day}` : day}/
                  {month <= 9 ? `0${month}` : month}/
                  {year}
                </span>
              </div>
            );
          }
        })}
      </div>
      <Timeline />
      <p class="text-sm font-light text-right">E assim por diante...</p>
    </div>
  );
}

export default function SubscriptionButtonVTEX({
  productID,
  seller,
  quantity,
  price,
  listPrice,
}: Props) {
  const [selected, setSelected] = useState<SubscriptionOptions | null>(null);
  const { displaySubscriptionPopup } = useUI();
  const { cart, addItems, addItemAttachment } = useCart();

  const submitHandler = async (e: Event) => {
    e.preventDefault();
    const currentTarget = e.currentTarget;
    if (!currentTarget) return;
    // @ts-ignore selector is checked
    const selectedOption = currentTarget.querySelector(
      'input[type="radio"]:checked',
    );
    if (!selectedOption) return;

    const SUBSCRIPTION_KEY = "vtex.subscription.assinatura";
    // @ts-ignore all inputs are checked
    const SUBSCRIPTION_PLAN = subscriptionOptions[selectedOption.value];
    const currentDay = new Date().getDate();
    const SUBSCRIPTION_VALUE = {
      "vtex.subscription.key.frequency": SUBSCRIPTION_PLAN,
      "vtex.subscription.key.purchaseday": `${currentDay}`,
    };

    for (let i = 1; i <= quantity; i++) {
      const orderItems = [{
        id: productID,
        seller,
        quantity: 1,
      }];

      await addItems({ orderItems });

      const items = cart.value?.items || [];

      const index = items.findLastIndex((i) => {
        return i.id === productID && i.attachments.length === 0;
      });

      if (index === -1) return null;

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
    if (target.checked) setSelected(target.value);
  };

  const discount = price * 0.2;

  return (
    <>
      <button
        class="flex items-center justify-center gap-4 bg-dark-green text-white font-bold text-xs sm:text-[13px] h-12 px-4 rounded-md font-lemon-milk"
        onClick={() => displaySubscriptionPopup.value = true}
      >
        ASSINE COM {formatPrice(discount * quantity)} de desconto
        <span class="flex-none max-[400px]:hidden">
          <IconAsterisk />
        </span>
      </button>
      <Modal
        loading="lazy"
        open={displaySubscriptionPopup.value}
        onClose={() => displaySubscriptionPopup.value = false}
      >
        <div
          class="absolute-center bg-white w-[516px] rounded-2xl p-2 h-full"
          style={{
            maxHeight: "774.5px",
            maxWidth: "calc(100vw - 48px)",
          }}
        >
          <form
            class="flex flex-col gap-y-6 p-3 sm:p-6 overflow-y-auto h-full"
            onSubmit={submitHandler}
          >
            <h3 class="flex items-center justify-between gap-4 font-lemon-milk text-sm sm:text-lg uppercase font-bold">
              <span>
                <span>ASSINE E COMPRE COM</span> <span>ATÉ 20% OFF</span>
              </span>
              <button onClick={() => displaySubscriptionPopup.value = false}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </h3>
            <div
              class="flex items-center justify-between"
              style={{
                lineHeight: 1,
              }}
            >
              <div class="flex flex-col">
                <span class="text-xs sm:text-sm text-gray font-bold">
                  {quantity} {quantity > 1 ? "unidades" : "unidade"}
                </span>
                <SellingPrice
                  sellingPrice={price}
                  listPrice={listPrice}
                  productId={productID}
                  quantity={quantity}
                  type="subscription"
                />
              </div>
              <div class="flex items-start gap-3 sm:gap-4">
                <div>
                  <span
                    class="block font-bold text-base sm:text-2xl text-dark font-lemon-milk m-0"
                    style={{
                      lineHeight: 1,
                    }}
                  >
                    {formatPrice((price - discount) * quantity)}
                  </span>
                  <small
                    class="text-xs sm:text-sm text-dark"
                    style={{
                      lineHeight: 1,
                    }}
                  >
                    à vista no cartão
                  </small>
                </div>
                <span class="bg-green py-[2px] px-[7px] rounded-full text-[11px] sm:text-xs font-bold text-white uppercase">
                  20% Off
                </span>
              </div>
            </div>
            <div>
              <fieldset>
                <div class="flex flex-col gap-y-1">
                  <Radio
                    selected={selected}
                    changeHandler={changeHandler}
                    name="subscription_option"
                    value="2W"
                    text="Receba a cada <strong>2 semanas</strong>"
                  />
                  <Radio
                    selected={selected}
                    changeHandler={changeHandler}
                    name="subscription_option"
                    value="1M"
                    text="Receba a cada <strong>1 mês</strong>"
                  />
                  <Radio
                    selected={selected}
                    changeHandler={changeHandler}
                    name="subscription_option"
                    value="2M"
                    text="Receba a cada <strong>2 meses</strong>"
                  />
                  <Radio
                    selected={selected}
                    changeHandler={changeHandler}
                    name="subscription_option"
                    value="3M"
                    text="Receba a cada <strong>3 meses</strong>"
                  />
                </div>
              </fieldset>
            </div>
            <TimelineCalc selected={selected} />
            <div>
              <h4 class="text-sm font-bold">Por que assinar?</h4>
              <ul>
                <li class="text-sm border-b border-light-gray py-4">
                  Receba seus produtos preferidos de maneira programada
                </li>
                <li class="text-sm border-b border-light-gray py-4">
                  Ganhe descontos exclusivos - 20%
                </li>
                <li class="text-sm border-b border-light-gray py-4">
                  Não prejudique sua performance por falta de suplementação
                </li>
              </ul>
              <a
                class="block text-sm underline font-bold py-4"
                href="/assinatura"
              >
                Quero entender mais
              </a>
            </div>
            <button
              disabled={!selected}
              class="disabled:bg-light-gray bg-green rounded-md text-white font-bold border-0 py-5 text-[13px] font-lemon-milk uppercase"
            >
              Assinar
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
