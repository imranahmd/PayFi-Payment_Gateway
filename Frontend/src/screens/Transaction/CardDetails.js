import React, { useState, useEffect } from "react";
import Navbar from "../Navbar.js";
import paynitelogo from "../../assets/images/paynitelogo.png";
import { useLocation } from "react-router-dom";

import CryptoJS from "crypto-js";
import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  selectOktaData,
  selectDatabaseData,
} from "../../features/dataReducer.js";
import { useSelector } from "react-redux";
import { API_GATEWAY } from "../../Apigate/api.js";

const CardDetails = (props) => {
  const navigate = useNavigate();
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const { oktaAuth, authState } = useOktaAuth();
  const [verifytok, setVerifytok] = useState(null);
  const { merchantId } = useParams();
  const [merchantData, setMerchantData] = useState([]);
  const [businessdetails, setBusinessDetails] = useState([]);
  const [amount, setAmount] = useState("");
  const partnerReferenceNumber = 34788441;
  const escrowAccountNumber = 87399435;
  const latitude = 40.7128;
  const longitude = -74.006;
  const message = "Payment For Goods";
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const installmentAmount = searchParams.get("installmentAmount");
  const subscriptionId = searchParams.get("subscriptionId");
  // console.log(installmentAmount, subscriptionId);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State to manage confirmation modal
  const [showConfirmationModall, setShowConfirmationModall] = useState(false);

  // console.log(merchantData.merchantId);

  const [cardHolderNameError, setCardHolderNameError] = useState(null);
  const [cardNumberError, setCardNumberError] = useState(null);
  const [cardDateError, setCardDateError] = useState(null);
  const [cardCVVError, setCardCVVError] = useState(null);
  const [amountError, setAmountError] = useState(null);

  const oktaData = useSelector(selectOktaData);
  const databaseData = useSelector(selectDatabaseData);

  const email = oktaData.user.profile.login;
  const merchantOktaId = oktaData.user.id;

  useEffect(() => {
    if (authState && authState.accessToken) {
      const { accessToken } = authState.accessToken;
      setVerifytok(accessToken);
    } else {
    }
  });

  const handleCardHolderName = (event) => {
    const inputCardHolderName = event.target.value;
    setCardHolderName(inputCardHolderName);
    const onlyLettersRegex = /^[A-Za-z\s]+$/;

    if (onlyLettersRegex.test(inputCardHolderName)) {
      setCardHolderNameError("");
    } else if (inputCardHolderName === "") {
      setCardHolderNameError(null);
    } else {
      // Input contains numbers or special characters
      setCardHolderNameError(
        "Card holder name should contain only letters and spaces"
      );
    }
  };

  const handleAmount = (event) => {
    const inputAmount = event.target.value;
    setAmount(inputAmount);

    if (inputAmount.trim() === "") {
      setAmountError(null);
    } else if (!/^\d+(\.\d+)?$/.test(inputAmount)) {
      setAmountError("Enter a valid Amount.");
    } else if (inputAmount.charAt(0) === "0") {
      setAmountError("Amount cannot start with 0.");
    } else {
      setAmountError(null);
    }
  };

  const handleCardNumber = (event) => {
    const inputCardNumber = event.target.value;
    setCardNumber(inputCardNumber);

    if (inputCardNumber.trim() === "") {
      setCardNumberError(null);
    } else if (!/^\d{16}$/.test(inputCardNumber)) {
      setCardNumberError("Enter a valid 16-digit Card Number.");
    } else {
      setCardNumberError(null);
    }
  };

  const handleCardDate = (event) => {
    const inputCardDate = event.target.value;
    setCardDate(inputCardDate);

    // Regular expression to match MM/YY format
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;

    if (inputCardDate.trim() === "") {
      setCardDateError(null);
    } else if (!regex.test(inputCardDate)) {
      setCardDateError("Invalid format. Please use MM/YY format.");
    } else {
      setCardDateError(null);
    }
  };

  const handleCardYear = (event) => {
    setCardYear(event.target.value);
  };

  const handleCardCVV = (event) => {
    const inputCardCVV = event.target.value;
    setCardCVV(inputCardCVV);

    if (inputCardCVV.trim() === "") {
      setCardCVVError(null);
    } else if (!/^\d{3}$/.test(inputCardCVV)) {
      setCardCVVError("Enter a valid 3 digit CVV.");
    } else {
      setCardCVVError(null);
    }
  };

  const submitCardDeatails = async () => {
    if (!validateInputs()) {
      setShowConfirmationModall(true);
    } else {
      setShowConfirmationModal(true);
    }
  };

  const submitRecurringCardDeatails = async () => {
    if (!validateInputs()) {
      setShowConfirmationModall(true);
    } else {
      setShowConfirmationModal(true);
    }
  };

  const validateInputs = () => {
    let isValid = true;

    if (!cardHolderName.trim() || cardHolderNameError) {
      setCardHolderNameError("Plese enter Card Holder Name");
      isValid = false;
    }

    if (!cardNumber.trim() || cardNumberError) {
      setCardNumberError("Plese enter Card Number.");
      isValid = false;
    }

    if (!cardDate.trim() || cardDateError) {
      setCardDateError("Plese enter Expiration Date");
      isValid = false;
    }

    if (!cardCVV.trim() || cardCVVError) {
      setCardCVVError("Plese enter CVV.");
      isValid = false;
    }

    if (!amount.trim() || amountError) {
      setAmountError("Please enter Amount");
      isValid = false;
    }

    if (
      installmentAmount &&
      parseFloat(installmentAmount) > 0 &&
      cardHolderName !== null &&
      cardNumber !== null &&
      cardDate !== null &&
      cardCVV !== null
    ) {
      setAmountError("");
      setCardHolderNameError("");
      setCardNumberError("");
      setCardDateError("");
      setCardCVVError("");
      // setCustomerVpaError("Plese enter Cuctomer VPA");
      isValid = false;
    }

    return isValid;
  };

  const fetchMerchantDetails = async () => {
    try {
      const response = await axios.get(
        API_GATEWAY + "merchants/getalldetailsofmerchant",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${verifytok}`,
          },
        }
      );

      const data = response;
      setMerchantData(data.data.merchantBasicDetails);
      setBusinessDetails(data.data.merchantBusinessDetails);
    } catch (error) {
      // console.error("ERROR", error);
    }
  };

  console.log(merchantData);

  useEffect(() => {
    if (verifytok) {
      fetchMerchantDetails();
    }
  }, [verifytok, merchantId]);

  const submitCardDeatailsConfrimation = async () => {
    if (!validateInputs()) {
      return;
    }
    try {
      const apiUrl = API_GATEWAY + "transactions/getpayment";

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${verifytok}`,
      };

      const cardDetails = {
        merchantOktaId: merchantOktaId,
        merchantId: merchantData.merchantId,
        adminEmailId: "payfiadmin@payfi.co.in",
        targetAccountId: escrowAccountNumber,
        targetOwnerName: "Payfi",
        amount: amount,
        currency: "INR",
        message: message,
        cardNumber: cardNumber,
        cardHolderName: cardHolderName,
        transactionType: "credit",
        latitude: latitude,
        longitude: longitude,
        partnerReferenceNumber: partnerReferenceNumber,
        status: "PENDING",
        expiryDate: cardDate,
        CVV: cardCVV,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${verifytok}`,
        },
        body: JSON.stringify(cardDetails),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Card details submitted successfully:", responseData);
        navigate("/success");
      } else {
        const errorData = await response.json();
        console.error("Error submitting card details:", errorData);
        navigate("/failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const submitRecurringCardDeatailsConfirmation = async () => {
    if (!validateInputs()) {
      return;
    }
    try {
      const apiUrl =
        API_GATEWAY + `recurrings/getsubscriptionpayment/${subscriptionId}`;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${verifytok}`,
      };

      const cardDetails = {
        merchantOktaId: merchantOktaId,
        merchantId: merchantData.merchantId,
        adminEmailId: "payfiadmin@payfi.co.in",
        targetAccountId: escrowAccountNumber,
        targetOwnerName: "Payfi",
        amount: installmentAmount,
        currency: "INR",
        message: message,
        cardNumber: cardNumber,
        cardHolderName: cardHolderName,
        transactionType: "credit",
        latitude: latitude,
        longitude: longitude,
        partnerReferenceNumber: partnerReferenceNumber,
        status: "PENDING",
        expiryDate: cardDate,
        CVV: cardCVV,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${verifytok}`,
        },
        body: JSON.stringify(cardDetails),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Subscription price submitted successfully:", responseData);
        navigate("/success");
      } else {
        const errorData = await response.json();
        console.error("Error submitting card details:", errorData);
        navigate("/failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {authState && authState.accessToken && verifytok ? (
        <div>
          <Navbar />
          <div className="font-bold text-xl flex justify-center items-center">
            <div className="min-w-screen min-h-screen  flex items-center justify-center ">
              <div className="w-auto mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700">
                <div className="w-full pt-1 pb-5">
                  <div className="bg-[#6a5acd] text-white overflow-hidden rounded-full w-36 h-16 -mt-14 mx-auto shadow-lg flex justify-center items-center">
                    <div className="flex justify-center items-center">
                      <div>
                        <img className="h-8" src={paynitelogo} alt="" />
                      </div>
                      <div className="text-white text-xl ml-1 font-semibold">
                        <h1>PayNite</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <h1 className="text-center font-bold text-xl uppercase">
                    Secure payment info
                  </h1>
                </div>
                <div className="mb-3 flex justify-center">
                  <div className="px-2">
                    <label for="type1" class="flex items-center cursor-pointer">
                      <img
                        src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                        className="h-8"
                      />
                    </label>
                  </div>
                  <div className="">
                    <label for="type2" class="flex items-center cursor-pointer">
                      <img
                        src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png"
                        className="h-8"
                      />
                    </label>
                  </div>
                </div>
                <div className="mb-2 flex -mx-2"></div>
                <div className="mb-3">
                  <label className="font-bold text-sm mb-2 ml-1">
                    Cardholder Name
                  </label>
                  <div>
                    <input
                      value={cardHolderName}
                      onChange={handleCardHolderName}
                      className={`px-3 w-full py-1 mb-1 border ${
                        cardHolderNameError ? "border-red-500" : "border-black"
                      } rounded appearance-none`}
                    />
                    {cardHolderNameError && (
                      <p className="text-red-500 text-sm">
                        {cardHolderNameError}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-2">
                  <label className="font-bold text-sm mb-2 ml-1">
                    Card number
                  </label>
                  <div>
                    <input
                      value={cardNumber}
                      onChange={handleCardNumber}
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      className={`px-3 w-full py-1 mb-1 border ${
                        cardNumberError ? "border-red-500" : "border-black"
                      } rounded appearance-none`}
                    />
                    {cardNumberError && (
                      <p className="text-red-500 text-sm">{cardNumberError}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="mb-3">
                    <div className="px-2 ">
                      <label className="font-bold text-sm mb-2 ml-1">
                        Expiration date
                      </label>
                      <div>
                        <input
                          value={cardDate}
                          onChange={handleCardDate}
                          type="text"
                          placeholder="MM/YY"
                          className={`w-64 px-3 py-1 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors ${
                            cardDateError ? "border-red-500" : "border-black"
                          } rounded appearance-none`}
                        />
                        {cardDateError && (
                          <p className="text-red-500 text-sm">
                            {cardDateError}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="px-2">
                      <label className="font-bold text-sm mb-2 ml-1">CVV</label>
                      <div>
                        <input
                          value={cardCVV}
                          onChange={handleCardCVV}
                          className={`w-68 px-3 py-1 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors ${
                            cardCVVError ? "border-red-500" : "border-black"
                          } rounded appearance-none`}
                          placeholder="000"
                          type="text"
                        />
                        {cardCVVError && (
                          <p className="text-red-500 text-sm">{cardCVVError}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="px-2">
                      <label className="font-bold text-sm mb-2 ml-1">
                        Amount
                      </label>

                      <div>
                        <input
                          value={
                            installmentAmount &&
                            parseFloat(installmentAmount) > 0
                              ? installmentAmount
                              : amount
                          }
                          onChange={handleAmount}
                          className={`w-68 px-3 py-1 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors ${
                            amountError ? "border-red-500" : "border-black"
                          } rounded appearance-none`}
                          type="text"
                        />
                        {amountError && (
                          <p className="text-red-500 text-sm">{amountError}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => {
                      if (
                        installmentAmount &&
                        parseFloat(installmentAmount) > 0
                      ) {
                        submitRecurringCardDeatails();
                      } else {
                        submitCardDeatails();
                      }
                    }}
                    className="block w-full max-w-xs mx-auto bg-[#6a5acd] hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                  >
                    <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
                  </button>
                </div>
              </div>
            </div>
          </div>

          {showConfirmationModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>

                <div
                  className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        {/* Heroicon name: check */}
                        <svg
                          className="h-6 w-6 text-green-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-lg leading-6 font-medium text-gray-900"
                          id="modal-headline"
                        >
                          Payment Confirmation
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Do you want to proceed for this payment?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      onClick={() => {
                        if (
                          installmentAmount &&
                          parseFloat(installmentAmount) > 0
                        ) {
                          submitRecurringCardDeatailsConfirmation();
                        } else {
                          submitCardDeatailsConfrimation();
                        }
                      }}
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#6a5acd] text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setShowConfirmationModal(false)}
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showConfirmationModall && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>

                <div
                  className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        {/* Heroicon name: check */}
                        <img
                          className="h-6 w-6 text-green-600"
                          src="https://cdn-icons-png.flaticon.com/512/14035/14035689.png"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-lg leading-6 font-medium text-gray-900"
                          id="modal-headline"
                        >
                          Payment failed!
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Some of the fields are empty or not entered
                            correctly
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    {/* <button
                  onClick={registerMerchantData}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#6a5acd] text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Proceed
                </button> */}
                    <button
                      onClick={() => setShowConfirmationModall(false)}
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#6a5acd] text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Check again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CardDetails;
