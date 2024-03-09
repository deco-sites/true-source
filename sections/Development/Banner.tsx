import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";

export interface Props {
    image: ImageWidget;
}

export default function Banner({ image }: Props) {
    return (
        <div class="flex w-full">
            <Image
                width={640}
                class="w-full h-[240px] object-fit z-10 rounded-b-3xl"
                sizes="(max-width: 640px) 100vw, 30vw"
                src={image}
                alt={image}
                decoding="async"
                loading="lazy"
            />
        </div>
    );
}
