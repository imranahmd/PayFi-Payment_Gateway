import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
// import icon from "../assets/payfi-logo.png";
import paynitelogo from "../assets/images/paynitelogo.png";

import { Link } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { jwtDecode } from "jwt-decode";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  setOktaData,
  setDatabaseData,
  setSellerData,
  clearUserData,
} from "../features/dataReducer";
import { Logout_image } from "../assets/Dashboard/DashboardImages";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [verifytok, setVerifytok] = useState([]);
  const { oktaAuth, authState } = useOktaAuth();

  useEffect(() => {
    if (authState && authState.accessToken) {
      const { accessToken } = authState.accessToken;
      const decodedToken = jwtDecode(accessToken);
      // console.log(decodedToken);
      setVerifytok(decodedToken.sub);
      // console.log("accesstoken", verifytok);
    } else {
      // Handle the case where authState or authState.accessToken is null
      // console.log("error");
    }
  });

  // console.log("from navbar", verifytok);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  if (!authState) {
    return <h1>Loading...</h1>;
  }

  const handleLogout = async () => {
    oktaAuth.signOut();
    localStorage.removeItem("sellerInfo");
    dispatch(clearUserData);
    toast.success("Logged Out Successfully!", {
      autoClose: 2000,
    });
    // dispatch(setOktaData(null));
    // dispatch(setDatabaseData(null));
  };

  return (
    <div>
      <ToastContainer />
      <nav className="bg-[#6a5acd] py-3 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-md font-semibold text-white">
            <Link to={"/"}>
              {/* <div className="bg-white  rounded-full  ">
              <img src={icon} className="h-12" alt="" />
            </div> */}
              <div className="flex justify-center items-center bg-white h-12 w-32  rounded-full py-2">
                <div>
                  <img className="h-6 " src={paynitelogo} alt="" />
                </div>
                <div className="text-black text-xl ml-1">
                  <h1 className="font-bold">PayNite</h1>
                </div>
              </div>
            </Link>
          </div>

          {!authState.isAuthenticated ? (
            <div className="flex gap-4">
              <div className=" m-1 px-2 py-1 bg-white rounded">
                <Link
                  type="button"
                  className="text-[#6a5acd] font-bold"
                  to="/login"
                >
                  Login
                </Link>
              </div>
              <div className=" m-1 px-2 py-1 bg-white rounded">
                <Link
                  type="button"
                  className="text-[#6a5acd] font-bold"
                  to="/signup"
                >
                  Signup
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-2">
              <div>
                <FaUserCircle className=" text-green-500" />
              </div>
              <div>
                <p className=" text-base  text-white font-bold" to="/login">
                  {verifytok}
                </p>
              </div>
              <div className="flex m-1 px-3 py-1  rounded-lg text-base bg-[#F4F7FE] hover:bg-[#C8CFDF]">
                <button
                  className="flex items-center text-[#6a5acd] font-bold"
                  onClick={handleLogout}
                >
                  <div className="mr-2">{Logout_image}</div>
                  <div className="text-[#263238]">Logout</div>
                </button>
              </div>
            </div>
          )}
        </div>
        {isOpen && (
          <div className="sm:hidden mt-2">
            <ul className="flex flex-col space-y-2">
              <li className="text-white">Home</li>
              <li className="text-white">About</li>
              <li className="text-white">Services</li>
              <li className="text-white">Contact</li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
