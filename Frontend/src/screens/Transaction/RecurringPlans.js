import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

const RecurringPlans = () => {
  return (
    <div>
      <Navbar />

      <div>
        <div className="flex justify-center items-center">
          <h1 className="font-bold text-[#6a5acd] text-3xl py-8">Recurring Plans</h1>
        </div>
        <div className="flex flex-wrap justify-center">
          <div className="w-56 sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
            <Link
              to="/Recurring Payments?plan=Mobile Prepaid"
              className="block"
            >
              <div className="bg-[#6a5acd] text-white p-4 h-60  rounded-2xl flex justify-center items-center gap-6">
                <div>
                  <img
                    src="https://m.media-amazon.com/images/G/31/img22/Apay/Icons/APD_NewIcons/V1_Filledicons/icon_set_Pratima_M_Postoaid._CB616315951_.png"
                    alt="Rent"
                    className="h-28"
                  />
                </div>
                <div>
                  <h1>Mobile Prepaid</h1>
                </div>
              </div>
            </Link>
          </div>

          <div className="w-56 sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
            <Link to="/Recurring Payments?plan=Electricity" className="block">
              <div className="bg-[#6a5acd] text-white p-4 h-60  rounded-2xl flex justify-center items-center gap-6">
                <div>
                  <img
                    src="https://m.media-amazon.com/images/G/31/img22/Apay/Icons/APD_NewIcons/V1_Filledicons/icon_set_Pratima_Elec._CB616315948_.png"
                    alt="Rent"
                    className="h-28"
                  />
                </div>
                <div>
                  <h1>Electricity</h1>
                </div>
              </div>
            </Link>
          </div>

          <div className="w-56 sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
            <Link
              to="/Recurring Payments?plan=Credit Card Bill"
              className="block"
            >
              <div className="bg-[#6a5acd] text-white p-4 h-60  rounded-2xl flex justify-center items-center gap-6">
                <div>
                  <img
                    src="https://m.media-amazon.com/images/G/31/img22/Apay/Icons/APD_NewIcons/V1_Filledicons/icon_set_Pratima_CC_Bill._CB616315951_.png"
                    alt="Rent"
                    className="h-28"
                  />
                </div>
                <div>
                  <h1>Credit Card Bill</h1>
                </div>
              </div>
            </Link>
          </div>
          <div className="w-56 sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
            <Link
              to="/Recurring Payments?plan=OTT Subscriptions"
              className="block"
            >
              <div className="bg-[#6a5acd] text-white p-4 h-60  rounded-2xl flex justify-center items-center gap-6">
                <div>
                  <img
                    src="https://m.media-amazon.com/images/G/31/img22/Apay/Icons/APD_NewIcons/V1_Filledicons/icon_set_Pratima_Subscription._CB616315951_.png"
                    alt="Rent"
                    className="h-28"
                  />
                </div>
                <div>
                  <h1>OTT Subscriptions</h1>
                </div>
              </div>
            </Link>
          </div>
          <div className="w-56 sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
            <Link to="/Recurring Payments?plan=Gas Cylinder" className="block">
              <div className="bg-[#6a5acd] text-white p-4 h-60  rounded-2xl flex justify-center items-center gap-6">
                <div>
                  <img
                    src="https://m.media-amazon.com/images/G/31/img22/Apay/Icons/APD_NewIcons/V1_Filledicons/icon_set_Pratima_LPG._CB616315951_.png"
                    alt="Rent"
                    className="h-28"
                  />
                </div>
                <div>
                  <h1>Gas Cylinder</h1>
                </div>
              </div>
            </Link>
          </div>
          <div className="w-56 sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
            <Link to="/Recurring Payments?plan=Water Bill" className="block">
              <div className="bg-[#6a5acd] text-white p-4 h-60  rounded-2xl flex justify-center items-center gap-6">
                <div>
                  <img
                    src="https://m.media-amazon.com/images/G/31/img22/Apay/Icons/APD_NewIcons/V1_Filledicons/icon_set_Pratima_Water._CB616315951_.png"
                    alt="Rent"
                    className="h-28"
                  />
                </div>
                <div>
                  <h1>Water Bill</h1>
                </div>
              </div>
            </Link>
          </div>
          <div className="w-56 sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
            <Link to="/Recurring Payments?plan=Landline" className="block">
              <div className="bg-[#6a5acd] text-white p-4 h-60  rounded-2xl flex justify-center items-center gap-6">
                <div>
                  <img
                    src="https://m.media-amazon.com/images/G/31/img22/Apay/Icons/APD_NewIcons/V1_Filledicons/icon_set_Pratima_Landline._CB616315951_.png"
                    alt="Rent"
                    className="h-28"
                  />
                </div>
                <div>
                  <h1>Landline</h1>
                </div>
              </div>
            </Link>
          </div>
          <div className="w-56 sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
            <Link to="/Recurring Payments?plan=Broadband" className="block">
              <div className="bg-[#6a5acd] text-white p-4 h-60  rounded-2xl flex justify-center items-center gap-6">
                <div>
                  <img
                    src="https://m.media-amazon.com/images/G/31/img22/Apay/Icons/APD_NewIcons/V1_Filledicons/icon_set_Pratima_Braodband._CB616315948_.png"
                    alt="Rent"
                    className="h-28"
                  />
                </div>
                <div>
                  <h1>Broadband</h1>
                </div>
              </div>
            </Link>
          </div>
          {/* <div className="w-56 sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
            <Link to="/Recurring Payments" className="block">
              <div className="bg-[#6a5acd] text-white p-4 h-60  rounded-2xl flex justify-center items-center gap-6">
                <div>
                  <img
                    src="https://i.pinimg.com/originals/1b/54/ef/1b54efef3720f6ac39647fc420d4a6f9.png"
                    alt="Rent"
                    className="h-28"
                  />
                </div>
                <div>
                  <h1>Netflix</h1>
                </div>
              </div>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default RecurringPlans;
