//import { useUser } from "apps/vtex/hooks/useUser.ts";
// import Button from "$store/components/ui/Button.tsx";

const MyAccount = () => {
  // const { user } = useUser();
  return (
    <>
      <a class={`flex items-center gap-2`} //         as="button"
        //         variant="icon"
        //         href="/account"
        //         aria-label="Log in"
        //         className="flex items-center gap-2"
        //         onClick={async () => {
        //           if (user.value?.email) {
        //             window.location.pathname = "/account";
        //           } else {
        //             const execute = () => {
        //               vtexIdScriptsLoaded.value = true;
        //               //deno-lint-ignore
        //               // @ts-expect-error
        //               window.vtexid.start({
        //                 returnUrl: window.location.origin + "/account",
        //                 userEmail: "",
        //                 locale: "pt-BR",
        //                 forceReload: true,
        //               });
        //             };
        //             if (!vtexIdScriptsLoaded.value) {
        //               const { loadVtexIdScripts } = await import(
        //                 "deco-sites/true-source/sdk/loadVtexIdScripts.ts"
        //               );
        //               loadVtexIdScripts(execute);
        //             } else {
        //               execute();
        //             }
        //           }
        //         }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="29"
          viewBox="0 0 28 29"
          fill="none"
        >
          <path
            d="M6.20495 23.1778C6.91466 21.5057 8.57168 20.333 10.5026 20.333H17.5026C19.4335 20.333 21.0905 21.5057 21.8003 23.1778M18.6693 11.583C18.6693 14.1603 16.5799 16.2497 14.0026 16.2497C11.4253 16.2497 9.33594 14.1603 9.33594 11.583C9.33594 9.00568 11.4253 6.91634 14.0026 6.91634C16.5799 6.91634 18.6693 9.00568 18.6693 11.583ZM25.6693 14.4997C25.6693 20.943 20.4459 26.1663 14.0026 26.1663C7.55928 26.1663 2.33594 20.943 2.33594 14.4997C2.33594 8.05635 7.55928 2.83301 14.0026 2.83301C20.4459 2.83301 25.6693 8.05635 25.6693 14.4997Z"
            stroke="#3C3C3B"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p className={`text-xs hidden lg:block`}>
          Faça seu <b>login</b> <br />ou <b>cadastre-se</b>
        </p>
      </a>
    </>
  );
};

export default MyAccount;
