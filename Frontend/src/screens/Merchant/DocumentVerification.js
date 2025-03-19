import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";
import { API_GATEWAY } from "../../Apigate/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DocumentVerification = ({ onDocumentVerificationStatusChange }) => {
  const [merchantDocs, setMerchantDocs] = useState([]);
  const { oktaAuth, authState } = useOktaAuth();
  const [verifytok, setVerifytok] = useState([]);
  const [verifyemailtok, setEmailVerifytok] = useState([]);
  const { merchantId } = useParams();
  const [merchantName, setMerchantName] = useState("");
  const [panverification, setPANVerification] = useState(true);
  const [moaverification, setMOAVerification] = useState(true);
  const [aoaverification, setAOAVerification] = useState(true);
  const [bankverification, setBankVerification] = useState(true);
  const [partnershipverification, setPartnershipDeedVerification] =
    useState(true);
  const [comment, setCommentMandatory] = useState("");
  const [buttonColor, setButtonColor] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handlePanInput = (e) => {
    console.log(handlePanInput);
    const commentpaninput = e.target.value;
    if (commentpaninput === "") {
      setPANVerification(true);
    } else {
      setPANVerification(false);
    }
  };

  // yes = true, no = false
  const handlePANdocChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "false") {
      console.log("selectedvalueTrue ", selectedValue);
      handlePanInput(e);
      setPANVerification(selectedValue);
    } else {
      setPANVerification(selectedValue);
      console.log("selectedvaluefalse ", selectedValue);
    }
  };

  const handleMOAdocChange = (event) => {
    const selectedValue = event.target.value === "true"; // Convert the string to a boolean
    setMOAVerification(selectedValue);
  };

  const handleAOAdocChange = (event) => {
    const selectedValue = event.target.value === "true"; // Convert the string to a boolean
    setAOAVerification(selectedValue);
  };
  const handlebankCredentialsdocChange = (event) => {
    const selectedValue = event.target.value === "true"; // Convert the string to a boolean
    setBankVerification(selectedValue);
  };
  const handlePartnershipDeeddocChange = (event) => {
    const selectedValue = event.target.value === "true"; // Convert the string to a boolean
    setPartnershipDeedVerification(selectedValue);
  };

  useEffect(() => {
    if (authState && authState.accessToken) {
      const { accessToken } = authState.accessToken;
      setVerifytok(accessToken);
    } else {
    }
  });

  const fetchMerchantDetails = async () => {
    console.log("verifttoken", verifytok);
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
      setMerchantDocs(data.data);
      setMerchantName(data.data.merchantBasicDetails.merchantName);

      console.log("response", data.data);
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  function dataconversion(b64Data, contentType, sliceSize) {
    contentType = contentType || "";
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  const handlePanView = () => {
    const contentType = "application/pdf";
    const b64Data = merchantDocs.merchantDocumentDetails.pancard_doc;
    const blob = dataconversion(b64Data, contentType);
    const blobUrl = URL.createObjectURL(blob);

    // Open a new window or tab with the PDF content
    const newWindow = window.open(blobUrl, "_blank");

    // Optionally, you can focus the new window
    if (newWindow) {
      newWindow.focus();
    }
  };
  const handleMemAsView = () => {
    const contentType = "application/pdf";
    const b64Data = merchantDocs.merchantDocumentDetails.moadoc;
    const blob = dataconversion(b64Data, contentType);
    const blobUrl = URL.createObjectURL(blob);

    // Open a new window or tab with the PDF content
    const newWindow = window.open(blobUrl, "_blank");

    // Optionally, you can focus the new window
    if (newWindow) {
      newWindow.focus();
    }
  };

  const handleArtAsView = () => {
    const contentType = "application/pdf";
    const b64Data = merchantDocs.merchantDocumentDetails.aoadoc;
    const blob = dataconversion(b64Data, contentType);
    const blobUrl = URL.createObjectURL(blob);

    // Open a new window or tab with the PDF content
    const newWindow = window.open(blobUrl, "_blank");

    // Optionally, you can focus the new window
    if (newWindow) {
      newWindow.focus();
    }
  };

  const handleChequeView = () => {
    const contentType = "application/pdf";
    const b64Data = merchantDocs.merchantDocumentDetails.bankCredentialsCheque;
    const blob = dataconversion(b64Data, contentType);
    const blobUrl = URL.createObjectURL(blob);

    // Open a new window or tab with the PDF content
    const newWindow = window.open(blobUrl, "_blank");

    // Optionally, you can focus the new window
    if (newWindow) {
      newWindow.focus();
    }
  };

  const handleDeedView = () => {
    const contentType = "application/pdf";
    const b64Data = merchantDocs.merchantDocumentDetails.partnerShipDeed;
    const blob = dataconversion(b64Data, contentType);
    const blobUrl = URL.createObjectURL(blob);

    // Open a new window or tab with the PDF content
    const newWindow = window.open(blobUrl, "_blank");

    // Optionally, you can focus the new window
    if (newWindow) {
      newWindow.focus();
    }
  };

  useEffect(() => {
    fetchMerchantDetails();
  }, [verifytok, merchantId]);

  const updateDocumentStatus = () => {
    const apiUrl = API_GATEWAY + "admins/merchant/updatemerchantdocumentstatus";

    const requestData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${verifytok}`,
      },
      body: JSON.stringify({
        emailId: merchantDocs.merchantDocumentDetails.emailId,
        merchantOktaId: merchantDocs.merchantDocumentDetails.merchantOktaId,
        merchantId: merchantDocs.merchantDocumentDetails.merchantDocumentId,
        panDocStatus: panverification,
        partnershipDeedDocStatus: partnershipverification,
        cancelledChequeDocStatus: bankverification,
        moaDocStatus: moaverification,
        aoaDocStatus: aoaverification,
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
        toast.success(
          "Document status updated successfully. Proceed to seller addition",
          {
            autoClose: 2000,
          }
        );
        setTimeout(() => {
          navigate(`/merchantdata/${merchantId}`);
        }, 3000);
        // Handle the successful response here
        onDocumentVerificationStatusChange(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="flex justify-center">
        <h1 className="text-2xl text-[#6a5acd] font-bold py-4 pb-4">
          Merchant Document Verification
        </h1>
      </div>
      <div className="flex justify-center">
        <h1 className="text-2xl text-green-400 font-bold py-4 pb-4">
          Merchant Name - {merchantName}
        </h1>
      </div>
      <div className="px-12 mt-12 w-full overflow-x-auto ">
        <table className="min-w-full bg-white border border-black">
          <thead>
            <tr className="py-4">
              <th className="border px-4 py-6 font-bold text-xl">Documents</th>
              <th className="border px-4 py-6 font-bold text-xl">
                Preview Docs
              </th>
              <th className="border px-4 py-6 font-bold text-xl">
                Verification Status
              </th>
              <th className="border px-4 py-6 font-bold text-xl">
                Comment(if any)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2 font-bold">PAN Card</td>
              <td className="border px-4 py-2 font-bold text-center">
                <button
                  className="bg-[#6a5acd] text-white font-bold py-1 px-3 rounded"
                  onClick={handlePanView}
                >
                  View
                </button>
              </td>
              <td class="border px-4 py-5 font-bold flex items-center justify-center">
                <label for="verification" class="mr-2">
                  Verify:
                </label>
                <select
                  value={panverification}
                  onChange={handlePANdocChange}
                  className="border rounded px-2 py-1"
                >
                  {/* true and false */}
                  <option value={true.toString()}>Yes</option>
                  <option value={false.toString()}>No</option>
                </select>
              </td>
              <td className="border px-4 py-2 font-bold text-center">
                <input
                  className="border py-4 px-16 border-gray-500 rounded"
                  type="text"
                  onChange={handlePanInput}
                  // disabled={comment}
                />
                {comment}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">
                Memorandum of association(MOA)
              </td>
              <td className="border px-4 py-2 font-bold text-center">
                <button
                  className="bg-[#6a5acd] text-white font-bold py-1 px-3 rounded"
                  onClick={handleMemAsView}
                >
                  View
                </button>
              </td>
              <td class="border px-4 py-5 font-bold flex items-center justify-center">
                <label for="verification" class="mr-2">
                  Verify:
                </label>
                <select
                  value={moaverification}
                  onChange={handleMOAdocChange}
                  className="border rounded px-2 py-1"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </td>
              <td className="border px-4 py-2 font-bold text-center">
                <input
                  className="border py-4 px-16 border-gray-500 rounded"
                  type="text"
                />
              </td>
            </tr>

            <tr>
              <td className="border px-4 py-2 font-bold">
                Articles of Association(AOA)
              </td>
              <td className="border px-4 py-2 font-bold text-center">
                <button
                  className="bg-[#6a5acd] text-white font-bold py-1 px-3 rounded"
                  onClick={handleArtAsView}
                >
                  View
                </button>
              </td>
              <td class="border px-4 py-5 font-bold flex items-center justify-center">
                <label for="verification" class="mr-2">
                  Verify:
                </label>
                <select
                  value={aoaverification}
                  onChange={handleAOAdocChange}
                  className="border rounded px-2 py-1"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </td>
              <td className="border px-4 py-2 font-bold text-center">
                <input
                  className="border py-4 px-16 border-gray-500 rounded"
                  type="text"
                />
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Bank Cancel Check</td>
              <td className="border px-4 py-2 font-bold text-center">
                <button
                  className="bg-[#6a5acd] text-white font-bold py-1 px-3 rounded"
                  onClick={handleChequeView}
                >
                  View
                </button>
              </td>
              <td class="border px-4 py-5 font-bold flex items-center justify-center">
                <label for="verification" class="mr-2">
                  Verify:
                </label>
                <select
                  value={bankverification}
                  onChange={handlebankCredentialsdocChange}
                  className="border rounded px-2 py-1"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </td>
              <td className="border px-4 py-2 font-bold text-center">
                <input
                  className="border py-4 px-16 border-gray-500 rounded"
                  type="text"
                />
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-bold">Partneship Deed</td>
              <td className="border px-4 py-2 font-bold text-center">
                <button
                  className="bg-[#6a5acd] text-white font-bold py-1 px-3 rounded"
                  onClick={handleDeedView}
                >
                  View
                </button>
              </td>
              <td class="border px-4 py-5 font-bold flex items-center justify-center">
                <label for="verification" class="mr-2">
                  Verify:
                </label>
                <select
                  value={partnershipverification}
                  onChange={handlePartnershipDeeddocChange}
                  className="border rounded px-2 py-1"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </td>
              <td className="border px-4 py-2 font-bold text-center">
                <input
                  className="border py-4 px-16 border-gray-500 rounded"
                  type="text"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-center">
          <div className="p-4">
            {/* <Link to={`/merchantdata/${merchantId}`}> */}
            <button
              type="submit"
              // disabled={panverification}
              disabled={panverification === "false"}
              className="bg-[#6A5ACD] text-white py-2 px-4 rounded"
              onClick={updateDocumentStatus}
              style={{ backgroundColor: buttonColor }}
            >
              Submit
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentVerification;
