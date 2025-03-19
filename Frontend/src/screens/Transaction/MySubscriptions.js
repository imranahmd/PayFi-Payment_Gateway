import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOktaAuth } from "@okta/okta-react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { API_GATEWAY } from "../../Apigate/api";
// allMerchantGet
const MySubscriptions = () => {
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
      getAllSubscriptions();
    }
  }, [verifytok, currentPage]); // Include verifytok and currentPage in the dependency array

  const getAllSubscriptions = async () => {
    try {
      const response = await axios.get(
        API_GATEWAY + "recurrings/getallsubscriptions",
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

  // const columns = [
  //   "subscriptionId",
  //   "merchantOktaId",
  //   // "merchantId",
  //   // "subscriptionStartDate",
  //   // "subscriptionExpireDate",
  //   "frequency",
  //   "installmentAmount",
  //   "subscriptionProduct",
  //   "subscriptionStatus",
  //   "paymentStatus",
  //   // "transactionId",
  //   // "autoDebit",
  //   "view subscription",
  // ];

  const columnDisplayNameMap = {
    subscriptionId: "Subscription ID",
    merchantId: "Merchant ID",
    frequency: "Frequency",
    installmentAmount: "Installment Amount",
    subscriptionProduct: "Subscription Product",
    subscriptionStatus: "Subscription Status",
    paymentStatus: "Payment Status",
    "view subscription": "View Subscription",
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

  const handleViewSubscriptionClick = async (subscriptionId) => {
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

      navigate(`/myindividualsubscription/${subscriptionId}`);
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
          All Subscriptions
        </h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-collapse">
          <thead>
            <tr>
              {Object.keys(columnDisplayNameMap).map((column) => (
                <th key={column} className="py-2 px-4 border border-b">
                  {columnDisplayNameMap[column]}
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
                {Object.keys(columnDisplayNameMap).map((column, index) => (
                  <td
                    key={column}
                    className="py-2 px-4 border border-b text-center"
                  >
                    {column === "view subscription" ? (
                      <button
                        onClick={() =>
                          handleViewSubscriptionClick(row.subscriptionId)
                        }
                        className="bg-[#6A5ACD] text-white py-1 px-2 rounded"
                      >
                        View Subscription
                      </button>
                    ) : column === "subscriptionStatus" ||
                      column === "paymentStatus" ? (
                      <span
                        style={{
                          color:
                            row.subscriptionStatus === "INACTIVE" &&
                            row.paymentStatus === "due"
                              ? "red"
                              : "green",
                        }}
                      >
                        {row[column]}
                      </span>
                    ) : column === "installmentAmount" ? (
                      `₹${row[column]}`
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

export default MySubscriptions;
