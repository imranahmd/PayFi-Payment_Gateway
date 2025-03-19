import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const generatePDF = (tableElement) => {
  return new Promise((resolve, reject) => {
    const pdf = new jsPDF("p", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const style = document.createElement("style");
    style.textContent = `
      body {
          font-size: 10px;
          line-height: 1.2;
      },
      #data-table {
        font-size: 15px;
        border:1px solid red;
        border-collapse: collapse;
      }
      th, td {
          padding: 5px; 
          border: 1px solid black;
          text-align: center; 
      }
    `;
    document.head.appendChild(style);

    html2canvas(tableElement)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const scaleFactor = pdfWidth / canvas.width;
        const imgHeight = canvas.height * scaleFactor;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
        pdf.rect(5, 5, pdfWidth - 10, imgHeight + 10);

        document.head.removeChild(style);

        resolve(pdf);
      })
      .catch((error) => {
        document.head.removeChild(style);
        reject(error);
      });
  });
};

export default generatePDF;
