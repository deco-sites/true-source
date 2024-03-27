interface FormCardProps {
  titleCard: string;
  buttonCard: string;
}

export default function FormCard({ titleCard, buttonCard }: FormCardProps) {
  return (
    <>
      <div class="flex lg:h-[637px] w-full flex-col justify-start gap-6 rounded-xl bg-ice p-6 align-top">
        <h2 class="font-lemon justify-start text-[16px] font-bold text-[#3C3C3B]">
          {titleCard}
        </h2>

        <div class="flex flex-col justify-start gap-2 align-top">
          <div class="flex flex-col justify-start gap-2 align-top sm:flex-row">
            <div class="relative flex w-full">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autocomplete="given-name"
                class="font-inter peer block w-full rounded-md border-0 px-3.5 py-2 pt-4 text-[13px] font-medium text-gray shadow-sm focus:ring-1 sm:text-sm sm:leading-6"
                placeholder=" "
              />
              <label
                class="pointer-events-none absolute left-3.5 top-0 text-[11px] text-gray font-medium leading-auto tracking[-2] transition-all duration-300 peer-placeholder-shown:left-3.5 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[13px] peer-focus:left-3.5 peer-focus:top-0 peer-focus:text-[11px]"
                for=""
              >
                Nome completo*
              </label>
            </div>

            <div class="relative flex w-full">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autocomplete="given-name"
                class="font-inter peer block w-full rounded-md border-0 px-3.5 py-2 pt-4 text-[13px] font-medium text-gray-900 shadow-sm placeholder:text-[#8E8E8D] focus:ring-1 sm:text-sm sm:leading-6"
                placeholder=" "
              />
              <label
                class="pointer-events-none absolute left-3.5 top-0 text-[11px]  text-gray font-medium leading-auto tracking[-2] transition-all duration-300 peer-placeholder-shown:left-3.5 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[13px] peer-focus:left-3.5 peer-focus:top-0 peer-focus:text-[11px]"
                for=""
              >
                Telefone*
              </label>
            </div>
          </div>

          <div class="flex flex-row justify-start gap-2 align-top">
            <div class="relative flex w-full">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autocomplete="given-name"
                class="font-inter peer block w-full rounded-md border-0 px-3.5 py-2 pt-4 text-[13px] font-medium text-gray-900 shadow-sm placeholder:text-[#8E8E8D] focus:ring-1 sm:text-sm sm:leading-6"
                placeholder=" "
              />
              <label
                class="pointer-events-none absolute left-3.5 top-0 text-[11px]  text-gray font-medium leading-auto tracking[-2] transition-all duration-300 peer-placeholder-shown:left-3.5 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[13px] peer-focus:left-3.5 peer-focus:top-0 peer-focus:text-[11px]"
                for=""
              >
                Email*
              </label>
            </div>
          </div>

          <div class="flex flex-col justify-start gap-2 align-top">
            <div class="flex flex-col justify-start gap-2 align-top sm:flex-row">
              <div class="relative flex w-full">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  class="font-inter peer block w-full rounded-md border-0 px-3.5 py-2 pt-4 text-[13px] font-medium text-gray-900 shadow-sm placeholder:text-[#8E8E8D] focus:ring-1 sm:text-sm sm:leading-6"
                  placeholder=" "
                />
                <label
                  class="pointer-events-none absolute left-3.5 top-0 text-[11px]  text-gray font-medium leading-auto tracking[-2] transition-all duration-300 peer-placeholder-shown:left-3.5 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[13px] peer-focus:left-3.5 peer-focus:top-0 peer-focus:text-[11px]"
                  for=""
                >
                  Anexo*
                </label>
              </div>
              <div class="relative flex w-full">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  class="font-inter peer block w-full rounded-md border-0 px-3.5 py-2 pt-4 text-[13px] font-medium text-gray-900 shadow-sm placeholder:text-[#8E8E8D] focus:ring-1 sm:text-sm sm:leading-6"
                  placeholder=" "
                />
                <label
                  class="pointer-events-none absolute left-3.5 top-0 text-[11px]  text-gray font-medium leading-auto tracking[-2] transition-all duration-300 peer-placeholder-shown:left-3.5 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[13px] peer-focus:left-3.5 peer-focus:top-0 peer-focus:text-[11px]"
                  for=""
                >
                  Assunto*
                </label>
              </div>
            </div>
          </div>

          <div class="flex h-[168px] flex-row justify-start gap-2 align-top">
            <div class="relative flex w-full">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autocomplete="given-name"
                class="font-inter peer block w-full rounded-md border-0 px-3.5 py-2 pt-4 text-[13px] font-medium text-gray shadow-sm placeholder:text-[#8E8E8D] focus:ring-1 sm:text-sm sm:leading-6"
                placeholder=" "
              />
              <label
                class="pointer-events-none absolute left-3.5 top-0 text-[11px] text-gray font-medium leading-auto tracking[-2] transition-all duration-300 peer-placeholder-shown:left-3.5 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[13px] peer-focus:left-3.5 peer-focus:top-0 peer-focus:text-[11px]"
                for=""
              >
                Qual sua dúvida?*
              </label>
            </div>
          </div>

          <fieldset>
            <legend class="sr-only">Terms</legend>
            <div class="flex flex-col gap-4 pt-4">
              <div class="flex items-center">
                <div class="flex h-[18px] items-center">
                  <input
                    id="terms"
                    aria-describedby="terms-description"
                    name="terms"
                    type="checkbox"
                    class="custom-checkbox h-[18px] w-[18px] rounded accent-dark"
                  />
                </div>
                <div class="ml-3">
                  <span
                    id="terms-description"
                    class="text-dark font-medium text-[13px] leading-auto tracking[-2]"
                  >
                    <span class="sr-only">New terms</span>Estou de acordo com a
                    {"  "}
                    <label
                      for="terms"
                      class="font-bold underline"
                    >
                      política de privacidade
                    </label>{"  "}
                    da True Source
                  </span>
                </div>
              </div>
              <div class="flex items-center">
                <div class="flex h-[18px] items-center">
                  <input
                    id="candidates"
                    aria-describedby="candidates-description"
                    name="candidates"
                    type="checkbox"
                    class="custom-checkbox h-[18px] w-[18px] rounded accent-dark"
                  />
                </div>
                <div class="ml-3">
                  <span
                    id="candidates-description"
                    class="text-dark font-medium text-[13px] leading-auto tracking[-2]"
                  >
                    <span class="sr-only">New candidates</span>Quero receber
                    novidades e ofertas por WhatsApp
                  </span>
                </div>
              </div>
              <div class="flex items-center">
                <div class="flex h-[18px] items-center">
                  <input
                    id="offers"
                    aria-describedby="offers-description"
                    name="offers"
                    type="checkbox"
                    class="custom-checkbox h-[18px] w-[18px] rounded accent-dark"
                  />
                </div>
                <div class="ml-3">
                  <span
                    id="offers-description"
                    class="text-dark font-medium text-[13px] leading-auto tracking[-2]"
                  >
                    <span class="sr-only">Offers</span>Quero receber novidades e
                    ofertas por E-mail
                  </span>
                </div>
              </div>
            </div>
          </fieldset>
        </div>

        <button
          type="button"
          class="rounded-md bg-gradient-to-r from-red to-orange px-3.5 py-2.5 text-[13px] leading-auto tracking[-2] font-bold text-white shadow-sm hover:bg-white/20"
        >
          {buttonCard}
        </button>
      </div>
    </>
  );
}
