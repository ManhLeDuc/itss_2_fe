import React, { useState, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import "../styles/flex.css"
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import { authenticationService } from '../services/authentication.service';
import Cart from "components/features/Cart.js";
import { PrimaryButton } from "components/misc/Buttons.js";
import tw from "twin.macro";

const Button = tw(PrimaryButton)`w-full sm:w-auto mt-6 sm:mt-0 sm:rounded-l-none py-4 bg-green-500 text-gray-100 hocus:bg-green-700 hocus:text-gray-300 border border-green-500 hocus:border-green-700`

const ShoppingCart = () => {
  useEffect(() => {
    const checkLogin = () => {
      if (!authenticationService.currentUserValue) {
        window.alert("U must login first")
        window.location.href = '/';
      }
    }
    checkLogin();
  }, []);

  const handleCheckoutButton = () =>{
    const storedProducts = localStorage.getItem('carts') || JSON.stringify({})
    console.log(storedProducts)
    if (storedProducts === "{}") {
      window.alert("支払う製品がありません");
      return
    }
    window.location.href= "/checkout";
  }
  return (
    <AnimationRevealPage>
      <Header />
      <div className="flex-wrapper">
        <Cart />
        <div class="d-flex flex-wrap-reverse justify-content-end">
          <Button className="align-self-center" onClick={handleCheckoutButton}>支払い</Button>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </AnimationRevealPage>
  );
};
export default ShoppingCart;
