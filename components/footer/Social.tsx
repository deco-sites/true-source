import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import { IconInstagram, IconTiktok, IconYoutube } from "$store/components/ui/CustomIcons.tsx";

// Definindo a interface SocialItem
export interface SocialItem {
  label: "Instagram" | "Youtube"| "Tiktok" ; 
  link: string;
}

// Função Social
export default function Social(
  { content, vertical = false }: {
    content?: { title?: string; items?: SocialItem[] };
    vertical?: boolean;
  },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div className="flex flex-col gap-4 items-center m-[auto 0] py-6 lg:py-0 lg:items-end">
          {content.title && <h3 className="text-lg">{content.title}</h3>}
          <ul className={`flex gap-4 ${vertical ? "lg:flex-col lg:items-start" : "items-center"}`}>
            {content.items.map((item) => {
              let iconComponent;
              switch (item.label) {
                case "Instagram":
                  iconComponent = <IconInstagram />;
                  break;
                case "Youtube":
                  iconComponent = <IconYoutube />;
                  break;
                case "Tiktok":
                  iconComponent = <IconTiktok />;
                  break;
                default:
                  iconComponent = null;
              }

              return (
                <li key={item.label}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label} Logo`}
                    className="flex gap-2 items-center"
                  >
                    <span className="block p-2 border border-[#e8530e]  rounded-full">
                      {iconComponent}
                    </span>
                    {vertical && (
                      <div className="text-sm hidden lg:block">{item.label}</div>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
