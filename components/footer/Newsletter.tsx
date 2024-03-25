import { useSignal } from "@preact/signals";
import { invoke } from "deco-sites/true-source/runtime.ts";
import type { JSX } from "preact";
import Icon from "deco-sites/true-source/components/ui/Icon.tsx";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  content: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: Form;
  };
}

function Newsletter(
  { content }: Props,
) {
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await invoke.vtex.actions.newsletter.subscribe({ email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div
      class={`flex flex-col items-center gap-4 md:flex-row w-full md:justify-between`}
    >
      <div class="flex flex-col md:flex-row gap-4 items-start md:items-center w-full max-w-[326px] md:max-w-full">
        {content?.title && (
          <p
            style={`line-height:normal;`}
            class="text-lg w-full max-w-[206px] font-bold font-lemon-milk"
          >
            {content?.title}
          </p>
        )}
        <form
          class="form-control w-full "
          onSubmit={handleSubmit}
        >
          <div class="relative w-full bg-white rounded-full max-w-[326px] md:max-w-[480px] border border-light-gray-200">
            <input
              name="email"
              class="pr-0 pl-[32px] flex-1 text-base-content bg-transparent outline-none border-none w-full h-12"
              placeholder={content?.form?.placeholder || "seu@email.com.br"}
            />
            <button
              type="submit"
              class="disabled:loading rounded-full uppercase px-6 py-3 bg-brand text-white text-[13px] h-12 font-lemon-milk flex items-center gap-[10px] absolute top-0 right-0"
              disabled={loading}
            >
              {content?.form?.buttonText || "assinar"}
              <Icon id="ArrowNarrowRight" size={16} class="text-white" />
            </button>
          </div>
          {
            /* <div class="flex flex-wrap gap-3 pr-0 h-[unset] w-full max-w-[151px] lg:max-w-[480px]">
            <div className=" bg-white flex items-center border border-light-gray-200 rounded-[300px] w-full">
              <input
                name="email"
                class="pr-0 pl-[32px] flex-auto text-base-content bg-transparent outline-none border-none w-full"
                placeholder={content?.form?.placeholder || "seu@email.com.br"}
              />
               <button
                type="submit"
                class="btn disabled:loading rounded-[300px] uppercase px-6 py-3 bg-brand text-white text-[13px] font-lemon-milk"
                disabled={loading}
              >
                {content?.form?.buttonText || "assinar"}
                <Icon id="ArrowNarrowRight" size={16} class="text-white" />
              </button>
            </div>
          </div> */
          }
        </form>
      </div>
    </div>
  );
}

export default Newsletter;
