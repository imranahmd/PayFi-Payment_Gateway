import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import generatePDF from "../../../utils/GeneratePDF";
import Pagination from "../../../utils/Pagination";



const MerchTotalTransDet = ({ data }) => {
  console.log(data)
  const pdfRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [transactions, setTransactions] = useState([]);
  const [downloadFormat, setDownloadFormat] = useState("pdf");

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setCurrentPage(1);
      setTransactions(data);
    }
  }, [data]);

  const handleDownload = () => {
    const table = document.getElementById("data-table");
    if (downloadFormat === "pdf") {
      generatePDF(table)
        .then((pdf) => {
          pdf.save("table.pdf");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    } else if (downloadFormat === "excel") {
      // Logic for Excel download
        const ws = XLSX.utils.table_to_sheet(table);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
  
        const s2ab = (s) => {
          const buf = new ArrayBuffer(s.length);
          const view = new Uint8Array(buf);
          for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
          return buf;
        };
  
        saveAs(
          new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
          "table.xlsx"
        );
      
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(data) ? transactions.slice(indexOfFirstItem, indexOfLastItem) : [];

  return (
    <div className="p-4 yearly-report">
      <h2 className="text-xl font-bold mb-4">Transaction History Between Select Dates</h2>
      <div className="flex items-center mb-4">
        <label className="mr-2">Select Report Format:</label>
        <select
          value={downloadFormat}
          onChange={(e) => setDownloadFormat(e.target.value)}
          className="bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="pdf">PDF</option>
          <option value="excel">Excel</option>
        </select>
      </div>
      <button
      style={{marginLeft:"-192vh",padding:"2vh"}}
        className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleDownload}
      >
        Download
      </button>
      <table id="data-table" className="table-auto border-collapse border border-black my-4">
        {/* Table headers */}
        <thead>
          <tr>
            <th className="border border-black px-4 py-2">Transaction</th>
            <th className="border border-black px-4 py-2">Amount</th>
            <th className="border border-black px-4 py-2">Currency</th>
            <th className="border border-black px-4 py-2">Status</th>
            {/* <th className="border border-black px-4 py-2">customerVPA</th> */}
            <th className="border border-black px-4 py-2">message</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {currentItems.map((transaction, index) => (
            <tr key={index}>
              <td className="border border-black px-4 py-2">{transaction.transactionId}</td>
              <td className="border border-black px-4 py-2">{transaction.amount}</td>
              <td className="border border-black px-4 py-2">{transaction.currency}</td>
              <td className="border border-black px-4 py-2">{transaction.status}</td>
              {/* <td className="border border-black px-4 py-2">{transaction.customerVPA}</td> */}
              <td className="border border-black px-4 py-2">{transaction.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {transactions.length > itemsPerPage && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={transactions.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
      {/* <Barchart data={currentItems.map((transaction) => transaction.amount)} /> */}
    </div>
  );
};

export default MerchTotalTransDet;
