import { Section } from "deco/blocks/section.ts";

/**
 * @titleBy matcher
 */
interface O {
  matcher: string;
  sections: Section[];
}

export interface ReturnSectionSEO {
  sections: O[];
}

export interface SectionSEO {
  sections: O[];
}

export default function PLPSectionsSEO(props: SectionSEO): ReturnSectionSEO {
  return props;
}
