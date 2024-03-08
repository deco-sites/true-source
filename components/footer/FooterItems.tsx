import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import ExtraLinks from "$store/components/footer/ExtraLinks.tsx";

export type Item = {
  label?: string;
  href: string;
};

export type Section = {
  label?: string;
  items: Item[];
};

export default function FooterItems(
  { sections }: {
    sections: Section[];
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
              <li
                key={index}
                className={index === 3
                  ? "font-bold font-lemon-milk text-[13px]"
                  : ""}
              >
                <div className="flex flex-col">
                  {section.label && (
                    <span className="font-bold text-[13px] pb-[32px] font-lemon-milk">
                      {section.label}
                    </span>
                  )}
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
                    {/* Renderizando segunda coluna se houver mais de 7 itens */}
                    {section.items.length > 7 && (
                      <ul className={`flex flex-col gap-5 text-sm`}>
                        {section.items.slice(7).map((item, idx) => (
                          <li key={idx}>
                            <a href={item.href} className="block">
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile view */}
          <ul className="flex flex-col md:hidden gap-4">
            <li>
              <div className="flex flex-col py-[40px]">
                <span className="font-bold text-[13px] pb-[32px] font-lemon-milk">
                  {sections[0].label}
                </span>
                <div className="flex gap-[32px]">
                  {/* Renderizando primeira coluna */}
                  <ul className={`flex flex-col gap-5 text-sm`}>
                    {sections[0].items.slice(
                      0,
                      Math.ceil(sections[0].items.length / 2),
                    ).map((item, idx) => (
                      <li key={idx}>
                        <a href={item.href} className="block">
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  {/* Renderizando segunda coluna */}
                  <ul className={`flex flex-col gap-5 text-sm`}>
                    {sections[0].items.slice(
                      Math.ceil(sections[0].items.length / 2),
                    ).map((item, idx) => (
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
            <div className="collapse collapse-arrow border-b border-light-gray rounded-none">
              <input type="checkbox" />
              <div className="collapse-title px-0 font-bold font-lemon-milk text-[13px]">
                {sections[1].label}
              </div>
              <div className="collapse-content px-0">
                <ul>
                  {sections[1].items.map((item, idx) => (
                    <li class={`flex gap-5`} key={idx}>
                      <a href={item.href} class={`flex mb-5 text-sm`}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="collapse collapse-arrow border-b border-light-gray rounded-none">
              <input type="checkbox" />
              <div className="collapse-title px-0 font-bold font-lemon-milk text-[13px]">
                {sections[2].label}
              </div>
              <div className="collapse-content px-0">
                <ul>
                  {sections[2].items.map((item, idx) => (
                    <li key={idx}>
                      <a href={item.href} class={`flex mb-5 text-sm`}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <li>
              <div className="flex flex-col pt-[40px] pb-[32px]">
                <div className="flex gap-[32px]">
                  <ul className={`flex flex-col gap-5`}>
                    {sections[3].items.map((item, idx) => (
                      <li key={idx}>
                        <a
                          href={item.href}
                          className="block text-sm font-bold font-lemon-milk"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </>
      )}
    </>
  );
}
