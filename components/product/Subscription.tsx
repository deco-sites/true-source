import Modal from "../ui/Modal.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useState } from "preact/hooks";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import { IconAsterisk, Timeline } from "../ui/CustomIcons.tsx";

import Radio from "$store/islands/Radio.tsx";

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
}

export default function SubscriptionButtonVTEX({
  productID,
  seller,
  quantity,
}: Props) {
  // console.log("productID", productID, "seller", seller, "quantity", quantity);
  const [selected, setSelected] = useState(null);
  const { displaySubscriptionPopup } = useUI();
  const { addItems, addItemAttachment } = useCart();

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
    // console.log("SUBSCRIPTION_VALUE", SUBSCRIPTION_VALUE);

    const orderItems = [{
      id: productID,
      seller,
      quantity,
    }];

    // console.log("orderItems", orderItems);

    await addItems({ orderItems });

    addItemAttachment({
      index: 0,
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

  return (
    <>
      <button
        class="flex items-center justify-center gap-4 bg-dark-green text-white font-bold text-[13px] h-12 px-8 rounded-md font-lemon-milk"
        onClick={() => displaySubscriptionPopup.value = true}
      >
        ASSINE COM {"R$ 36"} de desconto
        <IconAsterisk />
      </button>
      <Modal
        loading="lazy"
        open={displaySubscriptionPopup.value}
        onClose={() => displaySubscriptionPopup.value = false}
      >
        <div class="absolute-center bg-white min-w-[436px] rounded-2xl p-10 max-h-screen overflow-y-auto">
          <form class="flex flex-col gap-y-6" onSubmit={submitHandler}>
            <h3>ASSINE E COMPRE COM ATÉ 20% OFF</h3>
            <div class="flex justify-between">
              <div>
                <p class="text-dark line-through text-sm opacity-60 m-0">
                  De R$ 687,00 por R$ 666,39
                </p>
                <p class="text-dark line-through text-sm opacity-60 m-0">
                  ou 6x de R$ 111,06 sem juros ou
                </p>
              </div>
              <div>
                <span class="block font-bold text-2xl text-dark m-0">
                  R$ 566,43
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
            {
              /* <div class="flex flex-col gap-y-6">
              <p class="text-sm text-dark font-bold">Simulação de envios</p>
              <div class="flex items-center justify-between">
                <div class="flex flex-col font-bold text-sm text-red">
                  1º ENVIO
                  <span class="text-dark font-light">10/12/2023</span>
                </div>
                <div class="flex flex-col font-bold text-sm text-red">
                  2º ENVIO
                  <span class="text-dark font-light">10/01/2024</span>
                </div>
                <div class="flex flex-col font-bold text-sm text-red">
                  3º ENVIO
                  <span class="text-dark font-light">10/02/2024</span>
                </div>
              </div>
              <Timeline />
              <p class="text-sm font-light text-right">E assim por diante...</p>
            </div> */
            }
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
