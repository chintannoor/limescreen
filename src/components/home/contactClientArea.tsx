"use client";
import { fetchInvestors } from "@/app/(home)/homeServerActions";
import { Investors } from "@/types/types";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay,Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ContactClientArea = () => {
  const [investors, setInvestors] = React.useState<Investors[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetchInvestors();
      setInvestors(data);
    };

    fetchData();
  }, []);

  return (
    <div className="client-area">
      <div className="container">
        <div className="row">
          <Swiper
            autoplay={true}
            loop={true}
            modules={[Autoplay,Navigation]}
            navigation={true}
            slidesPerView={2}
            spaceBetween={10}
            breakpoints={{
              640: { slidesPerView: 2 }, // 1 slide on small screens
              768: { slidesPerView: 2 }, // 2 slides on tablets
              1024: { slidesPerView: 3 }, // 3 slides on medium screens
              1280: { slidesPerView: 4 }, // 4 slides on large screens
            }}
          >
            <div className="col-12">
              <div className="client-slider">
                {investors.map((investor) => (
                  <SwiperSlide key={investor.id}>
                    <div className="single-client" key={investor.id}>
                      <img src={investor.file} alt="#" />
                    </div>
                  </SwiperSlide>
                ))}
              </div>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ContactClientArea;
