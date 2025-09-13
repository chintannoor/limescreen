import Header from "@/components/common/Header/page";
import React from "react";
import ResetPassword from "./_components/reset";
import Footer from "@/components/common/Footer/page";

const page = () => {
  return (
    <>
      <Header />
      <ResetPassword/>
      <Footer/>
    </>
  );
};

export default page;
