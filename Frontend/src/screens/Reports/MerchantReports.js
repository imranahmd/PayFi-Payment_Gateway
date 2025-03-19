import React, { useState } from 'react';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'; // Import saveAs function from file-saver
import generatePDF from '../../utils/GeneratePDF';


export default function MerchantReports({ reportGetMerchIdDateData }) {
  console.log("reportGetMerchIdDateData",reportGetMerchIdDateData)
  
  const [downloadFormat, setDownloadFormat] = useState('pdf');
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

  return (
    <div className="p-4 betweendates-report">
      <h2 className="text-xl font-bold mb-4">Transaction History Between Selected Dates</h2>

{/* <p className='mx-4 align text-left  text-gray-800 font-medium'>Merchant Transaction: {data}</p> */}
<div className="flex mx-5 items-center mb-4">
      <label className="mr-4 py-4 text-lg text-gray-800 font-medium">Select Report Format:</label>
        <select
          value={downloadFormat}
          onChange={(e) => setDownloadFormat(e.target.value)}
          className="bg-white mx-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
      <table id="data-table"  className='border rounded-lg mx-8 my-5'>
        <thead>
          <tr className='border'>
            <th className="border border-black px-4 py-2">merchantId</th>
            <th className="border border-black px-4 py-2">Amount</th>
            <th className="border border-black px-4 py-2">cardNumber</th>
            <th className="border border-black px-4 py-2">cardHolderName</th>
            
          </tr>
        </thead>
          {/* {dailyreports.map((report, index) => (
            <tr key={index}>
              <td>{report}</td>
              <td>{report}</td>
            </tr>
          ))} */}
          {/* {data} */}
          <tbody>
        {/*   {reportGetMerchIdDateData.map((row, index) => (
            <tr key={index}>
              <td>{row.amount}</td>
            </tr>
          ))} */}
           {Array.isArray(reportGetMerchIdDateData) ? (
    reportGetMerchIdDateData.map((row, index) => (
      <tr className='border' key={index}>
        <td className='border'>{row.merchantId}</td>
        <td className='border'>{row.amount}</td>
        <td className='border'>{row.cardNumber}</td>
        <td className='border'>{row.cardHolderName}</td>
        
        
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="1">No data available</td>
    </tr>
  )}
        </tbody>
      </table>
    </div>
  );
}
