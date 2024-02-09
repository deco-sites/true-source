import ProductInfo from "./ProductInfo.tsx";
import GallerySlider from "./Gallery/ImageSlider.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import {
  Benefits,
  Dna,
  Flaccidity,
  IconCheck,
  IconNotCheck,
  Muscle,
} from "../ui/CustomIcons.tsx";
import { asset } from "$fresh/runtime.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductMain(props: Props) {
  const id = useId();
  return (
    <div>
      <div class="container flex flex-col lg:flex-row lg:gap-8 py-12">
        <GallerySlider page={props.page} />
        <ProductInfo page={props.page} />
      </div>
      {/* Description */}
      <div class="flex flex-col">
        <div class="container py-12">
          <div id={id} class="flex flex-wrap">
            <h2 class="w-full uppercase text-center text-base lg:text-lg text-gold font-bold mb-10">
              Principais benefícios
            </h2>
            <Slider class="carousel carousel-center gap-4 items-center">
              <Slider.Item index={0}>
                <div class="flex items-center gap-6 bg-ice px-4 py-3 rounded-lg text-sm lg:text-base w-[350px]">
                  <div class="w-[80px]">
                    <Benefits />
                  </div>
                  <span>
                    Melhora a <strong>saúde intestinal</strong>
                  </span>
                </div>
              </Slider.Item>
              <Slider.Item index={1}>
                <div class="flex items-center gap-6 bg-ice px-4 py-3 rounded-lg text-sm lg:text-base w-[350px]">
                  <div class="w-[80px]">
                    <Muscle />
                  </div>
                  <span>
                    Recuperação e manutenção da <strong>massa muscular</strong>
                  </span>
                </div>
              </Slider.Item>
              <Slider.Item index={2}>
                <div class="flex items-center gap-6 bg-ice px-4 py-3 rounded-lg text-sm lg:text-base w-[350px]">
                  <div class="w-[80px]">
                    <Flaccidity />
                  </div>
                  <span>
                    Diminuição da <strong>flacidez</strong>
                  </span>
                </div>
              </Slider.Item>
              <Slider.Item index={3}>
                <div class="flex items-center gap-6 bg-ice px-4 py-3 rounded-lg text-sm lg:text-base w-[350px]">
                  <div class="w-[80px]">
                    <Dna />
                  </div>
                  <span>
                    Aumento do <strong>aporte proteico</strong>
                  </span>
                </div>
              </Slider.Item>
            </Slider>
            {
              /* <ul class="w-full flex gap-3 justify-center mt-10">
              <Slider.Dot index={0}>
                <div class="w-2 h-2 rounded bg-dark group-disabled:bg-light-gray" />
              </Slider.Dot>
              <Slider.Dot index={1}>
                <div class="w-2 h-2 rounded bg-dark group-disabled:bg-light-gray" />
              </Slider.Dot>
              <Slider.Dot index={2}>
                <div class="w-2 h-2 rounded bg-dark group-disabled:bg-light-gray" />
              </Slider.Dot>
              <Slider.Dot index={3}>
                <div class="w-2 h-2 rounded bg-dark group-disabled:bg-light-gray" />
              </Slider.Dot>
            </ul> */
            }
            <SliderJS rootId={id} />
          </div>
        </div>
        <div class="container flex flex-col lg:flex-row items-center py-12">
          <div class="w-full lg:w-1/2 flex justify-center">
            <div class="w-80 grid grid-cols-2 items-center gap-8">
              <div class="flex flex-col items-center justify-center gap-y-2 text-center text-sm lg:text-base">
                <div class="w-24 h-24 flex items-center justify-center uppercase font-bold text-base text-dark border border-black rounded-full">
                  92 Kcal
                </div>
                Calorias
              </div>
              <div class="flex flex-col items-center justify-center gap-y-2 text-center text-sm lg:text-base">
                <div class="w-24 h-24 flex items-center justify-center uppercase font-bold text-base text-dark border border-black rounded-full">
                  2,6g
                </div>
                Fibra Alimentar
              </div>
              <div class="flex flex-col items-center justify-center gap-y-2 text-center text-sm lg:text-base">
                <div class="w-24 h-24 flex items-center justify-center uppercase font-bold text-base text-dark border border-black rounded-full">
                  2,5g
                </div>
                Colágeno Verisol®
              </div>
              <div class="flex flex-col items-center justify-center gap-y-2 text-center text-sm lg:text-base">
                <div class="w-24 h-24 flex items-center justify-center uppercase font-bold text-base text-dark border border-black rounded-full">
                  114mg
                </div>
                Sódio
              </div>
            </div>
          </div>
          <div class="w-full lg:w-1/2 mt-12">
            <iframe
              class="w-full h-96 rounded-3xl overflow-hidden shadow-[5px_5px_20px_rgba(0,0,0,0.3)]"
              src="https://www.youtube.com//embed/A3ZfPWDMMDI"
              frameBorder="0"
              allowFullScreen={true}
              allowTransparency={true}
            />
          </div>
        </div>
        <div class="flex flex-col lg:flex-row items-stretch bg-ice rounded-t-3xl shadow-[0_0_20px_rgba(0,0,0,0.3)] overflow-hidden mt-12">
          <img class="w-full lg:w-1/2" src={asset("/image/infocard-1.jpg")} />
          <div class="w-full lg:w-1/2 flex items-center justify-center">
            <div class="w-full lg:w-3/4 p-8 lg:p-0">
              <h2 class="text-gold text-2xl lg:text-4xl uppercase mb-3 font-bold">
                TRUE COLLAGEN PROTEIN
              </h2>
              <p class="text-sm lg:text-base">
                Se tem um macronutriente vital para nós seres humanos, é a
                proteína. Precisamos dela desde a formação e desenvolvimento do
                bebê, até os últimos momentos de vida. Porém, a grande maioria
                das pessoas negligenciam o consumo desse nutriente tão essencial
                à sobrevivência.
              </p>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center relative z-1">
          <img
            src={asset("/image/infocard-2.jpg")}
            class="object-cover object-center w-full h-[712px]"
          />
          <p class="text-2xl uppercase absolute top-1/2 translate-y-[-50%] text-white w-full lg:w-[585px] text-center px-10 sm:px-0 font-bold">
            Nós da True Source queremos que você consuma o ideal de proteína,
            sem ter nenhum efeito indesejável, para que você se mantenha mais
            saudável E longevo.
          </p>
        </div>
        <div class="grid grid-cols-2 mb-12">
          <img class="w-full h-auto" src={asset("/image/infocard-3.jpg")} />
          <img class="w-full h-auto" src={asset("/image/infocard-4.jpg")} />
        </div>
        <div class="container flex flex-col lg:flex-row items-center gap-8 sm:gap-24 mx-auto py-6 sm:py-12">
          <div class="overflow-hidden w-full lg:w-2/5 shadow-[0_0_20px_rgba(0,0,0,0.3)] rounded-3xl flex-none">
            <img src={asset("/image/infocard-3.jpg")} />
          </div>
          <div class="text-sm lg:text-base">
            Trazemos agora para o mercado, mais uma excelente fonte proteica: o
            True Collagen Protein. Uma fonte de proteína hipoalergênica, limpa e
            de fácil digestão. Em nosso produto trazemos o colágeno hidrolisado
            junto com o peptídeo Verisol®, que tem uma tecnologia alemã na qual
            comprova cientificamente sua eficácia nas camadas mais profundas da
            derme.
          </div>
        </div>
        <div class="container flex flex-col lg:flex-row items-center gap-8 sm:gap-24 mx-auto py-6 sm:py-12">
          <div class="text-sm lg:text-base">
            Nosso colágeno tem como finalidade sua saúde, pois nós sabemos que
            para sentir-se bem é necessário estar saudável. O Collagen Protein é
            limpo, puro e natural como todos os produtos da True Source.
          </div>
          <div class="overflow-hidden w-full lg:w-2/5 shadow-[0_0_20px_rgba(0,0,0,0.3)] rounded-3xl flex-none">
            <img src={asset("/image/infocard-4.jpg")} />
          </div>
        </div>
        <div class="container flex flex-col gap-8 lg:gap-0 lg:grid grid-cols-7 mt-12">
          <div class="order-1 lg:order-1 col-span-2">
            <h3 class="text-base lg:text-lg text-gold font-bold uppercase mb-4">
              Possui
            </h3>
            <ul>
              <li class="text-sm lg:text-base flex items-center gap-4 py-4 border-b border-light-gray-200">
                <IconCheck />
                2,5g Colágeno Verisol®
              </li>
              <li class="text-sm lg:text-base flex items-center gap-4 py-4 border-b border-light-gray-200">
                <IconCheck />
                22g de Proteína
              </li>
            </ul>
          </div>
          <div class="order-3 lg:order-2 flex justify-center items-baseline col-span-3 px-10 lg:px-0 pt-4 lg:pt-0">
            <img src={asset("/image/whey.png")} />
          </div>
          <div class="order-2 lg:order-3 col-span-2">
            <h3 class="text-base lg:text-lg lg:text-right text-dark font-bold uppercase mb-4">
              Não possui
            </h3>
            <ul>
              <li class="text-sm lg:text-base flex flex-row-reverse lg:flex-row justify-end items-center gap-4 py-4 border-b border-light-gray-200">
                Glúten
                <IconNotCheck />
              </li>
              <li class="text-sm lg:text-base flex flex-row-reverse lg:flex-row justify-end items-center gap-4 py-4 border-b border-light-gray-200">
                Corantes artificiais
                <IconNotCheck />
              </li>
            </ul>
          </div>
        </div>
        <div class="flex flex-col-reverse lg:flex-row items-stretch bg-ice">
          <img class="w-full lg:w-1/2" src={asset("/image/infocard-7.jpg")} />
          <div class="w-full lg:w-1/2 flex items-center justify-center">
            <div class="w-full lg:w-3/4 py-16 lg:py-0 px-8 lg:px-0">
              <h2 class="text-dark lg:text-gold text-2xl lg:text-4xl uppercase mb-3 font-bold">
                Como Usar
              </h2>
              <p>
                Adultos ≥ 19 anos: Diluir 1 scoop (26g) em 200 ml de água
                gelada.
              </p>
            </div>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row items-center bg-belga rounded-b-3xl min-h-[580px] py-24 lg:py-0 gap-8 lg:gap-0 px-8 lg:px-0">
          <div class="w-full lg:w-1/2 flex items-center justify-center">
            <div class="w-full lg:w-3/4 text-white">
              <h2 class="text-2xl lg:text-4xl uppercase mb-3 font-bold">
                INGREDIENTES
              </h2>
              <p class="text-sm lg:text-base">
                Colágeno hidrolisado, peptídeos bioativos de colágeno
                hidrolisado com peso molecular médio de 2kDa (Verisol®), goma
                acácia, cacau alcalino lecitinado em pó, edulcorantes naturais
                stévia e taumatina.
              </p>
            </div>
          </div>
          <div class="w-full lg:w-1/2 flex flex-col items-center justify-center border-none lg:border-solid border-l border-[#f0f0ee33]">
            <div class="w-full lg:w-3/4 border border-[#f0f0ee33] p-6 rounded-3xl">
              <h3 class="text-lg text-white uppercase mb-2 font-bold">
                Tabela Nutricional
              </h3>
              <table class="table-auto text-white text-xs lg:text-sm">
                <thead>
                  <tr>
                    <th colSpan={2} class="text-left">
                      Quantidade por porção: 26mg (01 Scoop)
                    </th>
                    <th>%VD*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-[#f0f0ee33]">
                    <td class="py-2">Valor Energético</td>
                    <td class="py-2">92kcal = 386kj</td>
                    <td class="py-2">7%</td>
                  </tr>
                  <tr class="border-b border-[#f0f0ee33]">
                    <td class="py-2">Carboidrados</td>
                    <td class="py-2">1g</td>
                    <td class="py-2">0%</td>
                  </tr>
                  <tr class="border-b border-[#f0f0ee33]">
                    <td class="py-2">Proteínas, das quais:</td>
                    <td class="py-2">2,5g</td>
                    <td class="py-2">**</td>
                  </tr>
                  <tr class="border-b border-[#f0f0ee33]">
                    <td class="py-2">Colágeno Verisol</td>
                    <td class="py-2">2,5g</td>
                    <td class="py-2">**</td>
                  </tr>
                  <tr class="border-b border-[#f0f0ee33]">
                    <td class="py-2">Fibra Alimentar</td>
                    <td class="py-2">2,6g</td>
                    <td class="py-2">10%</td>
                  </tr>
                  <tr class="border-b border-[#f0f0ee33]">
                    <td class="py-2">Sódio</td>
                    <td class="py-2">114g</td>
                    <td class="py-2">5%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="w-full lg:w-3/4 text-xs mt-8 text-white">
              (*) % Valores Diários de referência com base em uma dieta de
              2.000kcal ou 8.400kJ. Seus valores diários podem ser maiores ou
              menores, dependendo das suas necessidades energéticas. (**)
              Valores diários não estabelecidos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
