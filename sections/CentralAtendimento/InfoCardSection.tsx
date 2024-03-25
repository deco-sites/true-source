import { Section } from "deco/blocks/section.ts";
import { renderSection } from "apps/website/pages/Page.tsx";

interface Props {
  title: string;
  sections: Section[];
}

export default function InfoCardSection({ title, sections }: Props) {
  return (
    // <div class="flex h-auto w-full flex-row sm:flex-col justify-center gap-8 px-10 pt-8">
    //     {sections.map(renderSection)}
    // </div>

    <div class="flex h-auto w-full flex-col gap-6 bg-ice p-6 rounded-xl">
      <h2 class="flex w-full text-nowrap text-[12px] font-lemon-milk justify-start sm:text-[16px] font-bold text-dark">
        {title}
      </h2>
      {/* Cards */}
      {
        /* <div class="flex flex-col sm:flex-row gap-6 justify-center items-center ">
        {sections.map(renderSection)}
      </div> */
      }
      <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
        {sections.map((section, index) => (
          <div key={index} class="w-full">
            {renderSection(section)}
          </div>
        ))}
      </div>
    </div>
  );
}
