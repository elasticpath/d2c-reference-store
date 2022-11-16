import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react";

export const globalBaseWidth = "100%";

// Basic styles
export const styles = {
  global: {
    html: {
      fontSize: "15px",
    },
  },
};

// Elastic Path default brand colours
const colors = {
  brand: {
    primary: "#0033CC",
    secondary: "#091740",
    highlight: "#1E40AF",
    primaryAlt: "#EA7317",
    secondaryAlt: "#ffcb47",
    navigation: "#091740",
    buttontext: "#FFFFFF",
  },
  header: {
    background: "#FFFFFF",
    border: "#EFEFEF",
  },
};

// Custom Checkbox Styles
const Checkbox: ComponentStyleConfig = {
  baseStyle: {
    control: {
      bg: "white",
      _checked: {
        bg: "brand.primary",
        borderColor: "brand.primary",
        _hover: {
          bg: "brand.highlight",
          borderColor: "brand.highlight",
        },
      },
      _indeterminate: {
        bg: "brand.primary",
        borderColor: "brand.primary",
      },
    },
  },
};

const theme = extendTheme({
  ...{ styles },
  ...{ colors },
  components: {
    Checkbox,
  },
});

export default theme;
