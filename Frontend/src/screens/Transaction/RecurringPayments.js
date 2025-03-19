import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import paynitelogo from "../../assets/images/paynitelogo.png";
import { useOktaAuth } from "@okta/okta-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_GATEWAY } from "../../Apigate/api";
import { useLocation } from "react-router-dom";

const RecurringPayments = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [verifytok, setVerifytok] = useState(null);
  const [merchantData, setMerchantData] = useState([]);
  const [businessdetails, setBusinessDetails] = useState([]);
  const { merchantId } = useParams();
  const [frequency, setFrequency] = useState("");
  const [installmentAmount, setInstallmentAmount] = useState("");
  const [autodebit, setAutodebit] = useState("true");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State to manage confirmation modal

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const planName = searchParams.get("plan");

  useEffect(() => {
    if (authState && authState.accessToken) {
      const { accessToken } = authState.accessToken;
      setVerifytok(accessToken);
    } else {
    }
  });

  const handleFrequency = (e) => {
    setFrequency(e.target.value);
  };

  const handleInstallmentAmount = (e) => {
    setInstallmentAmount(e.target.value);
  };

  const handleAutodebit = (e) => {
    setAutodebit(e.target.value);
  };

  const handleRecurringPayment = async () => {
    setShowConfirmationModal(true); // Show confirmation modal on button click
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
      console.log("response", merchantData.merchantId);
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  useEffect(() => {
    if (verifytok) {
      fetchMerchantDetails();
    }
  }, [verifytok, merchantId]);

  const handleSubscriptionConfirmation = async () => {
    try {
      const apiUrl = API_GATEWAY + "recurrings/addsubscription";

      const recurringPaymentDetails = {
        merchantOktaId: merchantData.merchantOktaId,
        merchantId: merchantData.merchantId,
        frequency: frequency,
        installmentAmount: installmentAmount,
        subscriptionProduct: planName,
        isAutoDebit: false,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${verifytok}`,
        },
        body: JSON.stringify(recurringPaymentDetails),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Recurring Plan subscribed successfully:", responseData);
        toast.success("Recurring Plan subscribed successfully", {
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error("Error subscribing recurring plan:", errorData);
        toast.error("Error subscribing recurring plan", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-md shadow-md">
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
          <h1 className="text-3xl text-[#6a5acd] mt-3 text-center font-bold mb-4">
            Recurring Payment
          </h1>

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          <div className="flex justify-center gap-4">
            <div>
              <div className="mt-4">
                <label className="block text-sm font-bold text-gray-700">
                  Merchant ID
                </label>
                <input
                  value={merchantData.merchantId}
                  type="text"
                  disabled
                  className="mt-1 w-full py-0.5 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-bold text-gray-700">
                  Subscription Product
                </label>
                <input
                  value={planName}
                  type="text"
                  className="mt-1 w-full py-0.5 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  disabled
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-bold text-gray-700">
                  Frequency (in Months)
                </label>
                <input
                  value={frequency}
                  type="text"
                  className="mt-1 w-full py-0.5 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={handleFrequency}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-bold text-gray-700">
                  Installment Amount
                </label>
                <input
                  value={installmentAmount}
                  type="text"
                  className="mt-1 w-full py-0.5 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={handleInstallmentAmount}
                />
              </div>

              <div className="mt-4">
                <div className="mt-4">
                  <label className="block text-sm font-bold text-gray-700">
                    Auto Debit
                  </label>
                  <select
                    value={autodebit}
                    onChange={handleAutodebit}
                    className="mt-1 w-full py-0.5 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleRecurringPayment}
              className="block w-full max-w-xs mx-auto bg-[#6a5acd] hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 mt-4 py-2 font-semibold"
            >
              <i className="mdi mdi-lock-outline mr-1"></i> Create Subscription
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
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
                      Subscription Confirmation
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Do you want to subscribe to this plan?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSubscriptionConfirmation}
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
    </div>
  );
};

export default RecurringPayments;
