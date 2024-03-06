import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import CartItem, { Item, Props as ItemProps } from "./CartItem.tsx";
import Coupon, { Props as CouponProps } from "./Coupon.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";

interface Props {
  items: Item[];
  loading: boolean;
  total: number;
  subtotal: number;
  discounts: number;
  locale: string;
  currency: string;
  coupon?: string;
  freeShippingTarget: number;
  checkoutHref: string;
  onAddCoupon?: CouponProps["onAddCoupon"];
  onUpdateQuantity: ItemProps["onUpdateQuantity"];
  itemToAnalyticsItem: ItemProps["itemToAnalyticsItem"];
  onClose?: () => void;
}

function Cart({
  items,
  total,
  subtotal,
  locale,
  coupon,
  loading,
  currency,
  discounts,
  freeShippingTarget,
  checkoutHref,
  itemToAnalyticsItem,
  onUpdateQuantity,
  onAddCoupon,
  onClose,
}: Props) {
  const { displayCart } = useUI();
  const isEmtpy = items.length === 0;

  return (
    <div
      class="flex flex-col justify-center items-center overflow-hidden "
      style={{ minWidth: "calc(min(100vw, 425px))", maxWidth: "425px" }}
    >
      {isEmtpy
        ? (
          <div class="flex flex-col gap-6 w-[245px] text-center">
            <span class="font-bold text-lg uppercase font-lemon-milk">
              Seu carrinho ainda está vazio. Aceita algumas sugestões?
            </span>
            <Button
              class="border-none bg-green rounded-[6px] text-white uppercase hover:bg-green font-lemon-milk"
              onClick={() => {
                displayCart.value = false;
              }}
            >
              COMEÇAR A COMPRAR
            </Button>
          </div>
        )
        : (
          <>
            {/* Cart Items */}
            <ul
              role="list"
              class="flex-grow overflow-y-auto flex flex-col gap-6 w-full"
            >
              {items.map((item, index) => (
                <li key={index}>
                  <CartItem
                    item={item}
                    index={index}
                    locale={locale}
                    currency={currency}
                    onUpdateQuantity={onUpdateQuantity}
                    itemToAnalyticsItem={itemToAnalyticsItem}
                  />
                </li>
              ))}
            </ul>

            <footer
              style="box-shadow: 0px -4px 44px 0px rgba(0, 0, 0, 0.35)"
              class="w-full bg-Ice shadow-xl"
            >
              {
                /*
              <div class="border-t border-base-200 py-2 flex flex-col">

                {discounts > 0 && (
                  <div class="flex justify-between items-center px-4">
                    <span class="text-sm">Descontos</span>
                    <span class="text-sm">
                      {formatPrice(discounts, currency, locale)}
                    </span>
                  </div>
                )}
                <div class="w-full flex justify-between px-4 text-sm">
                  <span>Subtotal</span>
                  <span class="px-4">
                    {formatPrice(subtotal, currency, locale)}
                  </span>
                </div>
                {onAddCoupon && (
                  <Coupon onAddCoupon={onAddCoupon} coupon={coupon} />
                )}
              </div>


              <div class="border-t border-base-200 pt-4 flex flex-col justify-end items-end gap-2 mx-4">

                <div class="flex justify-between items-center w-full">
                  <span>Total</span>
                  <span class="font-medium text-xl">
                    {formatPrice(total, currency, locale)}
                  </span>
                </div>

                {/*
                <span class="text-sm text-base-300">
                  Taxas e fretes serão calculados no checkout
                </span>


              </div>
               */
              }
              <div class="p-4">
                <div class="px-2 py-4 w-full">
                  <FreeShippingProgressBar
                    total={total}
                    locale={locale}
                    currency={currency}
                    target={freeShippingTarget}
                  />
                </div>
                <div class="w-full flex flex-col gap-2">
                  <Button
                    class="btn no-animation btn-primary btn-block border border-solid border-dark rounded-md text-[13px]"
                    href="/promocoes"
                  >
                    ADICIONAR MAIS ITENS
                  </Button>
                  <a href={checkoutHref}>
                    <Button
                      data-deco="buy-button"
                      class="btn no-animation btn-primary bg-green text-white btn-block border border-solid border-green rounded-md text-[13px] font-bold"
                      disabled={loading || isEmtpy}
                      onClick={() => {
                        sendEvent({
                          name: "begin_checkout",
                          params: {
                            coupon,
                            currency,
                            value: total - discounts,
                            items: items
                              .map((_, index) => itemToAnalyticsItem(index))
                              .filter((x): x is AnalyticsItem => Boolean(x)),
                          },
                        });
                      }}
                    >
                      FINALIZAR COMPRA - {formatPrice(total, currency, locale)}
                    </Button>
                  </a>
                </div>
              </div>
            </footer>
          </>
        )}
    </div>
  );
}

export default Cart;
