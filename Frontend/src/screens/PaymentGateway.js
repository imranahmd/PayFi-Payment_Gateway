import React from "react";
import Submenu from "./Submenu";
import Nav from "./Navbar";
const PaymentGateway = () => {
  return (
    <div>
    <Nav />
    <div className='flex'>
      <Submenu   />
        <div className="flex ">
        <div className="w-[85%] bg-blue-400 flex justify-center">
            <h1 className="text-2xl">Payment Gateway</h1>
         </div>
        </div>
    </div>
  </div>
  );
};

export default PaymentGateway;
