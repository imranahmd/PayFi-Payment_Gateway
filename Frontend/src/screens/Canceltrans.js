import React from 'react'
import { useParams } from 'react-router';
import Sidebars from "./Sidebars";
import Submenu from './Submenu';
import { Card, Typography } from "@material-tailwind/react";
import Navbar from "./Navbar";




const  Canceltrans = () => {
  const { submenurl } = useParams();

  const TABLE_HEADING = [
    {
      big_heading: "TransID",
      small_heading: "Reference",
    },
    {
      big_heading: "Action",
      small_heading: "",
    },
    {
      big_heading: "Bearer Token",
      small_heading: "Full Name",
    }
  ];
  
  const TABLE_ROWS = [
    {
      transaction_id: 123456,
      action: "download",
      bearer_token: "sucess",
    success:"success"
    },
    {
      transaction_id: 123456,
      action: "download",
      bearer_token: "sucess",
      success:"success"
    }
  ];
  return (
    <div>

      <Navbar />
    <div className='flex'>
       <Submenu />
       <div>
       {/* <p> {submenurl}</p>  */}
      </div>
      {/* <div className="flex justify-center">
        <h1 className="font-bold text-2xl py-6">All Transactions</h1>
      </div> */}
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
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
          <tbody>
            {TABLE_ROWS.map(
              (
                {
                  transaction_id,
                  action,
                  bearer_token,
                  transaction_amount,
                  available_balance,
                  timastamp,
                  username,
                  acquirer_response,
                  bill_currency,
                  support_note,
                  source_url,
                },
                index
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4 border-b"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={transaction_id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className=" font-black text-purple-700"
                      >
                        {transaction_id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {action}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {bearer_token}
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
                        {transaction_amount}
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
                        {available_balance}
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
                        {timastamp}
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
                        {username}
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
                        {acquirer_response}
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
                        {bill_currency}
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
                        {support_note}
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
                        {source_url}
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
    </div>
    </div>
  );
};

export default Canceltrans;
