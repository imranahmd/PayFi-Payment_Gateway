import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { useOktaAuth } from "@okta/okta-react";
import { useSelector } from "react-redux";
import axios from "axios";
// import { jwtDecode } from "jwt-decode";
import { useParams, Link } from "react-router-dom";
import { setSellerAdditionData } from "../../features/dataReducer";
import { API_GATEWAY } from "../../Apigate/api";
// import './styles.css';
// import { selectSellerAdditionData } from "../../features/dataReducer";

const PGverification = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [verifytok, setVerifytok] = useState([]);
  const [merchantData, setMerchantData] = useState([]);
  const [businessdetails, setBusinessDetails] = useState([]);
  const [merchantID, setMerchantID] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sellerData, setSellerData] = useState([]);
  // const data1 = useSelector((state) => state.data.data1);
  const { merchantId } = useParams();
  // const merchant_id = data1.id;
  const [profileStatus, setProfileStatus] = useState("");
  // const sellerAdditionData = useSelector(selectSellerAdditionData);
  // console.log(sellerAdditionData);

  useEffect(() => {
    if (authState && authState.accessToken) {
      const { accessToken } = authState.accessToken;
      setVerifytok(accessToken);
      // console.log("accesstoken", verifytok);
    } else {
      // Handle the case where authState or authState.accessToken is null
      // console.log("error");
    }
  });

  const fetchMerchantDetails = async () => {
    console.log("verifttoken", verifytok);
    // console.log(payload);
    try {
      const response = await axios.get(
        API_GATEWAY + 'admins/merchant/getalldetailsofmerchant/' + `${merchantId}`,
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
      console.log(sellerData)
      // setSellerData(sellerAdditionData);
      console.log("response", data);
      // console.log(verifytok);
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  useEffect(() => {
    fetchMerchantDetails();
  }, [verifytok, merchantId]);
  // Dependency array to watch for changes in authState.accessToken

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <h1 className="text-3xl text-[#6a5acd] font-bold pt-2 -mb-2">
          Merchant Details
        </h1>
      </div>
      <div className="flex flex-col">
        <div className="flex py-6">
          <table className="w-1/2 m-4 border border-black border-collapse">
            <thead>
              <tr>
                <th className="text-2xl border px-2 py-4 font-bold" colSpan="2">
                  Basic Information
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="w-[100%]">
                <td className="w-[30%] border p-1 font-bold">Name</td>
                <td className="w-[70%] border p-1 font-bold">
                  {merchantData.merchantName}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Username</td>
                <td className="border p-1 font-bold">
                  {merchantData.username}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Email</td>
                <td className="border p-1 font-bold">{merchantData.emailId}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Contact</td>
                <td className="border p-1 font-bold">
                  {merchantData.merchantContact}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Designation</td>
                <td className="border p-1 font-bold">
                  {merchantData.designation}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Address</td>
                <td className="border p-1 font-bold">{merchantData.address}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">City</td>
                <td className="border p-1 font-bold">{merchantData.city}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">State</td>
                <td className="border p-1 font-bold">{merchantData.state}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Country</td>
                <td className="border p-1 font-bold">{merchantData.country}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Postal Code</td>
                <td className="border p-1 font-bold">
                  {merchantData.postalCode}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Account Currency</td>
                <td className="border p-1 font-bold">
                  {merchantData.accountCurrency}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">IMS Type</td>
                <td className="border p-1 font-bold">{merchantData.imstype}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">BIMS Type</td>
                <td className="border p-1 font-bold">
                  {merchantData.bimstype}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Description</td>
                <td className="border p-1 font-bold">
                  {merchantData.description}
                </td>
              </tr>
              {/* <tr>
                <td className="border p-1 font-bold">Profile Status</td>
                <td className="border p-1 font-bold">Bank Verified</td>
                <td className="border p-1 font-bold">PG Verified</td>
              </tr> */}
            </tbody>
          </table>

          <table className="w-1/2 m-4 border border-black border-collapse">
            <thead>
              <tr>
                <th className="text-2xl border px-2 py-4 font-bold" colSpan="2">
                  Business Information
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="w-[100%]">
                <td className="w-[30%] border p-1 font-bold">Company Name</td>
                <td className="w-[70%] border p-1 font-bold">
                  {businessdetails.companyName}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Company Type</td>
                <td className="border p-1 font-bold">
                  {businessdetails.companyType}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">GST</td>
                <td className="border p-1 font-bold">
                  {businessdetails.gstNumber}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">
                  Directors Identification Number
                </td>
                <td className="border p-1 font-bold">
                  {businessdetails.directorsIdentificationNumber}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Company PAN</td>
                <td className="border p-1 font-bold">
                  {businessdetails.companyPAN}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">
                  Corporate Indentification Number
                </td>
                <td className="border p-1 font-bold">{businessdetails.cin}</td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Bank Account Number</td>
                <td className="border p-1 font-bold">
                  {businessdetails.bankAccountNumber}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Company website link</td>
                <td className="border p-1 font-bold">
                  {businessdetails.companyWebsiteLink}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Company Email</td>
                <td className="border p-1 font-bold">
                  {businessdetails.emailId}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Business Contact</td>
                <td className="border p-1 font-bold">
                  {businessdetails.businessContact}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <table className="w-1/2 m-4 border border-black border-collapse">
            <thead>
              <tr>
                <th className="text-2xl border px-2 py-4 font-bold" colSpan="2">
                  Profile Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="w-[100%]">
                <td className="w-[30%] border p-1 font-bold">Bank Verified</td>
                <td className="w-[70%] border p-1 font-bold">
                  {sellerData.profileStatus === "Bank Verified" ? "Yes" : "No"}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">PG Verified</td>
                <td className="border p-1 font-bold"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center gap-4">
          <div className="flex justify-center">
            <div className="p-4">
              <Link to={`/document/${merchantId}`}>
                <button
                  type="submit"
                  className="bg-[#6A5ACD] text-white py-2 px-4 rounded"
                  // onClick={registerMerchantData}
                >
                  Proceed to document verification
                </button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="p-4">
              <Link to={`/document/${merchantId}`}>
                <button
                  type="submit"
                  className="bg-[#6A5ACD] text-white py-2 px-4 rounded"
                  // onClick={registerMerchantData}
                >
                  Proceed to PG verification
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PGverification;
