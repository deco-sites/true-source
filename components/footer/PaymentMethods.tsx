import { IconVisa, IconMastercard, IconDinnersClub, IconBoleto, IconPix, SslSeal, GoogleSeal, RaSeal } from "$store/components/ui/CustomIcons.tsx";

export interface PaymentItem {
  label: "Visa" | "Mastercard" | "Dinners" | "Boleto" | "Pix";
}

export default function PaymentMethods(
  { content }: { content?: { title?: string; items?: PaymentItem[] } },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div className="flex flex-row w-full space-x-4">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:justify-between w-full">
            <div className="flex gap-4">
              {content.items.map((item) => {
                let iconComponent;
                switch (item.label) {
                  case "Visa":
                    iconComponent = <IconVisa />;
                    break;
                  case "Mastercard":
                    iconComponent = <IconMastercard />;
                    break;
                  case "Dinners":
                    iconComponent = <IconDinnersClub />;
                    break;
                  case "Boleto":
                    iconComponent = <IconBoleto />;
                    break;
                  case "Pix":
                    iconComponent = <IconPix />;
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
              {content.title && <h3 className="text-xs font-bold text-center">{content.title}</h3>}
            </div>
            <div className="flex gap-6 lg:gap-[34px] list-none">
              <li class={`flex items-center`}>
                <span className="block max-w-[57px] h-auto">
                  <SslSeal />
                </span>
              </li>
              <li class={`flex items-center`}>
                <span className="block max-w-[73px] h-auto">
                  <GoogleSeal />
                </span>
              </li>
              <li class={`flex items-center`}>
                <span className="block max-w-[155px] h-auto">
                  <RaSeal />
                </span>
              </li>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
