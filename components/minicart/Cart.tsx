import CartVTEX from "deco-sites/true-source/components/minicart/vtex/Cart.tsx";

function Cart({ freeShippingTarget }: { freeShippingTarget: number }) {
  return <CartVTEX freeShippingTarget={freeShippingTarget} />;
}

export default Cart;
