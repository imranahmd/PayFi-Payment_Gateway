import React from "react";
import Nav from "./Navbar";
import Sidebars from "./Sidebars";


const Submenu = () => {
  return (
    <div>
      {/* <Nav /> */}
      {/* <div className="flex "> */}
        {/* <div className="w-[15%] border-r border-black bg-gray-400 flex justify-center">
          <h1 className="text-2xl">Sidebar</h1>
        </div> */}
        {/* <Sidebar /> */}
        <Sidebars />
        {/* <div className="w-[85%] bg-blue-400 flex justify-center">
          <h1 className="text -2xl">Feature Description</h1>
        </div> */}
      </div>
    // </div>
  );
};

export default Submenu;
