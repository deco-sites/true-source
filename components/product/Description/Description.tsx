import { Section } from "deco/blocks/section.ts";
import { renderSection } from "apps/website/pages/Page.tsx";

interface Props {
  sections: Section[];
}

export default function ({ sections }: Props) {
  return (
    <div>
      {sections.map(renderSection)}
    </div>
  );
}
