import { Section } from "deco/blocks/section.ts";
import { renderSection } from "apps/website/pages/Page.tsx";

interface Props {
  sections: Section[];
}

export default function CardNumbered({ sections }: Props) {
  return (
    <div class="flex w-full h-full flex-col gap-2 sm:flex-row">
      {sections.map((section, index) => (
        <div key={index} class="w-full h-full">
          {renderSection(section)}
        </div>
      ))}
    </div>
  );
}
