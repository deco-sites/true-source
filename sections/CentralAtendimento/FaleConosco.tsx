import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Image from "apps/website/components/Image.tsx";
import MenuCentralAtendimento from "deco-sites/true-source/sections/CentralAtendimento/NavegacaoCentralAtendimento.tsx";


export interface TextImgProps {
  srcMobile: ImageWidget;
  srcDesktop?: ImageWidget;
}

export default function FaleConosco({ srcMobile, srcDesktop }: TextImgProps) {
  return (
    /* Full Call-Center content page */
    <div class="flex h-auto w-full flex-col sm:flex-row justify-center gap-8 px-10 pt-8">
      {/* Navigation Bar */}
      <MenuCentralAtendimento />

      {/* Content */}
      <div class="flex h-[1606px] w-full flex-col justify-start gap-6">
        <div class="flex flex-col justify-start gap-4">
          <div class="flex  sm:h-[65px] sm:w-[549px] flex-col">
            <h1 class="font-lemon-milk text-[18px] font-bold text-[#3C3C3B]">
              FALE CONOSCO
            </h1>
            <p class="font-inter text-[14px] font-medium text-[#8E8E8D]">
              Tem alguma dúvida ou gostaria de enviar sugestões? Escolha um dos
              nossos canais de atendimento para que possamos lhe ajudar.
            </p>
          </div>
        </div>
        {/* Atendimento por Telefone*/}
        <div class="flex h-[317px] sm:h-[192px] w-full flex-col gap-6 bg-[#F0F0EE] p-6 rounded-xl">
          <h2 class="flex w-full text-nowrap text-[12px] font-lemon-milk justify-start sm:text-[16px] font-bold text-[#3C3C3B]">
            ATENDIMENTO POR TELEFONE
          </h2>
          {/* Cards */}
          <div class="flex flex-col sm:flex-row gap-6 ">
            {/* Card 1*/}
            <div class="flex h-[107px] justify-center items-center w-full flex-row gap-4 bg-white p-6 border rounded-xl border-[#D2D2D2] drop-shadow-md">
              <div class="flex h-12 w-12 items-center justify-center">
                <svg
                  width="34"
                  height="39"
                  viewBox="0 0 34 39"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33 37.5V33.5C33 31.3783 32.1571 29.3434 30.6569 27.8431C29.1566 26.3429 27.1217 25.5 25 25.5H9C6.87827 25.5 4.84344 26.3429 3.34315 27.8431C1.84285 29.3434 1 31.3783 1 33.5V37.5M25 9.5C25 13.9183 21.4183 17.5 17 17.5C12.5817 17.5 9 13.9183 9 9.5C9 5.08172 12.5817 1.5 17 1.5C21.4183 1.5 25 5.08172 25 9.5Z"
                    stroke="url(#paint0_linear_290_363)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_290_363"
                      x1="33"
                      y1="19.5"
                      x2="1"
                      y2="19.5"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#E9530E" />
                      <stop offset="1" stop-color="#E4003F" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div class="flex w-full h-full flex-col justify-start">
                <p class="font-lemon-milk text-[12px] sm:text-[14px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#E4003F] to-[#E9530E]">
                  TELEFONE CONSUMIDOR
                </p>
                <div class="flex flex-row gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-[16px] w-[16px]"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                  <p class="font-lemon-milk left-[24px] text-[14px] underline">
                    (27) 3319-4635
                  </p>
                </div>

                <div class="flex flex-row gap-2">
                  <span class="[&>svg]:h-[16px] [&>svg]:w-[16px] [&>svg]:fill-[#128c7e]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 448 512"
                    >
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                    </svg>
                  </span>
                  <p class="font-lemon-milk left-[24px] text-[14px] underline">
                    (27) 99914-1539
                  </p>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div class="flex h-[107px] justify-center items-center w-full flex-row gap-4 bg-white p-6 border rounded-xl border-[#D2D2D2] drop-shadow-md">
              <div class="flex h-12 w-12 items-center justify-center ">
                <svg
                  width="39"
                  height="43"
                  viewBox="0 0 39 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27.5 17.5C27.5 19.6217 26.6571 21.6566 25.1569 23.1569C23.6566 24.6571 21.6217 25.5 19.5 25.5C17.3783 25.5 15.3434 24.6571 13.8431 23.1569C12.3429 21.6566 11.5 19.6217 11.5 17.5M1.5 9.5L7.5 1.5H31.5L37.5 9.5M1.5 9.5V37.5C1.5 38.5609 1.92143 39.5783 2.67157 40.3284C3.42172 41.0786 4.43913 41.5 5.5 41.5H33.5C34.5609 41.5 35.5783 41.0786 36.3284 40.3284C37.0786 39.5783 37.5 38.5609 37.5 37.5V9.5M1.5 9.5H37.5"
                    stroke="url(#paint0_linear_290_922)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_290_922"
                      x1="37.5"
                      y1="21.5"
                      x2="1.5"
                      y2="21.5"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#E9530E" />
                      <stop offset="1" stop-color="#E4003F" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div class="flex w-full h-full flex-col justify-start">
                <p class="font-lemon-milk text-[12px] sm:text-[14px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#E4003F] to-[#E9530E]">
                  TELEFONE LOJISTA
                </p>
                <div class="flex flex-row gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-[16px] w-[16px]"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                  <p class="font-lemon-milk left-[24px] text-[14px] underline">
                    (27) 3319-4635
                  </p>
                </div>

                <div class="flex flex-row gap-2">
                  <span class="[&>svg]:h-[16px] [&>svg]:w-[16px] [&>svg]:fill-[#128c7e]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 448 512"
                    >
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                    </svg>
                  </span>
                  <p class="font-lemon-milk left-[24px] text-[14px] underline">
                    (27) 99225-8761
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Atendimento por Email*/}
        <div class="flex h-auto sm:h-[216px] w-full flex-col gap-6 bg-[#F0F0EE] p-6 rounded-xl">
          <h2 class="font-lemon-milk justify-start text-[16px] font-bold text-[#3C3C3B]">
            ATENDIMENTO POR EMAIL
          </h2>
          <div class="flex w-full h-auto sm:h-[309px] flex-col gap-6 sm:flex-row items-center ">
            <div class="flex h-[128px] w-full flex-row items-center justify-start gap-4 rounded-xl border border-[#D2D2D2] bg-white p-6 drop-shadow-md">
              <div class="flex h-[80px] w-[297px] flex-col gap-4">
                <div class="flex h-[48px] w-[229px] flex-col justify-center">
                  <div class="flex flex-row items-center gap-4 text-nowrap">
                    <div class="flex h-12 w-12 items-center justify-center">
                      <svg
                        width="34"
                        height="39"
                        viewBox="0 0 34 39"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M33 37.5V33.5C33 31.3783 32.1571 29.3434 30.6569 27.8431C29.1566 26.3429 27.1217 25.5 25 25.5H9C6.87827 25.5 4.84344 26.3429 3.34315 27.8431C1.84285 29.3434 1 31.3783 1 33.5V37.5M25 9.5C25 13.9183 21.4183 17.5 17 17.5C12.5817 17.5 9 13.9183 9 9.5C9 5.08172 12.5817 1.5 17 1.5C21.4183 1.5 25 5.08172 25 9.5Z"
                          stroke="url(#paint0_linear_290_363)"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_290_363"
                            x1="33"
                            y1="19.5"
                            x2="1"
                            y2="19.5"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#E9530E" />
                            <stop offset="1" stop-color="#E4003F" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    <p class="font-lemon-milk bg-gradient-to-r from-[#E4003F] to-[#E9530E] bg-clip-text text-[12px] font-extrabold text-transparent sm:text-[14px]">
                      EMAIL CONSUMIDOR
                    </p>
                  </div>
                </div>
                <div class="flex h-full w-full flex-row gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.6667 3.99996C14.6667 3.26663 14.0667 2.66663 13.3334 2.66663H2.66671C1.93337 2.66663 1.33337 3.26663 1.33337 3.99996M14.6667 3.99996V12C14.6667 12.7333 14.0667 13.3333 13.3334 13.3333H2.66671C1.93337 13.3333 1.33337 12.7333 1.33337 12V3.99996M14.6667 3.99996L8.00004 8.66663L1.33337 3.99996"
                      stroke="#3C3C3B"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <p class="font-lemon-milk text-[10px] sm:text-[14px] uppercase underline">
                    atendimento@truesource.com.br
                  </p>
                </div>
              </div>
            </div>
            <div class="flex h-[157px] sm:h-[131px] w-full flex-row items-center justify-start gap-4 rounded-xl border border-[#D2D2D2] bg-white p-6 drop-shadow-md">
              <div class="flex h-[109px] sm:h-[80px] w-[297px] flex-col gap-4">
                <div class="flex w-[242px] h-[109px] sm:h-[51px] sm:w-[329px] flex-col justify-center">
                  <div class="flex flex-row items-center gap-4 sm:text-nowrap">
                    <div class="flex h-12 w-12 items-center justify-center">
                      <svg
                        width="39"
                        height="43"
                        viewBox="0 0 39 43"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M27.5 17.5C27.5 19.6217 26.6571 21.6566 25.1569 23.1569C23.6566 24.6571 21.6217 25.5 19.5 25.5C17.3783 25.5 15.3434 24.6571 13.8431 23.1569C12.3429 21.6566 11.5 19.6217 11.5 17.5M1.5 9.5L7.5 1.5H31.5L37.5 9.5M1.5 9.5V37.5C1.5 38.5609 1.92143 39.5783 2.67157 40.3284C3.42172 41.0786 4.43913 41.5 5.5 41.5H33.5C34.5609 41.5 35.5783 41.0786 36.3284 40.3284C37.0786 39.5783 37.5 38.5609 37.5 37.5V9.5M1.5 9.5H37.5"
                          stroke="url(#paint0_linear_290_922)"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_290_922"
                            x1="37.5"
                            y1="21.5"
                            x2="1.5"
                            y2="21.5"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#E9530E" />
                            <stop offset="1" stop-color="#E4003F" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div>
                      <p class="font-lemon-milk bg-gradient-to-r from-[#E4003F] to-[#E9530E] bg-clip-text text-[12px] font-extrabold text-transparent sm:text-[14px]">
                        EMAIL LOJISTA
                      </p>

                      <div class="flex flex-row gap-4 items-center">
                        <svg
                          width="13"
                          height="12"
                          viewBox="0 0 13 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.83331 6.00004H11.1666M11.1666 6.00004L6.49998 1.33337M11.1666 6.00004L6.49998 10.6667"
                            stroke="url(#paint0_linear_290_137)"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_290_137"
                              x1="11.1666"
                              y1="6.00004"
                              x2="1.83331"
                              y2="6.00004"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#E9530E" />
                              <stop offset="1" stop-color="#E4003F" />
                            </linearGradient>
                          </defs>
                        </svg>

                        <p class="font-inter bg-gradient-to-r from-[#E4003F] to-[#E9530E] bg-clip-text text-[14px] font-bold text-transparent">
                          Faça seu cadastro como lojista True Source
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex h-full w-full flex-row gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.6667 3.99996C14.6667 3.26663 14.0667 2.66663 13.3334 2.66663H2.66671C1.93337 2.66663 1.33337 3.26663 1.33337 3.99996M14.6667 3.99996V12C14.6667 12.7333 14.0667 13.3333 13.3334 13.3333H2.66671C1.93337 13.3333 1.33337 12.7333 1.33337 12V3.99996M14.6667 3.99996L8.00004 8.66663L1.33337 3.99996"
                      stroke="#3C3C3B"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <p class="font-lemon-milk text-[10px] sm:text-[14px] uppercase underline">
                    RELACIONAMENTO@TRUEBRANDS.COM.BR
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Envie sua mensagem*/}

        <div class="flex h-[637px] w-full flex-col justify-start gap-6 rounded-xl bg-[#F0F0EE] p-6 align-top">
          <h2 class="font-lemon-milk justify-start text-[16px] font-bold text-[#3C3C3B]">
            ENVIE SUA MENSAGEM
          </h2>

          <div class="flex flex-col justify-start gap-2 align-top">
            <div class="flex flex-col justify-start gap-2 align-top sm:flex-row">
              <div class="relative flex w-full">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  class="font-inter peer block w-full rounded-md border-0 px-3.5 py-2 pt-4 text-[13px] font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#8E8E8D] focus:ring-1 sm:text-sm sm:leading-6"
                  placeholder=" "
                />
                <label
                  class="pointer-events-none absolute left-3.5 top-0 text-[11px] text-gray-500 transition-all duration-300 peer-placeholder-shown:left-3.5 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[13px] peer-focus:left-3.5 peer-focus:top-0 peer-focus:text-[11px]"
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
                  class="font-inter peer block w-full rounded-md border-0 px-3.5 py-2 pt-4 text-[13px] font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#8E8E8D] focus:ring-1 sm:text-sm sm:leading-6"
                  placeholder=" "
                />
                <label
                  class="pointer-events-none absolute left-3.5 top-0 text-[11px] text-gray-500 transition-all duration-300 peer-placeholder-shown:left-3.5 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[13px] peer-focus:left-3.5 peer-focus:top-0 peer-focus:text-[11px]"
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
                  class="font-inter peer block w-full rounded-md border-0 px-3.5 py-2 pt-4 text-[13px] font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#8E8E8D] focus:ring-1 sm:text-sm sm:leading-6"
                  placeholder=" "
                />
                <label
                  class="pointer-events-none absolute left-3.5 top-0 text-[11px] text-gray-500 transition-all duration-300 peer-placeholder-shown:left-3.5 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[13px] peer-focus:left-3.5 peer-focus:top-0 peer-focus:text-[11px]"
                  for=""
                >
                  Email*
                </label>
              </div>
            </div>

            <div class="flex flex-col justify-start gap-2 align-top">
              <div class="flex flex-col justify-start gap-2 align-top sm:flex-row">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  class="font-inter block w-full rounded-md border-0 px-3.5 py-2 text-[13px] font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#8E8E8D] focus:ring-1 sm:text-sm sm:leading-6"
                  placeholder="Anexo"
                />

                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  class="font-inter block w-full rounded-md border-0 px-3.5 py-2 text-[13px] font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#8E8E8D] focus:ring-1 sm:text-sm sm:leading-6"
                  placeholder="Assunto*"
                />
              </div>
            </div>

            <div class="flex h-[168px] flex-row justify-start gap-2 align-top">
              <div class="relative flex w-full">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  class="font-inter peer block w-full rounded-md border-0 px-3.5 py-2 pt-4 text-[13px] font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#8E8E8D] focus:ring-1 sm:text-sm sm:leading-6"
                  placeholder=" "
                />
                <label
                  class="pointer-events-none absolute left-3.5 top-0 text-[11px] text-gray-500 transition-all duration-300 peer-placeholder-shown:left-3.5 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[13px] peer-focus:left-3.5 peer-focus:top-0 peer-focus:text-[11px]"
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
                      class="custom-checkbox h-[18px] w-[18px] rounded checked:bg-gray-600"
                    />
                  </div>
                  <div class="ml-3 text-[13px]">
                    <span id="terms-description" class="text-[#3C3C3B]">
                      <span class="sr-only">New terms</span>Estou de acordo com
                      a{"  "}
                      <label
                        for="terms"
                        class="font-medium text-gray-900 underline"
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
                      class="custom-checkbox h-[18px] w-[18px] rounded"
                    />
                  </div>
                  <div class="ml-3 text-[13px]">
                    <span id="candidates-description" class="text-[#3C3C3B]">
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
                      class="custom-checkbox h-[18px] w-[18px] rounded"
                    />
                  </div>
                  <div class="ml-3 text-[13px]">
                    <span id="offers-description" class="text-[#3C3C3B]">
                      <span class="sr-only">Offers</span>Quero receber novidades
                      e ofertas por E-mail
                    </span>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>

          <button
            type="button"
            class="rounded-md bg-gradient-to-r from-[#E9530E] to-[#E4003F] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
          >
            ENVIAR
          </button>
        </div>

        {/* Seção com Imagem*/}
        <div class="flex h-[400px] w-full flex-col items-center justify-center md:flex-row">
          <div class="flex flex-col w-full h-auto md:order-last">
            <Picture>
              <Source
                width={342}
                height={200}
                media="(max-width: 767px)"
                src={srcMobile}
              />
              <Source
                width={526.5}
                height={400}
                media="(min-width: 768px)"
                src={srcDesktop || srcMobile}
              />
              <Image
                width={640}
                className="w-full h-[200px] sm:h-[400px] object-cover rounded-r-2xl"
                src={srcMobile}
                alt="Banner"
                decoding="async"
                loading="lazy"
              />
            </Picture>
          </div>

          <div class="flex w-full h-full items-center justify-center gap-2 bg-gradient-to-r rounded-l-2xl from-[#E9530E] to-[#E4003F]">
            <div class="flex gap-6 h-auto w-[283px] flex-col p-4">
              <h2 class="font-lemon-milk text-[16px] font-bold text-white">
                ENVIE SUA MENSAGEM
              </h2>

              <p class="font-inter text-[14px] font-medium text-white">
                Explore o Programa True Source para Profissionais de Saúde!
                Descontos exclusivos, suporte especializado e uma parceria
                dedicada à promoção da saúde natural. Junte-se a nós na busca
                pela verdadeira fonte do bem-estar!
              </p>
              <button
                type="button"
                class="inline-flex w-[223px] h-[48px] justify-start items-center gap-2 px-6 rounded-3xl py-3 bg-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              >
                <div>
                  <span class="text-[13px] font-bold font-lemon-milk bg-clip-text text-transparent bg-gradient-to-r from-[#E9530E] to-[#E4003F]">
                    FAÇA SEU CADASTRO
                  </span>
                </div>
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.41663 5H12.0833M12.0833 5L8.08329 1M12.0833 5L8.08329 9"
                    stroke="url(#paint0_linear_290_987)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_290_987"
                      x1="12.0833"
                      y1="5"
                      x2="1.41663"
                      y2="5"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#E9530E" />
                      <stop offset="1" stop-color="#E4003F" />
                    </linearGradient>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
