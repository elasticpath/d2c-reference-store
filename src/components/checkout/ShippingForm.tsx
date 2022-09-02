import { Grid } from "@chakra-ui/react";
import CustomFormControl from "./CustomFormControl";
import CountrySelect from "./CountrySelect";

export default function ShippingForm(): JSX.Element {
  return (
    <Grid gap={4}>
      <Grid gap={4} gridTemplateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}>
        <CustomFormControl
          id="first_name"
          type="text"
          name="shippingAddress.first_name"
          label="First Name"
          isRequired={true}
        />
        <CustomFormControl
          id="last_name"
          type="text"
          name="shippingAddress.last_name"
          label="Last Name"
          isRequired={true}
        />
      </Grid>
      <CustomFormControl
        id="line_1"
        type="text"
        name="shippingAddress.line_1"
        label="Street Address"
        isRequired={true}
      />
      <CustomFormControl
        id="line_2"
        type="text"
        name="shippingAddress.line_2"
        label="Extended Address"
      />
      <Grid gap={4} gridTemplateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}>
        <CustomFormControl
          id="city"
          type="text"
          name="shippingAddress.city"
          label="City"
        />
        <CustomFormControl
          id="county"
          type="text"
          name="shippingAddress.county"
          label="County"
        />
      </Grid>
      <CustomFormControl
        id="region"
        type="text"
        name="shippingAddress.region"
        label="Region"
        isRequired={true}
      />
      <Grid gap={4} gridTemplateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}>
        <CustomFormControl
          id="postcode"
          type="text"
          name="shippingAddress.postcode"
          label="Postcode"
          isRequired={true}
        />
        <CountrySelect
          id="country"
          name="shippingAddress.country"
          label="Country"
          placeholder="select country"
          isRequired={true}
        />
      </Grid>
      <CustomFormControl
        id="phone_number"
        type="text"
        inputMode="numeric"
        name="shippingAddress.phone_number"
        label="Phone Number"
      />
      <CustomFormControl
        id="instructions"
        type="text"
        name="shippingAddress.instructions"
        label="Additional Instructions"
      />
    </Grid>
  );
}
