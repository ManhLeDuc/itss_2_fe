import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";

import Checkout from "components/features/Checkout.js";

const CheckoutForm=()=> {
  return (
    <AnimationRevealPage>
      <Header />
      <Checkout />
      <Footer />
    </AnimationRevealPage>
  );
};
export default CheckoutForm;