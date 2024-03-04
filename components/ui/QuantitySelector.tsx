interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
}

const QUANTITY_MAX_VALUE = 100;

function QuantitySelector({ onChange, quantity, disabled, loading }: Props) {
  const decrement = () => onChange?.(Math.max(0, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  return (
    <div class="join border border-1 border-solid border-light-grey rounded-full p-[10px]">
      <button
        class=" join-item py-0 pl-2 pr-0 font-bold"
        onClick={decrement}
        disabled={disabled}
        // loading={loading}
      >
        <svg
          width="6"
          height="3"
          viewBox="0 0 6 3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.60298 0.978693V2.65909H0.959517V0.978693H5.60298Z"
            fill="#3C3C3B"
          />
        </svg>
      </button>
      <input
        class="text-center p-0 font-bold outline-none"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        max={QUANTITY_MAX_VALUE}
        min={1}
        value={quantity}
        disabled={disabled}
        onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
        maxLength={3}
        size={3}
      />
      <button
        class=" join-item py-0 pr-2 pl-0 font-bold"
        onClick={increment}
        disabled={disabled}
        // loading={loading}
      >
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.8679 7.44815V0.40838H4.64773V7.44815H2.8679ZM0.237926 4.81818V3.03835H7.2777V4.81818H0.237926Z"
            fill="#3C3C3B"
          />
        </svg>
      </button>
    </div>
  );
}

export default QuantitySelector;
