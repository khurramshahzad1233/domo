import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const slides = [
  {
    date: "Thu, 6 Jul 2023",
    price: "₨ 7,603",
  },
  {
    date: "Thu, 7 Jul 2023",
    price: "₨ 7,603",
  },
  {
    date: "Thu, 8 Jul 2023",
    price: "₨ 7,603",
  },
  {
    date: "Thu, 9 Jul 2023",
    price: "₨ 7,603",
  },
  {
    date: "Thu, 10 Jul 2023",
    price: "₨ 7,603",
  },
  {
    date: "Thu, 11 Jul 2023",
    price: "₨ 7,603",
  },
  {
    date: "Thu, 12 Jul 2023",
    price: "₨ 7,603",
  },
  {
    date: "Thu, 13 Jul 2023",
    price: "₨ 7,603",
  },
];

const BookDate = () => {
  const [selectDate, setSelectDate] = React.useState(null);

  const renderSlides = () => {
    return slides.map((slide, index) => (
      <SwiperSlide key={`flight-book-${index}`}>
        <button
          type="button"
          onClick={() => setSelectDate(slide.date)}
          className={`w-100 btn btn-book text-center p-3 ${
            selectDate === slide.date && "active"
          } `}
        >
          <small className="d-block">{slide.date}</small>
          {/* <span className="d-block fs-6 fw-semibold">{slide.price}</span> */}
        </button>
      </SwiperSlide>
    ));
  };

  return (
    <Swiper
      className="swiper-flight-book"
      navigation
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
        1300: {
          slidesPerView: 5,
        },
      }}
    >
      <div className="swiper-wrapper">{renderSlides()}</div>
    </Swiper>
  );
};

export default BookDate;
