import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

export interface SocialItem {
  label:
    | "Instagram"
    | "Tiktok"
    | "Youtube";
  link: string;
}

export default function Social(
  { content, vertical = false }: {
    content?: { title?: string; items?: SocialItem[] };
    vertical?: boolean;
  },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-4 items-center m-[auto 0] py-6 lg:py-0 lg:items-end">
          {content.title && <h3 class="text-lg">{content.title}</h3>}
          <ul
            class={`flex gap-4 ${
              vertical ? "lg:flex-col lg:items-start" : "items-center"
            }`}
          >
            {content.items.map((item) => {
              return (
                <li>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label} Logo`}
                    class="flex gap-2 items-center"
                  >
                    <span class="block p-1 border rounded-full">
                      <Icon size={24} id={item.label} />
                    </span>
                    {vertical && (
                      <div class="text-sm hidden lg:block">{item.label}</div>
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
