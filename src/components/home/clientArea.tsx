"use client";
import { fetchInvestors } from "@/app/(home)/homeServerActions";
import { Investors } from "@/types/types";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay,Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ClientArea = () => {
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
          <div className="section-title">
            <h6>Client</h6>
            <h3>Our Partner & Brand’s</h3>
            <div className="line-bot"></div>
          </div>
          <Swiper
            autoplay={true}
            loop={true}
            modules={[Autoplay, Navigation]}
            slidesPerView={2}
            navigation={true}
            spaceBetween={10}
            breakpoints={{
              640: { slidesPerView: 2 }, // 2 slide on small screens
              768: { slidesPerView: 2 }, // 2 slides on tablets
              1024: { slidesPerView: 3 }, // 3 slides on medium screens
              1280: { slidesPerView: 4 }, // 4 slides on large screens
            }}
          >
            {investors.map((investor) => (
              <SwiperSlide key={investor.id}>
                <div className="single-client">
                  <img src={investor.file} alt="Client Logo" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ClientArea;
