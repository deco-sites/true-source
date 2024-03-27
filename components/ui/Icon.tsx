import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  | "Alert"
  | "AlertError"
  | "CheckboxCheck"
  | "AlertInfo"
  | "ShelfWithImageChevron"
  | "AlertSuccess"
  | "AlertWarning"
  | "ArrowNarrowRight"
  | "ArrowRight"
  | "ArrowsPointingOut"
  | "BannerArrowRight"
  | "Bars3"
  | "CashBack"
  | "Check"
  | "Check"
  | "CheckCircle"
  | "ChevronDown"
  | "ChevronLeft"
  | "ChevronRight"
  | "ChevronUp"
  | "CloseCircle"
  | "PreviousPage"
  | "NextPage"
  | "CloseMobile"
  | "CreditCard"
  | "Deco"
  | "Diners"
  | "Discord"
  | "Discount"
  | "Elo"
  | "Facebook"
  | "FilterList"
  | "FloatingChat"
  | "FloatingWhatsApp"
  | "FloatingX"
  | "Heart"
  | "HeartFill"
  | "Help"
  | "IconDesktop"
  | "IconMobile"
  | "Instagram"
  | "Linkedin"
  | "Login"
  | "LogoIcon"
  | "MagnifyingGlass"
  | "MapPin"
  | "Mastercard"
  | "Message"
  | "Minus"
  | "MinusCircle"
  | "OpenMobile"
  | "Phone"
  | "Pix"
  | "PlayCircle"
  | "Plus"
  | "PlusCircle"
  | "QuestionMarkCircle"
  | "RatingStar"
  | "Refresh"
  | "Return"
  | "Ruler"
  | "share"
  | "ShoppingCart"
  | "Star"
  | "StarIcon"
  | "StarIconWhite"
  | "StrokeArrowRight"
  | "ThinShoppingCart"
  | "ThinUser"
  | "Tiktok"
  | "Trash"
  | "Truck"
  | "Twitter"
  | "User"
  | "Visa"
  | "Warning"
  | "WhatsApp"
  | "X"
  | "XMark"
  | "Youtube"
  | "Zoom";

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="Bell" />
   */
  id: AvailableIcons;
  size?: number;
}

function Icon(
  { id, strokeWidth = 16, size, width, height, ...otherProps }: Props,
) {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
      strokeWidth={strokeWidth}
    >
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;
