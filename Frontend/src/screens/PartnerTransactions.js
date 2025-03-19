import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Submenu from "./Submenu";
import { Card, Typography } from "@material-tailwind/react";
import Navbar from "./Navbar";
import TransactionModal from "./Transaction/TransactionModal";
import { useOktaAuth } from "@okta/okta-react";
import { API_GATEWAY } from "../Apigate/api";

const PartnerTransaction = () => {
  const { submenurl } = useParams();

  const { oktaAuth, authState } = useOktaAuth();
  const [verifytok, setVerifytok] = useState(null);
  const [partnerTransactions, setPartnerTransactions] = useState([]);

  useEffect(() => {
    if (authState && authState.accessToken) {
      const { accessToken } = authState.accessToken;
      setVerifytok(accessToken);
    } else {
      console.error("Error: Auth state or accessToken is null.");
    }
  }, [authState]);

  const getPartnerTransactions = async () => {
    try {
      const response = await axios.get(
        API_GATEWAY + "transactions/gettransactionofpartner/34788441",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${verifytok}`,
          },
        }
      );

      const data = response.data;
      setPartnerTransactions(data);
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  useEffect(() => {
    if (verifytok) {
      getPartnerTransactions();
    }
  }, [verifytok]);

  const UI_NAME_MAPPING = {
    // transactionId: "Transaction ID",
    // amount: "Amount",
    // transactionType: "Transaction Type",
    // partnerReferenceNumber: "Partner Reference Number",
    // sourceAccountId: "Source Account ID",
    // targetAccountId: "Target Account ID",
    // targetOwnerName: "Target Owner Name",
    // latitude: "Latitude",
    // longitude: "Longitude",
    // initiationDate: "Initiation Date",
    // completionDate: "Completion Date",
    merchantId: "Merchant ID",
    transactionId: "Transaction ID",
    amount: "Amount",
    transactionType: "Transaction Type",
    partnerReferenceNumber: "Partner Reference Number",
    targetAccountId: "Target Account ID",
    customerVpa: "Customer VPA",
    cardNumber: "Card Number",
  };

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const totalItems = partnerTransactions.length;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  const paginatedRows = partnerTransactions.slice(startIndex, endIndex);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isTransactionDetailsOpen, setTransactionDetailsOpen] = useState(false);

  const handleRowClick = (transaction) => {
    setSelectedTransaction(transaction);
    setTransactionDetailsOpen(true);
  };

  const handleCloseTransactionDetails = () => {
    setTransactionDetailsOpen(false);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const renderPageNumbers = () => {
    return getPageNumbers().map((pageNumber) => (
      <button
        key={pageNumber}
        className={`${
          pageNumber === currentPage
            ? "bg-[#6A5ACD] text-white"
            : " bg-gray-200 text-[#6A5ACD]"
        } py-1 px-2 rounded m-2`}
        onClick={() => setCurrentPage(pageNumber)}
      >
        {pageNumber}
      </button>
    ));
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <h1 className="text-3xl text-[#6a5acd] font-bold py-4">
          Partner Transactions
        </h1>
      </div>
      <div className="flex ">
        <Card className="h-full w-full overflow-scroll">
          <table className="w-full h-full min-w-max table-auto text-center border-collapse">
            <thead>
              <tr>
                {Object.keys(UI_NAME_MAPPING).map((key) => (
                  <th
                    key={key}
                    className="border border-blue-gray-100 text-center bg-gray-300 px-4 py-6"
                  >
                    <div className="flex justify-center items-center">
                      <Typography
                        variant="h1"
                        color="black"
                        className="font-bold leading-none opacity-70"
                      >
                        {UI_NAME_MAPPING[key]}
                      </Typography>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedRows.map((transaction, index) => {
                const isLast = index === paginatedRows.length - 1;
                const classes = isLast
                  ? "p-4 border-b"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr
                    key={transaction.transaction_id}
                    onClick={() => handleRowClick(transaction)}
                    className="cursor-pointer"
                  >
                    {Object.keys(UI_NAME_MAPPING).map((key) => (
                      <td key={key} className={`${classes} border`}>
                        <Typography
                          variant="h1"
                          color="blue-gray"
                          className={`font-semibold ${
                            key === "transactionType" &&
                            transaction[key] === "credit"
                              ? "text-green-500"
                              : key === "transactionType" &&
                                transaction[key] === "debit"
                              ? "text-red-500"
                              : ""
                          }`}
                        >
                          {key === "amount" && transaction[key] !== null
                            ? `₹${transaction[key]}`
                            : transaction[key]}
                        </Typography>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex justify-center items-center p-4">
            <button
              className={
                currentPage === 1
                  ? `bg-gray-200 text-[#6A5ACD] p-2 rounded mr-2 cursor-pointer`
                  : `bg-[#6A5ACD] w-24 text-white p-2 rounded mr-2 cursor-pointer`
              }
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {renderPageNumbers()}
            <button
              className="bg-[#6A5ACD] w-24 text-white p-2 rounded ml-2 cursor-pointer"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </Card>
      </div>
      <TransactionModal
        isOpen={isTransactionDetailsOpen}
        onClose={handleCloseTransactionDetails}
        transactionDetails={selectedTransaction}
      />
    </div>
  );
};

export default PartnerTransaction;
