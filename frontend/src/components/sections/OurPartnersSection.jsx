import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Keyboard, Autoplay } from "swiper";
import { Link } from "react-router-dom";

// Install Swiper modules
SwiperCore.use([Pagination, Navigation, Keyboard, Autoplay]);

const partnerImages = [
  "https://andit.co/projects/html/and-tour/demo/assets/img/partner/1.png",
  "https://andit.co/projects/html/and-tour/demo/assets/img/partner/2.png",
  "https://andit.co/projects/html/and-tour/demo/assets/img/partner/3.png",
  "https://andit.co/projects/html/and-tour/demo/assets/img/partner/4.png",
  "https://andit.co/projects/html/and-tour/demo/assets/img/partner/5.png",
  "https://andit.co/projects/html/and-tour/demo/assets/img/partner/6.png",
  "https://andit.co/projects/html/and-tour/demo/assets/img/partner/7.png",
  "https://andit.co/projects/html/and-tour/demo/assets/img/partner/8.png",

  // Add more partner images here...
];

const OurPartnersSection = () => {
  const options = {
    slidesPerView: 2,
    spaceBetween: 10,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: false,
    breakpoints: {
      768: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 8,
      },
    },
  };

  return (
    <section id="our_partners" className="section_padding">
      <div className="container">
        {/* Section Heading */}
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="section_heading_center">
              <h2>Our partners</h2>
            </div>
          </div>
        </div>
        <Swiper className="partner_slider_area" {...options}>
          {partnerImages.map((partner, index) => (
            <SwiperSlide key={index}>
              <div className="partner_logo">
                <Link to>
                  <img src={partner} alt="logo" />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default OurPartnersSection;
