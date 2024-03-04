// const handleLoadScript = (src: string, onLoadCallBack: () => void) => {
//   const script = document.createElement("script");
//   script.src = src;
//   script.async = true;

//   script.onload = () => {
//     onLoadCallBack();
//   };
//   document.head.appendChild(script);
// };

// const handleLoadCss = (styles: string) => {
//   const style = document.createElement("style");
//   style.innerHTML = styles;
//   document.head.appendChild(style);
// };

// const handleSetScope = () => {
//   // @ts-expect-error vtexId is a global variable
//   window.vtexId.setScope("5d9f2d19-f9b8-4999-bbcd-0271c714b462");
//   // @ts-expect-error vtexId is a global variable
//   window.vtexId.setScopeName("tfcucl");
// };

// export const loadVtexIdScripts = (callback: () => void) => {
//   handleLoadCss(`

//     /*Login estilizado*/

//   `);
// };

// handleLoadScript(
//   "https://io.vtex.com.br/front-libs/jquery/1.8.3/jquery-1.8.3.min.js?v=*",
//   () => {
//     handleLoadScript(
//       "https://io.vtex.com.br/vtex-id-ui/3.27.1/vtexid-jquery.min.js?v=*",
//       () => {
//         handleSetScope();
//         callback();
//       },
//     );
//   },
// );
