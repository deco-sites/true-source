import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  image: ImageWidget;
}

export default function Banner({ image }: Props) {
  return (
    <div class="flex flex-col relative w-full h-[240px] justify-center items-center">
      <Image
        width={640}
        class="w-full h-[240px] object-fit z-10 rounded-b-3xl"
        sizes="(max-width: 640px) 100vw, 30vw"
        src={image}
        alt={image}
        decoding="async"
        loading="lazy"
      />

      <p class="absolute text-4xl text-ice font-bold font-lemon-milk z-20">
        CENTRAL DE ATENDIMENTO
      </p>
    </div>
  );
}
