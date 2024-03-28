interface Props {
  /**
   * @title Espaçamento entre os elementos no desktop
   */
  desktop?: number;
  /**
   * @title Espaçamento entre os elementos no mobile
   */
  mobile?: number;
}

export default function Space({ desktop, mobile }: Props) {
  return (
    <div
      style={{
        "--s-d": desktop,
        "--s-m": mobile,
      }}
      class="pt-[var(--s-m)] md:pt-[var(--s-d)]"
    />
  );
}
