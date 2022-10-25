import { Stack } from "@chakra-ui/react";
import type { CatalogsProductVariation } from "@moltin/sdk";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { OptionDict } from "../../lib/product-types";
import {
  createEmptyOptionDict,
  ProductModalContext,
} from "../../lib/product-util";
import {
  allVariationsHaveSelectedOption,
  getOptionsFromSkuId,
  getSkuIdFromOptions,
  mapOptionsToVariation,
  MatrixObjectEntry,
} from "../../services/helper";
import ProductVariation, {
  UpdateOptionHandler,
} from "../product/ProductVariation";

interface IProductVariations {
  variations: CatalogsProductVariation[];
  variationsMatrix: MatrixObjectEntry;
  baseProductSlug: string;
  currentSkuId: string;
  skuOptions?: string[];
}

const getSelectedOption = (
  variationId: string,
  optionLookupObj: OptionDict
): string => {
  return optionLookupObj[variationId];
};

const ModalProductVariations = ({
  variations,
  baseProductSlug,
  currentSkuId,
  variationsMatrix,
}: IProductVariations): JSX.Element => {
  const currentSkuOptions = getOptionsFromSkuId(currentSkuId, variationsMatrix);
  const initialOptions = currentSkuOptions
    ? mapOptionsToVariation(currentSkuOptions, variations)
    : createEmptyOptionDict(variations);

  const context = useContext(ProductModalContext);
  const [selectedOptions, setSelectedOptions] =
    useState<OptionDict>(initialOptions);
  const router = useRouter();

  useEffect(() => {
    const selectedSkuId = getSkuIdFromOptions(
      Object.values(selectedOptions),
      variationsMatrix
    );

    if (
      selectedSkuId &&
      selectedSkuId !== currentSkuId &&
      allVariationsHaveSelectedOption(selectedOptions, variations)
    ) {
      context?.setChangedSkuId(selectedSkuId);
    }
  }, [
    selectedOptions,
    baseProductSlug,
    context,
    currentSkuId,
    router,
    variations,
    variationsMatrix,
  ]);

  const updateOptionHandler: UpdateOptionHandler =
    (variationId) =>
    (optionId): void => {
      for (const selectedOptionKey in selectedOptions) {
        if (selectedOptionKey === variationId) {
          setSelectedOptions({
            ...selectedOptions,
            [selectedOptionKey]: optionId,
          });
          break;
        }
      }
    };

  return (
    <Stack opacity={context?.setIsChangingSku ? "50" : "100"}>
      {variations.map((v) => (
        <ProductVariation
          key={v.id}
          variation={v}
          updateOptionHandler={updateOptionHandler}
          selectedOptionId={getSelectedOption(v.id, selectedOptions)}
        />
      ))}
    </Stack>
  );
};

export default ModalProductVariations;