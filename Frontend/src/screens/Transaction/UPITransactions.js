import React, { useState, useEffect } from "react";
import Navbar from "../Navbar.js";
import paynitelogo from "../../assets/images/paynitelogo.png";
import { useLocation } from "react-router-dom";
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
import { cdn1 } from "../../assets/images/images.js";

const UPITransactions = () => {
  const navigate = useNavigate();

  const { oktaAuth, authState } = useOktaAuth();
  const [verifytok, setVerifytok] = useState(null);
  const { merchantId } = useParams();
  const [customerVpa, setCustomerVpa] = useState("");
  const [amount, setAmount] = useState("");
  const [merchantData, setMerchantData] = useState([]);
  const [businessdetails, setBusinessDetails] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const installmentAmount = searchParams.get("installmentAmount");
  const subscriptionId = searchParams.get("subscriptionId");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State to manage confirmation modal
  const [showConfirmationModall, setShowConfirmationModall] = useState(false);

  //

  const [customerVpaError, setCustomerVpaError] = useState(null);
  const [amountError, setAmountError] = useState(null);

  const partnerReferenceNumber = 34788441;
  const escrowAccountNumber = 87399435;

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

  const handleVPA = (event) => {
    const inputCustomerVPA = event.target.value;
    setCustomerVpa(inputCustomerVPA);
    const validVPARegex = /^(?![0-9])[A-Za-z@\s]+$/; // Updated regex

    if (validVPARegex.test(inputCustomerVPA)) {
      setCustomerVpaError("");
    } else if (inputCustomerVPA === "") {
      setCustomerVpaError(null);
    } else {
      // Input contains invalid characters or starts with a number
      setCustomerVpaError("Enter valid VPA");
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

  const handleUPIPayment = async () => {
    if (!validateInputs()) {
      setShowConfirmationModall(true);
    } else {
      setShowConfirmationModal(true);
    }
  };

  const handleRecurringUPIPayment = async () => {
    if (!validateInputs()) {
      setShowConfirmationModall(true);
    } else {
      setShowConfirmationModal(true);
    }
  };

  const validateInputs = () => {
    let isValid = true;

    if (customerVpaError || !customerVpa) {
      setCustomerVpaError("Plese enter Customer VPA");
      isValid = false;
    }

    if (amountError || !amount) {
      setAmountError("Plese enter the Amount.");
      isValid = false;
    }

    if (
      installmentAmount &&
      parseFloat(installmentAmount) > 0 &&
      customerVpa !== null
    ) {
      setAmountError(null);
      isValid = false;
    }

    // if (customerVpa && installmentAmount) {
    //   setAmountError(null);
    //   setCustomerVpaError(null);
    //   isValid = true;
    // }

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
      console.error("ERROR", error);
    }
  };

  useEffect(() => {
    if (verifytok) {
      fetchMerchantDetails();
    }
  }, [verifytok, merchantId]);

  const handleUPIPaymentConfirmation = async () => {
    if (!validateInputs()) {
      return;
    }
    try {
      const apiUrl = API_GATEWAY + "transactions/getupipayment";

      const upiDetails = {
        merchantOktaId: merchantOktaId,
        merchantId: merchantData.merchantId,
        adminEmailId: "payfiadmin@payfi.co.in",
        targetAccountId: escrowAccountNumber,
        targetOwnerName: "payfi",
        amount: amount,
        currency: "INR",
        message: "Payment for goods",
        transactionType: "credit",
        latitude: 12.345678,
        longitude: 23.456789,
        partnerReferenceNumber: partnerReferenceNumber,
        customerVpa: customerVpa,
        status: "PENDING",
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${verifytok}`,
        },
        body: JSON.stringify(upiDetails),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("UPI details submitted successfully:", responseData);
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

  const handleRecurringUPIPaymentConfirmation = async () => {
    if (!validateInputs()) {
      return;
    }
    try {
      const apiUrl =
        API_GATEWAY + `recurrings/getsubscriptionupipayment/${subscriptionId}`;

      const upiRecurringDetails = {
        merchantOktaId: merchantOktaId,
        merchantId: merchantData.merchantId,
        adminEmailId: "payfiadmin@payfi.co.in",
        targetAccountId: escrowAccountNumber,
        targetOwnerName: "payfi",
        amount: installmentAmount,
        currency: "INR",
        message: "Payment for goods",
        transactionType: "credit",
        latitude: 12.345678,
        longitude: 23.456789,
        partnerReferenceNumber: partnerReferenceNumber,
        customerVpa: customerVpa,
        status: "PENDING",
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${verifytok}`,
        },
        body: JSON.stringify(upiRecurringDetails),
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
              <div className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700">
                <div className="w-full pt-1 pb-5">
                  <div className="bg-[#6a5acd] text-white overflow-hidden rounded-full w-36 h-16 -mt-14 mx-auto shadow-lg flex justify-center items-center">
                    <div className="flex justify-center items-center">
                      <div>
                        <img className="h-8" src={paynitelogo} alt="" />
                      </div>
                      <div className="text-black text-xl ml-1 font-semibold">
                        <h1>PayNite</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <h1 className="text-center font-bold text-xl uppercase">
                    UPI Transactions
                  </h1>
                </div>
                <div className="px-2">
                  <label
                    for="type1"
                    className="flex items-center justify-center cursor-pointer"
                  >
                    <img src={cdn1} className="h-8" />
                  </label>
                </div>
                <div className="mb-3 flex -mx-2"></div>
                <div className="mb-6">
                  <label className="font-bold text-sm mb-2 ml-1">
                    Enter your Virtual Payment Address(VPA)
                  </label>
                  <div>
                    <input
                      value={customerVpa}
                      onChange={handleVPA}
                      type="text"
                      className={`px-3 w-full py-1 mb-1 border ${
                        customerVpaError ? "border-red-500" : "border-black"
                      } rounded appearance-none`}
                    />
                    {customerVpaError && (
                      <p className="text-red-500 text-sm">{customerVpaError}</p>
                    )}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="font-bold text-sm mb-2 ml-1">Amount</label>
                  <div>
                    <input
                      value={
                        installmentAmount && parseFloat(installmentAmount) > 0
                          ? installmentAmount
                          : amount
                      }
                      onChange={handleAmount}
                      className={`px-3 w-full py-1 mb-1 border ${
                        amountError ? "border-red-500" : "border-black"
                      } rounded appearance-none`}
                    />
                    {amountError && (
                      <p className="text-red-500 text-sm">{amountError}</p>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => {
                      if (
                        installmentAmount &&
                        parseFloat(installmentAmount) > 0
                      ) {
                        handleRecurringUPIPayment();
                      } else {
                        handleUPIPayment();
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

          {showConfirmationModal && ( //true input
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
                          handleRecurringUPIPaymentConfirmation();
                        } else {
                          handleUPIPaymentConfirmation();
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
          {showConfirmationModall && ( //false input
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

export default UPITransactions;
