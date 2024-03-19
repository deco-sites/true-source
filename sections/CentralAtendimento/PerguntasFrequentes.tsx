import MenuCentralAtendimento from "deco-sites/true-source/sections/CentralAtendimento/NavegacaoCentralAtendimento.tsx";


export default function FaleConosco() {
  return (
    /* Full Call-Center content page */
    <div class="flex h-auto w-full flex-col sm:flex-row justify-center gap-8 px-10 pt-8">
      {/* Navigation Bar */}
      <MenuCentralAtendimento />

      {/* Content */}
      <div class="flex h-auto w-[1053px] flex-col gap-6">
        <div class="flex flex-col gap-4 pb-6 sm:h-[88px] sm:w-[531px]">
          <h1 class="font-lemon-milk text-[18px] font-bold text-[#3C3C3B]">
            PERGUNTAS FREQUENTES
          </h1>
          <div class="flex flex-row gap-2">
            <button
              type="button"
              class="rounded-full bg-[#3C3C3B] p-3 text-[14px] font-bold text-white shadow-sm hover:bg-[#2A2A2A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Todas as perguntas
            </button>
            <button
              type="button"
              class="rounded-full bg-white p-3 text-[14px] font-bold text-[#3C3C3B] shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Produtos True Source
            </button>
            <button
              type="button"
              class="rounded-full bg-white p-3 text-[14px] font-bold text-[#3C3C3B] shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Entrega
            </button>
            <button
              type="button"
              class="rounded-full bg-white p-3 text-[14px] font-bold text-[#3C3C3B] shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Devolução
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
