import Footer from "@/components/common/Footer/page";
import Header from "@/components/common/Header/page";
import Link from "next/link";
import React from "react";
import { Investors } from "@/types/types";
import ContactForm from "@/components/ContactArea/contactArea";
import { fetchInvestors } from "../homeServerActions";
import ContactClientArea from "@/components/home/contactClientArea";

const Contact = async () => {
  const investors: Investors[] = await fetchInvestors();
  return (
    <>
      <Header />
      <section
        className="breadcrumbs"
        style={{
          backgroundImage: "url('/assets/images/breadcrumbs-bg.jpg')",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-7 col-12"></div>
            <div className="col-lg-5 col-md-5 col-12">
              <div className="breadcrumbs-menu">
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                    <i className="fa fa-angle-double-right"></i>
                  </li>
                  <li className="active">
                    <Link href="/site/contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContactForm/>
      <div className="maps-area">
        <div className="main-maps">
          <iframe
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=new%20york&t=&z=13&ie=UTF8&iwloc=&output=embed"
            style={{ width: "100%", height: "450px", border: "0" }}
          ></iframe>
          <a href="https://www.whatismyip-address.com/divi-discount/" />
        </div>
      </div>
      {/* TODO-Uncomment the following section for this page  */}
      <ContactClientArea />
      <Footer />
    </>
  );
};

export default Contact;
