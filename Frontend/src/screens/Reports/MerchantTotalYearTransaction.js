import React, { useState } from 'react';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'; // Import saveAs function from file-saver


export default function MerchantTotalYearTransaction({ transactionreports }) {
  console.log("transactionreports",transactionreports)
  const [downloadFormat, setDownloadFormat] = useState('pdf');

  const handleDownload = () => {
    if (downloadFormat === 'pdf') {
      // Generate PDF
      const pdf = new jsPDF();
      // pdf.text(transactionreports.toString(), 10, 10);
      
      let y = 10
      let rowDataY = y + 4;
      
      const tableHeader = ['Amount'];
      pdf.text(transactionreports.toString(), 20, 20);
      tableHeader.forEach((header, index) => {
        pdf.text(header, index === 0 ? 10 : 60, rowDataY);
      });
      pdf.save('merchant_transactions.pdf');
    } else if (downloadFormat === 'excel') {
      // Generate Excel
      const ws = XLSX.utils.json_to_sheet([{ transactionreports }]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Merchant Transactions');
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

      const s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      };

      saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'merchant_transactions.xlsx');
    }
  };

  return (
    <div>
      <lable>Merchant Transaction: {transactionreports}</lable>
      <div>
        <label>Select Report Format:</label>
        <select
        
          value={downloadFormat}
          onChange={(e) => setDownloadFormat(e.target.value)}
        >
          <option value="pdf">PDF</option>
          <option value="excel">Excel</option>
        </select>
      </div>
      <button 
           style={{marginLeft:"-192vh",padding:"2vh"}}
           className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          
      onClick={handleDownload}>Download</button>
      <table  className='border rounded-lg mx-8'>
        <thead>
          <tr>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {/* {dailyreports.map((report, index) => (
            <tr key={index}>
              <td>{report}</td>
              <td>{report}</td>
            </tr>
          ))} */}
          {/* {transactionreports} */}
          <th className="border border-black px-4 py-2">{transactionreports}</th>
            
        </tbody>
      </table>
    </div>
  );
}
