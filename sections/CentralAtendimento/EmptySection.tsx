import { Section } from "deco/blocks/section.ts";
import { renderSection } from "apps/website/pages/Page.tsx";

interface Props {
  sections: Section[];
}

export default function EmptySection({ sections }: Props) {
  return (
    <div class="font-inter flex flex-col gap-6 rounded-xl border border-[#D2D2D2] p-8 md:p-16">
      {sections.map((section, index) => (
        <div key={index}>
          {renderSection(section)}
        </div>
      ))}
    </div>
  );
}
