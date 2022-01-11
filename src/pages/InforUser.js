import React, { useState, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import { authenticationService } from '../services/authentication.service';
import Infor from "components/features/Infor.js";

const InforUser=()=> {
  useEffect(() => {
    const checkLogin = () => {
      if (!authenticationService.currentUserValue) {
        window.alert("ログインする必要がある")
        window.location.href = '/';
      }
    }
    checkLogin();
  }, []);
  return (
    <AnimationRevealPage>
      <Header />
      <div className="flex-wrapper">
      <Infor />
      <div className="footer">
      <Footer />
      </div>
      </div>
    </AnimationRevealPage>
  );
};
export default InforUser;
