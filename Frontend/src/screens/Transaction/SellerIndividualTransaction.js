// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router";
// import axios from "axios";
// import Submenu from "../Submenu";
// import { Card, Typography } from "@material-tailwind/react";
// import Navbar from "../Navbar";
// import TransactionModal from "./TransactionModal";
// import { useSelector } from "react-redux";
// import { useOktaAuth } from "@okta/okta-react";
// import {
//   selectOktaData,
//   selectDatabaseData,
// } from "../../features/dataReducer.js";
// import { API_GATEWAY } from "../../Apigate/api.js";

// const SellerIndividualTransaction = () => {
//   //   const { merchantId } = useParams();
//   const { oktaAuth, authState } = useOktaAuth();
//   const [verifytok, setVerifytok] = useState(null);
//   const [sellerTransactions, setSellerTransactions] = useState([]);

//   const oktaData = useSelector(selectOktaData);
//   const databaseData = useSelector(selectDatabaseData);

//   const merchantId = oktaData.user.id;
//   console.log(merchantId);

//   useEffect(() => {
//     if (authState && authState.accessToken) {
//       const { accessToken } = authState.accessToken;
//       setVerifytok(accessToken);
//       // console.log("accesstoken", verifytok);
//     } else {
//       // Handle the case where authState or authState.accessToken is null
//       // console.log("error");
//     }
//   });

//   console.log(verifytok);

//   const getSellerIndividualTransactions = async () => {
//     try {
//       const response = await axios.get(
//         API_GATEWAY +
//           "transactions/gettransactionofmerchant/" +
//           `${merchantId}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${verifytok}`,
//           },
//         }
//       );

//       const data = response.data;
//       console.log(data);
//       setSellerTransactions(data);
//     } catch (error) {
//       console.error("ERROR", error);
//     }
//   };

//   useEffect(() => {
//     if (verifytok) {
//       getSellerIndividualTransactions();
//     }
//   }, [verifytok, merchantId]);
//   // Dependency array to watch for changes in authState.accessToken

//   const TABLE_HEADING_MAPPING = {
//     transaction_id: "Transaction ID",
//     // merchantOktaId: "Merchant ID",
//     amount: "Amount",
//     transactionType: "Transaction Type",
//     partnerReferenceNumber: "Partner Reference Number",
//     sourceAccountId: "Source Account ID",
//     targetAccountId: "Target Account ID",
//     targetOwnerName: "Target Owner Name",
//     latitude: "Latitude",
//     longitude: "Longitude",
//     initiationDate: "Initiation Date",
//     completionDate: "Completion Date",
//   };

//   const ITEMS_PER_PAGE = 10; // Adjust the number of items per page as needed
//   const [currentPage, setCurrentPage] = useState(1);

//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const totalItems = sellerTransactions.length;
//   const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

//   const paginatedRows = sellerTransactions.slice(startIndex, endIndex);

//   const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

//   const [selectedTransaction, setSelectedTransaction] = useState(null);
//   const [isTransactionDetailsOpen, setTransactionDetailsOpen] = useState(false);

//   const handleRowClick = (transaction) => {
//     setSelectedTransaction(transaction);
//     setTransactionDetailsOpen(true);
//   };

//   const handleCloseTransactionDetails = () => {
//     setTransactionDetailsOpen(false);
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="flex justify-center">
//         <h1 className="text-3xl text-[#6a5acd] font-bold py-4">
//           Seller Transactions
//         </h1>
//       </div>
//       <div className="flex">
//         {/* <Submenu /> */}
//         <Card className="h-full w-full overflow-scroll">
//           <table className="w-full h-full min-w-max table-auto text-left">
//             <thead>
//               <tr className="">
//                 {Object.keys(TABLE_HEADING_MAPPING).map((head) => (
//                   <th
//                     key={head} // Use a unique property as the key
//                     className="border-b border-t border-blue-gray-100 bg-gray-300 px-4 py-6"
//                   >
//                     <div className="flex">
//                       <Typography
//                         variant="h1"
//                         color="black"
//                         className="font-bold leading-none opacity-70"
//                       >
//                         {TABLE_HEADING_MAPPING[head]}
//                       </Typography>
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {sellerTransactions.map((transaction, index) => {
//                 const isLast = index === sellerTransactions.length - 1;
//                 const classes = isLast
//                   ? "p-4 border-b"
//                   : "p-4 border-b border-blue-gray-50";

//                 return (
//                   <tr
//                     key={transaction.transaction_id}
//                     onClick={() => handleRowClick(transaction)}
//                     className="cursor-pointer"
//                   >
//                     {Object.keys(TABLE_HEADING_MAPPING).map((head) => (
//                       <td key={head} className={classes}>
//                         <Typography
//                           variant="h1"
//                           color="blue-gray"
//                           className={`font-semibold ${
//                             head === "transactionType" &&
//                             transaction[head] === "credit"
//                               ? "text-green-500"
//                               : head === "transactionType" &&
//                                 transaction[head] === "debit"
//                               ? "text-red-500"
//                               : ""
//                           }`}
//                         >
//                           {head.includes(".")
//                             ? head
//                                 .split(".")
//                                 .reduce((obj, key) => obj[key], transaction)
//                             : transaction[head]}
//                         </Typography>
//                       </td>
//                     ))}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//           <div className="flex justify-center items-center p-4">
//             <button
//               className="bg-[#6A5ACD] w-24 text-white p-2 rounded mr-2 cursor-pointer"
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//             <button
//               className="bg-[#6A5ACD] w-24 text-white p-2 rounded cursor-pointer"
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </button>
//             <TransactionModal
//               isOpen={isTransactionDetailsOpen}
//               onClose={handleCloseTransactionDetails}
//               transactionDetails={selectedTransaction}
//             />
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default SellerIndividualTransaction;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Submenu from "../Submenu";
import { Card, Typography } from "@material-tailwind/react";
import Navbar from "../Navbar";
import TransactionModal from "./TransactionModal";
import { useSelector } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";
import {
  selectOktaData,
  selectDatabaseData,
} from "../../features/dataReducer.js";
import { API_GATEWAY } from "../../Apigate/api.js";

const SellerIndividualTransaction = () => {
  //   const { merchantId } = useParams();
  const { oktaAuth, authState } = useOktaAuth();
  const [verifytok, setVerifytok] = useState(null);
  const [sellerTransactions, setSellerTransactions] = useState([]);

  const oktaData = useSelector(selectOktaData);
  const databaseData = useSelector(selectDatabaseData);

  const merchantId = oktaData.user.id;

  useEffect(() => {
    if (authState && authState.accessToken) {
      const { accessToken } = authState.accessToken;
      setVerifytok(accessToken);
    } else {
      console.error("Error: Auth state or accessToken is null.");
    }
  }, [authState]);

  const getSellerIndividualTransactions = async () => {
    try {
      const response = await axios.get(
        API_GATEWAY +
          "transactions/gettransactionofmerchant/" +
          `${merchantId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${verifytok}`,
          },
        }
      );

      const data = response.data;
      setSellerTransactions(data);
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  useEffect(() => {
    if (verifytok) {
      getSellerIndividualTransactions();
    }
  }, [verifytok, merchantId]);

  const TABLE_HEADING_MAPPING = {
    // transaction_id: "Transaction ID",
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
  const totalItems = sellerTransactions.length;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  const paginatedRows = sellerTransactions.slice(startIndex, endIndex);

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
            : "bg-gray-200 text-[#6A5ACD]"
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
          My Transactions
        </h1>
      </div>
      <div className="flex">
        <Card className="h-full w-full overflow-scroll">
          <table className="w-full h-full min-w-max table-auto text-left border-collapse border">
            <thead>
              <tr>
                {Object.keys(TABLE_HEADING_MAPPING).map((head) => (
                  <th
                    key={head}
                    className="border border-blue-gray-100 text-center bg-gray-300 px-4 py-6"
                  >
                    <div className="flex">
                      <Typography
                        variant="h1"
                        color="black"
                        className="font-bold leading-none opacity-70"
                      >
                        {TABLE_HEADING_MAPPING[head]}
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
                    {Object.keys(TABLE_HEADING_MAPPING).map((head) => (
                      <td
                        key={head}
                        className={`${classes} border text-center`}
                      >
                        <Typography
                          variant="h1"
                          color="blue-gray"
                          className={`font-semibold ${
                            head === "transactionType" &&
                            transaction[head] === "credit"
                              ? "text-green-500"
                              : head === "transactionType" &&
                                transaction[head] === "debit"
                              ? "text-red-500"
                              : ""
                          }`}
                        >
                          {head === "amount"
                            ? `₹${transaction[head]}` // Display amount with ₹ symbol
                            : head.includes(".")
                            ? head
                                .split(".")
                                .reduce((obj, key) => obj[key], transaction)
                            : transaction[head]}
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
              className="bg-[#6A5ACD] w-24 text-white p-2 rounded mr-2 cursor-pointer"
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

export default SellerIndividualTransaction;
