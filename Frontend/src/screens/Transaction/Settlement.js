import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_GATEWAY } from "../../Apigate/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settlement = () => {
  const { merchantId } = useParams();

  const partnerReferenceNumber = 34788441;
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [verifytok, setVerifytok] = useState([]);
  const [merchantData, setMerchantData] = useState([]);
  const [businessdetails, setBusinessDetails] = useState([]);
  const { oktaAuth, authState } = useOktaAuth();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State to manage confirmation modal
  const [showConfirmationModall, setShowConfirmationModall] = useState(false);

  const [bankAccountNumberError, setBankAccountNumberError] = useState("");
  const [amountError, setAmountError] = useState("");

  useEffect(() => {
    if (authState && authState.accessToken) {
      const { accessToken } = authState.accessToken;
      setVerifytok(accessToken);
    }
  }, [authState]);

  const handleAmount = (event) => {
    const inputAmount = event.target.value;
    setAmount(inputAmount);

    if (inputAmount.trim() === "") {
      setAmountError("");
    } else if (!/^\d+$/.test(inputAmount)) {
      setAmountError("Enter a valid Amount.");
    } else {
      setAmountError("");
    }
  };

  const handleBankAccountNumber = (event) => {
    const inputBankAccountNumber = event.target.value;
    setBankAccountNumber(inputBankAccountNumber);

    if (inputBankAccountNumber.trim() === "") {
      setBankAccountNumberError("");
    } else if (!/^\d+$/.test(inputBankAccountNumber)) {
      setBankAccountNumberError("Enter a valid Bank Account Number.");
    } else {
      setBankAccountNumberError("");
    }
  };

  const settleMerchant = async () => {
    if (!validateInputs()) {
      setShowConfirmationModall(true);
    } else {
      setShowConfirmationModal(true);
    }
  };

  const validateInputs = () => {
    let isValid = true;

    if (amountError) {
      setAmountError("Plese enter Amount");
      isValid = false;
    }

    if (!bankAccountNumber) {
      setBankAccountNumberError("Plese enter Bank Account Number");
      isValid = false;
    }

    return isValid;
  };

  const fetchMerchantDetails = async () => {
    // console.log("verifytoken", verifytok);
    // console.log(payload);
    try {
      const response = await axios.get(
        API_GATEWAY +
          "admins/merchant/getalldetailsofmerchant/" +
          `${merchantId}`,

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
      console.log("response", data);
      // console.log(verifytok);
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  useEffect(() => {
    fetchMerchantDetails();
  }, [verifytok]);

  const settleMerchantConfirmation = async () => {
    if (!validateInputs()) {
      return;
    }
    const apiUrl = API_GATEWAY + "transactions/settlemerchant";

    // merchantOktaId: merchantOktaId,
    // merchantId: merchantId,
    // adminEmailId: "payfiadmin@payfi.co.in",
    // // sourceAccountId: 123,
    // // targetAccountId: 456,
    // // targetOwnerName: "John Doe",
    // amount: amount,
    // currency: "INR",
    // message: "Payment for services rendered",
    // // initiationDate: "2024-03-11T12:00:00",
    // // completionDate: "2024-03-11T12:30:00",
    // transactionType: "debit",
    // latitude: 37.7749,
    // longitude: -122.4194,
    // partnerReferenceNumber: partnerReferenceNumber,
    // status: "Completed",

    const payload = {
      merchantOktaId: merchantData.merchantOktaId,
      merchantId: merchantData.merchantId,
      adminEmailId: "payfiadmin@payfi.co.in",
      sourceAccountId: 87399435,
      targetAccountId: 123456,
      targetOwnerName: "Merchant",
      amount: amount,
      currency: "INR",
      message: "Settlement",
      initiationDate: "2024-02-14T10:00:00",
      completionDate: "2024-02-14T10:30:00",
      transactionType: "debit",
      latitude: 40.7128,
      longitude: -74.006,
      partnerReferenceNumber: 34788441,
      status: "PENDING",
    };

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${verifytok}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log(data);
      toast.success("Seller settlement successfull!!", {
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error making POST request:", error);
      toast.success("Seller settlement falied!!", {
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <h1 className="text-3xl text-[#6a5acd] font-bold pt-2 -mb-2">
          Merchant Details
        </h1>
        <ToastContainer />
      </div>
      <div className="flex flex-col">
        <div className="flex py-6">
          <table className="w-1/2 m-4 border border-black border-collapse">
            <thead>
              <tr>
                <th className="text-2xl border px-2 py-4 font-bold" colSpan="2">
                  Merchant Settlement
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-1 font-bold">Settlement Amount</td>
                <td className="border p-1 font-bold">
                  <input
                    type="text"
                    value={amount}
                    onChange={handleAmount}
                    className={`px-3 w-full py-1 mb-1 border ${
                      amountError ? "border-red-500" : "border-black"
                    } rounded appearance-none`}
                  />
                  {amountError && (
                    <p className="text-red-500 text-sm">{amountError}</p>
                  )}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Bank Account Number</td>
                <td className="border p-1 font-bold">
                  <input
                    type="text"
                    value={bankAccountNumber}
                    onChange={handleBankAccountNumber}
                    className={`px-3 w-full py-1 mb-1 border ${
                      bankAccountNumberError ? "border-red-500" : "border-black"
                    } rounded appearance-none`}
                  />
                  {bankAccountNumberError && (
                    <p className="text-red-500 text-sm">
                      {bankAccountNumberError}
                    </p>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-center">
          <div className="p-4">
            <button
              type="submit"
              className="bg-[#6A5ACD] text-white py-2 px-4 rounded"
              onClick={settleMerchant}
            >
              Settle Merchant
            </button>
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
                      Settlement Confirmation
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Do you want to settle the amount?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={settleMerchantConfirmation}
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
                      Settlement failed!
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Some of the fields are empty or not entered correctly
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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
    </>
  );
};

export default Settlement;
