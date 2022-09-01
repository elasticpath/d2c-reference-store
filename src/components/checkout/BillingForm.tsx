import { Grid } from "@chakra-ui/react";
import CustomFormControl from "./CustomFormControl";

export default function BillingForm(): JSX.Element {
  return (
    <Grid gap={4}>
      <Grid gap={4} gridTemplateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}>
        <CustomFormControl
          id="first_name"
          type="text"
          name="billingAddress.first_name"
          label="First Name"
          isRequired={true}
        />
        <CustomFormControl
          id="last_name"
          type="text"
          name="billingAddress.last_name"
          label="Last Name"
          isRequired={true}
        />
      </Grid>
      <CustomFormControl
        id="line_1"
        type="text"
        name="billingAddress.line_1"
        label="Street Address"
        isRequired={true}
      />
      <CustomFormControl
        id="line_2"
        type="text"
        name="billingAddress.line_2"
        label="Extended Address"
      />
      <Grid gap={4} gridTemplateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}>
        <CustomFormControl
          id="city"
          type="text"
          name="billingAddress.city"
          label="City"
        />
        <CustomFormControl
          id="county"
          type="text"
          name="billingAddress.county"
          label="County"
        />
      </Grid>
      <CustomFormControl
        id="region"
        type="text"
        name="billingAddress.region"
        label="Region"
        isRequired={true}
      />
      <Grid gap={4} gridTemplateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}>
        <CustomFormControl
          id="postcode"
          type="text"
          name="billingAddress.postcode"
          label="Postcode"
          isRequired={true}
        />
        <CustomFormControl
          id="country"
          type="text"
          name="billingAddress.country"
          label="Country"
          isRequired={true}
        />
      </Grid>
    </Grid>
  );
}
