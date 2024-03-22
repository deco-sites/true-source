function handleLoadScript(src: string, onLoadCallBack: () => void) {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;

  script.onload = () => {
    onLoadCallBack();
  };
  document.head.appendChild(script);
}

function handleLoadCss(styles: string) {
  const style = document.createElement("style");
  style.innerHTML = styles;
  document.head.appendChild(style);
}

function handleSetScope() {
  // @ts-expect-error vtexId is a global variable
  window.vtexid.setScope("5d9f2d19-f9b8-4999-bbcd-0271c714b462");
  // @ts-expect-error vtexId is a global variable
  window.vtexid.setScopeName("tfcucl");
}

export function loadVtexIdScripts(callBack: () => void) {
  handleLoadCss(``);
  handleLoadScript(
    "https://io.vtex.com.br/front-libs/jquery/1.8.3/jquery-1.8.3.min.js?v=*",
    () => {
      handleLoadScript(
        "https://io.vtex.com.br/vtex-id-ui/3.27.1/vtexid-jquery.min.js?v=*",
        () => {
          handleSetScope();
          callBack();
        },
      );
    },
  );
}
