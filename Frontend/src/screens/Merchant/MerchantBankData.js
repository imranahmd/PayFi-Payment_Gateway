// import React, { useState, useEffect } from "react";
// import Navbar from "../Navbar";
// import { useOktaAuth } from "@okta/okta-react";
// import axios from "axios";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setSellerData } from "../../features/dataReducer";

// const MerchantBankDetails = () => {
//   const { oktaAuth, authState } = useOktaAuth();
//   const [verifytok, setVerifytok] = useState([]);
//   const [merchantData, setMerchantData] = useState([]);
//   const [businessdetails, setBusinessDetails] = useState([]);
//   const { merchantId } = useParams();
//   const partnerReferenceNumber = "91925764";
//   const partnerName = "Payfi";
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (authState && authState.accessToken) {
//       const { accessToken } = authState.accessToken;
//       setVerifytok(accessToken);
//     } else {
//     }
//   });

//   const fetchMerchantDetails = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8083/admins/merchant/getalldetailsofmerchant/${merchantId}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${verifytok}`,
//           },
//         }
//       );

//       const data = response;
//       console.log(data.data);
//       setMerchantData(data.data.merchantBasicDetails);
//       setBusinessDetails(data.data.merchantBusinessDetails);
//     } catch (error) {
//       console.error("ERROR", error);
//     }
//   };

//   useEffect(() => {
//     fetchMerchantDetails();
//   }, [verifytok, merchantId]);



//   return (
//     <>
//       <Navbar />
//       <div className="flex justify-center">
//         <h1 className="text-3xl text-[#6a5acd] font-bold pt-2 -mb-2">
//           Merchant Details
//         </h1>
//       </div>
//       <div className="flex flex-col">
//         <div className="flex py-6">
//           <table className="w-1/2 m-4 border border-black border-collapse">
//             <thead>
//               <tr>
//                 <th className="text-2xl border px-2 py-4 font-bold" colSpan="2">
//                   Seller Bank Information
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="w-[100%]">
//                 <td className="w-[30%] border p-1 font-bold">
//                   Partner Reference Number
//                 </td>
//                 <td className="w-[70%] border p-1 font-bold">
//                   {partnerReferenceNumber}
//                 </td>
//               </tr>
//               <tr>
//                 <td className="border p-1 font-bold">Partner Name</td>
//                 <td className="border p-1 font-bold">{partnerName}</td>
//               </tr>
//               <tr>
//                 <td className="border p-1 font-bold">Email Id</td>
//                 <td className="border p-1 font-bold">
//                   {businessdetails.emailId}
//                 </td>
//               </tr>
//               <tr>
//                 <td className="border p-1 font-bold">Merchant Name</td>
//                 <td className="border p-1 font-bold">
//                   {merchantData.merchantName}
//                 </td>
//               </tr>
//               <tr>
//                 <td className="border p-1 font-bold">GST Number</td>
//                 <td className="border p-1 font-bold">
//                   {businessdetails.gstNumber}
//                 </td>
//               </tr>
//               <tr>
//                 <td className="border p-1 font-bold">Company PAN</td>
//                 <td className="border p-1 font-bold">
//                   {businessdetails.companyPAN}
//                 </td>
//               </tr>
//               <tr>
//                 <td className="border p-1 font-bold">Bank Account Number</td>
//                 <td className="border p-1 font-bold">
//                   {businessdetails.bankAccountNumber}
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <div className="flex justify-center">
//           <div className="p-4">
//             <Link to={`/merchantdata/${merchantId}`}>
//               <button
//                 type="submit"
//                 className="bg-[#6A5ACD] text-white py-2 px-4 rounded"
                
//               >
//                 Proceed to Seller Addition
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MerchantBankDetails;
