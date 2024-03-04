export interface Props {
  images: string;
  className?: string;
}

const IS_URL =
  /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gi;
const DEFAULT_URL = "https://tfcucl.vtexassets.com/arquivos/";

export function DescriptionImage({
  images,
  className,
}: Props) {
  return (
    <picture>
      {images.split(";").map((image, index, arr) => {
        const imageValue = IS_URL.test(image)
          ? image
          : `${DEFAULT_URL}${image}`;
        const actualIndex = index + 1;
        if (actualIndex < arr.length) {
          if (index === 0 && arr.length === 2) {
            return <source media="(min-width:640px)" srcset={imageValue} />;
          }
          if (index === 0) {
            return <source media="(min-width:1024px)" srcset={imageValue} />;
          }
          if (index === 1) {
            return <source media="(min-width:640px)" srcset={imageValue} />;
          }
        } else return <img src={imageValue} class={className} />;
      })}
    </picture>
  );
}
