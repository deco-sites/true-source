export type Props = {
  name: string;
  text: string;
  value: string;
  selected: null | string;
  changeHandler: (e: Event) => void;
};

export default function Radio({
  name,
  text,
  value,
  selected,
  changeHandler,
}: Props) {
  return (
    <div
      class={`flex items-center justify-between border-2 rounded-md px-4 py-5 ${
        selected === value
          ? "border-green bg-white"
          : "border-light-gray-200 bg-ice"
      }`}
    >
      <div class="flex gap-2">
        <div class="custom-radio">
          <input
            id={value}
            name={name}
            type="radio"
            value={value}
            onChange={changeHandler}
          />
          <span class="custom-radio-mark" />
        </div>
        <label
          for={value}
          class="text-sm"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
      <span class="bg-green py-1 px-2 rounded-full text-xs font-bold text-white uppercase">
        20% Off
      </span>
    </div>
  );
}
