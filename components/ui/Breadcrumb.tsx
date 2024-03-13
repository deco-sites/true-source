import type { BreadcrumbList } from "apps/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];

  return (
    <div class="">
      <ul class="flex items-center gap-2">
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }) => {
            if (item === "/") {
              return (
                <li>
                  <a href={item}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M8.65487 1.84315C8.42065 1.66099 8.30354 1.5699 8.17423 1.53489C8.06013 1.504 7.93987 1.504 7.82577 1.53489C7.69646 1.5699 7.57935 1.66099 7.34513 1.84315L2.82359 5.3599C2.52135 5.59498 2.37022 5.71252 2.26135 5.85973C2.16491 5.99012 2.09307 6.13701 2.04935 6.29319C2 6.4695 2 6.66095 2 7.04386V11.8671C2 12.6139 2 12.9872 2.14532 13.2725C2.27316 13.5233 2.47713 13.7273 2.72801 13.8552C3.01323 14.0005 3.3866 14.0005 4.13333 14.0005H5.46667C5.65335 14.0005 5.74669 14.0005 5.818 13.9641C5.88072 13.9322 5.93171 13.8812 5.96367 13.8185C6 13.7472 6 13.6538 6 13.4671V9.06714C6 8.69378 6 8.50709 6.07266 8.36448C6.13658 8.23904 6.23857 8.13706 6.36401 8.07314C6.50661 8.00048 6.6933 8.00048 7.06667 8.00048H8.93333C9.3067 8.00048 9.49339 8.00048 9.63599 8.07314C9.76144 8.13706 9.86342 8.23904 9.92734 8.36448C10 8.50709 10 8.69378 10 9.06714V13.4671C10 13.6538 10 13.7472 10.0363 13.8185C10.0683 13.8812 10.1193 13.9322 10.182 13.9641C10.2533 14.0005 10.3466 14.0005 10.5333 14.0005H11.8667C12.6134 14.0005 12.9868 14.0005 13.272 13.8552C13.5229 13.7273 13.7268 13.5233 13.8547 13.2725C14 12.9872 14 12.6139 14 11.8671V7.04386C14 6.66095 14 6.4695 13.9506 6.29319C13.9069 6.13701 13.8351 5.99012 13.7386 5.85973C13.6298 5.71252 13.4787 5.59499 13.1764 5.35991L8.65487 1.84315Z"
                        stroke="black"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </a>
                </li>
              );
            }

            return (
              <li class="text-xs text-dark last:text-gray before:content-['/'] flex items-center gap-2">
                <a href={item}>{name}</a>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Breadcrumb;
