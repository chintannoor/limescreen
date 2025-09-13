import Header from "@/components/common/Header/page";
import React from "react";
import ActorForm from "./_components/actor";
import Footer from "@/components/common/Footer/page";
import Script from "next/script";

const page = () => {
  return (
    <>
      <Script
        id="bootstrap-css"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta.2/css/bootstrap.css';
            document.head.appendChild(link);
          `,
        }}
      />
      <Header />
      <ActorForm />
      <Footer />
    </>
  );
};

export default page;
