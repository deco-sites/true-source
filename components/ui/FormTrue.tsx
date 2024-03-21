import { useSignal } from "@preact/signals";
import { HTMLWidget } from "apps/admin/widgets.ts";
import { AppContext } from "deco-sites/true-source/apps/site.ts";
import Icon from "deco-sites/true-source/components/ui/Icon.tsx";
import useCollapsable from "deco-sites/true-source/components/ui/useCollapsable.tsx";
import { clx } from "deco-sites/true-source/sdk/clx.ts";
import useCEP from "deco-sites/true-source/sdk/useCEP.ts";
import type { JSX } from "preact";
import { useRef } from "preact/hooks";
import { debounce } from "std/async/debounce.ts";
import Loading from "deco-sites/true-source/components/ui/Loading.tsx";

interface Specialty {
  label: string;
}

interface Suplement {
  label: string;
}

interface Service {
  label: string;
}

interface Props {
  /**
   * @title Texto do topo do formulário
   */
  topText: HTMLWidget;
  specialties: Specialty[];
  supplements: Suplement[];
  services: Service[];
}

const UFs = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
  "EX",
];

const Input = {
  Container: ({ children, ...props }: JSX.IntrinsicElements["div"]) => (
    <div {...props} class={clx("relative", props.class as string)}>
      {children}
    </div>
  ),
  Input: ({ children, ...props }: JSX.IntrinsicElements["input"]) => (
    <input
      placeholder=" "
      {...props}
      class={clx(
        "peer rounded-md border border-Stroke pt-5 pb-1.5 px-4 shadow outline-0 focus:border-dark text-sm w-full",
        props.class as string,
      )}
    />
  ),
  Label: ({ children, ...props }: JSX.IntrinsicElements["label"]) => (
    <label
      class={clx(
        "font-medium absolute text-gray left-4 text-sm top-1/2 -translate-y-1/2 pointer-events-none peer-focus:text-[11px] peer-focus:top-3.5 peer-[&:not(:placeholder-shown)]:top-3.5 peer-[&:not(:placeholder-shown)]:text-[11px] transition-all",
      )}
      {...props}
    >
      {children}
    </label>
  ),
};

const TextArea = {
  Container: ({ children, ...props }: JSX.IntrinsicElements["div"]) => (
    <div {...props} class={clx("relative w-full", props.class as string)}>
      {children}
    </div>
  ),
  Input: ({ children, ...props }: JSX.IntrinsicElements["textarea"]) => (
    <textarea
      placeholder=" "
      {...props}
      class={clx(
        "peer rounded-md border border-Stroke pt-7 pb-2 px-4 shadow-md outline-0 focus:border-dark text-sm w-full min-h-[200px]",
        props.class as string,
      )}
    />
  ),
  Label: ({ children, ...props }: JSX.IntrinsicElements["label"]) => (
    <label
      class={clx(
        "font-medium absolute text-gray left-4 text-sm top-4 pointer-events-none peer-focus:text-[11px] peer-focus:top-2 peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-[11px] transition-all",
      )}
      {...props}
    >
      {children}
    </label>
  ),
};

const Radio = {
  Container: ({ children, ...props }: JSX.IntrinsicElements["label"]) => (
    <label
      {...props}
      class={clx(
        "text-sm font-medium text-dark flex items-center gap-2 cursor-pointer",
        props.class as string,
      )}
    >
      {children}
    </label>
  ),
  Input: ({ name, required }: {
    name: string;
    required?: boolean;
  }) => (
    <>
      <input
        type="radio"
        name={name}
        required={required}
        class="peer sr-only w-[250px] h-6"
      />
      <div class="size-[18px] border border-gray rounded-full flex justify-center items-center peer-checked:bg-dark group relative peer-checked:border-0">
        <span class="size-2 absolute bg-white rounded-full peer-checked:group-[]:block hidden" />
      </div>
    </>
  ),
};

const Checkbox = {
  Container: ({ children, ...props }: JSX.IntrinsicElements["label"]) => (
    <label
      {...props}
      class={clx(
        "text-sm font-medium text-dark flex items-center gap-2 cursor-pointer",
        props.class as string,
      )}
    >
      {children}
    </label>
  ),
  Input: ({ name }: { name: string }) => (
    <>
      <input
        type="checkbox"
        name={name}
        class="peer hidden"
      />
      <span class="border-2 border-gray/80 w-5 h-5 rounded-md flex justify-center items-center peer-checked:border-0 peer-checked:bg-dark group">
        <Icon
          id="Check"
          width={10}
          height={8}
          class="text-white hidden peer-checked:group-[]:block"
        />
      </span>
    </>
  ),
};

function Select({
  placeholder,
  items,
  class: class_,
  defaultValue,
}: {
  placeholder: string;
  items: string[];
  class?: string;
  defaultValue?: string;
}) {
  const { Collapsable, Content, Trigger, ContentWrapper, close } =
    useCollapsable();
  const selectedValue = useSignal(defaultValue ?? "");
  const hiddenSelect = useRef<HTMLSelectElement>(null);

  return (
    <Collapsable class={clx("relative group/select-collapsable", class_)}>
      <Trigger class="group/select">
        <div class="rounded-md border border-Stroke group-has-[+select:focus]/select:border-dark shadow outline-0 text-sm w-full h-12 flex items-center pointer-events-none">
          <label class="font-medium text-gray text-sm left-4 absolute top-1/2 -translate-y-1/2 [&:has(+:not(:empty))]:top-3.5 [&:has(+:not(:empty))]:text-[11px] transition-all">
            {placeholder}
          </label>
          <span class="font-medium text-dark text-sm pl-4 translate-y-1.5 empty:opacity-0 delay-1000 transition-opacity">
            {selectedValue}
          </span>
          <span class="ml-auto border-l border-Stroke h-full w-12 flex items-center justify-center transition-transform peer-checked:group-[]/select:rotate-180">
            <Icon
              id="ChevronDown"
              width={16}
              height={16}
            />
          </span>
        </div>
      </Trigger>

      <select
        ref={hiddenSelect}
        class="sr-only w-full peer/select"
        required
      >
        <option value="">{placeholder}</option>
        {items.map((i) => (
          <option value={i} selected={i === defaultValue}>{i}</option>
        ))}
      </select>

      <ContentWrapper class="absolute top-full left-0 z-10 bg-white w-full rounded-bl-md rounded-br-md shadow-lg text-gray text-sm border border-Stroke">
        <Content class="flex flex-col items-start max-h-[300px] overflow-y-auto overscroll-contain">
          {items.map((i) => (
            <button
              type="button"
              onClick={(e) => {
                hiddenSelect.current!.value = i;
                selectedValue.value = i;
                close();
              }}
              class={clx(
                "w-full text-start pl-4 py-2 hover:bg-ice cursor-pointer",
                selectedValue.value === i && "bg-ice",
              )}
            >
              {i}
            </button>
          ))}
        </Content>
      </ContentWrapper>
    </Collapsable>
  );
}

export default function (
  { topText, specialties, supplements, services }: Props,
) {
  const { cep, loading, data, error } = useCEP();

  const showLocation = useSignal(false);

  if (data.value) {
    showLocation.value = true;
  }

  const cepDebounced = debounce((s: number) => {
    cep.value = s;
  }, 300);

  return (
    <div class="max-w-[848px] mx-auto py-36 bg-ice">
      <div
        dangerouslySetInnerHTML={{ __html: topText }}
        class="[&_:is(h1,h2)]:font-lemon [&_:is(h1,h2)]:text-dark [&_:is(h1,h2)]:text-[40px] [&_:is(h1,h2)]:font-bold [&_:is(h1,h2)]:leading-10 text-gray font-medium leading-7 mb-16"
      />

      <div class="flex flex-col gap-2">
        <form
          class="bg-white p-6 rounded-xl"
          onSubmit={(e) => e.preventDefault()}
        >
          <div class="flex items-center gap-4">
            <span class="w-8 h-8 bg-dark flex justify-center items-center text-white font-lemon font-bold rounded-full">
              1
            </span>
            <span class="text-dark font-lemon font-bold">
              SOBRE VOCÊ
            </span>
          </div>

          <div class="grid grid-cols-2 gap-2 mt-6 w-full">
            <Input.Container class="col-span-2">
              <Input.Input type="text" name="name" required />
              <Input.Label>Seu nome completo *</Input.Label>
            </Input.Container>

            <Select
              placeholder="Especialidade *"
              items={specialties.map(({ label }) => label)}
            />

            <Input.Container>
              <Input.Input type="text" name="area" required />
              <Input.Label>Área de atuação *</Input.Label>
            </Input.Container>

            <Input.Container>
              <Input.Input
                type="text"
                name="cpf"
                required
                pattern="[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}"
                onInput={(e) => {
                  e.currentTarget.value = (e.currentTarget.value as string)
                    .replace(/\D/g, "")
                    .replace(
                      /(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})(.*)/,
                      (all, $1, $2, $3, $4) => {
                        let s = "";

                        if ($1) s += $1;
                        if ($2) s += `.${$2}`;
                        if ($3) s += `.${$3}`;
                        if ($4) s += `-${$4}`;

                        return s;
                      },
                    );
                }}
              />
              <Input.Label>CPF *</Input.Label>
            </Input.Container>

            <Input.Container>
              <Input.Input
                type="email"
                name="email"
                required
              />
              <Input.Label>E-mail *</Input.Label>
            </Input.Container>

            <Input.Container>
              <Input.Input
                type="tel"
                name="tel"
                required
                pattern="\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value
                    .replace(/\D/g, "")
                    .replace(
                      /^(\d?)(\d?)(\d{0,5})(\d{0,4})(.*)$/,
                      (all, $1, $2, $3, $4) => {
                        let s = "";

                        if ($1) s += `(${$1}${$2}`;
                        if ($3) s += `) ${$3}`;
                        if ($4) s += `-${$4}`;

                        return s;
                      },
                    );
                }}
              />
              <Input.Label>Telefone com WhatsApp *</Input.Label>
            </Input.Container>

            <Input.Container>
              <Input.Input
                type="text"
                name="instagram"
                required
              />
              <Input.Label>Instagram</Input.Label>
            </Input.Container>
          </div>

          <button
            type="submit"
            class="h-[50px] w-full bg-gradient-to-r from-[#E4003F] to-[#E9530E] rounded-md text-white font-bold font-lemon text-sm mt-6"
          >
            Avançar
          </button>
        </form>

        <form
          class="bg-white p-6 rounded-xl"
          onSubmit={(e) => e.preventDefault()}
        >
          <div class="flex items-center gap-4">
            <span class="w-8 h-8 bg-dark flex justify-center items-center text-white font-lemon font-bold rounded-full">
              2
            </span>
            <span class="text-dark font-lemon font-bold">
              SUA LOCALIZAÇÃO
            </span>
          </div>

          <div class="mt-6 w-full">
            <div class="flex items-center gap-4">
              <Input.Container class="max-w-[150px]">
                <Input.Input
                  type="text"
                  name="cep"
                  required
                  pattern="[0-9]{5}-[0-9]{3}"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /\D/,
                      "",
                    ).replace(
                      /(\d{5})(\d{0,3})(.*)/,
                      (all, $1, $2) => {
                        let s = "";

                        if ($1) s += $1;
                        if ($2) s += `-${$2}`;

                        return s;
                      },
                    );

                    error.value = null;

                    if (/^\d{5}-\d{3}$/.test(e.currentTarget.value)) {
                      cepDebounced(
                        Number(e.currentTarget.value.replace("-", "")),
                      );
                    }
                  }}
                />
                <Input.Label>CEP *</Input.Label>
              </Input.Container>
              {loading.value
                ? <Loading />
                : error.value
                ? (
                  <span class="text-red font-sm">
                    {error.value === "NOT_FOUND"
                      ? "Não encontramos esse CEP :/"
                      : "Tivemos um problema inesperado :0"}
                  </span>
                )
                : null}
            </div>

            {showLocation.value && (
              <>
                <div class="text-gray font-sm font-medium my-4">
                  Complete as informações do seu endereço
                </div>

                <div class="flex flex-wrap gap-2 w-full">
                  <Input.Container class="w-[70%]">
                    <Input.Input
                      type="text"
                      name="city"
                      required
                      defaultValue={data.value?.city}
                    />
                    <Input.Label>Cidade *</Input.Label>
                  </Input.Container>

                  <Select
                    placeholder="Estado *"
                    items={UFs}
                    class="w-[calc(30%-8px)]"
                    defaultValue={data.value?.state}
                  />

                  <Input.Container class="w-[70%]">
                    <Input.Input
                      type="text"
                      name="street"
                      required
                      defaultValue={data.value?.street}
                    />
                    <Input.Label>Rua *</Input.Label>
                  </Input.Container>

                  <Input.Container class="w-[calc(30%-8px)]">
                    <Input.Input
                      type="text"
                      name="number"
                      required
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value
                          .replace(/\D/g, "");
                      }}
                    />
                    <Input.Label>Número *</Input.Label>
                  </Input.Container>

                  <Input.Container class="w-1/2">
                    <Input.Input
                      type="text"
                      name="complement"
                      required
                    />
                    <Input.Label>Complemento</Input.Label>
                  </Input.Container>

                  <Input.Container class="w-[calc(50%-8px)]">
                    <Input.Input
                      type="text"
                      name="neighborhood"
                      required
                      defaultValue={data.value?.neighborhood}
                    />
                    <Input.Label>Bairro *</Input.Label>
                  </Input.Container>
                </div>
              </>
            )}
          </div>

          <button
            type="submit"
            class="h-[50px] w-full bg-gradient-to-r from-[#E4003F] to-[#E9530E] rounded-md text-white font-bold font-lemon text-sm mt-6"
          >
            Avançar
          </button>
        </form>
        <form
          class="bg-white p-6 rounded-xl flex flex-col gap-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div class="flex items-center gap-4">
            <span class="w-8 h-8 bg-dark flex justify-center items-center text-white font-lemon font-bold rounded-full">
              3
            </span>
            <span class="text-dark font-lemon font-bold">
              SOBRE SEU ATENDIMENTO
            </span>
          </div>

          <div class="w-full flex flex-col gap-6">
            <div>
              <span class="text-sm text-dark font-medium">
                Você já prescreve nossa marca? *
              </span>

              <div class="flex items-center gap-2 mt-4">
                <Radio.Container class="flex items-center justify-start gap-2 h-12 px-4 border border-Stroke rounded-md shadow cursor-pointer has-[:checked]:border-dark">
                  <Radio.Input required name="pescribe" />
                  Sim
                </Radio.Container>

                <Radio.Container class="flex items-center justify-start gap-2 h-12 px-4 border border-Stroke rounded-md shadow cursor-pointer has-[:checked]:border-dark">
                  <Radio.Input required name="pescribe" />
                  Não
                </Radio.Container>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-6 max-w-[350px] w-full">
              <span class="text-sm text-dark font-medium">
                Quais suplementos mais prescreve?
              </span>

              <div class="grid grid-cols-2 gap-4">
                {supplements.map(({ label }) => (
                  <Checkbox.Container>
                    <Checkbox.Input name={label} />
                    {label}
                  </Checkbox.Container>
                ))}
              </div>
            </div>
            <div class="flex flex-col gap-6">
              <span class="text-sm text-dark font-medium">
                Qual sua média de atendimentos mensal?
              </span>

              <div class="flex flex-col gap-4">
                {services.map(({ label }) => (
                  <Radio.Container>
                    <Radio.Input name="service" />
                    {label}
                  </Radio.Container>
                ))}
              </div>
            </div>
          </div>

          <TextArea.Container>
            <TextArea.Input required name="stores" />
            <TextArea.Label>
              Quais lojas de suplementos tem perto da sua localidade?
            </TextArea.Label>
          </TextArea.Container>

          <div class="flex flex-col gap-6">
            <span class="text-sm text-dark font-medium">
              Possui parceria com alguma loja?
            </span>

            <div class="flex flex-col gap-4">
              <Input.Container>
                <Input.Input name="partnerships" />
                <Input.Label>Se sim, qual(is) loja(s)?</Input.Label>
              </Input.Container>
            </div>
          </div>

          <TextArea.Container>
            <TextArea.Input required name="meet" />
            <TextArea.Label>
              Conta pra gente! Como conheceu nossa marca? *
            </TextArea.Label>
          </TextArea.Container>

          <button
            type="submit"
            class="h-[50px] w-full bg-gradient-to-r from-[#E4003F] to-[#E9530E] rounded-md text-white font-bold font-lemon text-sm mt-6"
          >
            Finalizar
          </button>
        </form>
      </div>
    </div>
  );
}

export function loader(props: Props, req: Request, ctx: AppContext) {
  return {
    ...props,
  };
}
