interface CardProps {
  text: string;
  number: number;
}

export default function CardNumbered({ text, number }: CardProps) {
  return (
    <div class="flex h-auto w-full flex-col justify-start gap-2 rounded-xl border border-light-gray p-6">
      <div class="flex flex-col gap-4">
        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#E4003F] to-[#E9530E]">
          <p class="text-inter font-bold text-white">{number}</p>
        </div>

        <div>
          <p class="text-dark">{text}</p>
        </div>
      </div>
    </div>
  );
}
