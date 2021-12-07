import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";

import Cart from "components/features/Cart.js";

const ShoppingCart=()=> {
  return (
    <AnimationRevealPage>
      <Header />
      <Cart />
      <Footer />
    </AnimationRevealPage>
  );
};
export default ShoppingCart;