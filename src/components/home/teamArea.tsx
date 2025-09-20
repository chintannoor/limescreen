"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { getArtists } from "@/app/(home)/homeServerActions";
import { Artist } from "@/types/types";

const TeamArea = () => {
  const [artists, setArtists] = React.useState<Artist[]>([]);

  React.useEffect(() => {
    const fetchArtists = async () => {
      const data = await getArtists();
      setArtists(data);
    };
    fetchArtists();
  }, []);
  const tokenArtists = artists
    .filter((item) => item.category != "" && item.category != null)
    .slice(0, 10);
  return (
    <section className="team-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-12">
            <div className="section-title">
              <h3>Creative Minds</h3>
              <div className="line-bot"></div>
            </div>
          </div>
        </div>
        <Swiper
        navigation
          spaceBetween={30}
          autoplay={true}
          loop={true}
          modules={[Autoplay,Navigation]}
          breakpoints={{
            640: { slidesPerView: 1 }, // 1 slide on small screens
            768: { slidesPerView: 2 }, // 2 slides on tablets
            1024: { slidesPerView: 3 }, // 3 slides on medium screens
            1280: { slidesPerView: 4 }, // 4 slides on large screens
          }}
        >
          <div className="team-slider-sec">
            <div className="team-slider">
              {tokenArtists &&
                tokenArtists.length > 0 &&
                tokenArtists.map((artist: Artist, index: number) => (
                  <SwiperSlide key={`token-${index}`}>
                    <div
                      className="wow fadeInUp item"
                      data-wow-duration="1s"
                      key={`token-${index}`}
                    >
                      <div className="single-team text-center">
                        <div className="team-img">
                          <a
                            href={artist.link!}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={`https://my-limescreen.s3.eu-north-1.amazonaws.com${artist.file!}`}
                              alt="#"
                            />
                          </a>
                        </div>
                        <div className="team-bottom">
                          <div className="team-content">
                            <h4>
                              {artist.fname}&nbsp;{artist.lname}
                            </h4>
                            <p>{artist.category}</p>
                          </div>
                          <div className="team-social">
                            <ul>
                              <li>
                                <a
                                  href={artist.facebook! || "https://facebook.com"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <i className="fa fa-facebook"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href={artist.twitter! || "https://twitter.com"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <i className="fa fa-twitter"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href={artist.insta! || "https://instagram.com"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <i className="fa fa-instagram"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href={artist.youtube! || "https://youtube.com"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <i className="fa fa-linkedin"></i>
                                </a>
                              </li>
                            </ul>
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
    </section>
  );
};

export default TeamArea;
