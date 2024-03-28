import Icon from "deco-sites/true-source/components/ui/Icon.tsx";
import type { JSX } from "preact";

export interface PaymentItem {
  label: "Visa" | "Mastercard" | "Dinners" | "Boleto" | "Pix";
}

export default function PaymentMethods(
  { content }: { content?: { title?: string; items?: PaymentItem[] } },
) {
  return (
    <>
      {content?.items && content.items.length > 0 && (
        <div className="flex flex-row w-full space-x-4">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:justify-between w-full">
            <div className="flex gap-4">
              {content.items.map((item) => {
                let iconComponent: JSX.Element | null = null;
                switch (item.label) {
                  case "Visa":
                    iconComponent = (
                      <Icon id="Visa" width="52" height="34" strokeWidth={1} />
                    );
                    break;
                  case "Mastercard":
                    iconComponent = (
                      <Icon
                        id="Mastercard"
                        width="53"
                        height="34"
                        strokeWidth={1}
                      />
                    );
                    break;
                  case "Dinners":
                    iconComponent = (
                      <Icon
                        id="DinersClub"
                        width="52"
                        height="34"
                        strokeWidth={1}
                      />
                    );
                    break;
                  case "Boleto":
                    iconComponent = (
                      <Icon
                        id="Boleto"
                        width="52"
                        height="34"
                        strokeWidth={1}
                      />
                    );
                    break;
                  case "Pix":
                    iconComponent = (
                      <Icon id="Pix" width="53" height="34" strokeWidth={1} />
                    );
                    break;
                  default:
                    iconComponent = null;
                }
                return (
                  <ul className="list-none" key={item.label}>
                    <li className="block">
                      {iconComponent}
                    </li>
                  </ul>
                );
              })}
            </div>
            <div>
              {content.title && (
                <h3 className="text-xs font-bold text-center">
                  {content.title}
                </h3>
              )}
            </div>
            <div className="flex gap-6 lg:gap-[34px] list-none">
              <li class={"flex items-center"}>
                <span className="block max-w-[57px] h-auto">
                  <Icon id="SSLSeal" width="70" height="40" strokeWidth={1} />
                </span>
              </li>
              <li class={"flex items-center"}>
                <span className="block max-w-[73px] h-auto">
                  <Icon
                    id="GoogleSeal"
                    width="89"
                    height="32"
                    strokeWidth={1}
                  />
                </span>
              </li>
              <li class={"flex items-center"}>
                <span className="block max-w-[155px] h-auto">
                  <img
                    src="/image/RaSeal.webp"
                    alt="RaSeal"
                    width={174}
                    height={64}
                  />
                </span>
              </li>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
