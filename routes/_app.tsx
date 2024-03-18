import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import Theme from "deco-sites/true-source/sections/Theme/Theme.tsx";
import { Context } from "deco/deco.ts";

const sw = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));

export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();

  return (
    <>
      {/* Include default fonts and css vars */}
      <Theme />

      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}
        <meta name="view-transition" content="same-origin" />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />

        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: "Lemon Milk";
                src: url("${
              asset("/font/LEMONMILK-Light.woff")
            }") format('woff');
                font-weight: 300;
              }

              @font-face {
                font-family: "Lemon Milk";
                src: url("${
              asset("/font/LEMONMILK-Regular.woff")
            }") format('woff');
                font-weight: 400;
              }

              @font-face {
                font-family: "Lemon Milk";
                src: url("${
              asset("/font/LEMONMILK-Medium.woff")
            }") format('woff');
                font-weight: 500;
              }
              
              @font-face {
                font-family: "Lemon Milk";
                src: url("${
              asset("/font/LEMONMILK-Bold.woff")
            }") format('woff');
                font-weight: 700;
              }
            `,
          }}
        />
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />

      {/* Include service worker */}
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: `(${sw})();` }}
      />

      <script
        type="text/javascript"
        src="/swiper-bundle.min.js"
      />

      <link
        rel="stylesheet"
        href="/swiper-bundle.min.css"
      />
    </>
  );
});
