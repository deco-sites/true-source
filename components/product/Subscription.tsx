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
  const day = today.getDate();
  const daySimulation = [day];

  const periods = {
    "2W": 15,
    "1M": 30,
    "2M": 60,
    "3M": 90,
  };

  // @ts-ignore day is string
  let days = parseInt(day);
  for (let i = 0; i < 2; ++i) {
    days = days + periods[selected];
    daySimulation.push(days);
  }

  return (
    <div class="flex flex-col gap-y-6">
      <p class="text-sm text-dark font-bold">Simulação de envios</p>
      <div class="flex items-center justify-between">
        {daySimulation.map((d, i) => {
          const shippingDay = ++i;
          const actualDate = new Date(today.setDate(d));
          const day = actualDate.getDate();
          const month = actualDate.getMonth();
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

    const orderItems = [{
      id: productID,
      seller,
      quantity,
    }];

    await addItems({ orderItems });

    const items = cart.value?.items || [];

    const index = items.findLastIndex((i) => {
      return i.id === productID && i.attachments.length === 0;
    });

    if (index === -1) return null;

    addItemAttachment({
      index,
      attachment: SUBSCRIPTION_KEY,
      content: SUBSCRIPTION_VALUE,
      noSplitItem: true,
    });
  };

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
        class="flex items-center justify-center gap-4 bg-dark-green text-white font-bold text-[13px] h-12 px-8 rounded-md font-lemon-milk"
        onClick={() => displaySubscriptionPopup.value = true}
      >
        ASSINE COM {formatPrice(discount)} de desconto
        <IconAsterisk />
      </button>
      <Modal
        loading="lazy"
        open={displaySubscriptionPopup.value}
        onClose={() => displaySubscriptionPopup.value = false}
      >
        <div class="absolute-center bg-white min-w-[436px] rounded-2xl p-10 my-8 max-h-screen overflow-y-auto">
          <form class="flex flex-col gap-y-6" onSubmit={submitHandler}>
            <h3 class="font-lemon-milk text-lg uppercase font-bold">
              ASSINE E COMPRE COM ATÉ 20% OFF
            </h3>
            <div class="flex items-center justify-between">
              <SellingPrice
                sellingPrice={price}
                listPrice={listPrice}
                productId={productID}
                quantity={1}
                type="subscription"
              />
              <div>
                <span class="block font-bold text-2xl text-dark font-lemon-milk m-0">
                  {formatPrice(price - discount)}
                </span>
                <small class="text-dark">à vista no cartão</small>
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
              class="disabled:bg-light-gray bg-green rounded-md text-white font-bold border-0 py-5 text-[13px]"
            >
              Assinar
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
