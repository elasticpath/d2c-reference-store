import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Grid,
  GridItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
  Flex,
  Spacer,
  Text,
  Heading,
} from "@chakra-ui/react";
import { useSortBy, useInstantSearch } from "react-instantsearch-hooks-web";
import { algoliaEnvData } from "../../lib/resolve-algolia-env";
import CustomHierarchicalMenu from "./CustomHierarchicalMenu";
import Hits from "./Hits";
import Pagination from "./Pagination";
import { BreadcrumbLookup } from "../../lib/types/breadcrumb-lookup";
import SearchBox from "./SearchBox";
import MobileFilters from "./MobileFilters";
import { hierarchicalAttributes } from "../../lib/hierarchical-attributes";
import { globalBaseWidth } from "../../styles/theme";

interface ISearchResults {
  lookup?: BreadcrumbLookup;
  NextRouterHandler: any;
}

function resolveTitle(slugArray: string[], lookup?: BreadcrumbLookup): string {
  return (
    lookup?.[`/${slugArray.join("/")}`]?.name ??
    slugArray[slugArray?.length - 1]
  );
}

export default function SearchResults({
  lookup,
  NextRouterHandler,
}: ISearchResults): JSX.Element {
  const { uiState } = useInstantSearch();

  const { options, refine } = useSortBy({
    items: [
      { label: "Featured", value: algoliaEnvData.indexName },
      {
        label: "Price (Low to High)",
        value: `${algoliaEnvData.indexName}_price_asc`,
      },
      {
        label: "Price (High to Low)",
        value: `${algoliaEnvData.indexName}_price_desc`,
      },
    ],
  });

  const { hierarchicalMenu, query } = uiState[algoliaEnvData.indexName];
  const slugArray = hierarchicalMenu?.["ep_slug_categories.lvl0"];

  const title = slugArray ? resolveTitle(slugArray, lookup) : "All Categories";

  return (
    <Grid
      gap={4}
      min-width="1200px"
      maxW="globalBaseWidth"
      padding={{ sm: "0 1rem", lg: "0 2rem", "2xl": "0 5rem" }}
      mx="auto"
    >
      <Flex alignItems="center" gap="2" pt={6} wrap="wrap">
        <Box py="2">
          <Heading>{title}</Heading>
          {query && <Text>Search results for &quot;{query}&quot;</Text>}
        </Box>
        <Spacer />
        <Flex alignItems="center" gap={2}>
          <MobileFilters
            lookup={lookup}
            NextRouterHandler={NextRouterHandler}
          />
          <Box py="2">
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                rightIcon={<ChevronDownIcon />}
              >
                Sort
              </MenuButton>
              <MenuList zIndex="dropdown">
                {options.map((option) => (
                  <MenuItem
                    key={option.value}
                    onClick={() => refine(option.value)}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Flex>

      <Box>
        <SearchBox />
      </Box>
      <Divider />
      <Grid templateColumns={{ base: "1fr", md: "auto 1fr" }} gap={8}>
        <GridItem
          minWidth={{ base: "3xs", lg: "2xs" }}
          display={{ base: "none", md: "block" }}
        >
          <Heading as="h3" size="sm" pb={2}>
            Category
          </Heading>
          <CustomHierarchicalMenu
            lookup={lookup}
            attributes={hierarchicalAttributes}
          />
        </GridItem>

        <GridItem>
          <Hits />
          <Box py={10}>
            <Pagination />
          </Box>
        </GridItem>
      </Grid>
    </Grid>
  );
}
