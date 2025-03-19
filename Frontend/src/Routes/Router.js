import React,{useState,useEffect} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "../screens/Signup";
// import Login from "../screens/Login";
import Dashboard from "../screens/Dashboard";
import Registration from "../screens/Merchant/MerchantRegistration";
import Submenu from "../screens/Submenu";
import PaymentGateway from "../screens/PaymentGateway";
import PartnerTransaction from "../screens/PartnerTransactions";
import Emailpage from "../screens/Emailpage";
import Canceltrans from "../screens/Canceltrans";
import ActiveMerchants from "../screens/Merchant/ActiveMerchants";
import SuspendedMerchants from "../screens/Merchant/SuspendedMerchants";
import ClosedMerchants from "../screens/Merchant/ClosedMerchants";
import UnregisteredMerchants from "../screens/Merchant/UnregisteredMerchants";
import { oktaConfig } from "../lib/oktaConfig";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, Security } from "@okta/okta-react";
import LoginWidget from "../Auth/LoginWidget";
import MerchantData from "../screens/Merchant/MerchantData";
import DocumentVerification from "../screens/Merchant/DocumentVerification";
import AllMerchants from "../screens/Merchant/AllMerchants";
import PaymentMethods from "../screens/Transaction/PaymentMethods";
import CardDetails from "../screens/Transaction/CardDetails";
import TransactionModal from "../screens/Transaction/TransactionModal";
import SuccessTransaction from "../screens/Transaction/SuccessTransaction";
// import PGverification from "../screens/Merchant/PGverification";
import SellerTransaction from "../screens/Transaction/SellerTransactions";
import Settlement from "../screens/Transaction/Settlement";
import FailedTransaction from "../screens/Transaction/FailedTransaction";
import MerchantBankDetails from "../screens/Merchant/MerchantBankData";
import MerchantBankVerification from "../screens/Merchant/MerchantBankVerification";
import BankPayouts from "../screens/Transaction/BankPayouts";
import PartnerInfo from "../screens/Transaction/PartnerInfo";
import SellerInfo from "../screens/Transaction/SellerInfo";
import SellerAllTransactions from "../screens/Transaction/SellerAllTransactions";
import SellerIndividualTransaction from "../screens/Transaction/SellerIndividualTransaction";
import UPITransactions from "../screens/Transaction/UPITransactions";
import RecurringPayments from "../screens/Transaction/RecurringPayments";
import RecurringPlans from "../screens/Transaction/RecurringPlans";

import Faqpage from "../screens/Faq/Faqpage";
import MySubscriptions from "../screens/Transaction/MySubscriptions";
import MyIndividualSubscription from "../screens/Transaction/MyIndividualSubscription";
import Reportcharting from "../screens/Reports/Reportcharting";
import AdminSellerInfo from "../screens/Transaction/AdminSellerInfo";
import RoutesForReports from "./RoutesForReports";
import MerchantReports from "../screens/Reports/MerchantReports";
import MerchantReportCharting from "../screens/Reports/ReportsMerchant/MerchantReportCharting";
import LandingPage from "../screens/LandingPage";
const oktaAuth = new OktaAuth(oktaConfig);




const Router = () => {
  const navigate = useNavigate();

  const customAuthHandler = ({ navigate }) => {
    navigate.push("/login"); 
  };
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri));
  };

  return (
    <div>
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={customAuthHandler}
      >
        <Routes>
          <Route path="/login" element={<LoginWidget config={oktaConfig} />} />
          <Route path="/login/callback" element={<LoginCallback />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/submenu" element={<Submenu />} />
          <Route path="/paymentGateway" element={<PaymentGateway />} />
          <Route path="/emailpage" element={<Emailpage />} />
          <Route
            path="/Partner Transaction"
            element={<PartnerTransaction title=":/Partner Transaction" />}
          />
          <Route path="/Seller Transaction" element={<SellerTransaction />} />
          <Route
            path="/selleralltransactions/:merchantId"
            element={<SellerAllTransactions />}
          />
          <Route
            path="/adminsellerinfo/:merchantId"
            element={<AdminSellerInfo />}
          />
          <Route path="/" element={<Dashboard />} />
          <Route path="/cancelled" element={<Canceltrans />} />
          <Route path="/activemerchants" element={<ActiveMerchants />} />
          <Route path="/suspendedmerchants" element={<SuspendedMerchants />} />
          <Route path="/closedmerchants" element={<ClosedMerchants />} />
          <Route path="/merchantdata/:merchantId" element={<MerchantData />} />
          <Route
            path="/document/:merchantId"
            element={<DocumentVerification />}
          />
          <Route path="/All Merchants" element={<AllMerchants />} />
          <Route path="/payment methods" element={<PaymentMethods />} />
          <Route path="/carddetails" element={<CardDetails />} />
          <Route
            path="/unregisteredmerchants"
            element={<UnregisteredMerchants />}
          />
          <Route path="/transactionmodal" element={<TransactionModal />} />
          <Route path="/success" element={<SuccessTransaction />} />
          <Route path="/failed" element={<FailedTransaction />} />
          <Route path="/seller info" element={<SellerInfo />} />
          <Route path="/Recurring Payments" element={<RecurringPayments />} />
          {/* <Route
            path="/merchantbank/:merchantId"
            element={<MerchantBankDetails />}
          /> */}
          {/* <Route
            path="/merchantbankverification/:merchantId" My Subscriptions
            element={<MerchantBankVerification />}
          /> */}
          <Route path="/Bank Payouts" element={<BankPayouts />} />
          <Route path="/My Subscriptions" element={<MySubscriptions />} />
          <Route
            path="/myindividualsubscription/:subscriptionId"
            element={<MyIndividualSubscription />}
          />
          <Route
            path="/My Transactions"
            element={<SellerIndividualTransaction />}
          />
          {/* <Route path="/recurring" element={<RecurringPayments />} /> */}
          <Route path="/Partner Info" element={<PartnerInfo />} />
          <Route path="/Recurring Plans" element={<RecurringPlans />} />
          <Route path="/upitransactions" element={<UPITransactions />} />
          <Route path="/pgverification/:merchantId" element={<PartnerInfo />} />
          <Route path="/settlement/:merchantId" element={<Settlement />} />

          <Route path="/Faq" element={<Faqpage />} />
          <Route path="/routesforreports" element={<RoutesForReports />} />
          <Route path="/reports" element={<Reportcharting />} />
          <Route path="/Merchant_Reports" element={<MerchantReportCharting />} />
          
          
          
        </Routes>
      </Security>
    </div>
  );
};

export default Router;
