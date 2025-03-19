import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOktaAuth } from "@okta/okta-react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { API_GATEWAY } from "../../Apigate/api";

const AllMerchants = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [verifytok, setVerifytok] = useState(null); // Changed initial state to null
  const [merchantData, setMerchantData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState && authState.accessToken) {
      const { accessToken } = authState.accessToken;
      setVerifytok(accessToken);
    }
  }, [authState]);

  useEffect(() => {
    if (verifytok) {
      // Added verification if verifytok is not null
      fetchMerchantDetails();
    }
  }, [verifytok, currentPage]); // Fetch only if verifytok or currentPage changes

  const fetchMerchantDetails = async () => {
    try {
      const response = await axios.get(
        API_GATEWAY + "admins/merchant/getallmerchants",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${verifytok}`,
          },
        }
      );

      const data = response.data;
      setMerchantData(data);
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  const columnDisplayNames = {
    merchantId: "Merchant ID",
    // merchantOktaId: "Merchant Okta ID",
    merchantName: "Merchant Name",
    emailId: "Email",
    username: "Username",
    profileStatus: "Profile Status",
    merchantContact: "Merchant Contact",
    // designation: "Designation",
    // address: "Address",
    // city: "City",
    // state: "State",
    // country: "Country",
    // postalCode: "Postal Code",
    // accountCurrency: "Account Currency",
    // imstype: "IMSType",
    // bimstype: "BIMSType",
    // description: "Description",
    "View Details": "View Details",
  };

  const columns = Object.keys(columnDisplayNames);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(merchantData.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleViewClick = async (merchantOktaId) => {
    try {
      const response = await axios.get(
        API_GATEWAY +
          "merchants/admin/getalldetailsofmerchant/" +
          `${merchantOktaId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${verifytok}`,
          },
        }
      );

      const data = response.data;

      navigate(`/merchantdata/${merchantOktaId}`);
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = merchantData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <h1 className="text-3xl text-[#6a5acd] font-bold py-4">
          All Merchants
        </h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-collapse">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column} className="py-2 px-4 border border-b">
                  {columnDisplayNames[column]}{" "}
                  {/* Use display name from mapping */}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr
                key={row.merchantId}
                className="hover:bg-gray-100 border border-t"
              >
                {columns.map((column, index) => (
                  <td
                    key={column}
                    className="py-2 px-4 border border-b text-center"
                  >
                    {column === "View Details" ? (
                      <button
                        onClick={() => handleViewClick(row.merchantOktaId)}
                        className="bg-[#6A5ACD] text-white py-1 px-2 rounded"
                      >
                        View Details
                      </button>
                    ) : (
                      row[column]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={handlePrevPage}
          className="bg-[#6A5ACD] text-white py-1 px-2 rounded m-2"
        >
          Previous
        </button>
        {Array.from({
          length: Math.ceil(merchantData.length / rowsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={
              currentPage === index + 1
                ? "bg-[#6A5ACD] text-white py-1 px-2 rounded m-2"
                : "bg-[#6A5ACD] text-white py-1 px-2 rounded m-2"
            }
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          className="bg-[#6A5ACD] text-white py-1 px-2 rounded m-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllMerchants;
