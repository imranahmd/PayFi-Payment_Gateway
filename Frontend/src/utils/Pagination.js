import React from "react";

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-4">
      <ul className="flex">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`mr-2 px-3 py-2 bg-blue-500 text-white rounded cursor-pointer ${
              currentPage === number ? "bg-blue-700" : ""
            }`}
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
