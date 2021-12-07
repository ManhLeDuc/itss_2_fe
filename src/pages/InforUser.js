import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";

import Infor from "components/features/Infor.js";

const InforUser=()=> {
  return (
    <AnimationRevealPage>
      <Header />
      <Infor />
      <Footer />
    </AnimationRevealPage>
  );
};
export default InforUser;
