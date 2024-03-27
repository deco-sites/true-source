import { NavigationLoader } from "deco-sites/true-source/loaders/centralNavigation.ts";
import Navigation from "deco-sites/true-source/sections/CentralAtendimento/NavigationMenu.tsx";
import { Section } from "deco/blocks/section.ts";
import { useId } from "deco-sites/true-source/sdk/useId.ts";

interface Props {
  sections: Section[];
  loader: NavigationLoader;
}

export default function NavigationPage({ sections, loader }: Props) {
  return (
    <div class="flex xl:flex-row flex-col justify-center gap-8 mx-auto px-6 lg:px-10 py-8 w-full max-w-[1440px] h-auto">
      <Navigation loader={loader} />

      <div class="flex flex-col justify-start gap-6 w-full">
        {sections.map(({ Component, props }) =>
          Component ? <Component key={useId()} {...props} /> : <></>
        )}
      </div>
    </div>
  );
}
