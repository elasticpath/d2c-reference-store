import { Box, Heading, Image } from "@chakra-ui/react";
import type { NextPage } from "next";
import { withStoreServerSideProps } from "../lib/store-wrapper-ssr";
import { useCart } from "../context/use-cart-hook";
import Cart from "../components/cart/Cart";
import { resolveShoppingCartProps } from "../lib/resolve-shopping-cart-props";
import { globalBaseWidth } from "../styles/theme";

export const CartPage: NextPage = () => {
  const { removeCartItem, state } = useCart();

  const shoppingCartProps = resolveShoppingCartProps(state, removeCartItem);

  return (
    <Box
      p={{ sm: "1rem 1rem", lg: "1rem 2rem", "2xl": "1rem 5rem" }}
      maxW={globalBaseWidth}
      m="0 auto"
      w="full"
    >
      {shoppingCartProps && (
        <>
          <Heading as="h1" pb={6} size={{ base: "md", sm: "lg" }}>
            Your Shopping Cart
          </Heading>
          <Cart {...shoppingCartProps} />
        </>
      )}
      {(state.kind === "empty-cart-state" ||
        state.kind === "uninitialised-cart-state" ||
        state.kind === "loading-cart-state") && (
        <>
          <Heading p={6} pl={0}>
            Your cart is empty
          </Heading>
          <Box p="16">
            <Image alt="" src="/icons/empty.svg" width="488px" height="461px" />
          </Box>
        </>
      )}
    </Box>
  );
};
export default CartPage;

export const getServerSideProps = withStoreServerSideProps();
