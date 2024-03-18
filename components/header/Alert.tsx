import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { AlertProps, Theme } from "./Header.tsx";

interface Props {
  alerts: AlertProps[];
  theme: Theme;
  isMobile: boolean;
}

function Alert({ alerts = [], theme, isMobile }: Props) {
  const id = useId();
  const isLightTheme = theme === "light";

  return (
    <>
      {isMobile
        ? (
          <div
            id={id}
            className={`lg:hidden flex mx-auto border-t-4 border-t-red `}
          >
            <Slider
              className={`carousel carousel-center w-screen bg-secondary `}
            >
              {alerts.map((alert, index) => (
                <Slider.Item
                  key={index}
                  index={index}
                  className="carousel-item"
                >
                  <div
                    className={`text-sm flex justify-center mx-auto items-center w-screen h-[38px] py-2 border-b border-solid border-Stroke border-opacity-100 ${
                      isLightTheme ? "bg-white" : "bg-black"
                    }`}
                  >
                    {alert.icons && <img className="px-2" src={alert.icons} />}
                    <p
                      className={`text-xs md:text-sm sm:text-base ${
                        isLightTheme ? "text-black" : "text-white"
                      }`}
                    >
                      {alert.text}
                    </p>
                  </div>
                </Slider.Item>
              ))}
            </Slider>
            <SliderJS rootId={id} interval={5000} />
          </div>
        )
        : (
          <div
            className={`border-b border-solid border-Stroke border-t-4 border-t-red border-opacity-100 ${
              isLightTheme ? "bg-white" : "bg-black"
            }`}
          >
            <div id={id} className="hidden lg:flex container">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`text-sm flex items-center h-[38px] py-2 w-full justify-center group`}
                >
                  <ul class={`flex items-center w-full alertul`}>
                    <li class={`list-none `}>
                      <a class={`flex`} href={alert.link}>
                        {alert.icons && (
                          <img className="px-2" src={alert.icons} />
                        )}
                        <p
                          className={`text-xs font-medium ${
                            isLightTheme ? "text-dark" : "text-white"
                          }`}
                        >
                          {alert.text}
                        </p>
                      </a>
                    </li>
                    <li class={`benefitdot list-none group-last:hidden`}></li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
    </>
  );
}

export default Alert;
