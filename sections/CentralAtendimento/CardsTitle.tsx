interface CardProps {
    contentTitle: string;
    contentSubtitle: string;
}

export default function CardsTitle({contentTitle, contentSubtitle}: CardProps) {
  return (
    <>
      <h1 class="font-lemon-milk text-[18px] font-bold text-[#3C3C3B]">
        {contentTitle}
      </h1>
      <p class="font-inter text-[14px] font-medium text-[#8E8E8D]">
        {contentSubtitle}
      </p>
    </>
  );
}
