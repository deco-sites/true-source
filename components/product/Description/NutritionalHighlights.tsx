export interface NutritionalHighlightsType {
  items?: Array<{
    name: string;
    value: string;
  }>;
  color?: string;
  youtubeURL?: string;
}

export function NutritionalHighlights(
  { items = [], youtubeURL = "", color = "#3C3C3B" }: NutritionalHighlightsType,
) {
  return (
    <div class="container flex flex-col lg:flex-row items-center justify-center">
      {items.length > 0 && (
        <div
          class={`${
            !youtubeURL ? "w-full" : "w-full lg:w-1/2"
          } flex justify-center`}
        >
          <div
            class={`${
              !youtubeURL ? "w-full gap-8" : "w-80 gap-y-8"
            } flex flex-wrap items-center justify-center`}
          >
            {items.map((highlight) => (
              <div
                class={`flex gap-y-2 flex-col items-center justify-center text-center text-sm lg:text-base ${
                  !youtubeURL ? "w-auto" : "w-1/2"
                }`}
              >
                <div
                  class="w-24 h-24 flex items-center justify-center p-2 font-bold text-base text-dark border font-lemon-milk uppercase rounded-full"
                  style={{ borderColor: color }}
                >
                  {highlight.value}
                </div>
                {highlight.name}
              </div>
            ))}
          </div>
        </div>
      )}
      {youtubeURL && (
        <div class="w-full lg:w-1/2">
          <iframe
            class="w-full h-96 rounded-3xl overflow-hidden shadow-[5px_5px_20px_rgba(0,0,0,0.3)]"
            src={youtubeURL}
            frameBorder="0"
            allowFullScreen={true}
            allowTransparency={true}
          />
        </div>
      )}
    </div>
  );
}
