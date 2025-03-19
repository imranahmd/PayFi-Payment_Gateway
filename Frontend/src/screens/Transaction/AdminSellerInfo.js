import React, { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";
import Navbar from "../Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { API_GATEWAY } from "../../Apigate/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminSellerInfo = () => {
  const [data, setData] = useState(null);
  const { oktaAuth, authState } = useOktaAuth();
  const [verifytok, setVerifytok] = useState(null);
  const [sellerInfo, setSellerInfo] = useState(
    JSON.parse(localStorage.getItem("sellerInfo")) || {}
  );
  const [merchantData, setMerchantData] = useState([]);
  const [businessdetails, setBusinessDetails] = useState([]);
  const partnerReferenceNumber = 34788441;
  const navigate = useNavigate();

  useEffect(() => {
    if (authState && authState.accessToken) {
      const { accessToken } = authState.accessToken;
      setVerifytok(accessToken);
    } else {
      // Handle the case when authState or authState.accessToken is not available
    }
  }, [authState]);

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

      const data = response.data;
      setMerchantData(data.merchantBasicDetails);
      setBusinessDetails(data.merchantBusinessDetails);
      console.log("response", data);
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  useEffect(() => {
    if (verifytok) {
      fetchMerchantDetails();
    }
  }, [verifytok]);

  const getSellerInfo = async () => {
    try {
      const response = await axios.post(
        API_GATEWAY + "transactions/merchantinfo",
        {
          partnerReferenceNumber: partnerReferenceNumber,
          merchantOktaId: merchantData.merchantOktaId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${verifytok}`,
          },
        }
      );

      const sellerInfoData = response.data;
      setSellerInfo(sellerInfoData);
      toast.success("Seller info fetched successfully", {
        autoClose: 2000,
      });
      // setTimeout(() => {
      //   navigate("/");
      // }, 3000);

      // Store data in local storage
      localStorage.setItem("sellerInfo", JSON.stringify(sellerInfoData));

      console.log("response", sellerInfoData);
    } catch (error) {
      console.error("ERROR", error);
      toast.error("Seller info fetching failed", {
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="flex justify-center">
        <button
          onClick={getSellerInfo}
          className="bg-[#6a5acd] rounded text-white px-4 py-2 m-2"
        >
          Fetch My Info
        </button>
      </div>
      <div className="flex flex-col">
        <div className="flex py-6">
          <table className="w-1/2 m-4 border border-black border-collapse">
            <thead>
              <tr>
                <th className="text-2xl border px-2 py-4 font-bold" colSpan="2">
                  Seller Information
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="w-[100%]">
                <td className="w-[30%] border p-1 font-bold">
                  Partner Reference Number
                </td>
                <td className="w-[70%] border p-1 font-bold">
                  {sellerInfo.partnerReferenceNumber}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Partner Name</td>
                <td className="border p-1 font-bold">
                  {sellerInfo.partnerName}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Legal Name</td>
                <td className="border p-1 font-bold">{sellerInfo.legalName}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Mobile Number</td>
                <td className="border p-1 font-bold">
                  {sellerInfo.mobileNumber}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Email ID</td>
                <td className="border p-1 font-bold">{sellerInfo.emailId}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Address</td>
                <td className="border p-1 font-bold">{sellerInfo.address}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">City</td>
                <td className="border p-1 font-bold">{sellerInfo.city}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">State</td>
                <td className="border p-1 font-bold">{sellerInfo.state}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Pin Code</td>
                <td className="border p-1 font-bold">{sellerInfo.pincode}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">GST In.</td>
                <td className="border p-1 font-bold">{sellerInfo.gstin}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">PAN</td>
                <td className="border p-1 font-bold">{sellerInfo.pan}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Status</td>
                <td className="border p-1 font-bold">{sellerInfo.status}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Escrow Account Number</td>
                <td className="border p-1 font-bold">
                  {sellerInfo.escrowAccountNumber}{" "}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Balance</td>
                <td className="border p-1 font-bold">{sellerInfo.balance}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Transactions</td>
                <td className="border p-1 font-bold">
                  {sellerInfo.transactions}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminSellerInfo;
