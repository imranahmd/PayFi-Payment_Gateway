import React from "react";
import { Card, Typography } from "@material-tailwind/react";

const TransactionModal = ({ isOpen, onClose, transactionDetails }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Card className="w-96 py-6 px-4 h-full my-20 overflow-y-auto rounded">
            <Typography
              variant="large"
              color="blue-gray"
              className="font-bold mb-4"
            >
              Transaction Details
            </Typography>
            {/* Display transaction details here */}
            {Object.entries(transactionDetails).map(([key, value]) => (
              <div key={key} className="mb-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold mr-2"
                >
                  {key}:
                </Typography>
                <Typography variant="small" color="blue-gray">
                  {value}
                </Typography>
              </div>
            ))}
            <button
              className="bg-[#6A5ACD] text-white p-2 rounded mt-4"
              onClick={onClose}
            >
              Close
            </button>
          </Card>
        </div>
      )}
    </>
  );
};

export default TransactionModal;
