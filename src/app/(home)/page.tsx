import Header from "@/components/common/Header/page";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import Footer from "@/components/common/Footer/page";
import { faqData, features } from "@/types/constList";
import "@/app/(home)/layout.tsx";
import ContactForm from "@/components/ContactArea/contactArea";
import { Button } from "@/components/ui/button";
// Import Swiper styles
import 'swiper/css';
import HeroSlider from "@/components/home/heroSlider";
import TeamArea from "@/components/home/teamArea";
import TestimonialArea from "@/components/home/testimonialArea";
import ClientArea from "@/components/home/clientArea";

const HeroSection = async () => {

  return (
    <>
      <Header />
      <HeroSlider />
      <section className="history__area history_topcontent">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-12">
              <div className="section-title">
                <h6>Profile</h6>
                <h3>Create Your Profile</h3>
                <div className="line-bot"></div>
                <p>In Just Three Steps</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6">
              <div className="history__thumb-wrapper d-sm-flex pr-70">
                <div className="history__thumb">
                  <img
                    src="/assets/images/kiara_advaniimg.jpg"
                    alt="Profile Example"
                  />
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6">
              <div className="history__list pl-35 pr-40">
                <div className="history__list-item d-flex align-items-start">
                  <div
                    className="history__year wow fadeInLeft"
                    data-wow-delay=".3s"
                  >
                    <h5 className="history__year-title">Step - 1</h5>
                  </div>
                  <div className="history__list-content">
                    <div className="history__list-dot">
                      <span></span>
                    </div>
                    <div
                      className="history__list-content-inner wow fadeInRight"
                      data-wow-delay=".3s"
                    >
                      <h4 className="history__list-title">Register</h4>
                      <p>
                        Add your professional images, self-tapes, and audition
                        videos to get noticed by top recruiters.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="history__list-item d-flex align-items-start">
                  <div
                    className="history__year wow fadeInLeft"
                    data-wow-delay=".3s"
                  >
                    <h5 className="history__year-title">Step - 2</h5>
                  </div>
                  <div className="history__list-content">
                    <div className="history__list-dot">
                      <span></span>
                    </div>
                    <div
                      className="history__list-content-inner wow fadeInRight"
                      data-wow-delay=".3s"
                    >
                      <h4 className="history__list-title">Edit Your Profile</h4>
                      <p>
                        Search and filter auditions suitable to your profile,
                        interests, and location.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="history__list-item d-flex align-items-start">
                  <div
                    className="history__year wow fadeInLeft"
                    data-wow-delay=".3s"
                  >
                    <h5 className="history__year-title">Step - 3</h5>
                  </div>
                  <div className="history__list-content">
                    <div className="history__list-dot">
                      <span></span>
                    </div>
                    <div
                      className="history__list-content-inner wow fadeInRight"
                      data-wow-delay=".3s"
                    >
                      <h4 className="history__list-title">View Your Profile</h4>
                      <p>
                        Apply for auditions, connect with the recruiters
                        directly, and land your dream role!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about-area">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 col-md-6 col-12 wow fadeInLeft"
              data-wow-duration="1s"
            >
              <div className="about-img">
                <Image
                  src="/assets/images/about-img.png"
                  alt="About Image"
                  width={500}
                  height={500} // Adjust the width and height as needed
                />
                <div className="activity">
                  <span>35+</span> Years
                </div>
              </div>
            </div>
            <div
              className="col-lg-6 col-md-6 col-12 wow fadeInRight"
              data-wow-duration="2s"
            >
              <div className="about-content">
                <span>About company</span>
                <h2>
                  More Than <b>35+</b> Years, We Provide Business Solutions.
                </h2>
                <p>
                  Welcome to our website, which is devoted to assisting actors
                  and models in showcasing their skills and credentials through
                  a thorough and polished portfolio. Developing a portfolio
                  might be challenging, but we are here to make it simple for
                  you. Our website offers a user-friendly interface where you
                  can submit your images, videos, and other pertinent data to
                  build a spectacular and expert portfolio that showcases your
                  special skills.
                </p>
                <p>
                  Casting directors, agents, and possible employers will be
                  impressed by the portfolio you develop with the aid of the top
                  tools and resources that our team of specialists is dedicated
                  to offering. We recognise the value of having a portfolio that
                  stands out from the competition and attracts the interest of
                  professionals in the field.
                </p>
                <p>
                  Our website is created to complete all your requirements,
                  whether you are a seasoned actor or model or are just getting
                  started. We provide a variety of features and tools that might
                  assist you in building a tailored portfolio that best presents
                  your skills and experience.
                </p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="about-content">
                <div className="feature row">
                  {[
                    {
                      icon: "fa fa-briefcase",
                      title: "Simple user interface",
                      description:
                        "With our platform's user-friendly layout, you can quickly and easily post your photographs and videos and build a polished portfolio.",
                    },
                    {
                      icon: "fa fa-briefcase",
                      title: "Templates that can be customised",
                      description:
                        "We provide a selection of templates that can be modified to let you build a portfolio that expresses your distinct sense of fashion and personality.",
                    },
                    {
                      icon: "fa fa-briefcase",
                      title: "Safe and private",
                      description:
                        "Your personal information is kept safe and secure on our platform because we recognise the value of privacy and security.",
                    },
                    {
                      icon: "fa fa-briefcase",
                      title: "Professional advice",
                      description:
                        "Throughout the creation of your portfolio, our team of experts is accessible to offer advice and support.",
                    },
                    {
                      icon: "fa fa-briefcase",
                      title: "Showcase Your Social Media Presence with Ease",
                      description:
                        "The key feature of 'our website' where you can create a professional portfolio and showcase your social media presence.",
                    },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="single-feature col-lg-6 col-md-6 col-12"
                    >
                      <i className={feature.icon}></i>
                      <div className="feature-content">
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="ishifeatures">
        <div className="feature-block">
          <div className="container">
            <div className="row">
              <div className="section-title">
                <h6 className="home-title">Benefits</h6>
                <h3>online portfolio</h3>
                <div className="line-bot"></div>
              </div>
              <div className="ishifeaturesblock-content">
                <div className="banner-left col-lg-6 col-md-12 col-sm-12 col-xs-12">
                  <Image
                    src="/assets/images/featurecenterimg.jpg"
                    alt="Feature Center"
                    width={600}
                    height={400}
                  />
                </div>
                <div className="features-right col-lg-6 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="ishifeaturesblock-container col-md-12 col-sm-6 col-xs-12"
                      >
                        <div className="features-inner">
                          <div className="feature-block">
                            <div className="feature-title">{feature.title}</div>
                            <div className="feature-desc">
                              {feature.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* TODO- Uncomment the following section for this page */}
      <TeamArea/>
      <section className="faq-area">
        <div className="container">
          <div className="row">
            {/* ***** FAQ Start ***** */}
            <div className="section-title">
              <h6>face</h6>
              <h3>Do you face these problems?</h3>
              <div className="line-bot"></div>
            </div>
            <div className="faq" id="accordion">
              <div className="card">
                <div className="card-header" id="faqHeading-1">
                  <div className="mb-0">
                    <h5
                      className="faq-title"
                      data-toggle="collapse"
                      data-target="#faqCollapse-1"
                      aria-expanded="true"
                      aria-controls="faqCollapse-1"
                    >
                      <span className="badge">•</span> Are you facing challenges
                      creating an online portfolio that stands out and showcases
                      your unique talent and personality?
                    </h5>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="faqHeading-2">
                  <div className="mb-0">
                    <h5
                      className="faq-title"
                      data-toggle="collapse"
                      data-target="#faqCollapse-2"
                      aria-expanded="false"
                      aria-controls="faqCollapse-2"
                    >
                      <span className="badge">•</span> Are you struggling to
                      handle the technical skills required to create a stunning
                      online portfolio, such as website design, photo editing?
                    </h5>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="faqHeading-3">
                  <div className="mb-0">
                    <h5
                      className="faq-title"
                      data-toggle="collapse"
                      data-target="#faqCollapse-3"
                      aria-expanded="false"
                      aria-controls="faqCollapse-3"
                    >
                      <span className="badge">•</span> Are you finding it
                      challenging to keep your online portfolio up to date while
                      juggling auditions, rehearsals, and other professional
                      obligations?
                    </h5>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="faqHeading-4">
                  <div className="mb-0">
                    <h5
                      className="faq-title"
                      data-toggle="collapse"
                      data-target="#faqCollapse-4"
                      aria-expanded="false"
                      aria-controls="faqCollapse-4"
                    >
                      <span className="badge">•</span> Are you concerned about
                      the security and privacy of your online portfolio and the
                      potential vulnerability of your personal information to
                      cyber threats?
                    </h5>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="faqHeading-5">
                  <div className="mb-0">
                    <h5
                      className="faq-title"
                      data-toggle="collapse"
                      data-target="#faqCollapse-5"
                      aria-expanded="false"
                      aria-controls="faqCollapse-5"
                    >
                      <span className="badge">•</span> Are you having trouble
                      creating a cohesive brand for your online portfolio that
                      effectively communicates your talent and experience to
                      potential clients and employers?
                    </h5>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="faqHeading-6">
                  <div className="mb-0">
                    <h5
                      className="faq-title"
                      data-toggle="collapse"
                      data-target="#faqCollapse-6"
                      aria-expanded="false"
                      aria-controls="faqCollapse-6"
                    >
                      <span className="badge">•</span> Are you unsure of how to
                      effectively promote your online portfolio to increase
                      visibility and attract more opportunities?
                    </h5>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="faqHeading-7">
                  <div className="mb-0">
                    <h5
                      className="faq-title"
                      data-toggle="collapse"
                      data-target="#faqCollapse-7"
                      aria-expanded="false"
                      aria-controls="faqCollapse-7"
                    >
                      <span className="badge">•</span> Are you struggling to
                      keep your online portfolio up to date with your latest
                      work and accomplishments, causing potential clients and
                      employers to overlook your talent?
                    </h5>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="faqHeading-8">
                  <div className="mb-0">
                    <h5
                      className="faq-title"
                      data-toggle="collapse"
                      data-target="#faqCollapse-8"
                      aria-expanded="false"
                      aria-controls="faqCollapse-8"
                    >
                      <span className="badge">•</span> Are you finding it
                      challenging to navigate the constantly evolving digital
                      landscape and keep up with the latest trends and best
                      practices for online portfolio creation and promotion?
                    </h5>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="faqHeading-9">
                  <div className="mb-0">
                    <h5
                      className="faq-title"
                      data-toggle="collapse"
                      data-target="#faqCollapse-9"
                      aria-expanded="false"
                      aria-controls="faqCollapse-9"
                    >
                      <span className="badge">•</span> Are you concerned about
                      the cost of creating and maintaining an online portfolio,
                      and unsure if it is a worthwhile investment for your
                      career as an actor or model?
                    </h5>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="faqHeading-10">
                  <div className="mb-0">
                    <h5
                      className="faq-title"
                      data-toggle="collapse"
                      data-target="#faqCollapse-10"
                      aria-expanded="false"
                      aria-controls="faqCollapse-10"
                    >
                      <span className="badge">•</span> Are you feeling
                      overwhelmed by the amount of work required to create an
                      online portfolio and looking for a solution that can
                      streamline the process and save you time and energy?
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TestimonialArea/>
      <section className="pricing-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-12">
              <div className="section-title">
                <h6>pricing</h6>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="wow fadeInUp" data-wow-duration="2s">
              <div className="single-pricing active">
                <div className="pricing-head">
                  <h4>Solo</h4>
                  <div className="sticker">
                    <span>Best plan</span>
                  </div>
                </div>
                <div className="pricing_plan_row">
                  <div className="pricing-middle">
                    <div className="circle-box">
                      <div className="price">
                        <h2>₹10,000</h2>
                        <p>Yearly</p>
                      </div>
                    </div>
                    <ul className="price-list">
                      <li>- Create a Digital Portfolio</li>
                      <li>- Profile & Contact Visible to Recruiters</li>
                      <li>- Get Invited for Auditions</li>
                      <li>- Guaranteed Project/Audition Calls</li>
                      <li>- Portfolio Link Valid for 1 Year</li>
                    </ul>
                  </div>
                  <div className="pricing-bottom">
                    <Button asChild className="theme-btn rounded-pill">
                      <Link href="/contact" className="theme-btn primary">
                        <i className="fa fa-shopping-cart"></i>Purchase Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="faq-area">
        <div className="container">
          <div className="row">
            {/* ***** FAQ Start ***** */}
            <div className="section-title">
              <h6>Faq's</h6>
              <h3>Frequently Aks Questions</h3>
              <div className="line-bot"></div>
            </div>
            <div className="faq" id="accordion">
              {faqData.map((faq, index) => (
                <div className="card" key={index}>
                  <div className="card-header" id={`faqHeading-${index + 1}`}>
                    <div className="mb-0">
                      <h5
                        className="faq-title"
                        data-toggle="collapse"
                        data-target={`#faqCollapse-${index + 1}`}
                        data-aria-expanded={index === 0 ? "true" : "false"}
                        data-aria-controls={`faqCollapse-${index + 1}`}
                      >
                        <span className="badge">+</span> {faq.question}
                      </h5>
                    </div>
                  </div>
                  <div
                    id={`faqCollapse-${index + 1}`}
                    className={`collapse ${index === 0 ? "show" : ""}`}
                    aria-labelledby={`faqHeading-${index + 1}`}
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section
        className="cta-section"
        style={{
          backgroundImage: `url(/assets/images/next-bg.png)`, // Adjust the path based on the `public` folder
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12">
              <div className="cta-content">
                <h3>Take Your Career to the Next Level</h3>
                <p>
                  Create Your Online Portfolio and Get Discovered by Industry
                  Professionals!
                </p>
                <div className="cta-button">
                  <Button asChild>
                    <Link
                      href="https://api.whatsapp.com/send?phone=9711173232&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Varela%202."
                      className="theme-btn rounded-pill"
                      target="_blank"
                      rel="noopener noreferrer" // Add security for external links
                    >
                      <i aria-hidden="true" className="fab fa-whatsapp"></i>
                      Connect on WhatsApp
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link
                      href="/registration"
                      className="theme-btn rounded-pill"
                    >
                      Get started
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="fun-fact">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="count-box">
                <div className="row">
                  {/* Uncomment and modify the following block if needed */}

                  {/* <div className="col-lg-3 col-md-3 col-12">
                  <div className="single-count">
                    <i className="fa fa-globe"></i>
                    <div className="main-count">
                      <h3>Countries</h3>
                      <h6><span className="counter">50</span>+</h6>
                    </div>
                  </div>
                </div> */}

                  <div className="col-lg-4 col-md-4 col-12">
                    <div className="single-count">
                      <i className="fa fa-user-circle"></i>
                      <div className="main-count">
                        <h3>Artist</h3>
                        <h6>
                          <span className="counter">2</span>Lakh+
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-12">
                    <div className="single-count">
                      <i className="fa fa-briefcase"></i>
                      <div className="main-count">
                        <h3>Placements</h3>
                        <h6>
                          <span className="counter">25</span>K+
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-12">
                    <div className="single-count last">
                      <i className="fa fa-headphones"></i>
                      <div className="main-count">
                        <h3>Brands</h3>
                        <h6>
                          <span className="counter">50</span>K+
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactForm />
      {/* TODO-Uncomment the following section for this page */}
      <ClientArea />
      <Footer />
    </>
  );
};

export default HeroSection;
