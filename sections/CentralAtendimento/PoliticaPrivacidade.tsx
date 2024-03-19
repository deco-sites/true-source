import MenuCentralAtendimento from "deco-sites/true-source/sections/CentralAtendimento/NavegacaoCentralAtendimento.tsx";



export default function PoliticaPrivacidade() {
  return (
    /* Full Call-Center content page */
    <div class="flex h-auto w-full flex-col sm:flex-row justify-center gap-8 px-10 pt-8">
      {/* Navigation Bar */}
      <MenuCentralAtendimento />

      {/* Content */}
      <div class="flex h-auto w-[1053px] flex-col gap-6">
        <div class="flex flex-col gap-4 pb-6 sm:h-[88px] sm:w-[531px]">
          <h1 class="font-lemon-milk text-[18px] font-bold text-[#3C3C3B]">
            POLÍTICA DE PRIVACIDADE
          </h1>
        </div>

        <div class="flex w-[342px] sm:w-full h-auto flex-col gap-6 p-8 sm:p-16 border rounded-xl border-[#D2D2D2] text-[#3C3C3B]">
          Nós, da True Source, respeitamos a sua privacidade e estamos
          comprometidos em proteger as informações pessoais que você fornece
          durante sua visita ao nosso site de comércio eletrônico de
          suplementação alimentar. Esta política de privacidade explica como
          coletamos, usamos, compartilhamos e protegemos suas informações
          pessoais. Ao acessar ou utilizar nosso site, você concorda com as
          práticas descritas nesta política.

          <div>
            <h2 class="font-bold">1. Informações Coletadas:</h2>
            <h3>1.1 Informações Pessoais:</h3>
            <p>
              Coletamos informações pessoais que você nos fornece
              voluntariamente durante o processo de compra, como nome, endereço,
              número de telefone, endereço de e-mail e informações de pagamento.
              Assumimos a responsabilidade como gestores dos dados pessoais
              processados em nossa plataforma, operando em conformidade com as
              diretrizes estabelecidas na Lei nº 13.709/2018, conhecida como Lei
              Geral de Proteção de Dados (LGPD). A LGPD é uma legislação
              brasileira que regula as práticas relacionadas ao tratamento,
              proteção e privacidade de dados pessoais, conforme detalhado neste
              documento. O responsável pelo controle dos dados é a entidade,
              seja ela pessoa física ou jurídica, que toma as decisões
              referentes ao tratamento de dados pessoais.
            </p>
          </div>

          <div>
            <h3>1.2 Informações de Navegação:</h3>
            <p>
              Registramos automaticamente informações sobre seu dispositivo e
              navegação, incluindo endereço IP, tipo de navegador, páginas
              acessadas e tempos de visita.
            </p>
          </div>

          <div>
            <h2 class="font-bold">2. Uso de Informações:</h2>
            <h3>2.1 Processamento de Pedidos:</h3>
            <p>
              Utilizamos suas informações pessoais para processar pedidos,
              fornecer informações sobre envio e gerenciar transações.
            </p>
          </div>

          <div>
            <h3>2.2 Comunicações de Marketing:</h3>
            <p>
              Podemos enviar comunicações de marketing relacionadas aos nossos
              produtos ou ofertas especiais. Você pode optar por não receber
              essas comunicações a qualquer momento.
            </p>
          </div>

          <div>
            <h3>2.3 Cookies:</h3>
            <p>
              Usamos cookies para melhorar a experiência do usuário,
              personalizar conteúdo e anúncios, e analisar o tráfego do site.
              Você pode gerenciar suas preferências de cookies nas configurações
              do seu navegador.
            </p>
          </div>

          <div>
            <h2 class="font-bold">3. Compartilhamento de Informações:</h2>
            <h3>3.1 Parceiros de Negócios:</h3>
            <p>
              Compartilhamos informações com parceiros de negócios, como
              processadores de pagamento e empresas de transporte, para
              facilitar a entrega de produtos e processar transações.
            </p>
          </div>

          <div>
            <h3>3.2 Cumprimento da Lei:</h3>
            <p>
              Podemos divulgar informações pessoais se exigido por lei ou quando
              acreditarmos que tal divulgação é necessária para proteger nossos
              direitos, sua segurança ou a segurança de terceiros.
            </p>
          </div>

          <div>
            <h2 class="font-bold">4. Segurança:</h2>
            <p>
              Implementamos medidas de segurança para proteger suas informações
              pessoais contra acesso não autorizado, alteração, divulgação ou
              destruição.
            </p>
          </div>

          <div>
            <h2 class="font-bold">5. Links para Sites de Terceiros:</h2>
            <p>
              Nosso site pode conter links para sites de terceiros. Não somos
              responsáveis pelas práticas de privacidade desses sites e
              recomendamos que você revise as políticas de privacidade deles.
            </p>
          </div>

          <div>
            <h2 class="font-bold">6. Menores de Idade:</h2>
            <p>
              Nosso site não se destina a menores de 18 anos, e não coletamos
              intencionalmente informações pessoais de crianças. Se soubermos
              que coletamos informações de uma criança, tomaremos as medidas
              necessárias para excluí-las.
            </p>
          </div>

          <div>
            <h2 class="font-bold">7. Alterações na Política de Privacidade:</h2>
            <p>
              Reservamo-nos o direito de modificar esta política de privacidade
              a qualquer momento. Recomendamos que você reveja periodicamente
              esta página para estar ciente das atualizações.
            </p>
          </div>

          <div>
            <h2 class="font-bold">8. Contato:</h2>
            <p>
              Se tiver dúvidas ou preocupações sobre nossa política de
              privacidade, entre em contato conosco através do e-mail{" "}
              <a href="mailto:atendimento@truesource.com.br">
                atendimento@truesource.com.br
              </a>. Ao continuar a utilizar nosso site, você concorda com os
              termos desta política de privacidade. Obrigado por confiar em nós.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
