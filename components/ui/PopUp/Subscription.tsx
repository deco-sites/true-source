import { useSignal, useSignalEffect } from "@preact/signals";
import type { HTMLWidget } from "apps/admin/widgets.ts";
import { useUser } from "apps/vtex/hooks/useUser.ts";
import Icon from "deco-sites/true-source/components/ui/Icon.tsx";
import { invoke } from "deco-sites/true-source/runtime.ts";
import { clx } from "deco-sites/true-source/sdk/clx.ts";
import type { JSX } from "preact";
import type { TargetedEvent } from "preact/compat";
import { useCallback } from "preact/hooks";

interface Props {
  /**
   * @title Texto do topo do formulário
   */
  topText: HTMLWidget;
}

export default function Coupon({ topText }: Props) {
  const { user } = useUser();
  const displayPopup = useSignal(false);
  const finishedForm = useSignal(false);
  const loadingFormSubmit = useSignal(false);

  const fetchUserOrdersByEmail = useCallback(async () => {
    if (!user.value || !user.value.email) return;

    const email = user.value.email;

    return await invoke.vtex.loaders.orders({
      clientEmail: email,
    });
  }, [user.value?.email]);

  /**
   * Sets the popup as seen by setting a cookie with an expiration date.
   */
  const setPopupAsSeen = () => {
    if (!globalThis.document) {
      return;
    }

    globalThis.document.cookie = `hasSeenSubscriptionPopup=true;expires=${
      new Date(Date.now() + 1000 * 60 * 60 * 24).toUTCString()
    };path=/`;
  };

  useSignalEffect(() => {
    const isInAdmin = document.location.ancestorOrigins.contains(
      "https://admin.deco.cx",
    );
    const alreadySeenPopup = document.cookie.includes(
      "hasSeenSubscriptionPopup=true",
    );

    if (
      isInAdmin || alreadySeenPopup || displayPopup.peek() ||
      finishedForm.peek() ||
      !user.value
    ) {
      return;
    }

    const fetch = async () => {
      try {
        const data = await fetchUserOrdersByEmail();

        if (!data || !data.list) {
          return;
        }

        const boughtBefore = data.list.length > 0;

        if (boughtBefore) {
          displayPopup.value = true;
        }
      } catch (err) {
        console.error(err);
        displayPopup.value = false;
      } finally {
        setPopupAsSeen();
      }
    };

    fetch();
  });

  const handleFormSubmit = async (e: TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    loadingFormSubmit.value = true;

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await invoke.vtex.actions.masterdata.createDocument({
        acronym: "CL",
        data,
        isPrivateEntity: true,
      });

      finishedForm.value = true;
      setPopupAsSeen();
      globalThis.window.location.href = "/assinatura";
    } catch (err) {
      console.error(err);
    } finally {
      loadingFormSubmit.value = false;
    }
  };

  const handlePopupClose = () => {
    displayPopup.value = false;
    setPopupAsSeen();
  };

  return (
    <>
      <button
        type="button"
        onClick={handlePopupClose}
        aria-label="Fechar pop-up de cupom"
        class={`z-[51] bg-black/30 inset-0 fixed transition-all${
          displayPopup.value ? "" : " opacity-0 pointer-events-none"
        }`}
      />
      <div
        class={`max-w-[500px] w-[95%] overflow-hidden rounded-[20px] bg-white transition-all fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-[52]${
          displayPopup.value ? "" : " opacity-0 pointer-events-none"
        }`}
        style={{
          "box-shadow":
            "0px 2.767256498336792px 2.2138051986694336px 0px #00000009,0px 6.650102138519287px 5.32008171081543px 0px #0000000D,0px 12.521552085876465px 10.017241477966309px 0px #00000011,0px 22.3363094329834px 17.869047164916992px 0px #00000014,0px 41.777610778808594px 33.422088623046875px 0px #00000018,0px 100px 80px 0px #00000021",
        }}
      >
        <div class="relative">
          <div
            class={`flex gap-4 p-10 text-dark transition-all bg-gradient-to-r from-red to-orange${
              finishedForm.value ? " opacity-0 pointer-events-none" : ""
            }`}
          >
            <Icon
              id="StarIconWhite"
              class="shrink-0 size-[30px] md:size-[43px]"
            />
            <div
              dangerouslySetInnerHTML={{ __html: topText }}
              class="max-w-[calc(100%-6vw)] [&_strong]:font-bold [&_strong]:font-lemon text-sm text-white [&_strong]:text-lg leading-6 [&_strong]:leading-6"
            />
          </div>
          <button
            type="button"
            onClick={handlePopupClose}
            aria-label="Fechar pop-up de cupom"
            class="top-10 right-10 absolute flex justify-center items-center cursor-pointer size-6"
          >
            <Icon id="X" size={24} class="text-white" />
          </button>

          <form
            class={`m-10 mt-8 transition-all${
              finishedForm.value ? " opacity-0 pointer-events-none" : ""
            }`}
            onSubmit={handleFormSubmit}
          >
            <div class="space-y-2">
              <Input.Container>
                <Input.Input
                  type="text"
                  name="number"
                  required
                />
                <Input.Label>Nome *</Input.Label>
              </Input.Container>
              <Input.Container>
                <Input.Input
                  type="email"
                  name="email"
                  required
                />
                <Input.Label>E-mail *</Input.Label>
              </Input.Container>
              <Input.Container>
                <Input.Input
                  type="tel"
                  name="tel"
                  required
                  pattern="\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value
                      .replace(/\D/g, "")
                      .replace(
                        /^(\d?)(\d?)(\d{0,5})(\d{0,4})(.*)$/,
                        (all, $1, $2, $3, $4) => {
                          let s = "";

                          if ($1) s += `(${$1}${$2}`;
                          if ($3) s += `) ${$3}`;
                          if ($4) s += `-${$4}`;

                          return s;
                        },
                      );
                  }}
                />
                <Input.Label>Telefone com DDD *</Input.Label>
              </Input.Container>
            </div>
            <div class="flex justify-between items-center gap-2 mt-6">
              <Radio
                name="consumer-type"
                value="consumidor"
                label="Consumidor"
                required
              />
              <Radio
                name="consumer-type"
                value="médico"
                label="Médico"
                required
              />
              <Radio
                name="consumer-type"
                value="nutricionista"
                label="Nutricionista"
                required
              />
            </div>
            <label class="flex items-center gap-2 mt-6 text-[13px] leading-[15px] cursor-pointer select-none">
              <input
                type="checkbox"
                name="consent"
                class="peer sr-only"
                required
              />
              <span class="flex justify-center items-center border-gray peer-checked:border-dark bg-white peer-checked:bg-dark peer-checked:[&>svg]:opacity-100 border rounded-[5px] text-white transition-all peer-checked:[&>svg]:translate-y-0 shrink-0 size-[18px] peer-focus:ring-2 peer-focus:ring-black">
                <Icon
                  id="Check"
                  size={12}
                  strokeWidth={4}
                  class="opacity-0 transition-all -translate-y-2"
                />
              </span>
              Estou ciente que poderei receber comunicações.
            </label>
            <button
              type="submit"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #8E8E8D, #8E8E8D, #e4003f, #E9530E)",
                backgroundSize: "300% auto",
              }}
              data-loading={loadingFormSubmit.value}
              disabled={loadingFormSubmit.value}
              class="flex justify-center items-center gap-3 mt-6 rounded-md w-full h-[50px] font-bold font-lemon text-center text-white text-xs leading-[16px] transition-all [background-position:0%] hover:[background-position:100%] data-[loading='true']:[background-position:100%] duration-500"
            >
              {loadingFormSubmit.value
                ? (
                  <>
                    <span class="loading loading-spinner" />
                    Gerando cupom
                  </>
                )
                : "Gerar cupom de desconto"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

const Input = {
  Container: ({ children, ...props }: JSX.IntrinsicElements["div"]) => (
    <div {...props} class={clx("relative", props.class as string)}>
      {children}
    </div>
  ),
  Input: ({ children, ...props }: JSX.IntrinsicElements["input"]) => (
    <input
      placeholder=" "
      {...props}
      class={clx(
        "peer rounded-md border border-Stroke pt-5 pb-1.5 px-4 shadow outline-0 focus:border-dark text-sm w-full [&:valid:not(:placeholder-shown)]:border-green [&:not(:focus):invalid:not(:placeholder-shown)]:border-red",
        props.class as string,
      )}
    />
  ),
  Label: ({ children, ...props }: JSX.IntrinsicElements["label"]) => (
    <label
      class={clx(
        "font-medium absolute text-gray left-4 text-sm top-1/2 -translate-y-1/2 pointer-events-none peer-focus:text-[11px] peer-focus:top-3.5 peer-[&:not(:placeholder-shown)]:top-3.5 peer-[&:not(:placeholder-shown)]:text-[11px] transition-all",
      )}
      {...props}
    >
      {children}
    </label>
  ),
};

interface RadioProps {
  name: string;
  value: string;
  label: string;
  required?: boolean;
}

function Radio({ name, value, label, required = false }: RadioProps) {
  return (
    <label class="flex items-center gap-2 text-[13px] leading-[15px] cursor-pointer select-none">
      <input
        type="radio"
        name={name}
        value={value}
        required={required}
        class="peer sr-only"
      />
      <span class="border-gray peer-checked:border-[5px] peer-checked:border-dark bg-white border rounded-full transition-all shrink-0 size-[18px] peer-focus:ring-2 peer-focus:ring-black">
      </span>
      {label}
    </label>
  );
}
