//import { useUser } from "apps/vtex/hooks/useUser.ts";
// import Button from "$store/components/ui/Button.tsx";

import Icon from "$store/components/ui/Icon.tsx";

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
        <Icon id="Login" size={24} />
        <p className={`text-xs hidden lg:block`}>
          Faça seu <b>login</b> <br />ou <b>cadastre-se</b>
        </p>
      </a>
    </>
  );
};

export default MyAccount;
