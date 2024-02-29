import { DescriptionImage } from "./Image.tsx";

interface Props {
  images: string[];
}

export function Gallery({ images }: Props) {
  return (
    <div class={`grid grid-cols-${images.length}`}>
      {images.map((item) => (
        <DescriptionImage images={item} className="w-full h-auto" />
      ))}
    </div>
  );
}
