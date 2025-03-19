import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOktaAuth } from "@okta/okta-react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { API_GATEWAY } from "../../Apigate/api";

const SellerTransaction = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [verifytok, setVerifytok] = useState(null);
  const [merchantData, setMerchantData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [rowsPerPage] = useState(10); // Rows per page
  const navigate = useNavigate();

  useEffect(() => {
    if (authState && authState.accessToken) {
      const { accessToken } = authState.accessToken;
      setVerifytok(accessToken);
    }
  }, [authState]); // Include authState in the dependency array

  useEffect(() => {
    if (verifytok) {
      fetchMerchantDetails();
    }
  }, [verifytok, currentPage]); // Include verifytok and currentPage in the dependency array

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

  const columnsMapping = {
    // Original API names mapped to desired UI names
    "merchantId": "Merchant ID",
    // merchantOktaId: "Merchant Okta ID",
    merchantName: "Merchant Name",
    emailId: "Email ID",
    // "username": "Username",
    profileStatus: "Profile Status",
    // "merchantContact": "Merchant Contact",
    // "designation": "Designation",
    // "address": "Address",
    // "city": "City",
    // "state": "State",
    // "country": "Country",
    postalCode: "Postal Code",
    accountCurrency: "Account Currency",
    // "imstype": "IMSType",
    // "bimstype": "BIMSType",
    // "description": "Description",
    "View Seller Transactions": "View Seller Transactions",
    "View Seller Balance": "View Seller Balance",
  };

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

  const handleViewSellerTransactions = async (merchantOktaId) => {
    try {
      const response = await axios.get(
        API_GATEWAY +
          "transactions/gettransactionofmerchant/" +
          `${merchantOktaId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${verifytok}`,
          },
        }
      );

      const data = response.data;
      console.log(data);
      navigate(`/selleralltransactions/${merchantOktaId}`);
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = merchantData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <h1 className="text-3xl text-[#6a5acd] font-bold py-4">
          Seller Transactions
        </h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-collapse">
          <thead>
            <tr>
              {Object.keys(columnsMapping).map((column) => (
                <th key={column} className="py-2 px-4 border border-b">
                  {columnsMapping[column]}
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
                {Object.keys(columnsMapping).map((column, index) => (
                  <td key={column} className="py-2 px-4 border border-b text-center">
                    {column === "View Seller Transactions" ? (
                      <button
                        onClick={() =>
                          handleViewSellerTransactions(row.merchantOktaId)
                        }
                        className="bg-[#6A5ACD] text-white py-1 px-2 rounded"
                      >
                        View All Transactions
                      </button>
                    ) : column === "View Seller Balance" ? (
                      <button
                        // onClick={() => handleNewButton(row.merchantOktaId)}
                        className="bg-[#6A5ACD] text-white py-1 px-2 rounded"
                      >
                        View Seller Balance
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

export default SellerTransaction;
