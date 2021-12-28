import React, { useState, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { authenticationService } from '../services/authentication.service';

import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";

import Checkout from "components/features/Checkout.js";

const CheckoutForm = () => {

  useEffect(() => {
    const checkLogin = () => {
      if (!authenticationService.currentUserValue) {
        window.location.href = '/';
      }
    }
    checkLogin();
  }, []);
  return (
    <AnimationRevealPage>
      <Header />
      <Checkout />
      <Footer />
    </AnimationRevealPage>
  );
};
export default CheckoutForm;
