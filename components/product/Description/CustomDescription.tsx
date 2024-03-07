import { Section } from "deco/blocks/section.ts";

interface Props {
  sections: Section[];
}

export default function ({ sections }: Props) {
  return (
    <div>
      psakdpoaskodkasdks dpsadplaspdlapsd
      {sections.map(({ Component, props }) => <Component {...props} />)}
    </div>
  );
}
