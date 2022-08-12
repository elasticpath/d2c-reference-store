import { Flex } from "@chakra-ui/react";

import { INavigationNode } from "../Header";
import NavItem from "./NavItem";

interface INavBar {
  nav: INavigationNode[];
  headerPadding: number;
}

const NavBar = ({ nav, headerPadding }: INavBar): JSX.Element => {
  return (
    <Flex w="100%" as="nav">
      {nav &&
        nav.map((item: INavigationNode) => (
          <NavItem key={item.id} item={item} headerPadding={headerPadding} />
        ))}
    </Flex>
  );
};

export default NavBar;
