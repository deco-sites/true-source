import { invoke } from "$store/runtime.ts";
import { effect, useSignal } from "@preact/signals";
import { Product } from "apps/commerce/types.ts";
import { itemToAnalyticsItem, useCart } from "apps/vtex/hooks/useCart.ts";
import BaseCart from "../common/Cart.tsx";

function Cart() {
  const products = useSignal<Product[]>([]);
  const { cart, loading, updateItems, addCouponsToCart } = useCart();
  const { items, totalizers } = cart.value ?? { items: [] };
  const total = totalizers?.find((item) => item.id === "Items")?.value || 0;
  const discounts =
    totalizers?.find((item) => item.id === "Discounts")?.value || 0;
  const locale = cart.value?.clientPreferencesData.locale ?? "pt-BR";
  const currency = cart.value?.storePreferencesData.currencyCode ?? "BRL";
  const coupon = cart.value?.marketingData?.coupon ?? undefined;

  effect(async () => {
    if (items.length && !products.value.length) {
      const fullProducts = await invoke.vtex.loaders.intelligentSearch
        .productList({
          props: {
            ids: items.map((item) => item.id),
          },
        });

      products.value = fullProducts || [] as Product[];
    }
  });

  return (
    <BaseCart
      cartQuantity={items.map((item) => item.quantity)}
      items={products.value}
      total={(total - discounts) / 100}
      subtotal={total / 100}
      discounts={discounts / 100}
      locale={locale}
      currency={currency}
      loading={loading.value}
      freeShippingTarget={1000}
      coupon={coupon}
      onAddCoupon={(text) => addCouponsToCart({ text })}
      onUpdateQuantity={(quantity, index) =>
        updateItems({ orderItems: [{ index, quantity }] })}
      itemToAnalyticsItem={(index) => {
        const item = items[index];

        return item && itemToAnalyticsItem({ ...item, coupon }, index);
      }}
      checkoutHref="/checkout"
    />
  );
}

export default Cart;
