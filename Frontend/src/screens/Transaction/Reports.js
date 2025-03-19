import React, { useState } from "react";
import Navbar from "../Navbar";
import moment from "moment"; // Import moment library

const Reports = () => {
  const dummyData = [
    { date: "2024-03-01", value: 100 },
    { date: "2024-03-05", value: 150 },
    { date: "2024-03-10", value: 120 },
    { date: "2024-03-13", value: 100 },
    { date: "2024-03-16", value: 150 },
    { date: "2024-03-20", value: 120 },
    { date: "2024-03-22", value: 100 },
    { date: "2024-03-26", value: 150 },
    { date: "2024-03-30", value: 120 },
    // Add more dummy data as needed
  ];

  const [selectedRange, setSelectedRange] = useState("weekly");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const filterData = () => {
    let filteredData = [...dummyData];

    // Apply date range filter if start and end dates are selected
    if (startDate && endDate) {
      filteredData = filteredData.filter((data) =>
        moment(data.date).isBetween(startDate, endDate, null, "[]")
      );
    }

    // Apply time range filter (weekly, monthly, yearly)
    if (selectedRange === "weekly") {
      // Adjust the weekly filtering logic to use the selected date range
      filteredData = filteredData.filter((data) =>
        moment(data.date).isBetween(
          moment(startDate).subtract(1, "days"),
          moment(endDate).add(1, "days"),
          null,
          "[]"
        )
      );
    } else if (selectedRange === "monthly") {
      // Adjust the monthly filtering logic to use the selected date range
      filteredData = filteredData.filter((data) =>
        moment(data.date).isBetween(
          moment(startDate).subtract(1, "months"),
          moment(endDate).add(1, "days"),
          null,
          "[]"
        )
      );
    } else if (selectedRange === "yearly") {
      // Adjust the yearly filtering logic to use the selected date range
      filteredData = filteredData.filter((data) =>
        moment(data.date).isBetween(
          moment(startDate).subtract(1, "years"),
          moment(endDate).add(1, "days"),
          null,
          "[]"
        )
      );
    }

    return filteredData;
  };

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const filteredData = filterData();

  return (
    <div>
      <Navbar />
      <div>
        <h1 className="font-bold text-3xl text-center mt-4">
          Reports and Analytics
        </h1>
        <div className="flex justify-center mt-4">
          <label className="mr-2">Select Range:</label>
          <select value={selectedRange} onChange={handleRangeChange}>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div className="flex justify-center mt-4">
          <label className="mr-2">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
          <label className="ml-2 mr-2">End Date:</label>
          <input type="date" value={endDate} onChange={handleEndDateChange} />
        </div>
        <table className="table-auto mt-4 mx-auto w-full border-collapse border border-gray-800">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border border-gray-600">Transaction Date</th>
              <th className="p-2 border border-gray-600">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="p-2 border border-gray-600">{data.date}</td>
                <td className="p-2 border border-gray-600">{data.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
