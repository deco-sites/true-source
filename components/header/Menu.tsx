import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.tsx";
import Social from "$store/components/footer/Social.tsx";

export const HIGHLIGHT_ID = "destaque";
export const HIGHLIGHT_BTN = "TODOS OS PRODUTOS";

export interface Props {
  items: SiteNavigationElement[];
}

export interface MenuInstitucionalProps {
  /** @title Menu Institucional */
  menuInstitucional: SiteNavigationElement[];
}

const redesSociais = [
  {
    nome: "Instagram",
    link: "https://www.instagram.com/seu_perfil",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M14.661 5.338H14.669M6.239 1.729H14.26C16.475 1.729 18.27 3.525 18.27 5.74V13.76C18.27 15.975 16.475 17.771 14.26 17.771H6.239C4.024 17.771 2.229 15.975 2.229 13.76V5.74C2.229 3.525 4.024 1.729 6.239 1.729ZM13.458 9.245C13.557 9.912 13.443 10.594 13.132 11.193C12.821 11.792 12.329 12.278 11.727 12.581C11.124 12.884 10.441 12.99 9.774 12.883C9.108 12.776 8.493 12.461 8.015 11.984C7.538 11.507 7.224 10.891 7.116 10.225C7.009 9.559 7.115 8.876 7.418 8.273C7.722 7.67 8.207 7.178 8.806 6.867C9.405 6.557 10.087 6.443 10.755 6.542C11.436 6.643 12.066 6.96 12.553 7.447C13.039 7.934 13.357 8.564 13.458 9.245Z"
          stroke="url(#paint0_linear)"
          strokeWidth="1.604"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="18.27"
            y1="9.75"
            x2="2.229"
            y2="9.75"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E9530E" />
            <stop offset="1" stopColor="#E4003F" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    nome: "YouTube",
    link: "https://www.youtube.com/seu_canal",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <g clip-path="url(#clip0_2900_43143)">
          <path
            d="M17.8925 4.26328C18.1657 4.54495 18.3598 4.89372 18.4551 5.27438C18.7095 6.68501 18.833 8.11613 18.824 9.54949C18.8291 10.9614 18.7056 12.3709 18.4551 13.7604C18.3598 14.1411 18.1657 14.4899 17.8925 14.7715C17.6193 15.0532 17.2766 15.2578 16.899 15.3646C15.5194 15.7336 10.0011 15.7336 10.0011 15.7336C10.0011 15.7336 4.48278 15.7336 3.10319 15.3646C2.73329 15.2634 2.39574 15.0685 2.12316 14.7987C1.85058 14.5289 1.65219 14.1934 1.54715 13.8246C1.2927 12.414 1.16919 10.9828 1.17819 9.54949C1.17116 8.12684 1.29467 6.70655 1.54715 5.30647C1.64243 4.92581 1.83648 4.57703 2.10969 4.29537C2.3829 4.0137 2.72561 3.80912 3.10319 3.70229C3.67236 3.54127 6.83822 3.33712 10.0011 3.33334C13.1999 3.32952 16.3956 3.52778 16.899 3.67021C17.2766 3.77703 17.6193 3.98162 17.8925 4.26328Z"
            stroke="url(#paint0_linear_2900_43143)"
            stroke-width="1.60417"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_2900_43143"
            x1="18.8245"
            y1="9.53342"
            x2="1.17773"
            y2="9.53342"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#E9530E" />
            <stop offset="1" stop-color="#E4003F" />
          </linearGradient>
          <clipPath id="clip0_2900_43143">
            <rect
              width="19.25"
              height="19.25"
              fill="white"
              transform="translate(0.375 0.125)"
            />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    nome: "Facebook",
    link: "https://www.facebook.com/seu_perfil",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M14.563 1.729H12.157C11.093 1.729 10.073 2.152 9.321 2.904C8.569 3.656 8.146 4.676 8.146 5.74V8.146H5.74V11.354H8.146V17.771H11.355V11.354H13.761L14.563 8.146H11.355V5.74C11.355 5.527 11.439 5.323 11.59 5.172C11.74 5.022 11.944 4.937 12.157 4.937H14.563V1.729Z"
          stroke="url(#paint0_linear)"
          strokeWidth="1.604"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="14.563"
            y1="9.75"
            x2="5.74"
            y2="9.75"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E9530E" />
            <stop offset="1" stopColor="#E4003F" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
];

function MenuItem({ item }: { item: SiteNavigationElement }) {
  return (
    <>
      {item.children && item.children.length > 0
        ? (
          <div className="collapse collapse-arrow">
            <input className="pl-[40px] pr-[24px]" type="checkbox" />
            <div
              style={{ height: "fit-content" }}
              className={`collapse-title flex items-center gap-4 py-[16px] px-6 hover:bg-gray-100 text-[11px] uppercase font-bold menuMobileItem ${
                item.identifier === HIGHLIGHT_BTN && "highlight_btn"
              } `}
            >
              {item.name}
            </div>
            <div className="collapse-content px-0">
              <ul className="">
                {
                  // @ts-expect-error children is not typed
                  item.children.map((node) => (
                    <li
                      style={{ height: "fit-content" }}
                      className="flex justify-between pl-[24px] pr-[24px] items-center border-b border-solid border-Stroke"
                      key={node.id}
                    >
                      <MenuItem item={node} />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M6 12L10 8L6 4"
                          stroke="#3C3C3B"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        )
        : (
          <li className="flex">
            <a
              className="flex items-center gap-4 py-[16px] px-6 hover:bg-gray-100"
              href="/"
            >
              <span
                className={`text-[11px] uppercase font-bold ${
                  item.identifier === HIGHLIGHT_ID && "fontWithGradient"
                }`}
              >
                {item.name}
              </span>
            </a>
          </li>
        )}
    </>
  );
}

export function MenuInstitutional(
  { menuInstitucional }: MenuInstitucionalProps,
) {
  return (
    <ul>
      {menuInstitucional.map((item, index) => (
        <li
          key={index}
          className="mb-6 last:my-0 px-6 text-[11px] uppercase font-bold h-[10px] items-center"
        >
          <a href={item.link}>{item.text}</a>
        </li>
      ))}
    </ul>
  );
}

function Menu({ items }: Props) {
  return (
    <div className="flex flex-col h-full px-6 overflow-y-scroll">
      <ul className="flex flex-col menuListContainer">
        {items.map((item) => (
          <li key={item.id}>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>

      <ul className="flex flex-col mt-6 border border-[#ededed] rounded-[8px]">
        <li className="py-3 px-6 text-[11px] uppercase font-bold h-10 items-center cartMobile">
          <CartButtonVTEX type="menu" />
        </li>
        <li className=" py-3 px-6 text-[11px] uppercase font-bold h-10 items-center border-t border-b border-Stroke">
          <a
            className="flex justify-between gap-1 items-center"
            href="/account"
            aria-label="Account"
          >
            Sua conta
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5.3163 19.4384C5.92462 18.0052 7.34492 17 9 17H15C16.6551 17 18.0754 18.0052 18.6837 19.4384M16 9.5C16 11.7091 14.2091 13.5 12 13.5C9.79086 13.5 8 11.7091 8 9.5C8 7.29086 9.79086 5.5 12 5.5C14.2091 5.5 16 7.29086 16 9.5ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                stroke="#3C3C3B"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </li>
        <li className="py-3 px-6 text-[11px] uppercase font-bold h-10 items-center">
          <a
            className="flex justify-between gap-1 items-center"
            href="/"
            aria-label="Ajuda e suporte"
          >
            Ajuda e suporte
          </a>
        </li>
      </ul>
      <ul class="flex flex-col mt-6 py-6">
        {/* <MenuInstitutional /> */}
      </ul>
      <ul style={{ maxWidth: "200px" }} className={`flex gap-5 mt-6 ml-[20px]`}>
        {redesSociais.map((redeSocial, index) => (
          <a
            class={`p-2 border border-[#E9530E] rounded-[300px]`}
            key={index}
            href={redeSocial.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {redeSocial.icon}
          </a>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
