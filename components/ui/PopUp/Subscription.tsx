import { useSignal, useSignalEffect } from "@preact/signals";
import type { HTMLWidget } from "apps/admin/widgets.ts";
import { useUser } from "apps/vtex/hooks/useUser.ts";
import type { AppContext } from "deco-sites/true-source/apps/site.ts";
import Icon from "deco-sites/true-source/components/ui/Icon.tsx";
import { invoke } from "deco-sites/true-source/runtime.ts";
import { clx } from "deco-sites/true-source/sdk/clx.ts";
import type { JSX } from "preact";
import type { TargetedEvent } from "preact/compat";
import { useCallback } from "preact/hooks";
import { getCookies } from "std/http/cookie.ts";

interface Props {
  /**
   * @title Texto do topo do formulário
   */
  topText: HTMLWidget;
}

export function loader(props: Props, req: Request, ctx: AppContext) {
  const cookies = getCookies(req.headers);
  const alreadySeenPopup = cookies.hasSeenPopup === "true";

  return { ...props, alreadySeenPopup };
}

export default function Coupon(
  { topText, alreadySeenPopup }: ReturnType<typeof loader>,
) {
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

    globalThis.document.cookie = `hasSeenPopup=true;${`expires=${
      new Date(Date.now() + 1000 * 60 * 60 * 24).toUTCString()
    }`};path=/`;
  };

  useSignalEffect(() => {
    if (alreadySeenPopup || displayPopup.peek() || finishedForm.peek()) {
      return;
    }

    if (!user.value && !displayPopup.peek()) {
      displayPopup.value = true;
      return;
    }

    /**
     * Fetches user orders by email and displays a popup if the user has never made a purchase.
     */
    const fetch = async () => {
      try {
        const data = await fetchUserOrdersByEmail();

        console.log(data);

        if (!data || !data.list) {
          displayPopup.value = true;
          return;
        }

        const neverBoughtBefore = data.list.length === 0;

        if (neverBoughtBefore) {
          displayPopup.value = true;
        }

        // globalThis.window.location.href = "/assinaturas";
      } catch (err) {
        console.error(err);
        displayPopup.value = false;
      } finally {
        setPopupAsSeen();
      }
    };

    fetch();
  });

  const handleFormSubmit = (e: TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    loadingFormSubmit.value = true;

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log(data);

    try {
      // await invoke.vtex.actions.masterdata.createDocument({
      //   acronym: "CL",
      //   data,
      //   isPrivateEntity: true,
      // });

      finishedForm.value = true;
      setPopupAsSeen();
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
        onClick={() => {
          displayPopup.value = false;
        }}
        aria-label="Fechar pop-up de cupom"
        class={`z-[9] bg-black/30 inset-0 fixed transition-all${
          displayPopup.value ? "" : " opacity-0 pointer-events-none"
        }`}
      />
      <div
        class={`max-w-[500px] w-[95%] overflow-hidden rounded-[20px] bg-white transition-all fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10${
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
              class="text-white text-sm [&_strong]:font-bold [&_strong]:text-lg [&_strong]:font-lemon leading-6 [&_strong]:leading-6 max-w-[calc(100%-6vw)]"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              displayPopup.value = false;
            }}
            aria-label="Fechar pop-up de cupom"
            class="absolute top-10 right-10 size-6 flex justify-center items-center cursor-pointer"
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
            <div class="flex items-center justify-between gap-2 mt-6">
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
            <label class="flex gap-2 items-center mt-6 cursor-pointer text-[13px] leading-[15px] select-none">
              <input
                type="checkbox"
                name="consent"
                class="sr-only peer"
                required
              />
              <span class="shrink-0 size-[18px] border border-gray bg-white rounded-[5px] peer-checked:border-dark peer-checked:bg-dark transition-all text-white peer-checked:[&>svg]:translate-y-0 peer-checked:[&>svg]:opacity-100 flex justify-center items-center peer-focus:ring-2 peer-focus:ring-black">
                <Icon
                  id="Check"
                  size={12}
                  strokeWidth={4}
                  class="transition-all opacity-0 -translate-y-2"
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
              class=" mt-6 text-xs leading-[16px] font-bold font-lemon h-[50px] rounded-md transition-all [background-position:0%] hover:[background-position:100%] data-[loading='true']:[background-position:100%] duration-500 text-white w-full text-center flex justify-center items-center gap-3"
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
    <label class="flex gap-2 items-center cursor-pointer text-[13px] leading-[15px] select-none">
      <input
        type="radio"
        name={name}
        value={value}
        required={required}
        class="sr-only peer"
      />
      <span class="shrink-0 size-[18px] border border-gray bg-white rounded-full peer-checked:border-dark peer-checked:border-[5px] transition-all peer-focus:ring-2 peer-focus:ring-black">
      </span>
      {label}
    </label>
  );
}