import React, { useState, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import "../styles/flex.css"
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import { authenticationService } from '../services/authentication.service';
import Cart from "components/features/Cart.js";

const ShoppingCart=()=> {
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
      <div className="flex-wrapper">
      <Cart />
      <div className="footer">
      <Footer />
      </div>
      </div>
    </AnimationRevealPage>
  );
};
export default ShoppingCart;
