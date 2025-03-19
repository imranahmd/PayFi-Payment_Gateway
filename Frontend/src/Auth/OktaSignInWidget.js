import React, { useState } from "react";
import { withOktaAuth, useOktaAuth } from "@okta/okta-react";
import { useDispatch } from "react-redux";
import { setOktaData, setDatabaseData } from "../features/dataReducer"; // Import your Redux actions
// import transaction from "../assets/transaction.png";
// import logo from "../assets/payfi-logo.png";
import paynitelogo from "../assets/images/paynitelogo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import signuplogo1 from "../assets/images/signuplogo1.png";
import signuplogo2 from "../assets/images/signuplogo2.png";
import signuplogo3 from "../assets/images/signuplogo3.png";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Link } from "react-router-dom";

const OktaSignInWidget = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
    setPasswordError("");
  };

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

    return isValid;
  };

  const signIn = async (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      const transaction = await oktaAuth.signIn({
        username: email,
        password: password,
      });
    
      console.log("Transaction:", transaction); // Log transaction object for debugging
    
      if (transaction && transaction.status === "SUCCESS") {
        // Dispatch action to store Okta data
        dispatch(setOktaData(transaction));
    
        // Simulate fetching database data
        const databaseData = {
          /* Fetch your database data here */
        };
    
        // Dispatch action to store database data
        const databaseAction = dispatch(setDatabaseData(databaseData));
    
        // Redirect to the home page or any other route
        const redirectAction = oktaAuth.signInWithRedirect({ sessionToken: transaction.sessionToken });
    
        // Wait for both dispatch actions and redirection to complete
        await Promise.all([databaseAction, redirectAction]);
    
        // Trigger success toast only if login was successful
        toast.success("Login successful!", {
          autoClose: 2000,
          toastId: "success1",
        });
      } else {
        throw new Error(
          "Could not sign in: " +
            (transaction ? transaction.status : "No transaction returned")
        );
      }
    } catch (error) {
      console.error("Sign in error:", error);
    
      // Trigger error toast for any error during the login process
      // toast.error("Login failed. Please try again later.", {
      //   autoClose: 3000,
      //   toastId: "error1",
      // });
    }
    
    
  };

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full">
      <div className="mx-auto">
        <div
          style={{
            background:
              "linear-gradient(to right, rgb(194, 165, 250) 30%, white 70%)",
            backgroundColor: "rgb(194, 165, 250)",
          }}
          className="flex flex-col lg:flex-row justify-center py-4 lg:py-28 lg:px-60 border-solid"
        >
          <div className="w-full flex flex-col h-[530px] gap-16 lg:w-4/12 bg-[#E8E0F8] dark:bg-gray-800 bg-cover rounded-l-lg">
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
          </div>

          <div className="w-full lg:w-8/12 bg-white border border-s-black-100 shadow-2xl dark:bg-gray-700 p-5  rounded-r-lg">
            <h3 className="py-4 font-extrabold text-2xl text-center text-gray-800 dark:text-white">
              Login
            </h3>
            {window.location.pathname === "/login" && (
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            )}
            <form
              onSubmit={signIn}
              className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded"
            >
              <div className="mb-4">
                <input
                  className={`w-full px-3 py-2 mb-3 text-sm leading-tight border ${
                    emailError ? "border-red-500" : "border-black"
                  } rounded appearance-none`}
                  type="text"
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
                <button className="w-full px-4 py-2 font-bold text-white bg-[#6a5acd] rounded dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline">
                  Login
                </button>
              </div>
              <div className="text-center">
                <span className="text-[#6d6d6d]">Don't have an account?</span>
                <Link
                  className="inline-block text-base text-[#6a5acd] align-baseline ml-2 hover:text-blue-800"
                  to="/signup"
                >
                  Signup!
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withOktaAuth(OktaSignInWidget);
