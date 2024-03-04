import { useUI } from "$store/sdk/useUI.ts";

export default function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <button
      class="bg-brand rounded-full flex justify-center p-2"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = !displayMenu.value;
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M2 8H14M2 4H14M2 12H14"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
}
