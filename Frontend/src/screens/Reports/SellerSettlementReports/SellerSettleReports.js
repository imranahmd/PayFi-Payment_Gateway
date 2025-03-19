import React, { useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { format } from "date-fns";
import { API_GATEWAY } from "../../../Apigate/api";
import FetchDatasUtilsGet from "../../../utils/FetchDatasUtilsGet";
import SellerMerchYear from "./SellerMerchYear";

const SellerSettleReports = () => {
  const { authState } = useOktaAuth();
  const [reportType, setReportType] = useState("year");
  const [data, setData] = useState([]);

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate1, setSelectedDate1] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [selectedDate3, setSelectedDate3] = useState(null);
  const [selectedDate4, setSelectedDate4] = useState(null);
  const [selectedDate4MerchantId, setSelectedDate4MerchantId] = useState(null);
  const [selectedDailyAmount, setSelectedDailyAmount] = useState(null);
  const [startDateChange6, setstartDateChange6] = useState(null);
  const [endDateChange7, setEndDateChange7] = useState(null);
  const [startDateChange9, setStartDateChange9] = useState(null);
  const [startDateChange10, setStartDateChange10] = useState(null);
  const [endDateChange11, setEndDateChange11] = useState(null);




  const handleFetchData = async () => {
    const token = authState.accessToken.accessToken;
    const baseUrl = API_GATEWAY + "reports";
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    let url = "";

    // Construct URL based on selected report type and parameters
    // Adjusted to use switch for readability
    switch (reportType) {
      case "year":
        url = `http://localhost:8083/reports/seller-statement/fetchSettlement-for-year?queryYear=2024`;
        break;
      default:
        break;
    }

    if (url) {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: headers,

        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-md shadow-md font-serif">
      {/* Select input and other form elements */}
      <button
        onClick={handleFetchData}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Fetch Data
      </button>
      {/* Display total settlement */}
      <p className="text-lg"> Settlement Report data: data</p>


      {/* Render the bar chart */}
      {/* <SellerMerchYear data={data}/> */}
    </div>
  );
};

export default SellerSettleReports;
