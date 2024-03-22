import { useSignal } from "@preact/signals";
import { useUser } from "apps/vtex/hooks/useUser.ts";

import Icon from "deco-sites/true-source/components/ui/Icon.tsx";

const MyAccount = () => {
  const { user } = useUser();
  const vtexIdScriptsLoaded = useSignal(false);

  console.log("USER", user.value);

  return (
    <>
      <button
        class={`flex items-center gap-2`}
        onClick={async () => {
          if (user.value?.email) {
            globalThis.window.location.pathname = "/account";
          } else {
            const execute = () => {
              vtexIdScriptsLoaded.value = true;
              window.vtexid.start({
                returnUrl: window.location.origin + "/account",
                userEmail: "",
                locale: "pt-BR",
                forceReload: true,
              });
            };
            if (!vtexIdScriptsLoaded.value) {
              const { loadVtexIdScripts } = await import(
                "deco-sites/true-source/sdk/loadVtexIdScripts.ts"
              );
              loadVtexIdScripts(execute);
            } else {
              execute();
            }
          }
        }}
      >
        <Icon id="Login" size={24} />
        {user.value?.email
          ? (
            <p className={`text-xs hidden lg:block`}>
              Olá,<br />
              {user.value?.name
                ? <b>{user.value?.name}</b>
                : <b>{user.value?.email}</b>}
            </p>
          )
          : (
            <p className={`text-xs hidden lg:block`}>
              Faça seu <b>login</b> <br />ou <b>cadastre-se</b>
            </p>
          )}
      </button>
    </>
  );
};

export default MyAccount;
