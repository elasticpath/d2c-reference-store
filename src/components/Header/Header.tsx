import { Box, Flex } from "@chakra-ui/react";
import { NavigationNode } from "../../lib/build-site-navigation";
import { globalBaseWidth } from "../../styles/theme";
import SearchModal from "../search/SearchModal";
import MobileNavBar from "./Navigation/MobileNavBar";
import NextImage from "next/image";

import NavBar from "./Navigation/NavBar";
import Link from "next/link";
import CartMenu from "../cartItems/CartMenu";

interface IHeader {
  nav: NavigationNode[];
}

const Header = ({ nav }: IHeader): JSX.Element => {
  const headerPadding = 4;

  return (
    <Box
      p={headerPadding}
      as="header"
      pos="sticky"
      top={0}
      bg="white"
      zIndex="sticky"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Flex
        alignItems="center"
        w="100%"
        justifyContent="space-between"
        display={{ base: "flex", sm: "flex", md: "none" }}
      >
        <MobileNavBar nav={nav} />
      </Flex>
      <Flex
        alignItems="center"
        w="100%"
        justifyContent="space-between"
        display={{ base: "none", sm: "none", md: "flex" }}
      >
        <Box flex={1} minW={16}>
          <Link href="/">
            <a>
              <Box position="relative" minW={10} w={10} h={10}>
                <NextImage
                  objectFit="cover"
                  layout="fill"
                  src="/icons/ep-icon.svg"
                  alt="EP Icon"
                />
              </Box>
            </a>
          </Link>
        </Box>

        <Box maxW={globalBaseWidth} w="100%">
          <NavBar nav={nav} headerPadding={headerPadding} />
        </Box>

        <Flex gap={4} flex={1} display="flex" justifyContent="flex-end">
          <SearchModal />
          <CartMenu />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
