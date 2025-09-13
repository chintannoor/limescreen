"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination} from "swiper/modules";
import "swiper/css";
import { Button } from "../ui/button";
import Link from "next/link";
import "swiper/css/pagination";
import"@/components/home/customHero.css";

const HeroSlider = () => {
  return (
    <section className="hero-area">
      <div className="hero-slider">
        <Swiper
          pagination={{ type: "bullets", clickable: true }}
          autoplay={true}
          loop={true}
          modules={[Autoplay, Pagination]}
        >
          <SwiperSlide>
            <div
              className="single-slider"
              style={{ backgroundImage: "url('/assets/images/hero-bg-1.jpg')" }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-7 col-md-8 col-12">
                    <div className="hero-content">
                      <h1>Create Profile</h1>
                      <p>
                        With our easy-to-use dashboard, actors and models can
                        quickly and easily update their portfolio with their
                        latest work and achievements, ensuring that they are
                        always presenting their best selves to potential clients
                        and employers
                      </p>
                      <div className="button text-center">
                        <Button asChild>
                          <Link
                            href="/registration"
                            className="theme-btn rounded-pill"
                          >
                            Create Profile
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="single-slider"
              style={{ backgroundImage: "url('/assets/images/hero-bg-3.jpg')" }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-7 col-md-8 col-12">
                    <div className="hero-content">
                      <h1>Create Profile</h1>
                      <p>
                        "Join the Best in the Industry: Create Your Online
                        Portfolio and Get Noticed by Top Casting Directors and
                        Agencies!"
                      </p>
                      <div className="button text-center">
                        <Button asChild>
                          <Link
                            href="/registration"
                            className="theme-btn rounded-pill"
                          >
                            Create Profile
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default HeroSlider;
