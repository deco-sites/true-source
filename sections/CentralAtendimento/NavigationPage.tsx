import { Section } from "deco/blocks/section.ts";
import { renderSection } from "apps/website/pages/Page.tsx";
import Navigation from "deco-sites/true-source/sections/CentralAtendimento/NavigationMenu.tsx";
import { NavigationLoader } from "deco-sites/true-source/loaders/centralNavigation.ts";

interface Props {
  sections: Section[];
  loader: NavigationLoader;
}

export default function NavigationPage({ sections, loader }: Props) {
  return (
    <div class="flex h-auto w-full flex-col lg:flex-row justify-center gap-8 px-10 py-8 max-w-[1440px] mx-auto">
      <Navigation loader={loader} />

      <div class="flex w-full flex-col justify-start gap-6">
        {sections.map(renderSection)}
      </div>
    </div>
  );
}
