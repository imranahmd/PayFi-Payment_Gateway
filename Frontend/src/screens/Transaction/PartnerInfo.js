import React, { useState } from "react";
import { useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { API_GATEWAY } from "../../Apigate/api";

const PartnerInfo = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [verifytok, setVerifytok] = useState(null);
  const [partnerInfo, setPartnerInfo] = useState([]);

  useEffect(() => {
    if (authState && authState.accessToken) {
      const { accessToken } = authState.accessToken;
      setVerifytok(accessToken);
    } else {
    }
  });

  const getPartnerInfo = async () => {
    try {
      const response = await axios.get(
        API_GATEWAY + "transactions/partnerinfo",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${verifytok}`,
          },
        }
      );

      const data = response;
      //   setMerchantData(data.data.merchantBasicDetails);
      //   setBusinessDetails(data.data.merchantBusinessDetails);
      console.log("response", data.data);
      setPartnerInfo(data.data);
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  useEffect(() => {
    if (verifytok) {
      getPartnerInfo();
    }
  }, [verifytok]);
  return (
    <>
      <Navbar />
      <div className="flex justify-center"></div>
      <div className="flex flex-col">
        <div className="flex py-6">
          <table className="w-1/2 m-4 border border-black border-collapse">
            <thead>
              <tr>
                <th
                  className="text-[#6A5ACD] text-2xl border px-2 py-4 font-bold"
                  colSpan="2"
                >
                  Partner Information
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="w-[100%]">
                <td className="w-[30%] border p-1 font-bold">
                  Partner Reference Number
                </td>
                <td className="w-[70%] border p-1 font-bold">
                  {partnerInfo.partnerReferenceNumber}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Partner Name</td>
                <td className="border p-1 font-bold">
                  {partnerInfo.partnerName}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Legal Name</td>
                <td className="border p-1 font-bold">
                  {partnerInfo.legalName}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Mobile Number</td>
                <td className="border p-1 font-bold">
                  {partnerInfo.mobileNumber}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Email ID</td>
                <td className="border p-1 font-bold">{partnerInfo.emailId}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Address</td>
                <td className="border p-1 font-bold">{partnerInfo.address}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">City</td>
                <td className="border p-1 font-bold">{partnerInfo.city}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">State</td>
                <td className="border p-1 font-bold">{partnerInfo.state}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Pin Code</td>
                <td className="border p-1 font-bold">{partnerInfo.pincode}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">GST In.</td>
                <td className="border p-1 font-bold">{partnerInfo.gstin}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">PAN</td>
                <td className="border p-1 font-bold">{partnerInfo.pan}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Status</td>
                <td className="border p-1 font-bold">{partnerInfo.status}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Escrow Account Number</td>
                <td className="border p-1 font-bold">
                  {partnerInfo.escrowAccountNumber}{" "}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Balance</td>
                <td className="border p-1 font-bold">{partnerInfo.balance}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Transactions</td>
                <td className="border p-1 font-bold">
                  {partnerInfo.transactions}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PartnerInfo;
