// LandingPage.jsx

import React from "react";
import { Link } from "react-router-dom";
import paynitelogo from "../assets/images/paynitelogo.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import signuplogo1 from "../assets/images/signuplogo1.png";
import signuplogo2 from "../assets/images/signuplogo2.png";
import signuplogo3 from "../assets/images/signuplogo3.png";

const LandingPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    centerPadding: "3px",
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div
      style={{
        background:
          "linear-gradient(to right, rgb(106, 90, 205) 5%, white 100%) ",
        backgroundColor: "rgb(106, 90, 205)",
      }}
      className="flex flex-col lg:flex-row justify-center py-4 lg:py-28 lg:px-60 border-solid"
    >
      <div className="w-full  h-[500px] flex flex-col gap-16 lg:w-8/12 bg-[#E8E0F8] dark:bg-gray-800 bg-cover rounded  ">
        <div className="flex justify-center mt-8  items-center">
          <div>
            <img className="h-8 " src={paynitelogo} alt="" />
          </div>
          <div className="text-white text-xl ml-1 font-semibold">
            <h1 className="text-black text-3xl font-extrabold ">PayNite</h1>
          </div>
        </div>
        <div>
          <Slider {...settings}>
            <div className="flex justify-center items-center mb-4">
              <div>
                <img className="mx-auto h-48" src={signuplogo1} alt="" />
                <h1 className="mt-4 text-center text-black text-xl font-semibold">
                  Smooth Integration
                </h1>
                <p className="px-10 mt-2 text-center w-68 text-black text-sm">
                  Integrate payment systems effortlessly to drive business
                  growth.
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div>
                <img className="mx-auto h-48 " src={signuplogo2} alt="" />
                <h1 className="mt-4 text-center  text-black text-xl font-semibold">
                  Fortified Security
                </h1>
                <p className="px-4 mt-2 text-center w-68 text-black text-sm">
                  Strengthen transaction security for heightened protection and
                  customer trust.
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div>
                <img className="mx-auto h-48" src={signuplogo3} alt="" />
                <h1 className="mt-4 text-center text-xl text-black font-semibold">
                  Global Transactions
                </h1>
                <p className="px-10 mt-2 text-center w-68 text-black text-sm">
                  Expand globally and accept diverse payments from different
                  customers.
                </p>
              </div>
            </div>
          </Slider>
        </div>
        <div className="flex items-center justify-center gap-4 -mt-8">
          <Link to="/login">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
