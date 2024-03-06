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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5.3163 19.4384C5.92462 18.0052 7.34492 17 9 17H15C16.6551 17 18.0754 18.0052 18.6837 19.4384M16 9.5C16 11.7091 14.2091 13.5 12 13.5C9.79086 13.5 8 11.7091 8 9.5C8 7.29086 9.79086 5.5 12 5.5C14.2091 5.5 16 7.29086 16 9.5ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#3C3C3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <p className={`text-xs hidden lg:block`}>
          Faça seu <b>login</b> <br />ou <b>cadastre-se</b>
        </p>
      </a>
    </>
  );
};

export default MyAccount;
