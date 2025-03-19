import React, { useState } from "react";

const DropdownMenu = ({ title, content, isCollapsible }) => {
  const [isOpen, setIsOpen] = useState(isCollapsible);

  const toggleAccordion = () => {
    if (isCollapsible) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg mb-4">
      <div className="p-4">
        <div className="flex justify-around">
          <h2
            className="text-lg font-semibold cursor-pointer "
            onClick={toggleAccordion}
          >
            {title}
          </h2>
          {isCollapsible && (
            <button
              className="p-1 bg-blue-500 text-white rounded-lg text-sm"
              onClick={toggleAccordion}
            >
              {isOpen ? "Close" : "Open"}
            </button>
          )}
        </div>
        <div
          className={`mt-4 ${
            isOpen ? "visible" : "hidden"
          } transition-opacity duration-300 opacity-0 group-hover:opacity-100`}
        >
          <div className="bg-gray-100 p-4 rounded-md text-sm">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
