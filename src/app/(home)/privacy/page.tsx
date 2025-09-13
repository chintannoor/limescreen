import Footer from "@/components/common/Footer/page";
import Header from "@/components/common/Header/page";
import Link from "next/link";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
      <Header/>
      <div
        className="breadcrumbs"
        style={{
          backgroundImage: "url('/assets/images/breadcrumbs-bg.jpg')",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-7 col-12">
              <div className="breadcrumbs-content">
                <h2>Privacy Policy</h2>
              </div>
            </div>
            <div className="col-lg-5 col-md-5 col-12">
              <div className="breadcrumbs-menu">
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                    <i className="fa fa-angle-double-right"></i>
                  </li>
                  <li className="active">
                    <Link href="/site/privacy">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="policy__area pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="policy__wrapper policy__translate p-relative z-index-1">
                <div className="policy__item mb-35">
                  <h4 className="policy__meta">Privacy Policy</h4>
                  <h3 className="policy__title">INTRODUCTION</h3>
                  <p>
                    The website for Limescreen Entertainment is
                    www.limescreen.net. We’re committed to protecting and
                    respecting your privacy in compliance with the Personal Data
                    Protection Bill 2019.
                  </p>
                  <p>
                    Our privacy policy explains when and why we collect personal
                    information about people who visit our website, how we use
                    that information, the conditions under which we may disclose
                    information to others with your consent and how we keep
                    information secure.
                  </p>
                  <p>
                    We may change our privacy policy from time to time so please
                    check this page periodically to ensure that you’re happy
                    with any changes. By using our website, you’re agreeing to
                    be bound by this policy.
                  </p>
                  <p>
                    Any questions regarding this Policy and our privacy
                    practices should be sent via our website or via e-mail to:{" "}
                    <a href="mailto:Info@limescreen.net">Info@limescreen.net</a>
                    .
                  </p>
                </div>
                <div className="policy__item policy__item-2 mb-35">
                  <h3 className="policy__title">WHO WE ARE</h3>
                  <p>
                    Limescreen Entertainment is our agency offering a complete,
                    hands-on talent sourcing service and providing people for
                    all production needs.
                  </p>
                </div>
                <div className="policy__item policy__item-2 mb-35">
                  <h3 className="policy__title">
                    HOW DO WE COLLECT INFORMATION ABOUT YOU?
                  </h3>
                  <p>
                    We obtain information about you when you use our website
                    contact form, send us an email, call us on the telephone,
                    fill out a form in our office or verbally give us
                    information in our office or any other appropriate means.
                  </p>
                </div>
                <div className="policy__item policy__item-2 mb-35">
                  <h3 className="policy__title">
                    WHAT TYPE OF INFORMATION IS COLLECTED FROM YOU?
                  </h3>
                  <p>
                    The personal information we collect on our website might
                    include your name, address, email address, telephone number,
                    and other information that you consent to provide on our
                    website contact form such as pictures, videos, media, and
                    files uploaded on our site and can use that information for
                    marketing purposes in any way through our official website
                    and our affiliates.
                  </p>
                </div>
                <div className="policy__list mb-35">
                  <h3 className="policy__title">
                    HOW YOU CAN ACCESS AND UPDATE YOUR INFORMATION?
                  </h3>
                  <p>
                    Limescreen Entertainment tries to be as open as it can be in
                    terms of giving people access to their personal information.
                    If we do hold information about you, we will:
                  </p>
                  <ul>
                    <li>
                      <strong>Give you a description of it;</strong>
                    </li>
                    <li>
                      <strong>Tell you why we are holding it;</strong>
                    </li>
                    <li>
                      <strong>
                        Tell you who it could be disclosed to; and
                      </strong>
                    </li>
                    <li>
                      <strong>
                        Let you have a copy of the information in an
                        intelligible form.
                      </strong>
                    </li>
                  </ul>
                  <p>
                    We will try to deal with your request informally, for
                    example by providing you with the specific information you
                    need over the telephone if appropriate.
                  </p>
                  <p>
                    The accuracy of your information is important to us. If we
                    do hold information about you, you can ask us to correct any
                    mistakes by, once again, contacting us via our website or
                    write to us via mail:{" "}
                    <a href="mailto:Info@limescreen.net">Info@limescreen.net</a>
                    .
                  </p>
                  <p>
                    You also have the right to ask for a copy of the information
                    Limescreen Entertainment holds about you. Please notify us
                    via our website or write to us via email:{" "}
                    <a href="mailto:Info@limescreen.net">Info@limescreen.net</a>
                    .
                  </p>
                </div>
                <div className="policy__item policy__item-2 mb-35">
                  <h3 className="policy__title">
                    TRANSFERRING YOUR INFORMATION OUTSIDE OF INDIA
                  </h3>
                  <p>
                    As part of the services offered to you through this website,
                    the information which you provide to us may be transferred
                    to countries outside India as our website is a Global
                    Website which further comes under a Global Server.
                  </p>
                </div>
                <div className="policy__contact">
                  <h3 className="policy__title policy__title-2">
                    HOW TO CONTACT Limescreen Entertainment AGENCY:
                  </h3>
                  <ul>
                    <li>
                      Email:{" "}
                      <span>
                        <a href="mailto:Info@limescreen.net">
                          Info@limescreen.net
                        </a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default PrivacyPolicy;
