import {
  Box,
  Text,
  Stack,
  StackDivider,
  useColorModeValue,
} from "@chakra-ui/react";
import type { ProductResponse } from "@moltin/sdk";

interface IProductDetails {
  product: ProductResponse;
}

const ProductDetails = ({ product }: IProductDetails): JSX.Element => {
  const {
    attributes,
    meta: { display_price },
  } = product;
  return (
    <Stack
      spacing={{ base: 4, sm: 6 }}
      direction={"column"}
      divider={
        <StackDivider borderColor={useColorModeValue("gray.200", "gray.600")} />
      }
    >
      <Box>
        <Text
          fontSize={{ base: "16px", lg: "18px" }}
          color={useColorModeValue("blue.500", "blue.300")}
          fontWeight={"500"}
          textTransform={"uppercase"}
          mb={"4"}
        >
          Product Details
        </Text>
        <Text>{product.attributes.description}</Text>
      </Box>
    </Stack>
  );
};

export default ProductDetails;
