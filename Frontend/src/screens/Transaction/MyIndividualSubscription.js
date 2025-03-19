import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { selectSellerData, setSellerData } from "../../features/dataReducer";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_GATEWAY } from "../../Apigate/api";

const MyIndividualSubscription = () => {
  const dispatch = useDispatch();
  const { oktaAuth, authState } = useOktaAuth();
  const [verifytok, setVerifytok] = useState(null);
  const [subscriptionDetail, setSubscriptionDetail] = useState([]);
  const { subscriptionId } = useParams();
  const navigate = useNavigate();

  const sellerStatus = useSelector(selectSellerData);

  const partnerReferenceNumber = 34788441;
  const partnerName = "Payfi";

  useEffect(() => {
    if (authState && authState.accessToken) {
      const { accessToken } = authState.accessToken;
      setVerifytok(accessToken);
    }
  }, [authState]);

  useEffect(() => {
    if (verifytok) {
      getSubscription();
    }
  }, [verifytok, subscriptionId]);

  const fieldMapping = {
    subscriptionId: "Subscription ID",
    merchantOktaId: "Merchant Okta ID",
    merchantId: "Merchant ID",
    subscriptionStartDate: "Start Date",
    subscriptionExpireDate: "Expire Date",
    frequency: "Frequency",
    installmentAmount: "Installment Amount",
    subscriptionProduct: "Product",
    subscriptionStatus: "Status",
    paymentStatus: "Payment Status",
    transactionId: "Transaction ID",
    autoDebit: "Auto Debit",
  };

  const getSubscription = async () => {
    try {
      const response = await axios.get(
        API_GATEWAY + `recurrings/getsubscription/${subscriptionId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${verifytok}`,
          },
        }
      );

      const data = response.data;
      setSubscriptionDetail(data);
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  const handleDelete = () => {
    axios
      .delete(API_GATEWAY + `recurrings/deletesubscription/${subscriptionId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${verifytok}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Recurring subscription deleted successfully", {
          autoClose: 1000,
        });
        setTimeout(() => {
          navigate("/my subscriptions");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error deleting subscription:", error);
        toast.error("Recurring subscription deletion failed", {
          autoClose: 2000,
        });
      });
  };

  const isButtonDisabled = () => {
    return (
      subscriptionDetail.subscriptionStatus === "ACTIVE" &&
      subscriptionDetail.paymentStatus === "PAID"
    );
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="flex justify-center">
        <h1 className="text-3xl text-[#6a5acd] font-bold py-4">
          Subscription Detalis
        </h1>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Field Name</th>
              <th className="px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(subscriptionDetail).map(([key, value]) => (
              <tr key={key}>
                <td className="border px-4 py-2">{fieldMapping[key]}</td>
                <td className="border px-4 py-2">
                  {key === "installmentAmount" ? `₹${value}` : value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center gap-4 mb-2">
        <div className="flex justify-center mt-4">
          <Link
            to={`/payment methods?installmentAmount=${subscriptionDetail.installmentAmount}&subscriptionId=${subscriptionDetail.subscriptionId}`}
          >
            <button
              className={`bg-[#6a5acd] text-white font-bold py-2 px-4 rounded ${
                isButtonDisabled() ? "bg-gray-400 cursor-not-allowed" : ""
              }`}
              disabled={isButtonDisabled()}
            >
              Pay Now
            </button>
          </Link>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleDelete}
            className="bg-[#6a5acd] text-white font-bold py-2 px-4 rounded"
          >
            Delete Subscription
          </button>
        </div>
      </div>
    </>
  );
};

export default MyIndividualSubscription;

{
  /* <Link
to={`/paymentmethods?installmentAmount=${subscriptionDetail.installmentAmount}&subscriptionId=${subscriptionDetail.subscriptionId}`}
> */
}
