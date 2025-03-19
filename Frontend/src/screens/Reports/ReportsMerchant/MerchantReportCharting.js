import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useOktaAuth } from "@okta/okta-react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../../Navbar";
import { API_GATEWAY } from "../../../Apigate/api";
import MerchDailyReport from "./MerchDailyReport";
import MerchYearReport from "./MerchYearReport";
import MerchTotalTransDet from "./MerchTotalTransDet";
import MerchYearReportSettle from "../SellerSettlementReports/MerchYearReportSettlement";
import SellerSettlementBetDate from "../SellerSettlementReports/SellerSettlementBetDate";

const MerchantReportCharting = () => {
  const { authState } = useOktaAuth();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);

  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedReportSettle, setSelectedReportSettle] = useState(null);
  

  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [merchantId, setMerchantId] = useState("");

  const handleSectionChange = (section) => {
    setSelectedSection(section);
    setSelectedReport(null);
    setSelectedYear(null);
  };

  const handleStartDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleReportChange = (report) => {
    setSelectedReport(report);
    setShowGraph(false);
    setError(null); // Clear error when report changes
  };
  const handleReportChangeSettlement = (report) => {
    setSelectedReportSettle(report);
    setShowGraph(false);
    setError(null); // Clear error when report changes
  }

  const handleMerchStDtChange = (date) => {
    setSelectedDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedDate2(date);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const constructReportURL = useMemo(() => {
    const baseUrl = API_GATEWAY + "reports";
    const token = authState.accessToken?.accessToken;
    let merchantids = merchantId;
    let url = "";

    switch (selectedReport || selectedReportSettle) {
      case "daily":
        const startMerchtDailyDate = selectedDate
          ? format(selectedDate, "yyyy-MM-dd")
          : null;
        url = `${baseUrl}/merchant/transactions-by-date/${startMerchtDailyDate}`;
        break;

      case "yearly":
        if (!selectedYear) {
          // setError("Please select a year");
          console.log("Please select a year");
          return null;
        }
        url = `${baseUrl}/merchant/transactions-for-year/${selectedYear}`;
        break;
        
      case "yearlySettle":
        if (!selectedYear) {
          // setError("Please select a year");
          console.log("Please select a year");

          
          return null;
        }
        // http://localhost:8089/reports/merchant/settlement/settlement-for-year/2024
        url = `${baseUrl}/merchant/settlement/settlement-for-year/${selectedYear}`;
        console.log("url",url)
        break;

      case "totaltransBetDates":
        const formattedStartDate = format(new Date(selectedDate), "yyyy-MM-dd");
        const formattedEndDate = format(new Date(selectedDate2), "yyyy-MM-dd");

        url = `${baseUrl}/merchant/transactions-between-dates/${formattedStartDate}/${formattedEndDate}`;
        break;
        
        case "betSettleYear":
        const formattedStartBetDate = format(new Date(selectedDate), "yyyy-MM-dd");
        const formattedEndBetDate = format(new Date(selectedDate2), "yyyy-MM-dd");
        url = `${baseUrl}/merchant/settlement/settlement-between-dates/${formattedStartBetDate}/${formattedEndBetDate}`;
        break;
         
      default:
        // setError("Invalid report type");
        console.log("Invalid report type")
        return null;
    }

    return { token, url };
  }, [
    authState.accessToken,
    selectedDate2,
    selectedDate,
    selectedReport,
    selectedReportSettle,
    selectedYear,
  ]);

  const fetchReportData = async () => {
    setLoading(true);
    setError(null);

    const constructUrl = constructReportURL;

    if (!constructUrl || !constructUrl.token) {
      setLoading(false);
      setError("Token is null");
      return;
    }

    try {
      const response = await axios.get(constructUrl.url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${constructUrl.token}`,
        },
      });

      if (response.status === 200) {
        setShowGraph(true);
        setReportData(response.data);
      } else {
        setError("Failed to fetch data");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authState && authState.accessToken) {
      const { accessToken } = authState.accessToken;
    }
  }, [authState]);

  return (
    <div>
      <Navbar />
      <div className="mx-auto text-center py-3">
        {/* <h1 className="text-lg text-black-500 py-4">Reports & Analytics</h1> */}
        <h1 class="text-black-500 py-4 text-xl font-bold mb-4">Merchant Reports Dashboard</h1>
        <select
          className="py-3 px-4 rounded-md border border-gray-300 text-md"
          onChange={(e) => handleSectionChange(e.target.value)}
        >
          <option value="">Select Section</option>
          <option value="transaction">Transaction Reports</option>
          {/* <option value="recurring">Recurring</option> */}
          <option value="settlement">Settlement Reports</option>
        </select>
        {selectedSection && selectedSection === "transaction" && (
          <div>
            <select   className="py-3 px-4  my-2 rounded-md border border-grey"
              onChange={(e) => handleReportChange(e.target.value)}>
              <option value="">Select Reports Type</option>
              <option value="daily">Date Wise Reports</option>
              {/* <option value="monthly">Monthly</option> */}
              <option value="yearly">Year Wise Reports</option>
              <option value="totaltransBetDates">
                Custom Date Range Reports
              </option>
            </select>
            {selectedReport && (
              <div>
                {selectedReport === "daily" && (
                  <div>
                    <label>Select Date </label>
                    <DatePicker
                      // className="mx-3 my-3"
                      className="mx-3 my-3 py-3 px-4 rounded-md border border-grey"
                      selected={selectedDate}
                      onChange={(date) => handleStartDateChange(date)}
                      dateFormat="yyyy-MM-dd"
                    />
                  </div>
                )}
                {selectedReport === "yearly" && (
                  <div>
                    <label className="mx-3">Please Select Year: </label>
                    <select
                    className="py-3 my-3 px-4 rounded-md border border-grey py-4"
                      // className="my-3"
                      value={selectedYear}
                      onChange={(e) => handleYearChange(e.target.value)}
                    >
                      <option value="">Select Year</option>
                      {Array.from(
                        { length: 10 },
                        (_, i) => new Date().getFullYear() - i
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {selectedReport === "totaltransBetDates" && (
                  <div>
                    {/* <p className="py-3 mx-3 my-3 px-4  py-4">Transactions Between Dates Range </p> */}
              
                    <label>Select Start Date:</label>
                    <DatePicker
                      // className="mx-3"
                      className="py-3 mx-3 my-3 px-4 rounded-md border border-grey py-4"
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="yyyy-MM-dd"
                    />
                    <label>Select End Date:</label>
                    <DatePicker
                    className="py-3 mx-3 my-3 px-4 rounded-md border border-grey py-4"
                      // className="mx-3"
                      onChange={(date) => handleEndDateChange(date)}
                      selected={selectedDate2}
                      dateFormat="yyyy-MM-dd"
                    />
                  </div>
                )}

                <button
                  style={{ background: "maroon" }}
                  className="bg-maroon text-white px-4 py-2 mx-2 my-5 rounded-md shadow-md"
                  onClick={fetchReportData}
                >
                  Show
                </button>
              </div>
            )}

            {showGraph &&
              selectedReport === "yearly" &&
              (console.log("pageshow:"),
              console.log("showGraph:", showGraph),
              console.log("selectedReport:", selectedReport),
              (<MerchYearReport data={reportData} />))}
            {showGraph &&
              selectedReport === "daily" &&
              // console.log("pageshow:", pageshow),
              (console.log("showGraph:", showGraph),
              console.log("selectedReport:", selectedReport),
              (<MerchDailyReport data={reportData} />))}
            {showGraph &&
              selectedReport === "totaltransBetDates" &&
              (console.log("pageshow:"),
              console.log("showGraph:", showGraph),
              console.log("selectedReport:", selectedReport),
              (<MerchTotalTransDet data={reportData} />))}
          </div>
        )}

        {/* -------------------------------end transaction ---------------------------------------------- */}


        {/* ------------------------------- seller inputs ------------------------------------------ */}
        {selectedSection && selectedSection === "settlement" && (
          <div className="py-4">
            <select className="py-3 my-3 px-4 rounded-md border border-grey py-4" onChange={(e) => handleReportChangeSettlement(e.target.value)}>
              <option value="">Select Report Type</option>

              <option value="yearlySettle">Settlement Year Wise Report</option>
              <option value="betSettleYear">Settlement Between Custom Date Range Report</option>
              
            
            </select>
            {selectedReportSettle && (
              <div>
           
                {selectedReportSettle === "yearlySettle" && (
                  <div>
                    <label className="mx-3">Please Select Year: </label>
                    <select
                    className="py-3 my-3 px-4 rounded-md border border-grey py-4"
                      // className="my-3"
                      value={selectedYear}
                      onChange={(e) => handleYearChange(e.target.value)}
                    >
                      <option value="">Select Year</option>
                      {Array.from(
                        { length: 10 },
                        (_, i) => new Date().getFullYear() - i
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
               {selectedReportSettle === "betSettleYear" && (
                  <div>
                    {/* <p>Settlement Transactions Between Dates Range</p> */}
              
                    <label>Select Start Date:</label>
                    <DatePicker
                    className="py-3 mx-3 my-3 rounded-md border border-grey py-4"
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="yyyy-MM-dd"
                    />
                    <label class="mx-3">Select End Date:</label>
                    <DatePicker
                    className="py-3 mx-3 my-3 rounded-md border border-grey "
                      onChange={(date) => handleEndDateChange(date)}
                      selected={selectedDate2}
                      dateFormat="yyyy-MM-dd"
                    />
                  </div>
                )}

            {/* ------------------end seller inputs----------     */}

                <button
                  style={{ background: "maroon" }}
                  className="bg-maroon text-white px-4 py-2 mx-2 my-5 rounded-md shadow-md"
                  onClick={fetchReportData}
                >
                  Show
                </button>
              </div>
            )}



{/* ----------------seller  component----------------------- */}
           {showGraph &&
                    selectedReportSettle === "yearlySettle" &&
                    (console.log("pageshow:"),
                    console.log("showGraph:", showGraph),
                    console.log("selectedReport:", selectedReport),
                    (<MerchYearReportSettle data={reportData} />))}
             {showGraph &&
                  selectedReportSettle === "betSettleYear" &&
                  (console.log("pageshow:"),
                  console.log("showGraph:", showGraph),
                  console.log("selectedReport:", selectedReportSettle),
                  (<SellerSettlementBetDate data={reportData} />))}




        {/* ----------------------trasaction component-------------------------------- */}



            {showGraph &&
              selectedReport === "daily" &&
              // console.log("pageshow:", pageshow),
              (console.log("showGraph:", showGraph),
              console.log("selectedReport:", selectedReport),
              (<MerchDailyReport data={reportData} />))}
              
            {showGraph &&
                    selectedReport === "yearly" &&
                    (console.log("pageshow:"),
                    console.log("showGraph:", showGraph),
                    console.log("selectedReport:", selectedReport),
                    (<MerchYearReport data={reportData} />))}
            {showGraph &&
              selectedReport === "totaltransBetDates" &&
              (console.log("pageshow:"),
              console.log("showGraph:", showGraph),
              console.log("selectedReport:", selectedReport),
              (<MerchTotalTransDet data={reportData} />))}
          </div>
        )}
        
        
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default MerchantReportCharting;
