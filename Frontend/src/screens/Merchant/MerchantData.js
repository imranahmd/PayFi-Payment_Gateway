import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { selectSellerData, setSellerData } from "../../features/dataReducer";
import { useDispatch, useSelector } from "react-redux";
import { API_GATEWAY } from "../../Apigate/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MerchantData = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate;
  const { oktaAuth, authState } = useOktaAuth();
  const [verifytok, setVerifytok] = useState(null);
  const [merchantData, setMerchantData] = useState([]);
  const [businessdetails, setBusinessDetails] = useState([]);
  const { merchantId } = useParams();
  const navigate = useNavigate();
  const [documentVerificationStatus, setDocumentVerificationStatus] =
    useState(false);
  const [isBankVerified, setIsBankVerified] = useState(false);

  const [profileStatus, setProfileStatus] = useState(
    localStorage.getItem(`profileStatus_${merchantId}`) || "No"
  );
  const [bankStatus, setBankStatus] = useState(
    localStorage.getItem(`bankStatus_${merchantId}`) || "No"
  );

  const sellerStatus = useSelector(selectSellerData);
  const partnerReferenceNumber = 34788441;
  const partnerName = "Payfi";

  useEffect(() => {
    if (authState && authState.accessToken) {
      const { accessToken } = authState.accessToken;
      setVerifytok(accessToken);
    }
  }, [authState]);

  const fetchMerchantDetails = async () => {
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

      const data = response.data;
      setMerchantData(data.merchantBasicDetails);
      setBusinessDetails(data.merchantBusinessDetails);

      const storedProfileStatus = localStorage.getItem(
        `profileStatus_${merchantId}`
      );
      const storedBankStatus = localStorage.getItem(`bankStatus_${merchantId}`);

      if (storedProfileStatus) {
        setProfileStatus(storedProfileStatus);
      }

      if (storedBankStatus) {
        setBankStatus(storedBankStatus);
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  useEffect(() => {
    if (verifytok) {
      // Added verification if verifytok is not null
      fetchMerchantDetails();
    }
  }, [verifytok, merchantId]);

  const updateProfileStatus = () => {
    const apiUrl = API_GATEWAY + "merchants/admin/updatemerchantprofilestatus";

    const requestData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${verifytok}`,
      },
      body: JSON.stringify({
        merchantOktaId: merchantData.merchantOktaId,
        profileStatus: "Active",
      }),
    };

    fetch(apiUrl, requestData)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        toast.success("Seller PG verification successful.", {
          autoClose: 2000,
        });
        setProfileStatus("Yes");
        localStorage.setItem(`profileStatus_${merchantId}`, "Yes");
        setTimeout(() => {
          navigate("/all merchants");
        }, 3000);
      })

      .catch((error) => {
        console.error("Error:", error);
        toast.error("Seller PG verification failed.", {
          autoClose: 2000,
        });
      });
  };

  const handleSellerAddition = async () => {
    const url = API_GATEWAY + "transactions/selleraddition";

    const payload = {
      merchantOktaId: merchantData.merchantOktaId,
      partnerReferenceNumber: partnerReferenceNumber,
      partnerName: partnerName,
      merchantId: merchantData.merchantId,
      emailId: merchantData.emailId,
      merchantName: merchantData.merchantName,
      gstNumber: businessdetails.gstNumber,
      companyPAN: businessdetails.companyPAN,
      bankAccountNumber: businessdetails.bankAccountNumber,
    };

    try {
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${verifytok}`,
        },
      });

      const data = response.data;
      console.log("merchantbank", data);
      setBankStatus("Yes");
      toast.success("Seller bank verification successful.", {
        autoClose: 2000,
      });
      // setTimeout(() => {
      //   navigate("/");
      // }, 3000);
      localStorage.setItem(`bankStatus_${merchantId}`, "Yes");
      setDocumentVerificationStatus(true);
      setIsBankVerified(true);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Seller bank verification failed.", {
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
              <tr className="w-[100%]">
                <td className="w-[30%] border p-1 font-bold">
                  Partner Reference Number
                </td>
                <td className="w-[70%] border p-1 font-bold">
                  {partnerReferenceNumber}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">Partner Name</td>
                <td className="border p-1 font-bold">{partnerName}</td>
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
                <td
                  className={`w-[70%] border p-1 font-bold ${
                    bankStatus === "Yes" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {bankStatus}
                </td>
              </tr>
              <tr>
                <td className="border p-1 font-bold">PG Verified</td>
                <td
                  className={`border p-1 font-bold ${
                    profileStatus === "Yes" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {profileStatus}
                </td>
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
                  className={`${
                    bankStatus === "Yes" && profileStatus === "Yes"
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-[#6A5ACD] text-white"
                  } py-2 px-4 rounded`}
                  disabled={bankStatus === "Yes" && profileStatus === "Yes"}
                >
                  1. Proceed to document verification
                </button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="p-4">
              <button
                type="submit"
                className={`${
                  bankStatus === "Yes"
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-[#6A5ACD] text-white"
                } py-2 px-4 rounded`}
                onClick={handleSellerAddition}
                disabled={bankStatus === "Yes"}
              >
                2. Add Seller to Bank
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="p-4">
              <button
                type="submit"
                className={`${
                  profileStatus === "Yes"
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-[#6A5ACD] text-white"
                } py-2 px-4 rounded`}
                onClick={updateProfileStatus}
                disabled={profileStatus === "Yes"}
              >
                3. Add Seller to PG
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MerchantData;
