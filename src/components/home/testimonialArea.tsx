"use client";
import { fetchTestimonials } from "@/app/(home)/homeServerActions";
import { Testimonials } from "@/types/types";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import"@/components/home/customTestimonial.css";

const TestimonialArea = () => {
  const [testimonials, setTestimonials] = React.useState<Testimonials[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTestimonials();
      setTestimonials(data);
    };

    fetchData();
  }, []);

  return (
    <section className="testimonial-area">
      <div className="testimonial-main">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-12">
              <div className="section-title text-center">
                <h3>Client Testimonials</h3>
                <div className="line-bot"></div>
              </div>
            </div>
            <Swiper
              pagination={{ type: "bullets", clickable: true }}
              autoplay={true}
              loop={true}
              modules={[Autoplay, Pagination]}
              
            >
              <div className="col-12">
                <div className="testimnial-slider">
                  {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={`token-${index}`}>
                      <div className="testimonial-item" key={index}>
                        <div className="row">
                          <div className="col-lg-4 col-md-6 col-12">
                            <div className="testimnial-left">
                              <div className="testimonial-head">
                                <img
                                  src={testimonial.file}
                                  alt={testimonial.name}
                                />
                              </div>
                              <div className="testimonial-bottom">
                                <h6>{testimonial.name}</h6>
                                <p>{testimonial.occupation}</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-6 col-12">
                            <div className="testimonial-right">
                              <p>{testimonial.message}</p>
                              <div className="stars">
                                <ul>
                                  {[
                                    ...Array(Math.min(5, testimonial.rate)),
                                  ].map((_, i) => (
                                    <li key={i}>
                                      <i className="fa fa-star"></i>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </div>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialArea;
