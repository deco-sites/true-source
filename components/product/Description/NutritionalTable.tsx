interface Props {
  table?: Array<string[]>;
  ingredients?: string;
  color?: string;
}

export function NutritionalTable({
  table = [],
  ingredients,
  color = "#3C3C3B",
}: Props) {
  const tableValues = table.filter((item) => item.length > 0);
  return (
    <div style={{ background: color }}>
      <div
        class="flex flex-col lg:flex-row items-center min-h-[580px] py-24 lg:py-0 gap-8 lg:gap-0 px-8 lg:px-0"
        style={{
          background:
            `linear-gradient(72deg, rgba(210, 210, 210, 0.36) 9.7%, rgba(210, 210, 210, 0.00) 73.19%)`,
        }}
      >
        {ingredients && (
          <div class="w-full lg:w-1/2 flex items-center justify-center">
            <div class="w-full lg:w-3/4 text-white">
              <h2 class="text-2xl lg:text-4xl uppercase mb-3 font-bold font-lemon-milk">
                INGREDIENTES
              </h2>
              <p
                class="text-sm lg:text-base"
                dangerouslySetInnerHTML={{ __html: ingredients }}
              />
            </div>
          </div>
        )}
        {table && (
          <div class="w-full lg:w-1/2 flex flex-col items-center justify-center border-none lg:border-solid border-l border-[#f0f0ee33]">
            <div class="w-full lg:w-3/4 border border-[#f0f0ee33] p-6 rounded-3xl">
              <h3 class="text-lg text-white uppercase mb-2 font-bold font-lemon-milk">
                Tabela Nutricional
              </h3>
              <table class="table-auto text-white text-xs lg:text-sm w-full">
                <thead>
                  {tableValues.map((item, index) => {
                    if (index === 0) {
                      return (
                        <tr>
                          {item.map((head) => (
                            <th
                              colSpan={index === 0 ? 2 : 1}
                              class={index === 0
                                ? "text-left pt-2"
                                : "text-center pt-2"}
                            >
                              {head}
                            </th>
                          ))}
                        </tr>
                      );
                    }
                  })}
                </thead>
                <tbody>
                  {tableValues.map((item, index) => {
                    if (index > 0) {
                      return (
                        <tr class="border-b border-[#f0f0ee33]">
                          {item.map((data) => {
                            if (/^_{2,2}/.test(data)) {
                              return (
                                <>
                                  {data.split("__").map((i, index) => {
                                    if (index === 0) {
                                      return (
                                        <td width={24} class="py-2">{i}</td>
                                      );
                                    }
                                    return <td class="py-2">{i}</td>;
                                  })}
                                </>
                              );
                            }
                            return <td colSpan={2} class="py-2">{data}</td>;
                          })}
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
            <p class="w-full lg:w-3/4 text-sm mt-8 text-white">
              (*) % Valores Diários de referência com base em uma dieta de
              2.000kcal ou 8.400kJ. Seus valores diários podem ser maiores ou
              menores, dependendo das suas necessidades energéticas. (**)
              Valores diários não estabelecidos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
