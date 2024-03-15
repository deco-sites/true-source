import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { JSX } from "preact";

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
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter(
  { content, layout = {} }: Props,
) {
  const { tiled = false } = layout;
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
      class={`flex ${tiled
        ? "flex-col gap-4 lg:flex-row lg:w-full lg:justify-between"
        : "flex-col gap-4"
        }`}
    >
      <div class="flex flex-col lg:flex-row gap-4 lg:items-center bg-black">
        <div class="flex flex-col gap-4">
          {content?.title && (
            <p
              style={`line-height:normal;`}
              class={tiled
                ? "text-lg max-w-[206px] font-bold font-lemon-milk"
                : "text-lg"}
            >
              {content?.title}
            </p>
          )}
          {content?.description && <div>{content?.description}</div>}
        </div>
        <form
          class="form-control"
          onSubmit={handleSubmit}
        >
          <div class="flex flex-wrap gap-3 pr-0 h-[unset] ">
            <div className="pr-0 pl-[32px] bg-white flex items-center border border-light-gray-200 rounded-[300px]">
              <input
                name="email"
                class="flex-auto md:flex-none text-base-content bg-transparent outline-none border-none w-[151px] lg:w-[305px]"
                placeholder={content?.form?.placeholder || "seu@email.com.br"}
              />
              <button
                type="submit"
                class="btn disabled:loading rounded-[300px] uppercase px-6 py-3 bg-brand text-white text-[13px] font-lemon-milk"
                disabled={loading}
              >
                {content?.form?.buttonText || "assinar"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M2.66406 8H13.3307M13.3307 8L9.33073 4M13.3307 8L9.33073 12"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Newsletter;
