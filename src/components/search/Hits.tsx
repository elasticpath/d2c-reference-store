import { ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  LinkBox,
  LinkOverlay,
  Image,
  Text,
} from "@chakra-ui/react";
import { useHits } from "react-instantsearch-hooks-web";
import { SearchHit } from "./SearchHit";
import Link from "next/link";
import NoResults from "./NoResults";

export default function Hits(): JSX.Element {
  const HitComponent = ({ hit }: { hit: SearchHit }) => {
    const { ep_price, ep_image_url, ep_name, ep_sku, ep_slug, objectID } = hit;
    return (
      <LinkBox mb="12">
        <Box position="relative" overflow="hidden" pb="100%">
          {ep_image_url ? (
            <Image
              boxSize="100%"
              position="absolute"
              objectFit="cover"
              src={ep_image_url}
              alt={ep_name}
            />
          ) : (
            <Center
              w="100%"
              h="100%"
              bg="gray.200"
              color="white"
              position="absolute"
            >
              <ViewOffIcon w="10" h="10" />
            </Center>
          )}
        </Box>
        <Heading size="sm" mt="4">
          <Link href={`/products/${ep_slug}/${objectID}`} passHref>
            <LinkOverlay>{ep_name}</LinkOverlay>
          </Link>
        </Heading>
        <Text
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          mt="1"
        >
          {ep_sku}
        </Text>
        <Text fontSize="sm" fontWeight="semibold" mt="1">
          {ep_price}
        </Text>
      </LinkBox>
    );
  };

  const { hits } = useHits<SearchHit>();
  if (hits.length) {
    return (
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {hits.map((hit) => (
          <GridItem key={hit.objectID}>
            <HitComponent hit={hit} />
          </GridItem>
        ))}
      </Grid>
    );
  }
  return <NoResults displayIcon={false} />;
}
