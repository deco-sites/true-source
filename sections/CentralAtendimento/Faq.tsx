export interface Question {
  question: string;
  /** @format html */
  answer: string;
}

export interface Props {
  questions?: Question[];
  layout?: {
    variation?: "Compact" | "Full" | "Side to side";
    headerAlignment?: "center" | "left";
  };
}

const DEFAULT_PROPS = {
  questions: [
    {
      question: "Como faço para acompanhar o meu pedido?",
      answer:
        "Acompanhar o seu pedido é fácil! Assim que o seu pedido for enviado, enviaremos um e-mail de confirmação com um número de rastreamento. Basta clicar no número de rastreamento ou visitar o nosso site e inserir o número de rastreamento na seção designada para obter atualizações em tempo real sobre a localização e o status de entrega do seu pedido.",
    },
    {
      question: "Qual é a política de devolução?",
      answer:
        "Oferecemos uma política de devolução sem complicações. Se você não estiver completamente satisfeito(a) com a sua compra, pode devolver o item em até 30 dias após a entrega para obter um reembolso total ou troca. Certifique-se de que o item esteja sem uso, na embalagem original e acompanhado do recibo. Entre em contato com a nossa equipe de atendimento ao cliente e eles o(a) orientarão pelo processo de devolução.",
    },
  ],
};

function Question({ question, answer }: Question) {
  return (
    <details class="collapse collapse-arrow join-item ">
      <summary class="collapse-title text-[14px] font-bold font-inter leading-[120%] tracking-normal ">
        {question}
      </summary>
      <div
        class="collapse-content font-inter font-normal text-dark leading-[180%] tracking-normal "
        dangerouslySetInnerHTML={{ __html: answer }}
      />
    </details>
  );
}

export default function FAQ(props: Props) {
  const {
    questions = [],
    layout,
  } = { ...DEFAULT_PROPS, ...props };

  return (
    <>
      <div class="flex flex-row gap-2">
        <button
          type="button"
          class="rounded-full bg-[#3C3C3B] p-3 text-[14px] font-bold text-white shadow-sm hover:bg-[#2A2A2A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Todas as perguntas
        </button>
        <button
          type="button"
          class="rounded-full bg-white p-3 text-[14px] font-bold text-dark border-2 border-light-gray-200 shadow-sm  hover:bg-gray-50"
        >
          Produtos True Source
        </button>
        <button
          type="button"
          class="rounded-full bg-white p-3 text-[14px] font-bold text-dark border-2 border-light-gray-200 shadow-sm  hover:bg-gray-50"
        >
          Entrega
        </button>
        <button
          type="button"
          class="rounded-full bg-white p-3 text-[14px] font-bold text-dark border-2 border-light-gray-200 shadow-sm  hover:bg-gray-50"
        >
          Devolução
        </button>
      </div>
      {layout?.variation === "Full" && (
        <div class="w-full container px-4 py-8 flex flex-col gap-4 lg:gap-8 lg:py-10 lg:px-0">
          <div class="flex flex-col gap-8 lg:gap-10">
            <div class="join join-vertical w-full gap-4">
              {questions.map((question) => (
                <div class="flex p-8 bg-ice rounded-xl gap-8">
                  <Question {...question} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
