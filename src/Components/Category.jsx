import React from "react";
import { category } from "../assets/data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";

const SampleNextArrow = ({ onClick }) => (
  <div className="control-btn" onClick={onClick}>
    <button className="next absolute top-1/2 right-4 transform -translate-y-1/2">
      <MdNavigateNext className="icon text-3xl text-white" />
    </button>
  </div>
);

const SamplePrevArrow = ({ onClick }) => (
  <div className="control-btn" onClick={onClick}>
    <button className="prev absolute top-1/2 left-4 transform -translate-y-1/2">
      <GrFormPrevious className="icon" />
    </button>
  </div>
);

const Category = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <section className=" pt-16">
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
                  <h4 className="text-lg font-semibold">
                    {item.category}
                  </h4>
                  <p className="mt-2">{item.title}</p>
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
