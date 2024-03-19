import MenuCentralAtendimento from "deco-sites/true-source/sections/CentralAtendimento/NavegacaoCentralAtendimento.tsx";



export default function PoliticaFreteGratis() {
  return (
    /* Full Call-Center content page */
    <div class="flex h-auto w-full flex-col sm:flex-row justify-center gap-8 px-10 pt-8">
      {/* Navigation Bar */}
      <MenuCentralAtendimento />

      {/* Content */}
      <div class="flex h-auto w-[1053px] flex-col gap-6">
          <h1 class="font-lemon-milk text-[18px] font-bold text-[#3C3C3B]">
            POLÍTICA DE FRETE GRÁTIS
          </h1>
        

        <div class="flex flex-col gap-6 p-16 rounded-xl border border-[#D2D2D2] font-inter ">
          <p class="text-[#3C3C3B] text-[14px]">
            Ganhe frete grátis de acordo com o valor da compra e sua região:
          </p>

          <div class="flex flex-col gap-2 sm:flex-row">
            <div class="flex h-auto w-full flex-col justify-start gap-2 rounded-xl border border-[#D2D2D2] p-6">
              <div class="flex flex-col gap-4">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#E4003F] to-[#E9530E]">
                  <p class="text-inter font-bold text-white">1</p>
                </div>

                <div>
                  <h2 class="text-[14px] font-bold text-[#3C3C3B]">
                    Espírito Santo:
                  </h2>
                  <p class="f text-[#3C3C3B]">acima de R$ 200,00</p>
                </div>
              </div>
            </div>

            <div class="flex h-auto w-full flex-col justify-start gap-2 rounded-xl border border-[#D2D2D2] p-6">
              <div class="flex flex-col gap-4">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#E4003F] to-[#E9530E]">
                  <p class="text-inter font-bold text-white">2</p>
                </div>

                <div>
                  <h2 class="text-[14px] font-bold text-[#3C3C3B]">Sudeste:</h2>
                  <p class="f text-[#3C3C3B]">acima de R$ 250,00</p>
                </div>
              </div>
            </div>

            <div class="flex h-auto w-full flex-col justify-start gap-2 rounded-xl border border-[#D2D2D2] p-6">
              <div class="flex flex-col gap-4">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#E4003F] to-[#E9530E]">
                  <p class="text-inter font-bold text-white">3</p>
                </div>

                <div>
                  <h2 class="text-[14px] font-bold text-[#3C3C3B]">
                    Sul e Nordeste:
                  </h2>
                  <p class="f text-[#3C3C3B]">acima de R$ 350,00</p>
                </div>
              </div>
            </div>

            <div class="flex h-auto w-full flex-col justify-start gap-2 rounded-xl border border-[#D2D2D2] p-6">
              <div class="flex flex-col gap-4">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#E4003F] to-[#E9530E]">
                  <p class="text-inter font-bold text-white">3</p>
                </div>

                <div>
                  <h2 class="text-[14px] font-bold text-[#3C3C3B]">
                    Centro-Oeste e Norte:
                  </h2>
                  <p class="f text-[#3C3C3B]">acima de R$ 400,00</p>
                </div>
              </div>
            </div>
          </div>

          <p class="text-[#3C3C3B] text-[14px]">
            Para calcular o valor do frete, selecione os produtos que você
            deseja comprar e clique em finalizar compra. Em seguida, informe seu
            CEP em "Meu Carrinho". Os custos e prazo de entrega serão calculados
            automaticamente. Selecione a opção preferida e finalize sua compra.
            Você ainda terá a opção de modificar seu pedido antes de concluir a
            transação.
          </p>

          <p class="text-[#3C3C3B] text-[14px]">
          O prazo de entrega começa a contar após a aprovação do pagamento.
            Quando seu pagamento for aprovado, você receberá uma confirmação por
            e-mail.
          </p>
          <p class="text-[#3C3C3B] text-[14px]">
          Em caso de promoções ou utilização de cupons, o valor do frete será
            calculado considerando o valor total da compra após a aplicação dos
            descontos.
          </p>
        </div>
      </div>
    </div>
  );
}
