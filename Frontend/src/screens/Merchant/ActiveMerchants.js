import React, { useState } from "react";
import Submenu from "../Submenu";
import { Card, Typography } from "@material-tailwind/react";
import Navbar from "../Navbar";

const ActiveMerchants = () => {
  const TABLE_HEADING = [
    {
      big_heading: "MerID",
      small_heading: "Business Name",
    },
    {
      big_heading: "Full Name",
      small_heading: "Username",
    },
    {
      big_heading: "Business/s",
      small_heading: "GP. ID",
    },
    {
      big_heading: "Trans Amt",
      small_heading: "",
    },
    {
      big_heading: "Action",
      small_heading: "",
    },
  ];

  const TABLE_ROWS = [
    {
      merchant_id: 4634,
      fullname: "Test User",
      business: "Test Name",
      arrows: 0,
      action: ":",
    },
    {
      merchant_id: 5476,
      fullname: "Test User",
      business: "Test Name",
      arrows: 0,
      action: ":",
    },
    {
      merchant_id: 7654,
      fullname: "Test User",
      business: "Test Name",
      arrows: 0,
      action: ":",
    },
    {
      merchant_id: 4363,
      fullname: "Test User",
      business: "Test Name",
      arrows: 0,
      action: ":",
    },
    {
      merchant_id: 8765,
      fullname: "Test User",
      business: "Test Name",
      arrows: 0,
      action: ":",
    },
    {
      merchant_id: 9687,
      fullname: "Test User",
      business: "Test Name",
      arrows: 0,
      action: ":",
    },

    {
      merchant_id: 2353,
      fullname: "Test User",
      business: "Test Name",
      arrows: 0,
      action: ":",
    },
    {
      merchant_id: 6573,
      fullname: "Test User",
      business: "Test Name",
      arrows: 0,
      action: ":",
    },
    {
      merchant_id: 4326,
      fullname: "Test User",
      business: "Test Name",
      arrows: 0,
      action: ":",
    },
  ];

  const ITEMS_PER_PAGE = 5; // Adjust the number of items per page as needed
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = TABLE_ROWS.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  const paginatedRows = TABLE_ROWS.slice(startIndex, endIndex);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <h1 className="text-3xl text-[#6a5acd] font-bold py-4">
          Active Merchants
        </h1>
      </div>
      <div className="flex">
        <Submenu />
        <div>{/* <p> {submenurl}</p>  */}</div>
        {/* <div className="flex justify-center">
        <h1 className="font-bold text-2xl py-6">All Transactions</h1>
      </div> */}
        <Card className="h-full w-full overflow-scroll">
          <table className="w-full h-full min-w-max table-auto text-left">
            <thead>
              <tr className="">
                {TABLE_HEADING.map((head) => (
                  <th
                    key={head}
                    className="border-b  border-t border-blue-gray-100  bg-gray-300 px-4 py-6"
                  >
                    <div className="flex">
                      <Typography
                        variant="large"
                        color="black"
                        className="font-bold leading-none opacity-70"
                      >
                        {head.big_heading}
                      </Typography>
                    </div>

                    <div className="flex">
                      <Typography
                        variant="small"
                        color="black"
                        className="font-normal leading-none opacity-70 py-1"
                      >
                        {head.small_heading}
                      </Typography>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            {paginatedRows.map(
              ({ merchant_id, fullname, business, arrows, action }, index) => {
                const isLast = index === paginatedRows.length - 1;
                const classes = isLast
                  ? "p-4 border-b"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={merchant_id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className=" font-black text-purple-700"
                      >
                        {merchant_id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {fullname}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {business}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-semibold text-green-600"
                      >
                        {arrows}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {action}
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </table>
          <div className="flex justify-end p-4">
            <button
              className="bg-[#6A5ACD] text-white p-2 rounded mr-2"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="bg-[#6A5ACD] text-white p-2 rounded"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ActiveMerchants;
