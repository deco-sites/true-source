import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  | "Alert"
  | "AlertError"
  | "AlertInfo"
  | "AlertSuccess"
  | "AlertWarning"
  | "ArrowNarrowRight"
  | "ArrowRight"
  | "ArrowsPointingOut"
  | "BannerArrowRight"
  | "Bars3"
  | "Boleto"
  | "CashBack"
  | "Check"
  | "CheckboxCheck"
  | "CheckCircle"
  | "ChevronDown"
  | "ChevronLeft"
  | "ChevronRight"
  | "ChevronUp"
  | "CloseCircle"
  | "CloseMobile"
  | "CreditCard"
  | "Deco"
  | "Diners"
  | "DinersClub"
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
  | "NextPage"
  | "OpenMobile"
  | "Phone"
  | "Pix"
  | "Pix"
  | "PlayCircle"
  | "Plus"
  | "PlusCircle"
  | "PreviousPage"
  | "QuestionMarkCircle"
  | "RatingStar"
  | "Refresh"
  | "Return"
  | "SSLSeal"
  | "GoogleSeal"
  | "Ruler"
  | "share"
  | "ShelfWithImageChevron"
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
