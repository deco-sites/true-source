import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import ExtraLinks from "$store/components/footer/ExtraLinks.tsx";

export type Item = {
  label?: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
  extraLinks?: Item[];
};

export default function FooterItems(
  { sections, extraLinks }: {
    sections: Section[];
    extraLinks?: Item[];
  },
) {
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          <ul
            className={`hidden md:flex flex-row gap-6 lg:gap-10 lg:justify-between w-full lg:px-[72px] pb-[48px]`}
          >
            {sections.map((section, index) => (
              <li key={index}>
                <div className="flex flex-col">
                  <span className="font-bold text-[13px] pb-[32px]">
                    {section.label}
                  </span>
                  <div className="flex gap-[32px]">
                    {/* Renderizando primeira coluna */}
                    <ul className={`flex flex-col gap-5 text-sm`}>
                      {section.items.slice(0, 7).map((item, idx) => (
                        <li key={idx}>
                          <a href={item.href} className="block">
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                    {/* Renderizando segunda coluna */}
                    <ul className={`flex flex-col gap-5 text-sm`}>
                      {section.items.slice(7).map((item, idx) => (
                        <li key={idx}>
                          <a href={item.href} className="block">
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
            {/* <ExtraLinks content={extraLinks} /> */}
          </ul>

          {/* Mobile view */}
          <ul className="flex flex-col md:hidden gap-4">
            {sections.map((section, index) => (
              <li key={index}>
                <div className="collapse collapse-arrow ">
                  <input type="checkbox" className="min-h-[0]" />
                  <label
                    htmlFor={section.label}
                    className="collapse-title min-h-[0] !p-0 flex gap-2"
                  >
                    <span>{section.label}</span>
                  </label>
                  <div className="collapse-content">
                    <ul className={`flex flex-col gap-1 pl-5 pt-2`}>
                      {section.items?.map((item, idx) => (
                        <li key={idx}>
                          <a
                            href={item.href}
                            className="block py-1 link link-hover"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
