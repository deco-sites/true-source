import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { HIGHLIGHT_BTN, HIGHLIGHT_ID, SEEALL } from "./Navbar.tsx";

interface Props {
  item: SiteNavigationElement;
}

function NavItem({ item }: Props) {
  const { url, name, children } = item;
  const image = item?.image?.[0];

  return (
    <li className="group flex items-center">
      <a
        href={url}
        class={`flex items-center ${
          item.identifier === HIGHLIGHT_BTN &&
          "bg-brand group-hover:bg-base-100 text-white px-5 rounded-[300px]"
        }`}
      >
        <span
          class={`font-bold text-[13px] uppercase py-[14px] group-hover:fontWithGradient group-hover:bg-base-100  ease-in-out duration-300
        ${item.identifier === HIGHLIGHT_ID && "fontWithGradient"} 
        ${item.identifier === HIGHLIGHT_BTN && "text-white p-[13px]"}
        `}
        >
          {name}
        </span>
      </a>
      <li class={`dot`}></li>
      {children && children.length > 0 && (
        <div
          id={`submenu`}
          className={`flex fixed hidden group-hover:block z-50 items-start justify-between gap-6 hover:px-[16px] hover:rounded-[8px]`}
          style={{ top: "42px", marginTop: "137px" }}
        >
          <div class={`flex m-auto`}>
            <div className="flex justify-between items-start">
              <ul className="flex flex-col lg:w-[377px] lg:px-9 pt-[12px] pb-[24px]">
                {children.slice(0, 8).map((node) => (
                  <li
                    className="group border-b border-solid py-4 ease-in-out duration-300 hover:bg-[#f0f0ee] hover:px-[16px] hover:rounded-[8px] "
                    key={node.url}
                  >
                    <a
                      className="flex justify-between items-center"
                      href={node.url}
                    >
                      <span
                        class={`text-sm ${
                          node.name === SEEALL && "uppercase font-bold"
                        } `}
                      >
                        {node.name}
                      </span>
                      <span className="h-[16px] text-transparent">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="arrow-narrow-right">
                            <path
                              id="Icon"
                              d="M2.66406 8H13.3307M13.3307 8L9.33073 4M13.3307 8L9.33073 12"
                              stroke="#3C3C3B"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                        </svg>
                      </span>
                    </a>
                    <ul className="flex flex-col">
                      {node.children?.map((leaf) => (
                        <li key={leaf.url}>
                          <a href={leaf.url}>
                            <span class="text-sm">{leaf.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              {children.length > 8 && (
                <ul className="flex flex-col lg:w-[377px] lg:px-9 pt-[12px] pb-[24px]">
                  {children.slice(8, 16).map((node) => (
                    <li
                      className="group border-b border-solid py-4 ease-in-out duration-300 hover:bg-[#f0f0ee] hover:px-[16px] hover:rounded-[8px]"
                      key={node.url}
                    >
                      <a
                        className="flex justify-between items-center"
                        href={node.url}
                      >
                        <span class="text-sm">{node.name}</span>
                        <span className="h-[16px] text-transparent">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="arrow-narrow-right">
                              <path
                                id="Icon"
                                d="M2.66406 8H13.3307M13.3307 8L9.33073 4M13.3307 8L9.33073 12"
                                stroke="#3C3C3B"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                          </svg>
                        </span>
                      </a>
                      <ul className="flex flex-col">
                        {node.children?.map((leaf) => (
                          <li key={leaf.url}>
                            <a href={leaf.url}>
                              <span class="text-sm">{leaf.name}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
              <ul class={`pt-[14px] px-9`}>
                {image?.url && (
                  <Image
                    className="rounded-[20px] cover mt-2"
                    src={image.url}
                    alt={image.alternateName}
                    width={526}
                    height={392}
                    loading="lazy"
                  />
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

export default NavItem;
