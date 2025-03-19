import React from "react";
import { useState } from "react";
import transaction from "../assets/images/transaction.png";
// import logo from "../assets/payfi-logo.png";
import paynitelogo from "../assets/images/paynitelogo.png";
import { Link, useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useDispatch } from "react-redux";
import { setFullData } from "../features/dataReducer";
import {
  setOktaData,
  setDatabaseData,
  selectOktaData,
  selectDatabaseData,
} from "../features/dataReducer";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { signupoktaPost, API_GATEWAY } from "../Apigate/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import signuplogo1 from "../assets/images/signuplogo1.png";
import signuplogo2 from "../assets/images/signuplogo2.png";
import signuplogo3 from "../assets/images/signuplogo3.png";

const Signup = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastnameError, setLastNameError] = useState("");
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    centerPadding: "3px",
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const validateInputs = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (!firstName.trim()) {
      setFirstNameError("Firstname is required");
      isValid = false;
    }

    if (!lastName.trim()) {
      setLastNameError("Lastname is required");
      isValid = false;
    }

    return isValid;
  };

  const saveUserData = async (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      // First POST request
      const response1 = await fetch(signupoktaPost, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "SSWS 00HkJljM6n8t6ZVpu8baYnR4c3rUC-5QITmesksCAL",
        },
        body: JSON.stringify({
          profile: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            login: email,
          },
          credentials: {
            password: { value: password },
          },
        }),
      });

      const data1 = await response1.json();
      console.log("Okta Data:", data1);
      dispatch(setOktaData(data1));

      const okta_merchant_id = data1.id;
      console.log(okta_merchant_id);

      // Second POST requests
      if (okta_merchant_id) {
        const response2 = await fetch(API_GATEWAY + "merchants/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            merchantOktaId: okta_merchant_id,
          }),
        });
        const data2 = await response2.json();
        console.log("Database Data", data2);
        dispatch(setDatabaseData(data2));
        // navigate to login after successful signup
        toast.success("Signup Successful! You can Login now", {
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/login");
        }, 2500);
      } else {
        console.log("user not created");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Signup Failed. User not created.", {
        autoClose: 2000,
      });
    }
  };

  const handleFirstNameChange = (event) => {
    const inputFirstName = event.target.value;
    setFirstName(inputFirstName);
    const validNameRegex = /^[a-zA-Z\s]*$/;
    if (validNameRegex.test(inputFirstName)) {
      setFirstNameError(""); // Input is valid
    } else {
      setFirstNameError("Numbers not allowed in First Name"); // Input is invalid
    }
  };

  const handleLastNameChange = (event) => {
    const inputLastName = event.target.value;
    setLastName(inputLastName);
    const validNameRegex = /^[a-zA-Z\s]*$/;
    if (validNameRegex.test(inputLastName)) {
      setLastNameError(""); // Input is valid
    } else {
      setLastNameError("Numbers not allowed in Last Name"); // Input is invalid
    }
  };

  const handleEmailChange = (event) => {
    const inputEmail = event.target.value.trim().toLowerCase();
    setEmail(inputEmail);

    if (inputEmail === "") {
      setEmailError("");
    } else if (/^[0-9]/.test(inputEmail)) {
      setEmailError("Email should not start with a number");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setFieldErrors({ ...fieldErrors, password: "" });
  };

  return (
    <div className="h-full">
      <ToastContainer />
      <div className="mx-auto">
        <div
          style={{
            background:
              "linear-gradient(to right, rgb(194, 165, 250) 30%, white 70%)",
            backgroundColor: "rgb(194, 165, 250)",
          }}
          className="flex flex-col lg:flex-row justify-center py-4 lg:py-28 lg:px-60 border-solid"
        >
          <div className="w-full  h-[530px] flex flex-col gap-16 lg:w-4/12 bg-[#E8E0F8] dark:bg-gray-800 bg-cover rounded-l-lg  ">
            <div className="flex justify-center mt-8  items-center">
              <div>
                <img className="h-8 " src={paynitelogo} alt="" />
              </div>
              <div className="text-white text-xl ml-1 font-semibold">
                <h1 className="text-black">PayNite</h1>
              </div>
            </div>
            <div>
              <Slider {...settings}>
                <div className="flex justify-center items-center mb-4">
                  <div>
                    <img className="mx-auto h-48" src={signuplogo1} alt="" />
                    <h1 className="mt-4 text-center text-black text-xl font-semibold">
                      Smooth Integration
                    </h1>
                    <p className="px-10 mt-2 text-center w-68 text-black text-sm">
                      Integrate payment systems effortlessly to drive business
                      growth.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <div>
                    <img className="mx-auto h-48 " src={signuplogo2} alt="" />
                    <h1 className="mt-4 text-center  text-black text-xl font-semibold">
                      Fortified Security
                    </h1>
                    <p className="px-4 mt-2 text-center w-68 text-black text-sm">
                      Strengthen transaction security for heightened protection
                      and customer trust.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <div>
                    <img className="mx-auto h-48" src={signuplogo3} alt="" />
                    <h1 className="mt-4 text-center text-xl text-black font-semibold">
                      Global Transactions
                    </h1>
                    <p className="px-10 mt-2 text-center w-68 text-black text-sm">
                      Expand globally and accept diverse payments from different
                      customers.
                    </p>
                  </div>
                </div>
              </Slider>
            </div>

            {/* <div className="flex flex-col justify-start pl-8 pb-12">
              <div className="text-white font-bold text-2xl py-2">
                <h2>Feature Highlights:</h2>
              </div>
              <div className=" flex text-white py-1 text-sm">
                <CheckCircleOutlineIcon />
                <h3 className="ml-2">One Click Registration</h3>
              </div>
              <div className="flex text-white py-1 text-sm">
                <CheckCircleOutlineIcon />
                <h3 className="ml-2">Smooth Transaction</h3>
              </div>
              <div className="flex text-white py-1 text-sm">
                <CheckCircleOutlineIcon />
                <h3 className="ml-2">Secure-payment environment</h3>
              </div>
              <div className="flex text-white py-1 text-sm">
                <CheckCircleOutlineIcon className="f" />
                <h3 className="ml-2">Easy expense tracking</h3>
              </div>
            </div> */}
          </div>
          <div className="w-full lg:w-8/12 bg-white border border-s-black-100 shadow-2xl dark:bg-gray-700 p-5 rounded-r-lg ">
            <h3
              className="py-4 font-bold text-2xl text-center text-gray-800 dark:text-white"
              // style={{ fontFamily: }}
            >
              Create Account!
            </h3>

            <form className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded">
              <div className="mb-4 md:flex">
                <div className="mb-4 md:mr-1 md:mb-0" style={{ flex: 1 }}>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight border border-black rounded  appearance-none"
                    id="firstName"
                    type="text"
                    placeholder="Enter First Name"
                    style={{ textTransform: "capitalize" }}
                    // value={firstName}
                    value={firstName}
                    onChange={handleFirstNameChange}
                  />
                  {firstNameError && (
                    <p className="text-red-500 text-sm mt-1 bold">
                      {firstNameError}
                    </p>
                  )}
                </div>
                <div className="md:ml-1" style={{ flex: 1 }}>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight border border-black rounded appearance-none"
                    id="lastName"
                    type="text"
                    placeholder="Enter Last Name"
                    style={{ textTransform: "capitalize" }}
                    value={lastName}
                    onChange={handleLastNameChange}
                  />
                  {lastnameError && (
                    <p className="text-red-500 mt-1 text-sm bold">
                      {lastnameError}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <input
                  className={`w-full px-3 py-2 mb-3 text-sm leading-tight border ${
                    emailError ? "border-red-500" : "border-black"
                  } rounded appearance-none focus:outline-none focus:shadow-outline`}
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailError && (
                  <p className="text-red-500 text-sm bold">{emailError}</p>
                )}
              </div>
              <div className="mb-1 relative">
                <input
                  className={`w-full px-3 py-2 mb-3 text-sm leading-tight border ${
                    passwordError ? "border-red-500" : "border-black"
                  } rounded appearance-none focus:outline-none focus:shadow-outline`}
                  id="password"
                  type={showPassword ? "text" : "password"} // Toggle input type
                  placeholder="Enter Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {passwordError && (
                  <p className="text-red-500 text-sm font-bold">
                    {passwordError}
                  </p>
                )}
                <button
                  type="button" // Specify button type to prevent form submission
                  className="absolute right-0 bottom-3 transform -translate-y-1/2 mr-2 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEye /> : <FaEyeSlash />}
                </button>
              </div>

              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-[#6a5acd] rounded dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={saveUserData}
                >
                  Create Account
                </button>
              </div>

              <div className="text-center">
                <span className="text-[#6d6d6d]">Already have an account?</span>
                <Link
                  className="inline-block text-base text-[#6a5acd] align-baseline ml-2 hover:text-blue-800"
                  to="/login"
                >
                  Login!
                </Link>
              </div>
              <div className="flex flex-col md:flex-row justify-center mt-10 gap-3">
                {/* <div className="flex items-center justify-center dark:bg-gray-800">
                  <button className="w-full md:w-auto px-4 py-2 border flex gap-2 border-slate-500 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                    <img
                      className="w-6 h-6"
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      loading="lazy"
                      alt="google logo"
                    />
                    <span className="text-sm">Sign up with Google</span>
                  </button>
                </div> */}

                {/* <div className="flex items-center justify-center dark:bg-gray-800">
                  <button className="w-full md:w-auto px-4 py-2 border flex gap-2 border-slate-500 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                    <img
                      className="w-6 h-6"
                      src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Facebook_F_icon.svg"
                      loading="lazy"
                      alt="facebook logo"
                    />
                    <span className="text-sm">Sign up with Facebook</span>
                  </button>
                </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
