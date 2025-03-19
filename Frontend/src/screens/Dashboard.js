import React, { useState, useEffect } from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import Nav from "./Navbar.js";
import { useOktaAuth } from "@okta/okta-react";
import { useSelector } from "react-redux";
import {
  Add_user_hover_image,
  Add_user_image,
  FAQ_hover_image,
  FAQ_image,
  Transaction_image,
} from "../assets/Dashboard/DashboardImages.js";
import { API_GATEWAY } from "../Apigate/api.js";
import axios from "axios";
import { Merchant_image } from "../assets/Dashboard/DashboardImages.js";
import { SubAdmin_image } from "../assets/Dashboard/DashboardImages.js";
import { Templates_image } from "../assets/Dashboard/DashboardImages.js";
import { Notification_image } from "../assets/Dashboard/DashboardImages.js";
import { BankPayouts_image } from "../assets/Dashboard/DashboardImages.js";
import { Acquirer_image } from "../assets/Dashboard/DashboardImages.js";
import { Glossary_image } from "../assets/Dashboard/DashboardImages.js";
import { Support_image } from "../assets/Dashboard/DashboardImages.js";
import { UsefulLinks_image } from "../assets/Dashboard/DashboardImages.js";
import { Transaction_hover_image } from "../assets/Dashboard/DashboardImages.js";
import { Merchant_hover_image } from "../assets/Dashboard/DashboardImages.js";
import { SubAdmin_hover_image } from "../assets/Dashboard/DashboardImages.js";
import { Templates_hover_image } from "../assets/Dashboard/DashboardImages.js";
import { Notification_hover_image } from "../assets/Dashboard/DashboardImages.js";
import { BankPayouts_hover_image } from "../assets/Dashboard/DashboardImages.js";
import { Acquirer_hover_image } from "../assets/Dashboard/DashboardImages.js";
import { Glossary_hover_image } from "../assets/Dashboard/DashboardImages.js";
import { Support_hover_image } from "../assets/Dashboard/DashboardImages.js";
import { UsefulLinks_hover_image } from "../assets/Dashboard/DashboardImages.js";
import { MyBusiness_image } from "../assets/Dashboard/DashboardImages.js";
import { MyBusiness_hover_image } from "../assets/Dashboard/DashboardImages.js";
import { MyBankAccounts_image } from "../assets/Dashboard/DashboardImages.js";
import { MyBankAccounts_hover_image } from "../assets/Dashboard/DashboardImages.js";
import { SuccessRatio_image } from "../assets/Dashboard/DashboardImages.js";
import { SuccessRatio_hover_image } from "../assets/Dashboard/DashboardImages.js";
import { UserManagement_image } from "../assets/Dashboard/DashboardImages.js";
import { UserManagement_hover_image } from "../assets/Dashboard/DashboardImages.js";
import { Reports_image } from "../assets/Dashboard/DashboardImages.js";
import { Reports_hover_image } from "../assets/Dashboard/DashboardImages.js";
import { Recurring_image } from "../assets/Dashboard/DashboardImages.js";
import { Recurring_hover_image } from "../assets/Dashboard/DashboardImages.js";
import { ArrowDropDown_image } from "../assets/Dashboard/DashboardImages.js";
import { ArrowDropDown_hover_image } from "../assets/Dashboard/DashboardImages.js";
import { selectOktaData } from "../features/dataReducer.js";
import LandingPage from "./LandingPage.js";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { oktaAuth, authState } = useOktaAuth();
  const [verifytok, setVerifytok] = useState("");
  const [adminLogin, setAdminLogin] = useState("");
  const [merchantLogin, setMerchantLogin] = useState("");
  const [registeredMerchant, setRegisteredMerchant] = useState("");
  const oktaData = useSelector(selectOktaData);
  const [merchantData, setMerchantData] = useState([]);
  const [businessdetails, setBusinessDetails] = useState([]);
  // const name = oktaData.user.profile.firstName;
  // console.log(name);
  const [activeStatus, setActiveStatus] = useState("");

  const arrow = ArrowDropDown_image;

  useEffect(() => {
    if (
      authState &&
      authState.accessToken &&
      authState.accessToken.claims.sub === "payfiadmin@payfi.co.in"
    ) {
      // const groups = authState.accessToken.claims.groups;
      setAdminLogin(authState.accessToken.accessToken);
      // console.log("from dashboard", authState);
    } else if (
      authState &&
      authState.accessToken &&
      authState.accessToken.claims.sub !== "payfiadmin@payfi.co.in"
    ) {
      setMerchantLogin(authState.accessToken.accessToken);
      setRegisteredMerchant(merchantData.merchantId);
    }
  });

  if (authState && authState.accessToken) {
    console.log(authState);
  }

  const fetchMerchantDetails = async () => {
    try {
      const response = await axios.get(
        API_GATEWAY + "merchants/getalldetailsofmerchant",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${merchantLogin}`,
          },
        }
      );

      const data = response.data;
      setMerchantData(data.merchantBasicDetails);
      setBusinessDetails(data.merchantBusinessDetails);
      // setRegisteredMerchant(merchantData.merchantId);
    } catch (error) {
      console.error("Error fetching merchant details:", error);
    }
  };

  console.log(registeredMerchant);

  useEffect(() => {
    if (merchantLogin) {
      console.log(merchantLogin);
      fetchMerchantDetails();
    } else {
      console.log(adminLogin);
    }
  }, [merchantLogin, adminLogin]);

  const admin_data = [
    {
      id: 1,
      text: "Transaction",
      img: Transaction_image,
      hoverimg: Transaction_hover_image,
      title: "Transaction",
      content: [
        "Partner Transaction",
        "Seller Transaction",
        "Partner Info",
        // "Approved",
        // "Cancelled",
        // "Chargeback",
        // "Expired",
        // "Declined",
        // "Failed",
        // "Frozen",
        // "Partial",
        // "Pending",
        // "Predispute",
        // "Refund",
      ],
    },
    {
      id: 2,
      text: "Merchant",
      img: Merchant_image,
      hoverimg: Merchant_hover_image,
      title: "Merchant",
      content: [
        // "Active",
        // "Suspend",
        // "Closed",
        // "Sub-merchant",
        // "Un-Register",
        // "Registration",
        "All Merchants",
      ],
    },

    {
      id: 3,
      text: "Bank Payouts",
      img: BankPayouts_image,
      hoverimg: BankPayouts_hover_image,
      title: "Bank Payouts",
      content: ["Bank Payouts"],
    },

    {
      id: 4,
      text: "Reports",
      img: Reports_image,
      hoverimg: Reports_hover_image,
      title: "Reports",
      content: ["Reports"],
    },

    {
      id: 5,
      text: "Templates",
      img: Templates_image,
      hoverimg: Templates_hover_image,
      title: "Templates",
      content: ["Templates"],
    },
    {
      id: 6,
      text: "Notifications",
      img: Notification_image,
      hoverimg: Notification_hover_image,
      title: "Notifications",
      content: ["All-Email", "Failed", "Successful"],
    },

    {
      id: 7,
      text: "Sub Admin",
      img: SubAdmin_image,
      hoverimg: SubAdmin_hover_image,
      title: "Sub Admin",
      content: [
        "Add sub Admin",
        "Sub Admin List",
        "Create Roles",
        "Roles List",
      ],
    },
    {
      id: 8,
      text: "Acquirer",
      img: Acquirer_image,
      hoverimg: Acquirer_hover_image,
      title: "Acquirer",
      content: [""],
    },
    {
      id: 9,
      text: "Glossary",
      img: Glossary_image,
      hoverimg: Glossary_hover_image,
      title: "Glossary",
      content: [""],
    },
    {
      id: 10,
      text: "Support",
      img: Support_image,
      hoverimg: Support_hover_image,
      title: "Support",
      content: [""],
    },
    {
      id: 11,
      text: "Useful-Links",
      img: UsefulLinks_image,
      hoverimg: UsefulLinks_hover_image,
      title: "Useful-Links",
      content: [""],
    },
  ];

  const merchant_data = [
    {
      id: 12,
      text: "Add User",
      img: Add_user_image,
      hoverimg: Add_user_hover_image,
      title: "Add User",
      content: ["Registration"],
    },
    {
      id: 13,
      text: "Transactions",
      img: Transaction_image,
      hoverimg: Transaction_hover_image,
      title: "Dashboard",
      content: [
        "My Transactions",
        // "Block Transaction",
        // "Test Transaction",
        // "Recent Order",
        "Seller Info",
        // "Request Funds",
        // "Settlement",
        "Payment Methods",
      ],
    },

    {
      id: 14,
      text: "Recurring",
      img: Recurring_image,
      hoverimg: Recurring_hover_image,
      title: "Recurring Payments",
      content: ["Recurring Plans", "My Subscriptions"],
    },

    {
      id: 15,
      text: "FAQ",
      img: FAQ_image,
      hoverimg: FAQ_hover_image,
      title: "FAQ",
      content: ["FAQ"],
    },

    {
      id: 16,
      text: "My Bank Accounts",
      img: MyBankAccounts_image,
      hoverimg: MyBankAccounts_hover_image,
      title: "Merchant",
      // content: [
      //   "Active",
      //   "Suspend",
      //   "Closed",
      //   // "Sub-merchant", "Un-Register"
      // ],
      content: ["Active", "Suspend", "Closed", "Sub-merchant", "Un-Register"],
    },
    {
      id: 16,
      text: "Reports",
      img: Reports_image,
      hoverimg: Reports_hover_image,
      title: "my bank account",
      content: ["Merchant_Reports"],
    },

    {
      id: 17,
      text: "Success Ratio",
      img: SuccessRatio_image,
      hoverimg: SuccessRatio_hover_image,
      title: "Sub Admin",
      content: [
        // "Add sub Admin",
        // "Sub Admin List",
        // "Create Roles",
        // "Roles List",
      ],
    },

    {
      id: 18,
      text: "My Business",
      img: MyBusiness_image,
      hoverimg: MyBusiness_hover_image,
      title: "Transaction",
      content: [],
    },

    {
      id: 19,
      text: "User Management",
      img: UserManagement_image,
      hoverimg: UserManagement_hover_image,
      title: "user management",
      content: ["User Management"],
    },

    {
      id: 20,
      text: "Reports",
      img: Reports_image,
      hoverimg: Reports_hover_image,
      title: "my bank account",
      content: [],
    },
  ];
  return (
    <div>
      {merchantLogin && (
        <div className="h-11 w-26 text-[#3B8894] text-xl m-auto p- 4">
          <Nav />
          <div className="flex flex-col justify-center items-center py-3 ">
            <div>
              <h1 className=" font-semibold text-base  text-black">
                Merchant Dashboard
              </h1>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-black text-[#263238]">Welcome 👋</p>
            </div>
          </div>
          <div className=" px-28 h-5 w-13 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {merchant_data.map((entry, idx) => {
              const isRegistered = !!registeredMerchant;

              // Exclude "Add User" option if registeredMerchant has a value
              if (isRegistered && entry.text === "Add User") {
                return null; // Skip rendering this option
              }
              return (
                <div
                  className=" flex flex-column md:p-6 lg:p-8 justify-around items-between"
                  key={idx}
                >
                  <div className="relative border bg-white hover:bg-[#6744F3] rounded-3xl px-8 py-6 group ">
                    <div className="text-center">
                      <div className="group inline-block relative">
                        <div className="image-container">
                          <div className="  flex justify-center items-center">
                            {entry.img}
                          </div>
                          <div className="hover-image opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0">
                            {entry.hoverimg}
                          </div>
                        </div>
                        <button className="mt-4 bg-[#6744F3] text-white py-2 px-6 rounded transition-colors duration-300 group-hover:bg-white group-hover:text-[#6744F3]">
                          <div className="flex justify-center items-center gap-2">
                            <div className="text-sm font-semibold">
                              {entry.text}
                            </div>
                            <div>
                              {!arrow
                                ? ArrowDropDown_hover_image
                                : ArrowDropDown_image}
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="container mx-auto text-center p-2 absolute hidden z-50 bg-white border rounded-lg shadow-md mt-2 py-2 w-48 group-hover:block">
                      <ul style={{ listStyle: "none", padding: 0 }}>
                        {entry.content.map((status, statusIdx) => (
                          <li
                            key={statusIdx}
                            style={{ marginBottom: "px", fontSize: "px" }}
                          >
                            <div
                              className={`py-2 text-base hover:text-white rounded hover:bg-[#6744F3] ${
                                status.toLowerCase() === activeStatus
                                  ? "text-blue-500"
                                  : "text-gray-700"
                              }`}
                            >
                              <Link to={`/${status.toLowerCase()}`}>
                                {status}
                              </Link>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {adminLogin && (
        <div className="h-11 w-26 text-[#3B8894] text-xl m-auto p- 4 ">
          <Nav />
          <div className="flex flex-col justify-center items-center py-3 ">
            <div>
              <h1 className=" font-semibold text-base  text-black">
                Admin Dashboard
              </h1>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-black text-[#263238]">Welcome 👋</p>
            </div>
          </div>
          <div className="px-28 h-5 w-13 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {admin_data.map((entry, idx) => {
              return (
                <div
                  className=" flex flex-column md:p-3 lg:p-4 justify-around items-between"
                  key={idx}
                >
                  <div className="relative border bg-white hover:bg-[#6744F3] rounded-xl px-8 py-6 group  ">
                    <div className="text-center">
                      <div className="group inline-block relative">
                        <div className="image-container">
                          <div className="flex justify-center items-center">
                            {entry.img}
                          </div>
                          <div className="hover-image opacity-0 group-hover:opacity-100 transition-opacity duration-800 ease-in-out absolute inset-0">
                            {entry.hoverimg}
                          </div>
                        </div>
                        <button className="mt-4 bg-[#6744F3] text-white py-2 px-6 rounded transition-colors duration-300 group-hover:bg-white group-hover:text-[#6744F3] ">
                          <div className="flex justify-center items-center gap-2">
                            <div className="text-sm font-semibold">
                              {entry.text}
                            </div>
                            <div>
                              {!arrow
                                ? ArrowDropDown_hover_image
                                : ArrowDropDown_image}
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="container mx-auto text-center p-2 absolute hidden z-50 bg-white border rounded-lg shadow-md mt-2 py-2 w-44 group-hover:block">
                      <ul style={{ listStyle: "none", padding: 0 }}>
                        {entry.content.map((status, statusIdx) => (
                          <li
                            key={statusIdx}
                            style={{ marginBottom: "px", fontSize: "px" }}
                          >
                            <div
                              className={`py-2 text-base hover:text-white rounded hover:bg-[#6744F3] ${
                                status.toLowerCase() === activeStatus
                                  ? "text-blue-500"
                                  : "text-gray-700"
                              }`}
                            >
                              <Link to={`/${status.toLowerCase()}`}>
                                {status}
                              </Link>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!adminLogin && !merchantLogin && <LandingPage />}
    </div>
  );
};

export default AdminDashboard;
