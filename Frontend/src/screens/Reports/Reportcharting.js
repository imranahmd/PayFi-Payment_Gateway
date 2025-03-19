import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useOktaAuth } from "@okta/okta-react";
import YearlyReport from "./YearlyReport";
import MonthlyReport from "./MonthlyReport";
import { format } from "date-fns";
import MerchantReports from "./MerchantReports";
import SellerSettleReports from "./SellerSettlementReports/SellerSettleReports";
import DailyReports from "./DailyReports";
import MerchantidStartEnddateReports from "./MerchantidStartEnddateReports";
import MerchantTotalYearTransaction from "./MerchantTotalYearTransaction";
import MerchantTransBetDate from "./MerchantTransBetDate";
import { API_GATEWAY } from "../../Apigate/api";
import Nav from "../Navbar";
import SellerMerchYear from "./SellerSettlementReports/SellerMerchYear";
import SellerAdminMerchBet from "./SellerSettlementReports/SellerAdminMerchBet";

const Reportcharting = () => {
  const { authState } = useOktaAuth();
  const [verifytok, setVerifytok] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedReportTrans, setReportDataTrans] = useState(null);

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [reportData, setReportData] = useState("null");
  const [reportGetData, setReportGetData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [pageshow, setPageshow] = useState(false);
  const [merchantId, setMerchantId] = useState("");
  const [reportGetMerchIdDateData, setReportGetMerchIdDateData] = useState("");
  const [dailyMerchantIdYears, setDailyMerchantIdYears] = useState("");

  const [selectedStartBetDate, setSelectedStartBetDate] = useState(null);
  const [selectedEndBetDate, setSelectedEndBetDate] = useState(null);


  // -----------------
  const [selectedReportSettle, setSelectedReportSettle] = useState(null);
  

  
  const handleSectionChange = (section) => {
    setSelectedSection(section);
    setSelectedReport(null);
    setSelectedYear(null);
  };
  const handleReportChangeSettlement = (report) => {
    setSelectedReportSettle(report);
    setShowGraph(false);
    setError(null); // Clear error when report changes
  }

  const handleReportChange = (report) => {
    setSelectedReport(report);
    setSelectedYear(null);
    setShowGraph(false);
    setPageshow(false);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleStartDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedDate2(date);
  };

  const handleStartBetDateChange = (date) => {
    setSelectedStartBetDate(date);
  };

  const handleEndBetDateChange = (date) => {
    setSelectedEndBetDate(date);
  };

  const constructReportURL = (reportType) => {
    const baseUrl = API_GATEWAY + "reports";
    const token = authState.accessToken.accessToken;
    let url = "";
    let merchantdetUrl = "";
    // let merchantdetUrls = "";
    let merchantdetUrls = null;
    let urltrans = "";
    let merchantids = merchantId;
    // let urlgetstartenddate = ""

    switch (reportType) {
        //  ------------------settle switch cases ------------------------
        case "chargeadmindailyYear":
          url = null;
          urltrans = null;
           merchantdetUrls = "";

          if (baseUrl && selectedYear) {
            merchantdetUrls = `${baseUrl}/seller-statement/fetchSettlement-for-year?queryYear=${selectedYear}`;
            
            console.log("merchantdetUrls",merchantdetUrls)
          }
          if (baseUrl) {
            url = `${baseUrl}/total-amount-for-year-admin?year=${selectedYear}`;
          }
  
          if (baseUrl) {
            urltrans = `${baseUrl}/transactions-for-year?year=${selectedYear}`; // Assuming selectedYear is available for all cases
          }
          break;


        case "betSettleYearAdmin":
          url = null;
          urltrans = null;
            merchantdetUrls = "";
            merchantids = merchantId;
            const formattedBetAdminStartDate = format(
              new Date(selectedStartBetDate),
              "yyyy-MM-dd"
            );
            const formattedAdminEndDate = format(
              new Date(selectedEndBetDate),
              "yyyy-MM-dd"
            );

          if (baseUrl) {
            url = `${baseUrl}/total-amount-for-year-admin?year=2024`;
          }
  
          if (baseUrl) {
            urltrans = `${baseUrl}/transactions-for-year?year=2024`; // Assuming selectedYear is available for all cases
          }
          
          if (baseUrl) {
            // merchantdetUrls = `${baseUrl}/seller-statement/fetchSettlement-for-year?queryYear=${selectedYear}`;
            merchantdetUrls = `${baseUrl}/seller-statement/fetchSettlement-by-date-range-and-merchantId?startDate=${encodeURIComponent(formattedBetAdminStartDate)}&endDate=${encodeURIComponent(formattedAdminEndDate)}&queryMerchantId=${encodeURIComponent(merchantids)}`
            
            console.log("merchantdetUrls",merchantdetUrls)
          }
          break;

          // ----------------

      case "dailyMerchIdYear":
        url = null;
        urltrans = null;
        //  merchantdetUrls = "";

        if (baseUrl) {
          url = `${baseUrl}/total-amount-for-year-admin?year=${selectedYear}`;
        }

        if (baseUrl) {
          urltrans = `${baseUrl}/transactions-for-year?year=${selectedYear}`; // Assuming selectedYear is available for all cases
        }
        if (baseUrl) {
          merchantdetUrls = `${baseUrl}/transactions-by-date-and-merchantId?&merchantId=${merchantId}&year=${selectedYear}`;
        }

        // merchantdetUrls = merchantdetUrls; // Assign merchantdetUrl to merchantdetUrls

        break;
    

        
      case "yearly":
        if (!selectedYear) {
          setError("Please select a year");
          return;
        }
        url = null;
        urltrans = null;

        if (baseUrl) {
          url = `${baseUrl}/total-amount-for-year-admin?year=${selectedYear}`;
        }

        if (baseUrl) {
          urltrans = `${baseUrl}/transactions-for-year?year=${selectedYear}`; // Assuming selectedYear is available for all cases
        }
        break;
      case "merchantDailyDetails":
        const merchantDate = selectedDate
          ? format(selectedDate, "yyyy-MM-dd")
          : null;
        if (!merchantDate) {
          setError("Please select start date");
          return;
        }
        merchantids = merchantId;

        url = null;
        merchantdetUrl = null;

        if (baseUrl) {
          merchantdetUrl = `http://localhost:8083/reports/transactions-by-date-and-merchantId?selectedDate=${merchantDate}&merchantId=${merchantId}`;
        }
        if (baseUrl) {
          url = `${baseUrl}/total-amount-by-merchantId-and-date-daily?merchantId=${encodeURIComponent(
            merchantId
          )}&date=${encodeURIComponent(merchantDate)}`;
        }

        break;

      case "totalTransactionYear":
        if (!selectedYear) {
          setError("Please select a year");
          return;
        }
        url = `${baseUrl}/total-transaction-for-year-admin?year=${selectedYear}`;
        break;

      case "totaltransBetDates":
        if (!selectedStartBetDate || !selectedEndBetDate) {
          setError("Please select both start and end dates");
          return;
        }
        const formattedStartDate = format(
          new Date(selectedStartBetDate),
          "yyyy-MM-dd"
        );
        const formattedEndDate = format(
          new Date(selectedEndBetDate),
          "yyyy-MM-dd"
        );
        url = `${baseUrl}/total-transactions-by-merchant-and-date-between-dates?merchantId=${merchantids}&startDate=${encodeURIComponent(
          formattedStartDate
        )}&endDate=${encodeURIComponent(formattedEndDate)}`;
        break;

  
        default:
        console.log("Invalid report type");
    }
    return {
      token,
      url,
      urltrans,
      merchantdetUrl,
      merchantdetUrl,
      merchantdetUrls,
    };
  };

  const fetchReportData = async () => {
    setLoading(true);
    setError(null);

    const { token, url, urltrans, merchantdetUrl, merchantdetUrls } =
      constructReportURL(selectedReport);
    console.log("merchantdetUrlinside", merchantdetUrls);

    if (!url || !token) return;

    try {
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setShowGraph(true);
        setReportData(response.data);
        console.log("setReportData", response.data);
      } else {
        setError("Failed to fetch data");
      }

      // if (urltrans) {
      //   const responseget = await axios.get(urltrans, {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //   });
      //   setReportGetData(responseget.data);
      //   console.log(responseget.data)
      // }
      // Use urltrans to fetch data
      if (urltrans) {
        try {
          const responseget = await axios.get(urltrans, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          setReportGetData(responseget.data);
          console.log("Response from urltrans:", responseget.data);
        } catch (error) {
          console.error("Error fetching data from urltrans:", error);
          setError("Failed to fetch data from urltrans");
        }
      }
      if (merchantdetUrl) {
        // setReportGetMerchIdDateData
        try {
          const responseget = await axios.get(merchantdetUrl, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("merchantdata", responseget);
          setReportGetMerchIdDateData(responseget.data);
          console.log("Response from merchantdetUrl:", responseget.data);
        } catch (error) {
          console.error("Error fetching data from merchantdetUrl:", error);
          setError("Failed to fetch data from merchantdetUrl");
        }
      }
      if (merchantdetUrls) {
      try {
        const re = await axios.get(
          "http://localhost:8083/reports/transactions-for-year-and-merchantId?merchantId=1&year=2024",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("merchantdata", re);
        setDailyMerchantIdYears(re.data);
        console.log("Response from merchantdetUrl:", re.data);
      } catch (error) {
        console.error("Error fetching data from merchantdetUrl:", error);
        setError("Failed to fetch data from merchantdetUrl");
      }
      console.log("hello111111111", merchantdetUrls);
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
      setVerifytok(accessToken);
    }
  }, [authState]);

  return (
    <div>
      <Nav />
      <div className="mx-auto text-center py-3">
        {/* <h1 class="text-lg text-black-500 py-4 ">Reports & Analytics</h1> */}
        <h1 class="text-black-500 py-4 text-xl font-bold mb-4">Admin Reports Dashboard</h1>
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
          <div className="py-4">
            <select
                    //  className="bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 my-3"
                    className="py-3 px-4  my-2 rounded-md border border-grey"
              onChange={(e) => handleReportChange(e.target.value)}
            >
              <option value="">Select Report Type</option>
              <option value="dailyMerchIdYear">Year Wise with Mechant ID Reports</option>
              {/* <option value="monthly">Monthly</option> */}
              <option value="yearly">Year Wise Reports</option>
              {/* <option value="merchantDailyDetails">Custom Date Range Reports</option> */}
              {/* <option value="merchantDailyDetails">Custom Date Range Reports</option> */}
              
              {/* <option value="totalTransactionYear">total Transaction Year</option> */}
              {/* <option value="totaltransBetDates">total Between Dates</option> */}
            </select>
            {selectedReport && (
              <div>
                {selectedReport === "dailyMerchIdYear" && (
                  <div className="py-4">
                    <label className="mx-3 text">Select Merchant ID: </label>
                    <input
                      className="bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center"
                      type="text"
                      value={merchantId}
                      onChange={(e) => setMerchantId(e.target.value)}
                      placeholder="Select Merchant ID"
                    />
                    <label className="mx-3">Select Year: </label>
                    <select
                      className="bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                {selectedReport === "yearly" && (
                  <div>
                    <label className="mx-3">Please Select Year: </label>
                    <select
                      className="bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 my-3"
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

                {selectedReport === "monthly" && (
                  <div>
                    <label>Select Start Date:</label>
                    <DatePicker
                      className="mx-3"
                      selected={selectedDate}
                      onChange={(date) => handleStartDateChange(date)}
                      dateFormat="yyyy-MM-dd"
                    />
                    <label>Select End Date:</label>
                    <DatePicker
                      className="mx-3"
                      selected={selectedDate2}
                      onChange={(date) => handleEndDateChange(date)}
                      dateFormat="yyyy-MM-dd"
                    />
                  </div>
                )}

                {selectedReport === "merchantDailyDetails" &&
                  selectedReport !== "monthly" &&
                  selectedReport !== "yearly" && (
                    <div className="py-3">
                      <label className="mx-3">Select Merchant ID:</label>
                      <input
                        className="bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center"
                        type="text"
                        value={merchantId}
                        onChange={(e) => setMerchantId(e.target.value)}
                        placeholder="Select Merchant ID"
                      />
                      <label className="mx-3">Select Date:</label>
                      <DatePicker
                        className="mx-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        selected={selectedDate}
                        onChange={(date) => handleStartDateChange(date)}
                        dateFormat="yyyy-MM-dd"
                      />
                    </div>
                  )}

                {selectedReport === "totalTransactionYear" && (
                  <div className="py-3">
                    <label>Select merchant Total Transaction Year:</label>
                    <select
                      className="mx-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center"
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
                    {/* <p>Settlement Transactions Between Dates Range</p> */}
                    <input
                      type="text"
                      value={merchantId}
                      onChange={(e) => setMerchantId(e.target.value)}
                      placeholder="Select Merchant ID"
                    />
                    <label>Select Start Date:</label>
                    <DatePicker
                      className="mx-3"
                      selected={selectedStartBetDate}
                      onChange={(date) => handleStartBetDateChange(date)}
                      dateFormat="yyyy-MM-dd"
                    />
                    <label>Select End Date:</label>
                    <DatePicker
                      className="mx-3"
                      selected={selectedEndBetDate}
                      onChange={(date) => handleEndBetDateChange(date)}
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
              (console.log("pageshow:", pageshow),
              console.log("showGraph:", showGraph),
              console.log("selectedReport:", selectedReport),
              (<YearlyReport data={reportGetData} />))}
            {showGraph &&
              selectedReport === "merchantDailyDetails" &&
              // console.log("pageshow:", pageshow),
              (console.log("showGraph:", showGraph),
              console.log("selectedReport:", selectedReport),
              (
                <MerchantReports
                  reportGetMerchIdDateData={reportGetMerchIdDateData}
                />
              ))}
            {showGraph &&
              selectedReport === "dailyMerchIdYear" &&
              (console.log("showGraph:", showGraph),
              console.log("selectedReport:", selectedReport),
              (<DailyReports data={dailyMerchantIdYears} />))}
            {showGraph &&
              selectedReport === "totalTransactionYear" &&
              (console.log("showGraph:", showGraph),
              console.log("selectedReport:", selectedReport),
              (
                <MerchantTotalYearTransaction transactionreports={reportData} />
              ))}
            {showGraph &&
              selectedReport === "totaltransBetDates" &&
              (console.log("showGraph:", showGraph),
              console.log("selectedReport:", selectedReport),
              (<MerchantTransBetDate data={reportData} />))}
          </div>
        )}

   {/* 11111111111111111111111111111111----------------------------------settle ment data  code -------------------------- */}
        {selectedSection && selectedSection === "settlement" && (
          <div className="py-4">
            <select className="py-3 my-3 px-4 rounded-md border border-grey py-4"     onChange={(e) => handleReportChange(e.target.value)}>
              <option value="">Select Report Type</option>

              <option value="chargeadmindailyYear">Settlement Year Wise Report</option>
              <option value="betSettleYearAdmin">Settlement Between Custom Date Range Report</option>
              
            
            </select>
            {selectedReport && (
              <div>
           
           {selectedReport === "chargeadmindailyYear" && (
                <div>
                  <label className="mx-3">Please Select Year: </label>
                      <select
                        className="py-3 my-3 px-4 rounded-md border border-grey py-4"
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

               {selectedReport === "betSettleYearAdmin" && (
                  <div>
                    {/* <p>Settlement Transactions Between Dates Range</p> */}
              
                    <label className="mx-3">Select Start Date:</label>
                    <DatePicker
                    className="py-3 my-3 px-4 rounded-md border border-grey py-4"
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="yyyy-MM-dd"
                    />
                    <label className="mx-3">Select End Date:</label>
                    <DatePicker
                    className="py-3 mx-3 my-3 px-4 rounded-md border border-grey "
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
                    selectedReport === "chargeadmindailyYear" &&
                    (console.log("pageshow:"),
                    console.log("showGraph:", showGraph),
                    console.log("selectedReport:", selectedReport),
                    (<SellerMerchYear data={dailyMerchantIdYears} />))}
          
          {showGraph &&
                    selectedReport === "betSettleYearAdmin" &&
                    (console.log("pageshow:"),
                    console.log("showGraph:", showGraph),
                    console.log("selectedReport:", selectedReport),
                    (<SellerAdminMerchBet data={dailyMerchantIdYears} />))} 
          





        {/* ----------------------trasaction component-------------------------------- */}



            {/* {showGraph &&
              selectedReport === "daily" &&
              // console.log("pageshow:", pageshow),
              (console.log("showGraph:", showGraph),
              console.log("selectedReport:", selectedReport),
              (<MerchDailyReport data={reportData} />))} */}

          </div>
        )}
        



      </div>
    </div>
  );
};



export default Reportcharting;

// {showGraph && <MerchDailyReport data={reportData} />}
//         {showGraph && <MerchYearReport data={reportData} />}
