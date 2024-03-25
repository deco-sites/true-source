interface CardProps {
  contentTitleSimple: string;
}

export default function CardsTitle({ contentTitleSimple }: CardProps) {
  return (
    <>
      <h1 class="font-lemon-milk text-[18px] font-bold text-dark">
        {contentTitleSimple}
      </h1>
    </>
  );
}
