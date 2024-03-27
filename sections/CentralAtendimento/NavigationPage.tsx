import { Section } from "deco/blocks/section.ts";
import { renderSection } from "apps/website/pages/Page.tsx";
import Navigation from "deco-sites/true-source/sections/CentralAtendimento/NavigationMenu.tsx";

interface Props {
  sections: Section[];
}

export default function NavigationPage({ sections }: Props) {
  return (
    <div class="flex h-auto w-full flex-col sm:flex-row justify-center gap-8 px-10 pt-8 max-w-[1440px] mx-auto">
      <Navigation />

      <div class="flex h-[1606px] w-full flex-col justify-start gap-6">
        {sections.map(renderSection)}
      </div>
    </div>
  );
}
