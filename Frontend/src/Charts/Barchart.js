import React, { useState, useEffect } from "react";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const Barchart = ({ data }) => {
  const [salesdata, setSalesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  Chart.register(CategoryScale);

  const customDataset = createDataset(
    "Sales",
    salesdata,
    "rgba(75, 192, 192, 0.2)",
    "rgba(75, 192, 192, 1)",
    1
  );

  function createDataset(label, data) {
    return {
      label: label,
      data: data,
    };
  }

  useEffect(() => {
    setSalesData(data);
  }, [data]);

  return (
    <div className="p-4"> {/* Adding padding */}
      <Bar
        data={{
          labels: [],
          datasets: [
            {
              label: "Sales",
              data: customDataset,
              backgroundColor: "rgba(75, 192, 192, 0.2)", // Example Tailwind color
              borderColor: "rgba(75, 192, 192, 1)", // Example Tailwind color
              borderWidth: 1,
            },
          ],
        }}
      />
      {error && <p className="text-red-500">Error: {error}</p>} {/* Adding text color */}
      {loading && <p className="text-blue-500">Loading...</p>} {/* Adding text color */}
    </div>
  );
};

export default Barchart;
