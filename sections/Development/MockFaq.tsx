import { useState } from "preact/hooks";

const faqs = [
  {
    question: "Para que serve o True Whey Protein?",
    answer: "Loren ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    question: "Aquecer o True Whey Protein perde suas propriedades?",
    answer: "Loren ipsum dolor sit amet, consectetur adipiscing elit",
  },
  {
    question: "Whey Protein substitui a refeição?",
    answer: "Loren ipsum dolor sit amet, consectetur adipiscing elit",
  },
];

export default function Triilha2FAQ() {
  const [openItem, setOpenItem] = useState("");

  const toggleItem = (question: string) => {
    if (openItem === question) {
      setOpenItem("");
    } else {
      setOpenItem(question);
    }
  };

  return (
    <div className="px-[15%]">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl">
          <dl className="flex flex-col mt-10 space-y-4 rounded-2xl">
            {faqs.map((faq) => (
              <div key={faq.question} className="">
                <dt className="flex w-full items-start justify-between text-left text-black rounded-2xl p-4 bg-gray-500">
                  <span className="text-xs md:text-base font-semibold leading-7 text-[#3C3C3B]">
                    {faq.question}
                  </span>
                  <button
                    onClick={() => toggleItem(faq.question)}
                    className="ml-6 flex h-7 items-center"
                  >
                    {openItem === faq.question ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#E4003F"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#E4003F"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    )}
                  </button>
                </dt>
                {openItem === faq.question && (
                  <dd className="mt-2 pr-12 bg-white rounded-2xl p-4">
                    <p className="text-xs md:text-base leading-7 text-gray-900">
                      {faq.answer}
                    </p>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
