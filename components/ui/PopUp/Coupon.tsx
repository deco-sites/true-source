import Icon from "deco-sites/true-source/components/ui/Icon.tsx";
import { TargetedEvent } from "preact/compat";
import { getCookies, setCookie } from "std/http/cookie.ts";
import { AppContext } from "deco-sites/true-source/apps/site.ts";
interface Props {
  /**
   * @title Porcentagem de desconto
   * @default 10
   */
  discountPercentage: number;
  /**
   * @title Código do cupom
   */
  couponCode: string;
}

export function loader(props: Props, req: Request, ctx: AppContext) {
  const cookies = getCookies(req.headers);
  const timestamp = parseInt(cookies["lastCouponPopup"] ?? "0");
  const shouldShowPopup = Date.now() - timestamp > 1000 * 60 * 60 * 24 * 30;

  // if (shouldShowPopup) {
  //   setCookie(ctx.response.headers, {
  //     name: "lastCouponPopup",
  //     value: Date.now().toString(),
  //     maxAge: 60 * 60 * 24 * 30,
  //     path: "/",
  //   });
  // }

  console.log(shouldShowPopup);

  return { ...props, shouldShowPopup };
}

export default function Coupon(
  { discountPercentage, couponCode, shouldShowPopup }: ReturnType<
    typeof loader
  >,
) {
  if (!shouldShowPopup) return null;

  return (
    <>
      <input id="close-coupon-popup" type="checkbox" class="hidden peer" />
      <label
        htmlFor="close-coupon-popup"
        class="z-[9] bg-black/30 inset-0 fixed peer-checked:opacity-0 peer-checked:pointer-events-none transition-all"
      />
      <div
        class="max-w-[342px] md:max-w-[500px] w-full p-6 md:mx-3 md:p-10 rounded-[20px] bg-white peer-checked:opacity-0 transition-all fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 peer-checked:pointer-events-none"
        style={{
          "box-shadow":
            "0px 2.767256498336792px 2.2138051986694336px 0px #00000009,0px 6.650102138519287px 5.32008171081543px 0px #0000000D,0px 12.521552085876465px 10.017241477966309px 0px #00000011,0px 22.3363094329834px 17.869047164916992px 0px #00000014,0px 41.777610778808594px 33.422088623046875px 0px #00000018,0px 100px 80px 0px #00000021",
        }}
      >
        <div class="flex justify-between">
          <div class="flex gap-4 justify-center text-dark">
            <Icon id="StarIcon" class="shrink-0 size-[30px] md:size-[43px]" />
            <div>
              <p class="text-sm leading-[18px] md:text-lg md:leading-6 font-bold font-lemon uppercase">
                Seja bem-vindo(a) à<br />True Source!
              </p>
              <p class="text-xs leading-[14px] md:text-sm md:leading-6">
                Preencha seus dados e ganhe
              </p>
              <p class="text-sm leading-[18px] md:text-lg md:leading-6 font-bold font-lemon uppercase bg-gradient-to-r from-red to-orange bg-clip-text text-transparent">
                {discountPercentage}% de desconto
              </p>
              <p class="text-xs leading-[14px] md:text-sm md:leading-6">
                na sua primeira compra!
              </p>
            </div>
          </div>
          <label
            htmlFor="close-coupon-popup"
            class="size-6 flex justify-center items-center cursor-pointer"
          >
            <Icon id="X" size={24} />
          </label>
        </div>
        <form class="mt-4">
          <div class="space-y-2">
            <Input
              type="text"
              name="name"
              label="Insira o seu nome"
              placeholder="Nome"
            />
            <Input
              type="email"
              name="email"
              label="Insira o seu e-mail"
              placeholder="E-mail"
            />
            <Input
              type="tel"
              name="phone"
              label="Insira o seu telefone"
              placeholder="Telefone com DDD"
              pattern="\([0-9]{2}\) [0-9]{5}-[0-9]{4}"
              onChange={(e) => {
                const val = e.currentTarget.value.replace(/\D/g, "");
                switch (val.length) {
                  case 0:
                    e.currentTarget.value = "";
                    break;
                  case 1:
                  case 2:
                    e.currentTarget.value = `(${val}`;
                    break;
                  case 3:
                  case 4:
                  case 5:
                  case 6:
                  case 7:
                    e.currentTarget.value = `(${val.slice(0, 2)}) ${
                      val.slice(2)
                    }`;
                    break;
                  case 8:
                    e.currentTarget.value = `(${val.slice(0, 2)}) ${
                      val.slice(2, 7)
                    }-${val.slice(7)}`;
                    break;
                  default:
                    e.currentTarget.value = `(${val.slice(0, 2)}) ${
                      val.slice(
                        2,
                        7,
                      )
                    }-${val.slice(7, 11)}`;
                    break;
                }
              }}
            />
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
          <label class="flex gap-2 items-center mt-6 cursor-pointer text-[13px] leading-[15px]">
            <input
              type="checkbox"
              name="consent"
              class="hidden peer"
            />
            <span class="shrink-0 size-[18px] border border-gray bg-white rounded-[5px] peer-checked:border-dark peer-checked:bg-dark transition-all text-white peer-checked:[&>svg]:translate-y-0 peer-checked:[&>svg]:opacity-100 flex justify-center items-center">
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
            style={{
              backgroundImage:
                "linear-gradient(to right, #8E8E8D, #8E8E8D, #e4003f, #E9530E)",
              backgroundSize: "300% auto",
            }}
            class=" mt-6 text-xs leading-[16px] font-bold font-lemon h-[50px] rounded-md transition-all [background-position:0%] hover:[background-position:100%] duration-500 text-white w-full text-center"
          >
            Gerar cupom de desconto
          </button>
        </form>
      </div>
    </>
  );
}

interface InputProps {
  type: "text" | "email" | "tel";
  name: string;
  placeholder: string;
  label: string;
  pattern?: string;
  onChange?: (e: TargetedEvent<HTMLInputElement>) => void;
}

function Input(
  { type, name, label, placeholder, pattern, onChange }: InputProps,
) {
  return (
    <input
      style={{ "box-shadow": "0px 7px 10px 0px #00000008" }}
      class="text-[13px] leading-[15px] p-4 placeholder:text-gray text-dark rounded-md border border-light-gray-200 bg-white w-full"
      type={type}
      name={name}
      aria-label={label}
      placeholder={placeholder}
      onInput={onChange}
      {...(pattern && { pattern })}
      required
    />
  );
}

interface RadioProps {
  name: string;
  value: string;
  label: string;
  required?: boolean;
}

function Radio({ name, value, label, required = false }: RadioProps) {
  return (
    <label class="flex gap-2 items-center cursor-pointer text-[13px] leading-[15px]">
      <input
        type="radio"
        name={name}
        value={value}
        required={required}
        class="hidden peer"
      />
      <span class="shrink-0 size-[18px] border border-gray bg-white rounded-full peer-checked:border-dark peer-checked:border-[5px] transition-all">
      </span>
      {label}
    </label>
  );
}
