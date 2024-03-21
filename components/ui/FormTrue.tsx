import { AppContext } from "deco-sites/true-source/apps/site.ts";
import { HTMLWidget } from "apps/admin/widgets.ts";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";

interface Props {
  /**
   * @title Texto do topo do formulário
   */
  topText: HTMLWidget;
}

export default function ({ topText }: Props) {
  return (
    <>
      <div class="max-w-[848px] mx-auto py-36 bg-ice">
        <div
          dangerouslySetInnerHTML={{ __html: topText }}
          class="[&_:is(h1,h2)]:font-lemon [&_:is(h1,h2)]:text-dark [&_:is(h1,h2)]:text-[40px] [&_:is(h1,h2)]:font-bold [&_:is(h1,h2)]:leading-10 text-gray font-medium leading-7 mb-16"
        />

        <div>
          <div class="bg-white p-6 rounded-xl">
            <div class="flex items-center gap-4">
              <span class="w-8 h-8 bg-dark flex justify-center items-center text-white font-lemon font-bold rounded-full">
                1
              </span>
              <span class="text-dark font-lemon font-bold">
                SOBRE VOCÊ
              </span>
            </div>

            <div class="grid grid-cols-2 gap-2 mt-6 w-full">
              <div class="relative col-span-2">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder=" "
                  class="peer rounded-md border border-Stroke pt-5 pb-1.5 px-4 shadow outline-0 focus:border-dark text-sm w-full"
                />
                <label class="font-medium absolute text-gray left-4 text-sm top-1/2 -translate-y-1/2 pointer-events-none peer-focus:text-[11px] peer-focus:top-3.5 peer-[&:not(:placeholder-shown)]:top-3.5 peer-[&:not(:placeholder-shown)]:text-[11px] transition-all">
                  Seu nome completo *
                </label>
              </div>

              <div class="relative">
                <input
                  type="text"
                  name="specialty"
                  required
                  placeholder=" "
                  class="peer rounded-md border border-Stroke pt-5 pb-1.5 px-4 shadow outline-0 focus:border-dark text-sm w-full"
                />
                <label class="font-medium absolute text-gray left-4 text-sm top-1/2 -translate-y-1/2 pointer-events-none peer-focus:text-[11px] peer-focus:top-3.5 peer-[&:not(:placeholder-shown)]:top-3.5 peer-[&:not(:placeholder-shown)]:text-[11px] transition-all">
                  Especialidade *
                </label>
              </div>

              <div class="relative">
                <input
                  type="text"
                  name="area"
                  required
                  placeholder=" "
                  class="peer rounded-md border border-Stroke pt-5 pb-1.5 px-4 shadow outline-0 focus:border-dark text-sm w-full"
                />
                <label class="font-medium absolute text-gray left-4 text-sm top-1/2 -translate-y-1/2 pointer-events-none peer-focus:text-[11px] peer-focus:top-3.5 peer-[&:not(:placeholder-shown)]:top-3.5 peer-[&:not(:placeholder-shown)]:text-[11px] transition-all">
                  Área de atuação *
                </label>
              </div>
              <div class="relative">
                <input
                  type="text"
                  name="cpf"
                  required
                  placeholder=" "
                  id="form-cpf"
                  class="peer rounded-md border border-Stroke pt-5 pb-1.5 px-4 shadow outline-0 focus:border-dark text-sm w-full"
                />
                <label class="font-medium absolute text-gray left-4 text-sm top-1/2 -translate-y-1/2 pointer-events-none peer-focus:text-[11px] peer-focus:top-3.5 peer-[&:not(:placeholder-shown)]:top-3.5 peer-[&:not(:placeholder-shown)]:text-[11px] transition-all">
                  CPF *
                </label>
              </div>
              <div class="relative">
                <input
                  type="text"
                  name="email"
                  required
                  placeholder=" "
                  class="peer rounded-md border border-Stroke pt-5 pb-1.5 px-4 shadow outline-0 focus:border-dark text-sm w-full"
                />
                <label class="font-medium absolute text-gray left-4 text-sm top-1/2 -translate-y-1/2 pointer-events-none peer-focus:text-[11px] peer-focus:top-3.5 peer-[&:not(:placeholder-shown)]:top-3.5 peer-[&:not(:placeholder-shown)]:text-[11px] transition-all">
                  E-mail *
                </label>
              </div>
              <div class="relative">
                <input
                  type="text"
                  name="tel"
                  required
                  placeholder=" "
                  id="tel-with-zapzap"
                  class="peer rounded-md border border-Stroke pt-5 pb-1.5 px-4 shadow outline-0 focus:border-dark text-sm w-full"
                />
                <label class="font-medium absolute text-gray left-4 text-sm top-1/2 -translate-y-1/2 pointer-events-none peer-focus:text-[11px] peer-focus:top-3.5 peer-[&:not(:placeholder-shown)]:top-3.5 peer-[&:not(:placeholder-shown)]:text-[11px] transition-all">
                  Telefone com WhatsApp *
                </label>
              </div>
              <div class="relative">
                <input
                  type="text"
                  name="instagram"
                  placeholder=" "
                  class="peer rounded-md border border-Stroke pt-5 pb-1.5 px-4 shadow outline-0 focus:border-dark text-sm w-full"
                />
                <label class="font-medium absolute text-gray left-4 text-sm top-1/2 -translate-y-1/2 pointer-events-none peer-focus:text-[11px] peer-focus:top-3.5 peer-[&:not(:placeholder-shown)]:top-3.5 peer-[&:not(:placeholder-shown)]:text-[11px] transition-all">
                  Instagram
                </label>
              </div>
            </div>

            <button
              type="submit"
              class="h-[50px] w-full bg-gradient-to-r from-[#E9530E] to-[#E4003F] rounded-md text-white font-bold font-lemon text-sm mt-6"
            >
              Avançar
            </button>
          </div>
        </div>
      </div>

      <script
        src={scriptAsDataURI(() => {
          const phoneInput = document.querySelector<HTMLInputElement>(
            "input#tel-with-zapzap",
          );

          const cpfInput = document.querySelector<HTMLInputElement>(
            "input#form-cpf",
          );

          if (!phoneInput) throw new Error("Phone input not found");
          if (!cpfInput) throw new Error("Cpf input not found");

          phoneInput.oninput = (e) => {
            // @ts-ignore trust me
            e.currentTarget.value = (e.currentTarget.value as string)
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
          };

          // xxx.xxx.xxx-xx
          cpfInput.oninput = (e) => {
            // @ts-ignore trust me
            e.currentTarget.value = (e.currentTarget.value as string)
              .replace(/\D/g, "")
              .replace(
                /(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})(.*)/,
                (all, $1, $2, $3, $4) => {
                  let s = "";

                  if ($1) s += $1;
                  if ($2) s += `.${$2}`;
                  if ($3) s += `.${$3}`;
                  if ($4) s += `-${$4}`;

                  return s;
                },
              );
          };
        })}
      />
    </>
  );
}

export function loader(props: Props, req: Request, ctx: AppContext) {
  return {
    ...props,
  };
}
