import React from "react";
import { CartProvider } from "./cart";
import { CheckoutProvider } from "./checkout";
import { ProviderProps } from "./types";

const Store = ({ children }: ProviderProps) => {
  return (
    <CartProvider>
      <CheckoutProvider>{children}</CheckoutProvider>
    </CartProvider>
  );
};

export default Store;
