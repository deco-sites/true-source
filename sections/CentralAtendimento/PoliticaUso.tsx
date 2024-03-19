import MenuCentralAtendimento from "deco-sites/true-source/sections/CentralAtendimento/NavegacaoCentralAtendimento.tsx";



export default function PoliticaUso() {
  return (
    /* Full Call-Center content page */
    <div class="flex h-auto w-full flex-col sm:flex-row justify-center gap-8 px-10 pt-8">
      {/* Navigation Bar */}
      <MenuCentralAtendimento />

      {/* Content */}
      <div class="flex h-auto w-[1053px] flex-col gap-6">
          <h1 class="font-lemon-milk text-[18px] font-bold text-[#3C3C3B]">
            POLÍTICA DE USO
          </h1>

        <div class="flex w-[342px] sm:w-full h-auto flex-col gap-6 p-8 sm:p-16 border rounded-xl border-[#D2D2D2] text-[#3C3C3B]">
          <div>
            <h2 class="font-bold">1. Introdução</h2>
            <p>
              Bem-vindo à nossa plataforma de e-commerce de suplementos
              alimentares. Esta Política de Uso tem como objetivo estabelecer as
              diretrizes e regras para garantir uma experiência segura,
              transparente e ética para todos os usuários. Ao utilizar nosso
              site, você concorda com os termos e condições descritos abaixo.
            </p>
          </div>

          <div>
            <h2 class="font-bold">2. Informações Gerais</h2>
            <h3>2.1. Idade Mínima:</h3>
            <p>
              O uso deste site é restrito a usuários com idade igual ou superior
              a 18 anos. Menores de idade só podem utilizar o site sob a
              supervisão de um responsável legal.
            </p>

            <h3>2.2. Informações Precisas:</h3>
            <p>
              Ao cadastrar-se, você concorda em fornecer informações precisas e
              atualizadas. A empresa não se responsabiliza por informações
              incorretas ou desatualizadas.
            </p>

            <h3>2.3. Proibição de Revenda:</h3>
            <p>
              A revenda dos produtos adquiridos em nosso e-commerce é
              estritamente proibida sem autorização prévia por escrito.
            </p>
          </div>

          <div>
            <h2 class="font-bold">3. Compras e Pagamentos</h2>
            <h3>3.1. Transações Seguras:</h3>
            <p>
              Utilizamos tecnologias seguras para garantir a confidencialidade e
              integridade das transações. Contudo, não nos responsabilizamos por
              problemas decorrentes de falhas de terceiros, como provedores de
              pagamento. Após a administradora do seu cartão aprovar o crédito,
              alertamos que para a sua segurança todos os seus pedidos
              realizados em nossa loja poderão passar por uma análise interna. A
              central de atendimento de nossa loja entrará em contato caso haja
              qualquer tipo de ocorrência que possa impedir a compra dos nossos
              produtos.
            </p>

            <h3>3.2. Devoluções e Reembolsos:</h3>
            <p>
              Consulte nossa política de devolução para obter informações
              detalhadas sobre devoluções e reembolsos.
            </p>
          </div>

          <div>
            <h2 class="font-bold">4. Uso Responsável dos Suplementos</h2>
            <h3>4.1. Consulte um Profissional de Saúde:</h3>
            <p>
              Antes de iniciar o uso de qualquer suplemento, recomendamos que
              consulte um profissional de saúde para garantir que seja adequado
              às suas necessidades individuais.
            </p>

            <h3>4.2. Respeito às Dosagens Recomendadas:</h3>
            <p>
              Siga sempre as dosagens recomendadas pelos fabricantes. O uso
              excessivo pode ser prejudicial à saúde.
            </p>
          </div>

          <div>
            <h2 class="font-bold">5. Conteúdo do Site</h2>
            <h3>5.1. Propriedade Intelectual:</h3>
            <p>
              Todo o conteúdo do site, incluindo textos, imagens e marcas
              registradas, é de propriedade exclusiva da empresa. Qualquer uso
              não autorizado é proibido.
            </p>

            <h3>5.2. Avaliações e Comentários:</h3>
            <p>
              Os usuários são encorajados a fornecer feedback construtivo, mas
              comentários ofensivos, difamatórios ou fraudulentos serão
              removidos.
            </p>
          </div>

          <div>
            <h2 class="font-bold">6. Segurança e Privacidade</h2>
            <h3>6.1. Proteção de Dados:</h3>
            <p>
              Comprometemo-nos a proteger suas informações pessoais de acordo
              com nossa Política de Privacidade. Para manter uma compra 100%
              segura todos os dados de sua compra são criptografados.
            </p>

            <h3>6.2. Credenciais de Acesso:</h3>
            <p>
              Mantenha suas credenciais de acesso seguras. A empresa não se
              responsabiliza por acessos não autorizados à sua conta.
            </p>
          </div>

          <div>
            <h2 class="font-bold">7. Disposições Finais</h2>
            <h3>7.1. Alterações na Política:</h3>
            <p>
              Reservamo-nos o direito de realizar alterações nesta Política de
              Uso. Recomendamos que os usuários revisem periodicamente os
              termos.
            </p>

            <h3>7.2. Contato:</h3>
            <p>
              Em caso de dúvidas ou preocupações, entre em contato conosco
              através dos meios fornecidos em nosso site.
            </p>
          </div>

          <p>
            Ao utilizar nosso e-commerce, você concorda em cumprir estas
            diretrizes. O não cumprimento pode resultar em medidas
            disciplinares, incluindo a suspensão ou encerramento da conta.
            Obrigado por escolher nossa plataforma.
          </p>
        </div>
      </div>
    </div>
  );
}
