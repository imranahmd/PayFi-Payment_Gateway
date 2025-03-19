import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { Link, useLocation } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
// import payfi_logo from "../../assets/payfi-logo.png";
import paynitelogo from "../../assets/images/paynitelogo.png";

import {
  selectOktaData,
  selectDatabaseData,
} from "../../features/dataReducer.js";
import { useSelector } from "react-redux";
import {
  bankNetTranImg,
  carddetailimg,
  deliveryLogo,
  paymentMethodImg,
} from "../../assets/images/images.js";

const PaymentMethods = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [verifytok, setVerifytok] = useState("");
  const location = useLocation();
  const oktaData = useSelector(selectOktaData);
  const databaseData = useSelector(selectDatabaseData);
  // console.log(oktaData);
  // console.log(databaseData);
  const searchParams = new URLSearchParams(location.search);

  const installmentAmount = searchParams.get("installmentAmount");
  const subscriptionId = searchParams.get("subscriptionId");

  useEffect(() => {
    if (
      authState &&
      authState.accessToken &&
      authState.accessToken.claims.sub !== "payfiadmin@payfi.co.in"
    ) {
      const groups = authState.accessToken.claims.groups;
      setVerifytok(authState.accessToken.claims.sub);
      // console.log("from dashboard", authState);
    } else {
      // Handle the case where authState or authState.accessToken is null
      // console.log("error");
      // console.log("from payment method page", authState);
    }
  });

  return (
    <div>
      {authState && authState.accessToken && verifytok ? (
        <div>
          <div>
            <Navbar />
          </div>
          <div className="flex items-center justify-center py-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-60">
            <div className="w-full h-96 sm:w-2/5 md:w-2/5 lg:w-2/5 xl:w-2/5 p-0 border border-black rounded-r rounded-xl bg-[#6a5acd]">
              <div className="w-full h-96 p-8 relative">
                <div className="rounded-full overflow-hidden mt-8 mb-10 h-16 w-36 mx-auto bg-white flex items-center justify-center">
                  <div className="flex justify-center items-center ">
                    <div>
                      <img className="h-8 " src={paynitelogo} alt="" />
                    </div>
                    <div className="text-black text-xl ml-1 font-semibold">
                      <h1>PayNite</h1>
                    </div>
                  </div>
                </div>
                <h2 className="text-2xl text-white font-bold mb-4">
                  Choose a Payment Method
                </h2>
                <p className="text-white font-semibold text-center">
                  Total Payable Amount
                </p>
                <p className="text-3xl mt-6 text-black font-bold text-center">
                  ₹{installmentAmount}
                </p>
              </div>
            </div>

            <div className="w-full h-96 sm:w-3/5 md:w-3/5 lg:w-3/5 xl:w-3/5 border border-black cursor-pointer rounded-l rounded-xl">
              <div className="w-full h-full p-8 border">
                <h2 className="text-3xl  capitalize text-center font-extrabold mb-8">
                  PAYMENT METHODS
                </h2>
                <div className="flex flex-col space-y-4">
                  <Link
                    to={`/upitransactions?installmentAmount=${installmentAmount}&subscriptionId=${subscriptionId}`}
                  >
                    <div className="flex items-center border-b border-gray-300 pb-2">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/2560px-UPI-Logo-vector.svg.png"
                        alt="UPI Logo"
                        className="w-10 h-6 mr-2"
                      />
                      <span className="font-semibold text-xl text-[#6a5acd]">
                        UPI
                      </span>
                    </div>
                  </Link>

                  <div className="flex items-center border-b border-gray-300 pb-2 cursor-pointer">
                    <img
                      src={bankNetTranImg}
                      alt="Net Banking Logo"
                      className="w-10 h-8 mr-2"
                    />
                    <span className="font-semibold text-xl text-[#6a5acd]">
                      Net Banking
                    </span>
                  </div>

                  <div className="flex items-center border-b border-gray-300 pb-2 cursor-pointer">
                    <img
                      src={paymentMethodImg}
                      alt="Wallet Logo"
                      className="w-10 h-8 mr-2"
                    />
                    <span className="font-semibold text-xl text-[#6a5acd]">
                      Wallet
                    </span>
                  </div>

                  <div className="flex items-center border-b border-gray-300 pb-2 cursor-pointer">
                    <img
                      src={deliveryLogo}
                      alt="Cash on Delivery Logo"
                      className="w-10 h-8 mr-2"
                    />
                    <span className="font-semibold text-xl text-[#6a5acd]">
                      Cash on Delivery
                    </span>
                  </div>

                  <Link
                    to={`/carddetails?installmentAmount=${installmentAmount}&subscriptionId=${subscriptionId}`}
                  >
                    <div className="flex items-center cursor-pointer">
                      <img
                        src={carddetailimg}
                        alt="Card Logo"
                        className="w-10 h-8 mr-2"
                      />
                      <span className="font-semibold text-xl text-[#6a5acd]">
                        Card (Debit / Credit)
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PaymentMethods;
