import React, { useState, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import Manage from "components/features/Manage.js";

const ClothesManage=()=> {
    return (
      <AnimationRevealPage>
        <Header />
        <div className="flex-wrapper">
        <Manage />
        <div className="footer">
        <Footer />
        </div>
        </div>
      </AnimationRevealPage>
    );
  };

export default ClothesManage;