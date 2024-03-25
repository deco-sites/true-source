import type { ImageWidget } from "apps/admin/widgets.ts";

interface GalleryImages {
  desktop: ImageWidget;
  tablet?: ImageWidget;
  mobile?: ImageWidget;
}

interface Props {
  images: GalleryImages[];
}

export default function Gallery({
  images = [
    {
      desktop: "https://tfcucl.vtexassets.com/arquivos/infocard-3.jpg",
    },
    {
      desktop: "https://tfcucl.vtexassets.com/arquivos/infocard-4.jpg",
    },
    {
      desktop: "https://tfcucl.vtexassets.com/arquivos/infocard-3.jpg",
    },
  ],
}: Props) {
  return (
    <div class={`grid grid-cols-${images.length}`}>
      {images.map((image) => (
        <picture>
          <source media="(min-width:1024px)" srcset={image.desktop} />
          <source
            media="(min-width:640px)"
            srcset={image.tablet ? image.tablet : image.desktop}
          />
          <img
            src={image.mobile ? image.mobile : image.desktop}
            class="w-full h-[240px] sm:h-[425px] object-cover object-center"
            alt=""
          />
        </picture>
      ))}
    </div>
  );
}
