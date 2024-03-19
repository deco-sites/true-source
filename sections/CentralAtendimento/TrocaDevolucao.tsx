import MenuCentralAtendimento from "deco-sites/true-source/sections/CentralAtendimento/NavegacaoCentralAtendimento.tsx";



export default function TrocaDevolucao() {
  return (
    /* Full Call-Center content page */
    <div class="flex h-auto w-full flex-col sm:flex-row justify-center gap-8 px-10 pt-8">
      {/* Navigation Bar */}
      <MenuCentralAtendimento />

      {/* Content */}
      <div class="flex h-auto w-[1053px] flex-col gap-6">
        <div class="flex flex-col gap-4 pb-6 sm:h-[88px] sm:w-[531px]">
          <h1 class="font-lemon-milk text-[18px] font-bold text-[#3C3C3B]">
            TROCA E DEVOLUÇÃO
          </h1>
        </div>

        <div class="font-inter flex flex-col gap-6 rounded-xl border border-[#D2D2D2] p-16">
          <div class="flex flex-col gap-3">
            <p class="text-[14px] text-[#3C3C3B]">
              Para garantir a satisfação e o respeito com os nossos clientes,
              temos a nossas políticas de Troca e Devolução, tendo como base o
              Código de Defesa do Consumidor.
            </p>

            <p class="text-[14px] text-[#3C3C3B]">
              Todas as ocorrências que envolvam troca ou devolução devem ser
              feitas no prazo de até 7 (sete) dias corridos, a contar da data de
              entrega e também devem ser comunicadas à Central de Atendimento da
              TrueSource. Você poderá recusar o produto que:
            </p>
          </div>

          <div class="flex flex-col gap-2 sm:flex-row">
            <div class="flex h-auto w-full flex-col justify-start gap-2 rounded-xl border border-[#D2D2D2] p-6">
              <div class="flex flex-col gap-4">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#E4003F] to-[#E9530E]">
                  <p class="text-inter font-bold text-white">1</p>
                </div>

                <div>
                  <p class="f text-[#3C3C3B]">Estiver com a embalagem aberta</p>
                </div>
              </div>
            </div>

            <div class="flex h-auto w-full flex-col justify-start gap-2 rounded-xl border border-[#D2D2D2] p-6">
              <div class="flex flex-col gap-4">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#E4003F] to-[#E9530E]">
                  <p class="text-inter font-bold text-white">2</p>
                </div>

                <div>
                  <p class="f text-[#3C3C3B]">Rótulo de segurança rompido</p>
                </div>
              </div>
            </div>

            <div class="flex h-auto w-full flex-col justify-start gap-2 rounded-xl border border-[#D2D2D2] p-6">
              <div class="flex flex-col gap-4">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#E4003F] to-[#E9530E]">
                  <p class="text-inter font-bold text-white">3</p>
                </div>

                <div>
                  <p class="f text-[#3C3C3B]">
                    Produto em desacordo com o pedido
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <p class="text-[14px] text-[#3C3C3B]">
              Se, ainda assim, você aceitar o produto que se enquadre nas
              condições acima, por favor, entre em contato com o setor de
              atendimento ao cliente em até 48 horas.
            </p>

            <p class="text-[14px] text-[#3C3C3B]">
              Para evitar qualquer problema em sua compra é importante que você
              observe:
            </p>
          </div>

          <div class="flex flex-col gap-2 sm:flex-row">
            <div class="flex h-auto w-full flex-col justify-start gap-2 rounded-xl border border-[#D2D2D2] p-6">
              <div class="flex flex-col gap-4">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#E4003F] to-[#E9530E]">
                  <p class="text-inter font-bold text-white">1</p>
                </div>

                <div>
                  <p class="f text-[#3C3C3B]">
                    A completa descrição das características do produto antes de
                    efetuar a compra
                  </p>
                </div>
              </div>
            </div>

            <div class="flex h-auto w-full flex-col justify-start gap-2 rounded-xl border border-[#D2D2D2] p-6">
              <div class="flex flex-col gap-4">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#E4003F] to-[#E9530E]">
                  <p class="text-inter font-bold text-white">2</p>
                </div>

                <div>
                  <p class="f text-[#3C3C3B]">
                    O sabor do produto. É importante que leia a descrição, pois
                    as imagens são meramente ilustrativas
                  </p>
                </div>
              </div>
            </div>

            <div class="flex h-auto w-full flex-col justify-start gap-2 rounded-xl border border-[#D2D2D2] p-6">
              <div class="flex flex-col gap-4">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#E4003F] to-[#E9530E]">
                  <p class="text-inter font-bold text-white">3</p>
                </div>

                <div>
                  <p class="f text-[#3C3C3B]">
                    Os produtos são enviados ao cliente exatamente como foram
                    recebidos pelo fabricante. Ao receber o produto, verifique
                    seu perfeito estado e só assine a nota fiscal caso o produto
                    não esteja com a embalagem aberta ou violada, produto
                    avariado, produto em desacordo com o pedido, falta de
                    acessórios/componentes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="font-inter flex flex-col gap-6 rounded-xl border border-[#D2D2D2] p-16">
          <h2 class="font-lemon-milk text-[16px] font-bold text-[#3C3C3B]">
            TROCA POR OUTRO PRODUTO OU DEVOLUÇÃO DO VALOR
          </h2>

          <p class="f text-[#3C3C3B]">
            Caso tenha tido problemas de troca ou devolução, o cliente
            TrueSource poderá optar pelas seguintes formas:
          </p>
          <div class="flex flex-col gap-2 sm:flex-row">
            <div class="flex h-auto w-full flex-col justify-start gap-2 rounded-xl border border-[#D2D2D2] p-6">
              <div class="flex flex-col gap-4">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#E4003F] to-[#E9530E]">
                  <p class="text-inter font-bold text-white">1</p>
                </div>

                <div>
                  <p class="f text-[#3C3C3B]">
                    Troca por outro produto de maior valor: estornaremos o valor
                    do pedido anterior e faremos uma nova cobrança no valor
                    correto do produto a ser trocado
                  </p>
                </div>
              </div>
            </div>

            <div class="flex h-auto w-full flex-col justify-start gap-2 rounded-xl border border-[#D2D2D2] p-6">
              <div class="flex flex-col gap-4">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#E4003F] to-[#E9530E]">
                  <p class="text-inter font-bold text-white">2</p>
                </div>

                <div>
                  <p class="f text-[#3C3C3B]">
                    Troca por outro produto de menor valor: faremos o envio do
                    produto escolhido e oferecemos as formas abaixo de
                    ressarcimento da diferença: Estorno do valor da diferença em
                    cartão de crédito; Um cupom de crédito para futuras compras
                    na TrueSource no valor da diferença;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="font-inter flex flex-col gap-6 rounded-xl border border-[#D2D2D2] p-16">
          <h2 class="font-lemon-milk text-[16px] font-bold text-[#3C3C3B]">
            CUSTOS E MODOS DE DEVOLUÇÃO
          </h2>

          <div class="flex flex-col gap-3 text-[14px] text-[#3C3C3B]">
            <p>
              Caso o motivo da devolução do produto seja originado por problemas
              no envio do pedido, a TrueSource assumirá os custos de devolução
              do anterior e envio do novo pedido.
            </p>

            <p>
              Caso a devolução seja solicitada por iniciativa do cliente, o
              mesmo deverá assumir os custos de devolução do produto.
            </p>

            <p>
              O reenvio do produto para a TrueSource se implica da seguinte
              maneira:
            </p>

            <p>
              O cliente deve solicitar um código reverso ao site através do
              e-mail atendimento@truebrandsdistribuidora.com.br. Com o código em
              mãos o cliente deve ir a uma agência de correios mais próxima e
              enviar a mercadoria. Não buscamos encomendas em casa, apenas
              entregamos.
            </p>
          </div>
        </div>

        <div class="font-inter flex flex-col gap-6 rounded-xl border border-[#D2D2D2] p-16">
          <h2 class="font-lemon-milk text-[16px] font-bold text-[#3C3C3B]">
            TROCA DE BRINDES
          </h2>

          <div class="flex flex-col gap-3 text-[14px] text-[#3C3C3B]">
            <p>
              Os brindes são separados e enviados em cada pedido bonificado. Não
              fazemos a troca dos mesmos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
