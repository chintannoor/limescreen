import { Headphones } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className="footer-area"
      style={{ backgroundImage: "url('/assets/images/footer-bg.jpg')" }}
    >
      <div className="footer-top">
        <div className="container">
          <div className="row">
            {/* Footer About */}
            <div className="col-lg-3 col-md-3 col-12">
              <div className="single-widget footer-about">
                <div className="footer-logo">
                  <Link href="/" className="logo">
                    <img src="/assets/images/main-logo.png" alt="Main Logo" />
                  </Link>
                </div>
                {/* <div className="f-contact-box">
                  <div className="box-icon">
                    <i className="fa fa-headphones"></i>
                  </div>
                  <div className="contact-text">
                    <p>Talk To Our Support</p>
                    <h5>+91 97111 73232</h5>
                  </div>
                </div> */}
                <div className="f-contact-box">
                  <div className="box-icon">
                    <Headphones size={24} className="text-white" />
                  </div>
                  <div className="contact-text">
                    <p className="text-gray-300 text-sm">Talk To Our Support</p>
                    <h5 className="text-white font-medium text-md hover:text-green-500 transition-colors">
                      +91 97111 73232
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-3 col-md-3 col-12">
              <div className="single-widget f-links">
                <h3 className="widget-title">Quick Links</h3>
                <ul>
                  <li>
                    <Link href="/">
                      <i className="fa fa-angle-double-right"></i>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact">
                      <i className="fa fa-angle-double-right"></i>
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/registration">
                      <i className="fa fa-angle-double-right"></i>
                      Register
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Links */}
            <div className="col-lg-3 col-md-3 col-12">
              <div className="single-widget f-links">
                <h3 className="widget-title">Links</h3>
                <ul>
                  <li>
                    <Link href="/terms">
                      <i className="fa fa-angle-double-right"></i>
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy">
                      <i className="fa fa-angle-double-right"></i>
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/return">
                      <i className="fa fa-angle-double-right"></i>
                      Return Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div className="col-lg-3 col-md-3 col-12">
              <div className="single-widget">
                <h3 className="widget-title">Contact</h3>
                <div className="footer-contact">
                  <ul className="contact-bottom">
                    <li>
                      <a href="#">
                        <i className="fa fa-map-marker flex"></i>B-24,
                        Sector-02, Noida 201301
                      </a>
                    </li>
                    <li>
                      <a href="tel:+919711173232">
                        <i className="fa fa-phone"></i>+91 97111 73232
                      </a>
                    </li>
                    <li>
                      <a href="mailto:Info@limescreen.net">
                        <i className="fa fa-envelope"></i>Info@limescreen.net
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="f-social">
                  <ul>
                    <li>
                      <a href="https://www.facebook.com/limescreen?mibextid=LQQJ4d">
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/limescreen">
                        <i className="fa fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="copyright text-center">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="copyright-text">
                <p>Copyright © 2024 Limescreen Entertainment & Productions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
