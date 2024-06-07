import React from "react";
import { category } from "../../assets/data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Category = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="pt-16">
      <div className="content">
        <Slider {...settings}>
          {category.map((item) => (
            <div className="boxs" key={item.id}>
              <div className="box relative">
                <img
                  src={item.cover}
                  alt="cover"
                  className="w-full h-64 object-cover"
                />
                <div className="overlay absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-black bg-opacity-55 text-white">
                  <h4 className="text-lg font-semibold">{item.category}</h4>
                  <p className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-black bg-opacity-45 text-white transition-colors duration-500 hover:bg-opacity-65">
                    {item.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Category;
