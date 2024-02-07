import ProductInfo from "./ProductInfo.tsx";
import GallerySlider from "./Gallery/ImageSlider.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { Benefits, Dna, Flaccidity, Muscle } from "../ui/CustomIcons.tsx";
import { asset } from "$fresh/runtime.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductMain(props: Props) {
  return (
    <div>
      <div class="container flex flex-col lg:flex-row lg:gap-8 py-12">
        <GallerySlider page={props.page} />
        <ProductInfo page={props.page} />
      </div>
      {/* Description */}
      <div class="flex flex-col">
        <div class="container py-12">
          <h2 class="uppercase text-center text-lg text-gold font-bold mb-3">
            Principais benefícios
          </h2>
          <div class="flex gap-3">
            <div class="flex items-center gap-3 bg-ice px-4 py-3 rounded-lg">
              <Benefits />
              <span>
                Melhora a <strong>saúde intestinal</strong>
              </span>
            </div>
            <div class="flex items-center gap-3 bg-ice px-4 py-3 rounded-lg">
              <Muscle />
              <span>
                Recuperação e manutenção da <strong>massa muscular</strong>
              </span>
            </div>
            <div class="flex items-center gap-3 bg-ice px-4 py-3 rounded-lg">
              <Flaccidity />
              <span>
                Diminuição da <strong>flacidez</strong>
              </span>
            </div>
            <div class="flex items-center gap-3 bg-ice px-4 py-3 rounded-lg">
              <Dna />
              <span>
                Aumento do <strong>aporte proteico</strong>
              </span>
            </div>
          </div>
        </div>
        <div class="container flex items-center py-12">
          <div class="w-1/2 flex justify-center">
            <div class="w-80 grid grid-cols-2 items-center gap-8">
              <div class="flex flex-col items-center justify-center gap-y-2 text-center">
                <div class="w-24 h-24 flex items-center justify-center uppercase font-bold text-base text-dark border border-black rounded-full">
                  92 Kcal
                </div>
                Calorias
              </div>
              <div class="flex flex-col items-center justify-center gap-y-2 text-center">
                <div class="w-24 h-24 flex items-center justify-center uppercase font-bold text-base text-dark border border-black rounded-full">
                  2,6g
                </div>
                Fibra Alimentar
              </div>
              <div class="flex flex-col items-center justify-center gap-y-2 text-center">
                <div class="w-24 h-24 flex items-center justify-center uppercase font-bold text-base text-dark border border-black rounded-full">
                  2,5g
                </div>
                Colágeno Verisol®
              </div>
              <div class="flex flex-col items-center justify-center gap-y-2 text-center">
                <div class="w-24 h-24 flex items-center justify-center uppercase font-bold text-base text-dark border border-black rounded-full">
                  114mg
                </div>
                Sódio
              </div>
            </div>
          </div>
          <div class="w-1/2 mt-12">
            <iframe
              class="w-full h-96 rounded-3xl overflow-hidden shadow-[5px_5px_20px_rgba(0,0,0,0.3)]"
              src="https://www.youtube.com//embed/A3ZfPWDMMDI"
              frameBorder="0"
              allowFullScreen={true}
              allowTransparency={true}
            />
          </div>
        </div>
        <div class="flex items-stretch bg-ice rounded-t-3xl shadow-[0_0_20px_rgba(0,0,0,0.3)] overflow-hidden mt-12">
          <img class="w-1/2" src={asset("/image/infocard-1.jpg")} />
          <div class="w-1/2 flex items-center justify-center">
            <div class="w-3/4">
              <h2 class="text-gold text-4xl uppercase mb-3 font-bold">
                TRUE COLLAGEN PROTEIN
              </h2>
              <p>
                Se tem um macronutriente vital para nós seres humanos, é a
                proteína. Precisamos dela desde a formação e desenvolvimento do
                bebê, até os últimos momentos de vida. Porém, a grande maioria
                das pessoas negligenciam o consumo desse nutriente tão essencial
                à sobrevivência.
              </p>
            </div>
          </div>
        </div>
        <div class="bg-ice h-[712px] flex items-center justify-center relative z-1">
          <p class="text-white w-[585px] text-center">
            Nós da True Source queremos que você consuma o ideal de proteína,
            sem ter nenhum efeito indesejável, para que você se mantenha mais
            saudável E longevo.
          </p>
        </div>
        <div class="grid grid-cols-2 mb-12">
          <img src={asset("/image/infocard-3.jpg")} />
          <img src={asset("/image/infocard-4.jpg")} />
        </div>
        <div class="container flex items-center gap-x-24 mx-auto py-12">
          <div class="bg-ice shadow-[0_0_20px_rgba(0,0,0,0.3)] rounded-3xl w-[554px] h-[471px] flex-none" />
          <div class="">
            Trazemos agora para o mercado, mais uma excelente fonte proteica: o
            True Collagen Protein. Uma fonte de proteína hipoalergênica, limpa e
            de fácil digestão. Em nosso produto trazemos o colágeno hidrolisado
            junto com o peptídeo Verisol®, que tem uma tecnologia alemã na qual
            comprova cientificamente sua eficácia nas camadas mais profundas da
            derme.
          </div>
        </div>
        <div class="container flex items-center gap-x-24 mx-auto py-12">
          <div class="">
            Nosso colágeno tem como finalidade sua saúde, pois nós sabemos que
            para sentir-se bem é necessário estar saudável. O Collagen Protein é
            limpo, puro e natural como todos os produtos da True Source.
          </div>
          <div class="bg-ice shadow-[0_0_20px_rgba(0,0,0,0.3)] rounded-3xl w-[554px] h-[471px] flex-none" />
        </div>
        <div class="flex items-stretch bg-ice mt-12">
          <img class="w-1/2" src={asset("/image/infocard-7.jpg")} />
          <div class="w-1/2 flex items-center justify-center">
            <div class="w-3/4">
              <h2 class="text-gold text-4xl uppercase mb-3 font-bold">
                Como Usar
              </h2>
              <p>
                Adultos ≥ 19 anos: Diluir 1 scoop (26g) em 200 ml de água gelada.
              </p>
            </div>
          </div>
        </div>
        <div class="flex items-stretch bg-belga rounded-b-3xl min-h-[580px]">
          <div class="w-1/2 flex items-center justify-center">
            <div class="w-3/4 text-white">
              <h2 class="text-4xl uppercase mb-3 font-bold">
                INGREDIENTES
              </h2>
              <p>
                Colágeno hidrolisado, peptídeos bioativos de colágeno hidrolisado com peso molecular médio de 2kDa (Verisol®), goma acácia, cacau alcalino lecitinado em pó, edulcorantes naturais stévia e taumatina.
              </p>
            </div>
          </div>
          <div class="w-1/2 flex items-center justify-center">
            <div class="w-3/4 border border-white p-4 rounded-3xl">
              <h3 class="text-lg text-white uppercase mb-2 font-bold">Tabela Nutricional</h3>
              <table class="table-auto text-white">
                <thead>
                  <tr>
                    <th colSpan={2} class="text-left">Quantidade por porção: 26mg (01 Scoop)</th>
                    <th>%VD*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Valor Energético</td>
                    <td>92kcal = 386kj</td>
                    <td>7%</td>
                  </tr>
                  <tr>
                    <td>Carboidrados</td>
                    <td>1g</td>
                    <td>0%</td>
                  </tr>
                  <tr>
                    <td>Proteínas, das quais:</td>
                    <td>2,5g</td>
                    <td>**</td>
                  </tr>
                  <tr>
                    <td>Colágeno Verisol</td>
                    <td>2,5g</td>
                    <td>**</td>
                  </tr>
                  <tr>
                    <td>Fibra Alimentar</td>
                    <td>2,6g</td>
                    <td>10%</td>
                  </tr>
                  <tr>
                    <td>Sódio</td>
                    <td>114g</td>
                    <td>5%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
