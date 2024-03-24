import { IS_BROWSER } from "$fresh/runtime.ts";
import { throttle } from "deco-sites/true-source/sdk/throttle.ts";
import { chunk } from "std/collections/chunk.ts";

export interface Props {
  rootId: string;
  scroll?: "smooth" | "auto";
  interval?: number;
  infinite?: boolean;
  dotIsPage?: boolean;
  startFrom?: number;
}

const ATTRIBUTES = {
  "data-slider": "data-slider",
  "data-slider-item": "data-slider-item",
  'data-slide="prev"': 'data-slide="prev"',
  'data-slide="next"': 'data-slide="next"',
  'data-slide-dot="prev"': 'data-slide-dot="prev"',
  'data-slide-dot="next"': 'data-slide-dot="next"',
  "data-dot": "data-dot",
  "data-dot-group": "data-dot-group",
};

// Percentage of the item that has to be inside the container
// for it it be considered as inside the container
const THRESHOLD = 0.6;

const intersectionX = (element: DOMRect, container: DOMRect): number => {
  const delta = container.width / 1_000;

  if (element.right < container.left - delta) {
    return 0.0;
  }

  if (element.left > container.right + delta) {
    return 0.0;
  }

  if (element.left < container.left - delta) {
    return element.right - container.left + delta;
  }

  if (element.right > container.right + delta) {
    return container.right - element.left + delta;
  }

  return element.width;
};

const setup = (
  { rootId, scroll, interval, infinite, dotIsPage = false, startFrom = 0 }:
    Props,
) => {
  const root = document.getElementById(rootId);
  if (!root) throw new Error("Unable to find root element with id " + rootId);

  // Put in array just to preserve the align
  // deno fmt can't ignore lines of code without group code in something
  //
  // deno-fmt-ignore
  const _ = [
        root.querySelector(`[${ATTRIBUTES['data-slider']}]`),
        root.querySelectorAll<HTMLElement>(`[${ATTRIBUTES['data-slide="prev"']}]`),
        root.querySelectorAll<HTMLElement>(`[${ATTRIBUTES['data-slide="next"']}]`),
        root.querySelectorAll<HTMLElement>(`[${ATTRIBUTES['data-dot-group']}]`),
        root.querySelectorAll<HTMLElement>(`[${ATTRIBUTES['data-slider-item']}]`),
    ] as const

  const [slider, prevs, nexts, _dotsGroups, items] = _;
  let dotsGroups = _dotsGroups;

  if (!slider) throw new Error("Unable to find slider element");
  if (!items || items.length === 0) {
    console.warn("Unable to find items element");
  }

  // if there is dotsGroups get dots for each group, else get dots for root
  let dots = [...(dotsGroups?.length ? dotsGroups!.values() : [root])].map((
    e,
  ) => e!.querySelectorAll(`[${ATTRIBUTES["data-dot"]}]`));

  let currentIndex = startFrom;

  const getElementsInsideContainer = () => {
    const indices: number[] = [];
    const sliderRect = slider.getBoundingClientRect();

    for (let index = 0; index < items.length; index++) {
      const item = items.item(index);
      const rect = item.getBoundingClientRect();

      const ratio = intersectionX(rect, sliderRect) / rect.width;

      if (ratio > THRESHOLD) {
        indices.push(index);
      }
    }

    return indices;
  };

  const goToItem = (index: number) => {
    slider.scrollTo({
      top: 0,
      behavior: scroll,
      left: items[index].offsetLeft,
    });
  };

  const _onClickPrev = () => {
    const indices = getElementsInsideContainer();
    const itemsPerPage = indices.length;
    const isShowingFirst = indices[0] === 0;

    if (infinite) {
      currentIndex -= 1;

      if (currentIndex < 0) {
        currentIndex = items.length - 1;
      }
    } else {
      currentIndex = Math.max(0, currentIndex - 1);
    }

    goToItem(
      isShowingFirst
        ? items.length - 1
        : Math.max(0, indices[0] - itemsPerPage),
    );
  };

  const _onClickNext = () => {
    const indices = getElementsInsideContainer();
    const isShowingLast = indices[indices.length - 1] === items.length - 1;
    const rangeItems = dotIsPage ? indices.length : items.length;

    if (infinite) {
      currentIndex += 1;

      if (currentIndex >= rangeItems) {
        currentIndex = 0;
      }
    } else {
      currentIndex = Math.min(rangeItems, currentIndex + 1);
    }
    goToItem(
      isShowingLast
        ? 0
        : Math.min(indices[0] + indices.length, items.length - 1),
    );
  };

  const [onClickNext] = throttle(_onClickNext, 500);
  const [onClickPrev] = throttle(_onClickPrev, 500);

  let chunkedElements = [] as number[];

  if (dotIsPage) {
    const indexes = [...items.entries()].map((_, i) => i);
    const insideElements = getElementsInsideContainer();
    if (insideElements.length === 0) return;

    chunkedElements = chunk(indexes, insideElements.length).map((i) => i[0]);

    dots.forEach((dots) => {
      dots.forEach((e, i) => {
        if (!chunkedElements.includes(i)) {
          e.remove();
        }
      });
    });

    dotsGroups = root!.querySelectorAll(`[${ATTRIBUTES["data-dot-group"]}]`);

    // if there is dotsGroups get dots for each group, else get dots for root
    dots = [...(dotsGroups?.length ? dotsGroups!.values() : [root])].map((e) =>
      e!.querySelectorAll(`[${ATTRIBUTES["data-dot"]}]`)
    );
  }

  const observer = new IntersectionObserver(
    (elements) => {
      elements.forEach((item) => {
        const index = Number(item.target.getAttribute("data-slider-item")) || 0;

        if (item.isIntersecting) {
          item.target.setAttribute("data-intersection", "1");
        } else {
          item.target.removeAttribute("data-intersection");
        }

        if (!infinite) {
          if (index === 0) {
            if (item.isIntersecting) {
              prevs.forEach((prev) => {
                prev.setAttribute("disabled", "");
                prev.classList.add("opacity-40", "transition-opacity");
              });
            } else {
              prevs.forEach((prev) => {
                prev.removeAttribute("disabled");
                prev.classList.remove("opacity-40", "transition-opacity");
              });
            }
          }
          if (index === items.length - 1) {
            if (item.isIntersecting) {
              nexts.forEach((next) => {
                next.setAttribute("disabled", "");
                next.classList.add("opacity-40", "transition-opacity");
              });
            } else {
              nexts.forEach((next) => {
                next.removeAttribute("disabled");
                next.classList.remove("opacity-40", "transition-opacity");
              });
            }
          }
        }

        const inside = getElementsInsideContainer();
        if (inside.length === 0) return;

        const chunked = chunk(
          Array(items.length)
            .fill(0)
            .map((_, i) => i),
          inside.length,
        );

        if (dotIsPage) {
          const dotIndex = chunked.findIndex(
            (i) => i.at(-1) === index && item.isIntersecting,
          );

          if (dotIndex > -1) {
            currentIndex = dotIndex;
          }
        } else if (item.isIntersecting) {
          currentIndex = index;
        }
      });

      dots.forEach((dots) => {
        dots.forEach((dot, i) => {
          if (i === currentIndex) {
            dot.setAttribute("data-active", "1");
          } else {
            dot.removeAttribute("data-active");
          }
        });
      });
    },
    { threshold: THRESHOLD, root: slider },
  );

  items.forEach((item) => observer.observe(item));
  if (startFrom) goToItem(startFrom);

  dots.forEach((dots) => {
    for (let it = 0; it < (dots?.length ?? 0); it++) {
      dots?.item(it).addEventListener("click", () => {
        currentIndex = it;
        goToItem(dotIsPage ? chunkedElements[it] : it);
      });
    }
  });

  prevs.forEach((prev) => prev.addEventListener("click", onClickPrev));
  nexts.forEach((next) => next.addEventListener("click", onClickNext));

  const timeout = interval && setInterval(onClickNext, interval);

  const itemsInside = getElementsInsideContainer();
  if (itemsInside.length === items.length) {
    nexts.forEach((next) => next.style.visibility = "hidden");
    prevs.forEach((prev) => prev.style.visibility = "hidden");
  }

  // Unregister callbacks
  return () => {
    dots.forEach((dots) => {
      for (let it = 0; it < (dots?.length ?? 0); it++) {
        dots?.item(it).removeEventListener("click", () => {
          currentIndex = it;
          goToItem(dotIsPage ? chunkedElements[it] : it);
        });
      }
    });

    prevs.forEach((prev) => prev.removeEventListener("click", onClickPrev));
    nexts.forEach((next) => next.removeEventListener("click", onClickNext));

    observer.disconnect();

    clearInterval(timeout);
  };
};

function Slider({
  rootId,
  scroll = "smooth",
  interval,
  infinite = false,
  dotIsPage,
  startFrom,
}: Props) {
  if (IS_BROWSER) {
    setup({ rootId, scroll, interval, infinite, dotIsPage, startFrom });
  }

  return <div data-slider-controller-js className="hidden" />;
}

export default Slider;
