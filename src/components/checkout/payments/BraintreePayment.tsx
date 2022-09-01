import { useCallback, useEffect, useState } from "react";
import dropin, { Dropin } from "braintree-web-drop-in";
import { Button } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { CheckoutForm } from "../form-schema/checkout-form-schema";

export const BrainTreePayment = (): JSX.Element => {
  const {
    isSubmitting: isFormSubmitting,
    values,
    handleSubmit,
    setFieldValue,
  } = useFormikContext<CheckoutForm>();

  const { payment } = values;

  useEffect(() => {
    if (payment) {
      handleSubmit();
      setSubmitting(false);
    }
  }, [payment, handleSubmit]);

  const [braintreeInstance, setBraintreeInstance] = useState<
    Dropin | undefined
  >(undefined);

  const [submitting, setSubmitting] = useState<boolean>(false);

  const initializeBraintree = useCallback(
    async () =>
      setBraintreeInstance(
        await dropin.create({
          authorization: "sandbox_x6w6yjj2_c7vsygnbwqhy7wxx",
          container: "#braintree-drop-in",
        })
      ),
    []
  );

  async function resolveNonce(): Promise<void> {
    setSubmitting(true);

    if (!braintreeInstance) {
      throw Error(
        "Tried to resolve nonce before braintree instance was initialized"
      );
    }

    const { nonce } = await braintreeInstance.requestPaymentMethod();

    setFieldValue("payment", {
      method: "purchase",
      gateway: "braintree",
      payment: nonce,
      options: {
        // @ts-ignore
        payment_method_nonce: true, // TODO add to js-sdk type def for ConfirmPaymentBody
      },
    });
  }

  useEffect(() => {
    if (braintreeInstance) {
      braintreeInstance.teardown().then(() => {
        initializeBraintree();
      });
    } else {
      initializeBraintree();
    }
  }, [initializeBraintree]);

  return (
    <div>
      <div id="braintree-drop-in"></div>
      <Button
        _disabled={{ opacity: 50 }}
        type="button"
        onClick={() => resolveNonce()}
        disabled={isFormSubmitting || submitting}
        isLoading={isFormSubmitting || submitting}
        loadingText="Paying"
      >
        Pay
      </Button>
    </div>
  );
};

export default BrainTreePayment;
