import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebars = () => {
  // State to track the sidebar's visibility
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  // State to track the selected option and description
  const [selectedOption, setSelectedOption] = useState(null);

  // Function to open the sidebar
  const openSidebar = () => {
    setSidebarOpen(true);
  };

  // Function to close the sidebar
  const closeSidebar = () => {
    setSidebarOpen(false);
    setSelectedOption(null); // Reset selected option when closing sidebar
  };

  // Function to handle option click and display description
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="p-4 h-full">
      {/* Sidebar button */}
      {/* <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className={`toggle-btn ${isSidebarOpen ? 'open' : ''}`}
      >
        {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button> */}

      {/* Main content and sidebar */}
      <div className={`main-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
        {/* Main content of your app */}
        <div className="main-content px-4">
          <h1 className="text-md font-black">Payment Gateway</h1>
        </div>

        {/* Sidebar content with conditional rendering based on the state */}
        <div className={`sidebar ${isSidebarOpen ? "open" : ""} `}>
          {/* Sidebar options */}
          <ul>
            <li onClick={() => handleOptionClick("Option 1")} className="py-1">
              Dashboard
              {selectedOption === "Option 1" && (
                <div className="description">
                  <p className="font-black px-4 text-sm text-red-900 ">
                    Dashboard
                  </p>
                </div>
              )}
            </li>
            <li onClick={() => handleOptionClick("Option 2")} className="py-1">
              Transaction
              {selectedOption === "Option 2" && (
                <div className="description">
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                    <Link to="/alltransaction">All Transaction</Link>
                  </a>
                  <br />
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                    Approved
                  </a>
                  <br />
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                    <Link to="/cancelled">Cancelled</Link>{" "}
                  </a>
                  <br />
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                    Chargeback
                  </a>
                  <br />
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                    Expired
                  </a>
                  <br />
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                    Declined
                  </a>
                  <br />
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                    Failed
                  </a>
                  <br />
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                    Frozen Balance
                  </a>
                  <br />
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                    Frozen Rolling
                  </a>
                  <br />
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                    Partial Refund
                  </a>
                  <br />
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                    Pending
                  </a>
                  <br />
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                    Predispute
                  </a>
                  <br />
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                    Refund Pending
                  </a>
                  <br />
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                    Predispute
                  </a>
                  <br />
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                    Refund
                  </a>
                </div>
              )}
            </li>
            <li onClick={() => handleOptionClick("Option 3")} className="py-1">
              Merchants
              {selectedOption === "Option 3" && (
                <div className="description">
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                    <Link to="/activemerchants">Active</Link>
                  </a>
                  <br />
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                  <Link to="/suspendedmerchants">Suspended</Link>
                  </a>
                  <br />
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                  <Link to="/closedmerchants">Closed</Link>
                  </a>
                  <br />
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                  <Link to="/">Sub Merchant</Link>
                  </a>
                  <br />
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                  <Link to="/unregisteredmerchants">Un-Registered</Link>
                  </a>
                  <br />
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                  <Link to="/registration">Add New</Link>
                  </a>
                  <br />
                </div>
              )}
            </li>

            <li onClick={() => handleOptionClick("Option 4")} className="py-1">
              Sub Admin
              {selectedOption === "Option 4" && (
                <div className="description">
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                  <Link to="/">Add Sub Admin</Link>
                  </a>
                  <br />
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                  <Link to="/">Sub Admin List</Link>
                  </a>
                  <br />
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                  <Link to="/">Create Roles</Link>
                  </a>
                  <br />
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                  <Link to="/">Roles List</Link>
                  </a>
                  <br />
                </div>
              )}
            </li>
            <li onClick={() => handleOptionClick("Option 5")} className="py-1">
              Email
              {selectedOption === "Option 5" && (
                <div className="description">
                  <p className="font-black px-4 text-sm text-red-900 text-w">Email</p>
                  <a href="#" className="font-black px-4 text-sm text-red-900 text-w">
                    <Link to="/emailpage">Mass Mailing</Link>{" "}
                  </a>
                </div>
              )}
            </li>
            <li onClick={() => handleOptionClick("Option 6")} className="py-1">
              Notification
              {selectedOption === "Option 6" && (
                <div className="description">
                  <p className="font-black px-4 text-sm text-red-900 text-w">
                    Notification
                  </p>
                </div>
              )}
            </li>
            <li onClick={() => handleOptionClick("Option 7")} className="py-1">
              Bank Detail
              {selectedOption === "Option 7" && (
                <div className="description">
                  <p className="font-black px-4 text-sm text-red-900 text-w">
                    Bank Detail
                  </p>
                </div>
              )}
            </li>
            <li onClick={() => handleOptionClick("Option 8")} className="py-1">
              Aquirer
              {selectedOption === "Option 8" && (
                <div className="description">
                  <p className="font-black px-4 text-sm text-red-900 text-w">
                    Aquirer
                  </p>
                </div>
              )}
            </li>
            <li onClick={() => handleOptionClick("Option 9")} className="py-1">
              Glossary
              {selectedOption === "Option 9" && (
                <div className="description">
                  <p className="font-black px-4 text-sm text-red-900 text-w">
                    Glossary
                  </p>
                </div>
              )}
            </li>
            <li onClick={() => handleOptionClick("Option 10")} className="py-1">
              Supports
              {selectedOption === "Option 10" && (
                <div className="description">
                  <p className="font-black px-4 text-sm text-red-900 text-w">
                    Supports
                  </p>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebars;
