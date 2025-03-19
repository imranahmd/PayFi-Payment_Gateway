import React, { useState, useRef, useEffect } from "react";
import Nav from "../Navbar";
import { useNavigate } from "react-router-dom";
import { FormControl, Select, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";
import {
  selectOktaData,
  selectDatabaseData,
} from "../../features/dataReducer.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { API_GATEWAY } from "../../Apigate/api.js";

const MerchantRegistration = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const navigate = useNavigate();
  const [verifytok, setVerifytok] = useState(null);
  const sectionRefs = [useRef(), useRef()];
  const oktaData = useSelector(selectOktaData);
  const databaseData = useSelector(selectDatabaseData);
  const mid = oktaData.id;
  const firstName = oktaData.user.profile.firstName;
  const lastName = oktaData.user.profile.lastName;

  const [merchantName, setMerchantName] = useState("");
  const [username, setUsername] = useState("");
  const [profileStatus, setProfileStatus] = useState("");
  const [merchantContact, setMerchantContact] = useState("");
  const [designation, setDesignation] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [accountCurrency, setAccountCurrency] = useState("");
  const [IMSType, setIMSType] = useState("");
  const [BIMSType, setBIMSType] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [gst, setGST] = useState("");

  const [directorsKYC, setDirectorsKYC] = useState("");
  const [partnerShipDeed, setPartnerShipDeed] = useState(null);
  const [companyPAN, setCompanyPAN] = useState("");
  const [pancardDoc, setPANCardDoc] = useState(null);
  const [moaDoc, setMOADoc] = useState(null);
  const [cin, setCIN] = useState("");
  const [aoaDoc, setAOADoc] = useState(null);
  const [bankCredentials, setBankCredentials] = useState("");
  const [bankCredentialsCheque, setBankCredentialsCheque] = useState(null);
  const [companyWebsiteLink, setCompanyWebsiteLink] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [businessContact, setBusinessContact] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [branchName, setBranchName] = useState("");
  const [ifscCode, setIFSCCode] = useState("");
  const [bankName, setBankName] = useState("");

  //errors
  const [merchantNameError, setMerchantNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [merchantContactError, setMerchantContactError] = useState("");
  const [postalCodeError, setPostalCodeError] = useState("");
  const [designationError, setDesignationError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [gstError, setGSTError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [companyTypeError, setCompanyTypeError] = useState("");
  const [businessContactError, setBusinessContactError] = useState("");
  const [companyPANError, setCompanyPANError] = useState("");
  const [cinError, setCINError] = useState("");
  const [companyWebsiteLinkError, setCompanyWebsiteLinkError] = useState("");
  const [companyEmailError, setCompanyEmailError] = useState("");
  const [beneficiaryNameError, setBeneficiaryNameError] = useState("");
  const [accountNumberError, setAccountNumberError] = useState("");
  const [branchNameError, setBranchNameError] = useState("");
  const [ifscCodeError, setIFSCCodeError] = useState("");
  const [bankNameError, setBankNameError] = useState("");
  const [panDocError, setPANdocError] = useState("");
  const [aoaDocError, setaoaDocError] = useState("");
  const [moaDocError, setMOADocError] = useState("");
  const [accountCurrencyError, setAccountCurrencyError] = useState("");
  const [partnershipDocError, setPartnerShipDocError] = useState("");
  const [bankCredentialsError, setBankCredentialsError] = useState("");
  const [bankCredentialsChequeError, setBankCredentialsChequeError] =
    useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State to manage confirmation modal
  const [showConfirmationModall, setShowConfirmationModall] = useState(false);
  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
      }
    });
  };

  const registerMerchantDataConfirmation = async (event) => {
    // Show confirmation modal on button click
    event.preventDefault();
    if (!validateInputs()) {
      setShowConfirmationModall(true);
    } else {
      setShowConfirmationModal(true);
    }
  };
  const handleMerchantName = (event) => {
    const inputName = event.target.value;
    setMerchantName(inputName);
    const validNameRegex = /^[a-zA-Z\s]*$/;
    if (validNameRegex.test(inputName)) {
      setMerchantNameError(""); // Input is valid
    } else if (inputName === "") {
      setMerchantNameError("");
    } else {
      setMerchantNameError("Numbers not allowed in name"); // Input is invalid
    }
  };

  const handleUsername = (event) => {
    const inputUsername = event.target.value;
    setUsername(inputUsername);
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_@]*$/;
    if (usernameRegex.test(inputUsername)) {
      setUsernameError("");
    } else if (inputUsername === "") {
      setUsernameError("");
    } else {
      setUsernameError(
        "Username should start with letter and can contains special characters like '_' and '@' "
      );
    }
  };

  const handleProfileStatus = (event) => {
    setProfileStatus(event.target.value);
  };

  const handleMerchantContact = (event) => {
    const inputContact = event.target.value;
    setMerchantContact(inputContact);
    if (inputContact === "") {
      setMerchantContactError("");
    } else if (!/^\d+$/.test(inputContact)) {
      setMerchantContactError(
        "Enter a valid merchant contact number. Use only numeric characters."
      );
    } else {
      setMerchantContactError("");
    }
  };

  const handleDesignation = (event) => {
    const inputDesignation = event.target.value;
    setDesignation(inputDesignation);

    if (inputDesignation.trim() === "") {
      setDesignationError("Designation cannot be empty");
    } else if (!/^[A-Za-z\s]+$/.test(inputDesignation)) {
      setDesignationError("Please use only letters in the designation");
    } else if (/[^A-Za-z\s]/.test(inputDesignation)) {
      setDesignationError(
        "Special characters are not allowed in the designation"
      );
    } else {
      setDesignationError("");
    }
  };

  const handleAddress = (event) => {
    const inputAddress = event.target.value;
    setAddress(inputAddress);

    if (inputAddress.trim() === "") {
      setAddressError("");
    }
  };

  const handleCity = (event) => {
    const inputCity = event.target.value;
    setCity(inputCity);

    if (inputCity.trim() === "") {
      setCityError("");
    } else if (!/^[a-zA-Z ]+$/.test(inputCity)) {
      setCityError("Use only letters in the City");
    } else {
      setCityError("");
    }
  };

  const handleState = (event) => {
    const inputState = event.target.value;
    setState(inputState);

    if (inputState.trim() === "") {
      setStateError("");
    } else if (!/^[a-zA-Z ]+$/.test(inputState)) {
      setStateError("Use only letters in the State");
    } else {
      setStateError("");
    }
  };

  const handleCountry = (event) => {
    const inputCountry = event.target.value;
    setCountry(inputCountry);

    if (inputCountry.trim() === "") {
      setCountryError("");
    } else if (!/^[a-zA-Z ]+$/.test(inputCountry)) {
      setCountryError("Use only letters in the Country");
    } else {
      setCountryError("");
    }
  };

  const handlePostalCode = (event) => {
    const inputPostalCode = event.target.value;
    setPostalCode(inputPostalCode);

    // Regular expression to allow only letters, numbers, and spaces
    const postalCodeRegex = /^\d+$/;

    if (inputPostalCode === "") {
      setPostalCodeError("");
    } else if (!postalCodeRegex.test(inputPostalCode)) {
      setPostalCodeError("Postal code should be digits only");
    } else {
      setPostalCodeError("");
    }
  };

  const handleAccountCurrency = (event) => {
    const inputAccountCurrency = event.target.value.toUpperCase();
    setAccountCurrency(inputAccountCurrency);
    const validNameRegex = /^[a-zA-Z\s]*$/;
    if (validNameRegex.test(inputAccountCurrency)) {
      setAccountCurrencyError(""); // Input is valid
    } else if (inputAccountCurrency === "") {
      setAccountCurrencyError("");
    } else {
      setAccountCurrencyError("Numbers not allowed in Currency"); // Input is invalid
    }
  };

  const handleIMSType = (event) => {
    setIMSType(event.target.value);
  };

  const handleBIMSType = (event) => {
    setBIMSType(event.target.value);
  };

  const handleDescription = (event) => {
    const inputDescription = event.target.value;
    setDescription(inputDescription);
    if (inputDescription.length == null || inputDescription.length > 250) {
      setDescriptionError("Description can not be greater than 250 length");
    } else {
      setDescriptionError("");
    }
    // } else if (inputDescription === "");
    // setDescriptionError("");
  };

  const handleCompanyName = (event) => {
    const inputCompanyName = event.target.value;
    setCompanyName(inputCompanyName);

    if (inputCompanyName.trim() === "") {
      setCompanyNameError("");
    } else if (
      /^[0-9@!#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]*$/.test(inputCompanyName)
    ) {
      setCompanyNameError(
        "Company name cannot consist of only numbers and special characters"
      );
    } else if (inputCompanyName === "") {
      setCompanyNameError("");
    } else {
      setCompanyNameError("");
    }
  };
  const handleCompanyType = (event) => {
    const inputCompanyType = event.target.value;
    setCompanyType(inputCompanyType);
    const validNameRegex = /^[a-zA-Z\s]*$/;
    if (validNameRegex.test(inputCompanyType)) {
      setCompanyTypeError(""); // Input is valid
    } else if (inputCompanyType === "") {
      setCompanyTypeError("");
    } else {
      setCompanyTypeError(
        "Numbers and special characters not allowed in Company Type"
      ); // Input is invalid
    }
  };
  const handleGST = (event) => {
    const inputGST = event.target.value.toUpperCase();
    setGST(inputGST);

    if (inputGST === "") {
      setGSTError("");
    } else if (!/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d{1}[Z]{1}\d{1}$/.test(inputGST)) {
      setGSTError("Enter GST in the format 22ABCDE1234F1Z5");
    } else {
      setGSTError("");
    }
  };
  const handleDirectorsKYC = (event) => {
    setDirectorsKYC(event.target.value);
  };
  const handleCompanyPAN = (event) => {
    const inputCompanyPAN = event.target.value.toUpperCase();
    setCompanyPAN(inputCompanyPAN);

    if (!/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/.test(inputCompanyPAN)) {
      setCompanyPANError(
        "Enter a valid PAN Card number. It should be in the format ABCDE1234F"
      );
    } else if (inputCompanyPAN.length > 10) {
      setCompanyPANError("PAN Card number should not exceed 10 characters");
    } else if (!/^[a-zA-Z0-9]+$/.test(inputCompanyPAN)) {
      setCompanyPANError(
        "Use only alphanumeric characters in the PAN Card number"
      );
    } else {
      setCompanyPANError("");
    }
  };
  const handleCIN = (event) => {
    const inputCIN = event.target.value;
    setCIN(inputCIN);

    if (inputCIN === "") {
      setCINError("");
    } else if (inputCIN.length > 21) {
      setCINError("CIN should not exceed 21 characters");
    } else if (
      !/^([a-zA-Z]{1}[0-9]{5}[a-zA-Z]{2}[0-9]{4}[a-zA-Z]{3}[0-9]{6})$/.test(
        inputCIN
      )
    ) {
      setCINError(
        "Enter a valid CIN. It should be in the format L01631KA2010PTC096843"
      );
    } else if (!/^[a-zA-Z0-9]+$/.test(inputCIN)) {
      setCINError("Use only alphanumeric characters in the CIN");
    } else {
      setCINError("");
    }
  };

  const handleBankCredentials = (event) => {
    const inputAccountNumber = event.target.value;
    setBankCredentials(inputAccountNumber);

    if (inputAccountNumber.trim() === "") {
      setBankCredentialsError("");
    } else if (!/^\d+$/.test(inputAccountNumber)) {
      setBankCredentialsError(
        "Enter a valid account number. It should contain only numeric characters"
      );
    } else {
      setBankCredentialsError("");
    }
  };

  const handleCompanyWebsiteLink = (event) => {
    const inputCompanyWebsiteLink = event.target.value;
    setCompanyWebsiteLink(inputCompanyWebsiteLink);

    if (inputCompanyWebsiteLink === "") {
      setCompanyWebsiteLinkError(" ");
    } else if (
      !/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\S*)?$/.test(
        inputCompanyWebsiteLink
      )
    ) {
      setCompanyWebsiteLinkError(
        "Enter a valid Website Link. It should be in URL format (e.g., www.example.com)"
      );
    } else {
      setCompanyWebsiteLinkError("");
    }
  };
  const handleCompanyEmail = (event) => {
    const inputCompanyEmail = event.target.value.toLowerCase();
    setCompanyEmail(inputCompanyEmail);

    if (inputCompanyEmail.trim() === "") {
      setCompanyEmailError("");
    } else if (!/\S+@\S+\.\S+/.test(inputCompanyEmail)) {
      setCompanyEmailError(
        "Enter a valid email address. It should be in the format (e.g., example@example.com)"
      );
    } else if (/[^a-zA-Z0-9@._-]/.test(inputCompanyEmail)) {
      setCompanyEmailError(
        "Special characters are not allowed in the email address"
      );
    } else {
      setCompanyEmailError("");
    }
  };
  const handleBusinessContact = (event) => {
    const inputBusinessContact = event.target.value;
    setBusinessContact(inputBusinessContact);

    if (inputBusinessContact.trim() === "") {
      setBusinessContactError("Business contact cannot be empty");
    } else if (!/^\d+$/.test(inputBusinessContact)) {
      setBusinessContactError(
        "Enter a valid business contact number. Use only numeric characters."
      );
    } else {
      setBusinessContactError("");
    }
  };

  const handleBeneficiaryName = (event) => {
    const inputBeneficiaryName = event.target.value;
    setBeneficiaryName(inputBeneficiaryName);

    if (inputBeneficiaryName.trim() === "") {
      setBeneficiaryNameError("");
    } else if (!/^[a-zA-Z ]+$/.test(inputBeneficiaryName)) {
      setBeneficiaryNameError("Use only letters in the beneficiary name");
    } else {
      setBeneficiaryNameError("");
    }
  };

  const handleAccountNumber = (event) => {
    const inputAccountNumber = event.target.value;
    setAccountNumber(inputAccountNumber);

    if (inputAccountNumber.trim() === "") {
      setAccountNumberError("");
    } else if (!/^\d+$/.test(inputAccountNumber)) {
      setAccountNumberError(
        "Enter a valid account number. It should contain only numeric characters"
      );
    } else {
      setAccountNumberError("");
    }
  };

  const handleBranchName = (event) => {
    const inputBranchName = event.target.value;
    setBranchName(inputBranchName);

    if (inputBranchName.trim() === "") {
      setBranchNameError("");
    } else if (!/^[a-zA-Z ]+$/.test(inputBranchName)) {
      setBranchNameError("Use only letters in the branch name");
    } else {
      setBranchNameError("");
    }
  };
  const handleIFSCCode = (event) => {
    const inputIFSCCode = event.target.value.toUpperCase();
    setIFSCCode(inputIFSCCode);

    if (inputIFSCCode.trim() === "") {
      setIFSCCodeError("IFSC code cannot be empty");
    } else if (!/^[a-zA-Z0-9]{11}$/.test(inputIFSCCode)) {
      setIFSCCodeError(
        "Enter a valid IFSC code. It should be 11 characters long and alphanumeric"
      );
    } else {
      setIFSCCodeError("");
    }
  };
  const handleBankName = (event) => {
    const inputBankName = event.target.value;
    setBankName(inputBankName);

    if (inputBankName.trim() === "") {
      setBankNameError("");
    } else if (!/^[a-zA-Z ]+$/.test(inputBankName)) {
      setBankNameError("Use only letters in the bank name");
    } else {
      setBankNameError("");
    }
  };

  const handleAOADocChange = (e) => {
    const selectedAOAFile = e.target.files[0];

    if (!selectedAOAFile) {
      setaoaDocError("");
      return;
    }

    const fileTypeError = checkFileType(selectedAOAFile);
    const fileSizeError = checkFileSize(selectedAOAFile);

    if (fileTypeError) {
      setaoaDocError(fileTypeError);
      // setAOADoc(null);
    } else if (fileSizeError) {
      setaoaDocError(fileSizeError);
      // setAOADoc(null);
    } else {
      setaoaDocError("");
      setAOADoc(selectedAOAFile);
    }
  };

  const handleMOADocChange = (e) => {
    const selectedMOAFile = e.target.files[0];

    if (!selectedMOAFile) {
      setMOADocError("");
      return;
    }

    const fileTypeError = checkFileType(selectedMOAFile);
    const fileSizeError = checkFileSize(selectedMOAFile);

    if (fileTypeError) {
      setMOADocError(fileTypeError);
      // setMOADoc(null);
    } else if (fileSizeError) {
      setMOADocError(fileSizeError);
      // setMOADoc(null);
    } else {
      setMOADocError("");

      setMOADoc(selectedMOAFile);
    }
  };

  const handlePartnershipDeedDocChange = (e) => {
    const selectedPDFile = e.target.files[0];

    if (!selectedPDFile) {
      setPartnerShipDocError("");
      return;
    }

    const fileTypeError = checkFileType(selectedPDFile);
    const fileSizeError = checkFileSize(selectedPDFile);

    if (fileTypeError) {
      setPartnerShipDocError(fileTypeError);
      // setPartnerShipDeed(null);
    } else if (fileSizeError) {
      setPartnerShipDocError(fileSizeError);
      // setPartnerShipDeed(null);
    } else {
      setPartnerShipDocError("");

      setPartnerShipDeed(selectedPDFile);
    }
  };

  const handlePANDocChange = (e) => {
    const selectedPANFile = e.target.files[0];

    if (!selectedPANFile) {
      setPANdocError("Please select a file.");
      return;
    }

    const fileTypeError = checkFileType(selectedPANFile);
    const fileSizeError = checkFileSize(selectedPANFile);

    if (fileTypeError) {
      setPANdocError(fileTypeError);
      setPANCardDoc(null);
    } else if (fileSizeError) {
      setPANdocError(fileSizeError);
      setPANCardDoc(null);
    } else {
      setPANdocError("");

      setPANCardDoc(selectedPANFile);
    }
  };

  const handleBankCredentialsDocChange = (e) => {
    const selectedCCFile = e.target.files[0];

    if (!selectedCCFile) {
      setBankCredentialsChequeError("Please select a file.");
      return;
    }

    const fileTypeError = checkFileType(selectedCCFile);
    const fileSizeError = checkFileSize(selectedCCFile);

    if (fileTypeError) {
      setBankCredentialsChequeError(fileTypeError);
      setBankCredentialsCheque(null);
    } else if (fileSizeError) {
      setBankCredentialsChequeError(fileSizeError);
      setBankCredentialsCheque(null);
    } else {
      setBankCredentialsChequeError("");

      setBankCredentialsCheque(selectedCCFile);
    }
  };

  const checkFileType = (file) => {
    const allowedTypes = ["application/pdf"];

    if (!allowedTypes.includes(file.type)) {
      return "Invalid file type. Please select PDF file.";
    }

    return null;
  };

  const checkFileSize = (file) => {
    const maxSize = 1 * 1024 * 1024;

    if (file.size > maxSize) {
      return "File size exceeds the maximum limit (1MB). Please select a smaller file.";
    }

    return null;
  };

  useEffect(() => {
    if (authState && authState.accessToken) {
      const { accessToken } = authState.accessToken;
      setVerifytok(accessToken);
    } else {
    }
  });

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    sectionRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionRefs]);

  const scrollToSection = (index) => {
    if (sectionRefs[index].current) {
      sectionRefs[index].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const validateInputs = () => {
    let isValid = true;

    // if (!merchantName.trim()) {
    //   setMerchantNameError("Please enter merchant name");
    //   isValid = false;
    // }

    if (!username.trim()) {
      setUsernameError("Please enter the username.");
      isValid = false;
    }

    if (merchantContact.length !== 10) {
      setMerchantContactError("Merchant Contact can be 10 digits only");
      isValid = false;
    }

    if (!designation.trim()) {
      setDesignationError("Designation can not be empty");
      isValid = false;
    }

    if (postalCode.length !== 6) {
      setPostalCodeError("Postal Code should be 6 digits only");
      isValid = false;
    }

    if (!companyName.trim()) {
      setCompanyNameError("Company Name is required");
      isValid = false;
    }

    if (!companyType.trim()) {
      setCompanyTypeError("Company Type is required");
      isValid = false;
    }

    if (!gst.trim()) {
      setGSTError("GST can not be empty");
      isValid = false;
    }

    // if (!partnerShipDeed) {
    //   setPartnerShipDocError("Please upload file");
    //   isValid = false;
    // }

    if (!companyPAN) {
      setCompanyPANError("Please enter PAN in proper format");
      isValid = false;
    }

    if (!pancardDoc) {
      setPANdocError("Please upload file");
      isValid = false;
    }

    // if (!moaDoc) {
    //   setMOADocError("Please upload file");
    //   isValid = false;
    // }

    // if (!cin.trim()) {
    //   setCINError("CIN can not be empty");
    //   isValid = false;
    // }

    // if (!description.trim()) {
    //   setDescriptionError("Description can not be empty");
    //   isValid = false;
    // }

    // if (!aoaDoc) {
    //   setaoaDocError("Please upload file");
    //   isValid = false;
    // }

    if (!bankCredentials.trim()) {
      setBankCredentialsError("Bank Account Number can not be empty");
      isValid = false;
    }

    if (!bankCredentialsCheque) {
      setBankCredentialsChequeError("Please upload file");
      isValid = false;
    }

    // if (!companyWebsiteLink.trim()) {
    //   setCompanyWebsiteLinkError("Company Website Link can not be empty");
    //   isValid = false;
    // }

    if (!bankCredentials.trim()) {
      setBankCredentialsError("Bank Account Number can not be empty");
      isValid = false;
    }

    if (!companyEmail.trim()) {
      setCompanyEmailError("Company Email can not be empty");
      isValid = false;
    }

    if (!address.trim()) {
      setAddressError("Address can not be empty");
      isValid = false;
    }

    if (businessContact.length !== 10) {
      setBusinessContactError("Business Contact should be of 10 digits only");
      isValid = false;
    }

    if (!beneficiaryName.trim()) {
      setBeneficiaryNameError("Beneficiary Name is required");
      isValid = false;
    }

    if (!city.trim()) {
      setCityError("City is required");
      isValid = false;
    }

    if (!state.trim()) {
      setStateError("State is required");
      isValid = false;
    }

    if (!country.trim()) {
      setCountryError("State is required");
      isValid = false;
    }

    if (!accountCurrency.trim()) {
      setAccountCurrencyError("Account Currency is required");
      isValid = false;
    }

    if (!accountNumber.trim()) {
      setAccountNumberError("Account Number can not be empty");
      isValid = false;
    }

    if (!branchName.trim()) {
      setBranchNameError("Branch Name can not be empty");
      isValid = false;
    }

    if (!ifscCode.trim()) {
      setIFSCCodeError("IFSC code can not be empty");
      isValid = false;
    }

    if (!bankName.trim()) {
      setBankNameError("Bank Name can not be empty");
      isValid = false;
    }

    return isValid;
  };

  const registerMerchantData = async (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    if (!merchantContactError) {
      // Submit the form or trigger the next action
      console.log("Form submitted successfully");
    } else {
      console.log("Form submission failed due to validation errors");
    }

    try {
      const completeFormData = {
        merchantBasicDetails: {
          merchantOktaId: mid,
          merchantName: merchantName,
          username: username,
          profileStatus: profileStatus,
          merchantContact: merchantContact,
          designation: designation,
          address: address,
          city: city,
          state: state,
          country: country,
          postalCode: postalCode,
          accountCurrency: accountCurrency,
          imstype: IMSType,
          bimstype: BIMSType,
          description: description,
        },
        merchantBusinessDetails: {
          merchantOktaId: mid,
          companyName: companyName,
          companyType: companyType,
          gstNumber: gst,
          directorsIdentificationNumber: directorsKYC,
          companyPAN: companyPAN,
          cin: cin,
          bankAccountNumber: bankCredentials,
          companyWebsiteLink: companyWebsiteLink,
          businessContact: businessContact,
        },
      };

      const firstResponse = await fetch(
        API_GATEWAY + "merchants/registermerchantdetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${verifytok}`,
          },
          body: JSON.stringify(completeFormData),
        }
      );
      const firstResponseData = await firstResponse.json();
      console.log("First Object Response", firstResponseData);

      if (firstResponse.ok) {
        const docDetails = new FormData();

        // Append partnerShipDeed if present
        if (partnerShipDeed) {
          docDetails.append("partnerShipDeed", partnerShipDeed);
        } else {
          // Send a placeholder value if partnerShipDeed is not present
          docDetails.append("partnerShipDeed", ""); // You can also send null or any other suitable value
        }

        // Append pancardDoc always
        docDetails.append("pancardDoc", pancardDoc);

        // Append aoaDoc if present
        if (aoaDoc) {
          docDetails.append("aoaDoc", aoaDoc);
        } else {
          // Send a placeholder value if partnerShipDeed is not present
          docDetails.append("aoaDoc", ""); // You can also send null or any other suitable value
        }

        // Append moaDoc if present
        if (moaDoc) {
          docDetails.append("moaDoc", moaDoc);
        } else {
          // Send a placeholder value if partnerShipDeed is not present
          docDetails.append("moaDoc", ""); // You can also send null or any other suitable value
        }

        // Append bankCredentialsCheque always
        docDetails.append("bankCredentialsCheque", bankCredentialsCheque);

        const secondResponse = await fetch(
          API_GATEWAY + "merchants/registermerchantdetailsdocs",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${verifytok}`,
            },
            body: docDetails,
          }
        );

        const secondResponseData = await secondResponse.json();
        console.log("Second Object Response", secondResponseData);
        toast.success("Merchant Registered Successfully!", {
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        console.error("First API call failed:", firstResponse.statusText);
        toast.error("Merchant Already Registered", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An Error Occurred", {
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <Nav />
      <div style={{ height: "100vh", overflowY: "scroll" }}>
        <button
          className="bg-[#6A5ACD] text-white py-2 px-4 rounded my-4 mx-2"
          onClick={() => scrollToSection(0)}
        >
          {" "}
          Profile Information{" "}
        </button>
        <button
          className="bg-[#6A5ACD] text-white py-2 px-4 rounded my-4 mx-2"
          onClick={() => scrollToSection(1)}
        >
          {" "}
          Business Details{" "}
        </button>
        <section ref={sectionRefs[0]} id="section1" style={{ height: "100vh" }}>
          <div className="container mx-auto p-4 px-20">
            <div className="flex justify-center">
              <h1 className="text-2xl text-[#6a5acd] font-bold py-2 pb-8">
                Create New Merchant
              </h1>
              {window.location.pathname === "/registration" && (
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
            </div>
            <form>
              <div className="flex w-full justify-between">
                <div className="mb-2 w-[50%] mx-2">
                  <label htmlFor="field2">Merchant ID</label>
                  <span className="text-red-500 font-bold ">*</span>
                  {authState &&
                  authState.accessToken.claims &&
                  authState.accessToken.claims.uid ? (
                    <input
                      type="text"
                      id="field2"
                      name="field2"
                      value={authState.accessToken.claims.uid}
                      disabled
                      className="px-3 w-full py-0.5 border border-black rounded"
                    />
                  ) : (
                    <input
                      type="text"
                      id="field2"
                      name="field2"
                      value=""
                      className="px-3 w-full py-0.5 border border-black rounded"
                    />
                  )}
                </div>
                <div className="mb-4 w-[50%] mx-2">
                  <label htmlFor="field1">Merchant Name</label>
                  <span className="text-red-500 font-bold ">*</span>
                  <input
                    type="text"
                    id="field1"
                    name="field1"
                    placeholder="Enter Merchant's Name"
                    value={firstName + ` ` + lastName}
                    disabled
                    style={{ textTransform: "capitalize" }}
                    onChange={handleMerchantName}
                    className="px-3 w-full py-0.5 border border-black rounded"
                  />
                  {/* Error message display */}
                </div>
              </div>

              <div className="flex w-full justify-between">
                <div className="mb-2 w-[50%] mx-2">
                  <label htmlFor="field1">Username</label>
                  <span className="text-red-500 font-bold ">*</span>
                  <input
                    type="text"
                    id="field1"
                    name="field1"
                    placeholder="Enter Username"
                    value={username}
                    onChange={handleUsername}
                    className={`px-3 w-full py-0.5 border ${
                      !usernameError ? "border-black" : "border-red-500"
                    } rounded`}
                  />
                  {usernameError && (
                    <p className="text-red-500 text-sm mt-1">{usernameError}</p>
                  )}
                </div>

                <div className="mb-4 w-[50%] mx-2">
                  <label htmlFor="field2">Primary Email</label>
                  <span className="text-red-500 font-bold ">*</span>
                  {authState &&
                  authState.accessToken.claims &&
                  authState.accessToken.claims.sub ? (
                    <input
                      type="text"
                      id="field2"
                      name="field2"
                      value={authState.accessToken.claims.sub}
                      disabled
                      className="px-3 w-full py-0.5 border border-black rounded"
                    />
                  ) : (
                    <input
                      type="text"
                      id="field2"
                      name="field2"
                      value=""
                      className="px-3 w-full py-0.5 border border-black rounded"
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-between w-full">
                <div className=" w-[50%] mx-2">
                  <FormControl fullWidth>
                    <label>Profile Status</label>
                    <Select
                      labelId="bims-type-label"
                      id="field26"
                      name="field26"
                      placeholder="Enter Profile Status"
                      value={profileStatus}
                      onChange={handleProfileStatus}
                      className="border border-black rounded "
                      sx={{
                        height: "32px",
                      }}
                    >
                      <MenuItem value="type1">Active</MenuItem>
                      <MenuItem value="type2">Suspended</MenuItem>
                      <MenuItem value="type3">Closed</MenuItem>
                      <MenuItem value="type4">Pending</MenuItem>
                      <MenuItem value="type5">Registered</MenuItem>
                    </Select>
                  </FormControl>

                  {/* </div> */}
                </div>

                <div className="mb-4 w-[50%] mx-2">
                  <label htmlFor="field5">Merchant's Contact</label>
                  <span className="text-red-500 font-bold ">*</span>
                  <input
                    type="text"
                    id="field5"
                    name="field5"
                    placeholder="Enter Merchant's Contact"
                    value={merchantContact}
                    onChange={handleMerchantContact}
                    className={`px-3 w-full py-0.5 border ${
                      !merchantContactError ? "border-black" : "border-red-500"
                    } rounded`}
                  />
                  {/* Error message display */}
                  {merchantContactError && (
                    <p className="text-red-500 text-sm mt-1">
                      {merchantContactError}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full flex justify-between">
                <div className="mb-4 w-[50%] mx-2">
                  <label htmlFor="field7">Designation</label>
                  <span className="text-red-500 font-bold ">*</span>
                  <input
                    type="text"
                    id="field7"
                    name="field7"
                    placeholder="Enter Designation"
                    value={designation}
                    style={{ textTransform: "capitalize" }}
                    onChange={handleDesignation}
                    required
                    className={`px-3 w-full py-0.5 border ${
                      designationError ? "border-red-500" : "border-black"
                    } rounded`}
                  />
                  {/* Error message display */}
                  {designationError && (
                    <p className="text-red-500 text-sm mt-1">
                      {designationError}
                    </p>
                  )}
                </div>

                <div className="mb-4 w-[50%] mx-2">
                  <label htmlFor="field13">Address</label>
                  <span className="text-red-500 font-bold ">*</span>
                  <input
                    type="text"
                    id="field8"
                    name="field8"
                    style={{ textTransform: "capitalize" }}
                    placeholder="Enter Address"
                    value={address}
                    onChange={handleAddress}
                    className={`px-3 w-full py-0.5 border ${
                      addressError ? "border-red-500" : "border-black"
                    } rounded`}
                  />
                  {/* Error message display */}
                  {addressError && (
                    <p className="text-red-500 text-sm mt-1">{addressError}</p>
                  )}
                </div>
              </div>

              <div className="w-full flex justify-between">
                <div className="mb-4 w-[30%] mx-2">
                  <label htmlFor="field13">City</label>
                  <span className="text-red-500 font-bold ">*</span>
                  <input
                    type="text"
                    id="field9"
                    name="field9"
                    placeholder="Enter City"
                    value={city}
                    style={{ textTransform: "capitalize" }}
                    onChange={handleCity}
                    className={`px-3 w-full py-0.5 border ${
                      cityError ? "border-red-500" : "border-black"
                    } rounded`}
                  />
                  {/* Error message display */}
                  {cityError && (
                    <p className="text-red-500 text-sm mt-1">{cityError}</p>
                  )}
                </div>

                <div className="mb-4 w-[30%] mx-2">
                  <label htmlFor="field13">State</label>
                  <span className="text-red-500 font-bold ">*</span>
                  <input
                    type="text"
                    id="field10"
                    name="field10"
                    placeholder="Enter State"
                    style={{ textTransform: "capitalize" }}
                    value={state}
                    onChange={handleState}
                    className={`px-3 w-full py-0.5 border ${
                      stateError ? "border-red-500" : "border-black"
                    } rounded`}
                  />
                  {/* Error message display */}
                  {stateError && (
                    <p className="text-red-500 text-sm mt-1">{stateError}</p>
                  )}
                </div>

                <div className="mb-4 w-[30%] mx-2">
                  <label htmlFor="field13">Country</label>
                  <span className="text-red-500 font-bold ">*</span>
                  <input
                    type="text"
                    id="field10"
                    name="field10"
                    style={{ textTransform: "capitalize" }}
                    placeholder="Enter Country"
                    value={country}
                    onChange={handleCountry}
                    className={`px-3 w-full py-0.5 border ${
                      countryError ? "border-red-500" : "border-black"
                    } rounded`}
                  />
                  {/* Error message display */}
                  {countryError && (
                    <p className="text-red-500 text-sm mt-1">{countryError}</p>
                  )}
                </div>
              </div>

              <div className="w-full flex justify-between">
                <div className="mb-4 w-[50%] mx-2">
                  <label htmlFor="field14">Postal Code</label>
                  <span className="text-red-500 font-bold ">*</span>
                  <input
                    type="text"
                    id="field14"
                    name="field14"
                    placeholder="Enter Postal Code"
                    value={postalCode}
                    onChange={handlePostalCode}
                    className={`px-3 w-full py-0.5 border ${
                      postalCodeError ? "border-red-500" : "border-black"
                    } rounded`}
                  />
                  {/* Error message display */}
                  {postalCodeError && (
                    <p className="text-red-500 text-sm mt-1">
                      {postalCodeError}
                    </p>
                  )}
                </div>

                <div className="mb-4 w-[50%] mx-2">
                  <label htmlFor="field26">Account Currency</label>
                  <span className="text-red-500 font-bold ">*</span>
                  <input
                    type="text"
                    id="field26"
                    name="field26"
                    style={{ textTransform: "capitalize" }}
                    placeholder="Enter Account Currency"
                    value={accountCurrency}
                    onChange={handleAccountCurrency}
                    className={`px-3 w-full py-0.5 border ${
                      accountCurrencyError ? "border-red-500" : "border-black"
                    } rounded`}
                  />
                  {/* Error message display */}
                  {accountCurrencyError && (
                    <p className="text-red-500 text-sm mt-1">
                      {accountCurrencyError}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full flex justify-between">
                <div className="mb-4 w-[50%] mx-2">
                  <FormControl fullWidth>
                    <label>Select IMS Type</label>
                    <Select
                      labelId="bims-type-label"
                      id="field26"
                      name="field26"
                      placeholder="Enter IMS Type"
                      value={IMSType}
                      onChange={handleIMSType}
                      className="border border-black rounded"
                      sx={{
                        height: "36px", // Adjust the height as needed
                      }}
                    >
                      <MenuItem value="WhatsApp">WhatsApp</MenuItem>
                      <MenuItem value="Skype">Skype</MenuItem>
                      <MenuItem value="Telegram">Telegram</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="mb-4 w-[50%] mx-2">
                  <FormControl fullWidth>
                    <label>Select BIMS Type</label>
                    <Select
                      labelId="bims-type-label"
                      id="field26"
                      name="field26"
                      placeholder="Enter BIMS Type"
                      value={BIMSType}
                      onChange={handleBIMSType}
                      className="py-1 border border-black rounded"
                      sx={{
                        height: "36px", // Adjust the height as needed
                      }}
                    >
                      <MenuItem value="WhatsApp">WhatsApp</MenuItem>
                      <MenuItem value="Skype">Skype</MenuItem>
                      <MenuItem value="Telegram">Telegram</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div className="mb-4 w-full">
                <label htmlFor="field26">Add New Description </label>
                <textarea
                  type="text"
                  id="field26"
                  name="field26"
                  placeholder="Enter Description"
                  style={{ textTransform: "capitalize" }}
                  value={description}
                  onChange={handleDescription}
                  className={`px-3 w-full py-1 mb-1 border ${
                    descriptionError ? "border-red-500" : "border-black"
                  } rounded appearance-none`}
                />
                {/* Error message display */}
                {descriptionError && (
                  <p className="text-red-500 text-sm bold">
                    {descriptionError}
                  </p>
                )}
                <p>{description.length}</p>
              </div>
            </form>
          </div>
        </section>
        <hr />
        <section ref={sectionRefs[1]} id="section2" style={{ height: "100vh" }}>
          <div className="container mx-auto my-24 px-20">
            <div className="flex justify-center">
              <h1 className="text-2xl text-[#6a5acd] font-bold py-2 pb-8">
                Business Details
              </h1>
            </div>
            <form>
              <div className="flex w-full justify-between">
                <div className="mb-4 w-[50%] mx-2">
                  <label htmlFor="field1">
                    Company Name
                    <span className="text-red-500 font-bold -ml-0.5">*</span>
                  </label>
                  <input
                    type="text"
                    id="field1"
                    name="field1"
                    placeholder="Enter Company Name"
                    value={companyName}
                    style={{ textTransform: "capitalize" }}
                    onChange={handleCompanyName}
                    className={`px-3 w-full py-1 mb-1 border ${
                      companyNameError ? "border-red-500" : "border-black"
                    } rounded appearance-none`}
                  />
                  {/* Error message display */}
                  {companyNameError && (
                    <p className="text-red-500 text-sm bold">
                      {companyNameError}
                    </p>
                  )}
                </div>

                <div className="mb-4 w-[50%] mx-2">
                  <label htmlFor="field2">
                    Company Type
                    <span className="text-red-500 font-bold -ml-0.5">*</span>
                  </label>
                  <input
                    type="text"
                    id="field2"
                    name="field2"
                    placeholder="Enter Company Type"
                    value={companyType}
                    style={{ textTransform: "capitalize" }}
                    onChange={handleCompanyType}
                    className={`px-3 w-full py-1 mb-1 border ${
                      companyTypeError ? "border-red-500" : "border-black"
                    } rounded appearance-none`}
                  />
                  {/* Error message display */}
                  {companyTypeError && (
                    <p className="text-red-500 text-sm">{companyTypeError}</p>
                  )}
                </div>
              </div>

              <div className="flex w-full justify-between">
                <div className="mb-4 w-[50%] mx-2">
                  <label htmlFor="field1">GST Number</label>
                  <span className="text-red-500 font-bold ">*</span>
                  <input
                    type="text"
                    id="field1"
                    name="field1"
                    placeholder="Enter GST Number"
                    value={gst}
                    onChange={handleGST}
                    className={`px-3 w-full py-0.5 border ${
                      gstError ? "border-red-500" : "border-black"
                    } rounded`}
                  />
                  {/* Error message display */}
                  {gstError && (
                    <p className="text-red-500 text-sm mt-1">{gstError}</p>
                  )}
                </div>

                <div className="mb-4 w-[50%] mx-2">
                  <label htmlFor="field2">Director Identification Number</label>

                  <input
                    type="text"
                    id="field2"
                    name="field2"
                    placeholder="Enter Director Identification Number"
                    value={directorsKYC}
                    onChange={handleDirectorsKYC}
                    className="px-3 w-full py-0.5 border border-black rounded"
                  />
                </div>
              </div>

              <div className="flex justify-between w-full">
                <div className="mb-4 w-full mx-2 flex justify-between items-center">
                  <div className="w-[100%]">
                    <label htmlFor="fileInput" className="block mb-1">
                      Upload Partnership Deed Doc
                    </label>
                    <input
                      type="file"
                      accept=".pdf, image/*"
                      className="px-3 w-full py-0.5 border border-black rounded"
                      onChange={handlePartnershipDeedDocChange}
                    />
                    {partnershipDocError && (
                      <p className="text-red-500 text-sm">
                        {partnershipDocError}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4 w-full mx-2 flex justify-center items-center">
                  <div className="w-[50%]">
                    <label htmlFor="field5" className="block mb-1">
                      Company PAN
                      <span className="text-red-500 font-bold ">*</span>
                    </label>

                    <input
                      type="text"
                      id="field5"
                      name="field5"
                      value={companyPAN}
                      onChange={handleCompanyPAN}
                      placeholder="Enter PAN Number"
                      className={`px-3 w-full py-0.5 border ${
                        companyPANError ? "border-red-500" : "border-black"
                      } rounded`}
                    />
                    {/* Error message display */}
                    {companyPANError && (
                      <p className="text-red-500 text-sm mt-1">
                        {companyPANError}
                      </p>
                    )}
                  </div>
                  <div className="w-[50%]">
                    <label htmlFor="fileInput" className="block mb-1">
                      Upload PAN
                      <span className="text-red-500 font-bold ">*</span>
                    </label>
                    <input
                      type="file"
                      accept=".pdf, image/*"
                      className="px-3 w-full py-0.5 border border-black rounded"
                      onChange={handlePANDocChange}
                    />
                    {panDocError && (
                      <p className="text-red-500 text-sm">{panDocError}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between w-full">
                <div className="mb-4 w-full mx-2 flex justify-between items-center">
                  <div className="w-[100%]">
                    <label htmlFor="fileInput" className="block mb-1">
                      Upload MOA Doc (Memorandum of Association)
                    </label>
                    <input
                      type="file"
                      accept=".pdf, image/*"
                      className="px-3 w-full py-0.5 border border-black rounded"
                      onChange={handleMOADocChange}
                    />
                    {moaDocError && (
                      <p className="text-red-500 text-sm">{moaDocError}</p>
                    )}
                  </div>
                </div>

                <div className="mb-4 w-full mx-2 flex justify-between items-center">
                  <div className="w-[100%]">
                    <label htmlFor="field5" className="block mb-1">
                      CIN (Corporate Identification Number)
                    </label>
                    <input
                      type="text"
                      id="field5"
                      name="field5"
                      value={cin}
                      placeholder="Enter CIN"
                      onChange={handleCIN}
                      className={`px-3 w-full py-0.5 border ${
                        cinError ? "border-red-500" : "border-black"
                      } rounded`}
                    />
                    {/* Error message display */}
                    {cinError && (
                      <p className="text-red-500 text-sm mt-1">{cinError}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between w-full">
                <div className="mb-4 w-full mx-2 flex justify-between items-center">
                  <div className="w-[100%]">
                    <label htmlFor="fileInput" className="block mb-1">
                      Upload AOA Doc (Articles of Association)
                    </label>
                    <input
                      type="file"
                      accept=".pdf, image/*"
                      className="px-3 w-full py-0.5 border border-black rounded"
                      onChange={handleAOADocChange}
                    />
                    {aoaDocError && (
                      <p className="text-red-500 text-sm">{aoaDocError}</p>
                    )}
                  </div>
                </div>

                <div className="mb-4 w-full mx-2 flex justify-between items-center">
                  <div className="w-[50%]">
                    <label htmlFor="field5" className="block mb-1">
                      Bank Account Number
                      <span className="text-red-500 font-bold -ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={bankCredentials}
                      onChange={handleBankCredentials}
                      placeholder="Enter Bank Account Number"
                      className="px-3 w-full py-0.5 border border-black rounded"
                    />
                    {bankCredentialsError && (
                      <p className="text-red-500 text-sm">
                        {bankCredentialsError}
                      </p>
                    )}
                  </div>
                  <div className="w-[50%]">
                    <label htmlFor="fileInput" className="block mb-1">
                      Upload Cancel Check
                      <span className="text-red-500 font-bold -ml-1">*</span>
                    </label>
                    <input
                      type="file"
                      accept=".pdf, image/*"
                      placeholder="Upload CC"
                      className="px-3 w-full py-0.5 border border-black rounded"
                      onChange={handleBankCredentialsDocChange}
                    />
                    {bankCredentialsChequeError && (
                      <p className="text-red-500 text-sm">
                        {bankCredentialsChequeError}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-between">
                <div className="mb-4 w-[50%] mx-2">
                  <label htmlFor="field13">Company Website Link</label>
                  <input
                    type="text"
                    id="field9"
                    name="field9"
                    placeholder="Enter Company Website Link"
                    value={companyWebsiteLink}
                    onChange={handleCompanyWebsiteLink}
                    className={`px-3 w-full py-0.5 border ${
                      companyWebsiteLinkError
                        ? "border-red-500"
                        : "border-black"
                    } rounded`}
                  />
                  {/* Error message display */}
                  {companyWebsiteLinkError && (
                    <p className="text-red-500 mt-1 text-sm">
                      {companyWebsiteLinkError}
                    </p>
                  )}
                </div>
                <div className="mb-4 w-[50%] mx-2">
                  <label htmlFor="field13">Company Email</label>
                  <span className="text-red-500 font-bold ">*</span>
                  <input
                    type="text"
                    id="field10"
                    name="field10"
                    placeholder="Enter Company Email"
                    value={companyEmail}
                    onChange={handleCompanyEmail}
                    className={`px-3 w-full py-0.5 border ${
                      companyEmailError ? "border-red-500" : "border-black"
                    } rounded`}
                  />
                  {/* Error message display */}
                  {companyEmailError && (
                    <p className="text-red-500 mt-1 text-sm">
                      {companyEmailError}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full flex justify-between">
                <div className="mb-4 w-[50%] mx-2">
                  <label htmlFor="field14">
                    Business Contact
                    <span className="text-red-500 font-bold -ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="field14"
                    name="field14"
                    placeholder="Enter Business Contact"
                    value={businessContact}
                    onChange={handleBusinessContact}
                    className={`px-3 w-full py-0.5 border ${
                      businessContactError ? "border-red-500" : "border-black"
                    } rounded`}
                  />
                  {/* Error message display */}
                  {businessContactError && (
                    <p className="text-red-500 text-sm mt-1">
                      {businessContactError}
                    </p>
                  )}
                </div>

                <div className="mb-4 w-[50%] mx-2">
                  <label htmlFor="field14">
                    Beneficiary Name
                    <span className="text-red-500 font-bold -ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="field14"
                    name="field14"
                    placeholder="Enter Beneficiary Name"
                    value={beneficiaryName}
                    style={{ textTransform: "capitalize" }}
                    onChange={handleBeneficiaryName}
                    className={`px-3 w-full py-0.5 border ${
                      beneficiaryNameError ? "border-red-500" : "border-black"
                    } rounded`}
                  />
                  {/* Error message display */}
                  {beneficiaryNameError && (
                    <p className="text-red-500 mt-1 text-sm">
                      {beneficiaryNameError}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full flex justify-between">
                <div className="mb-4 w-[50%] mx-2">
                  <label htmlFor="field13">Account Number</label>
                  <span className="text-red-500 font-bold ">*</span>
                  <input
                    type="text"
                    id="field9"
                    name="field9"
                    placeholder="Enter Account Number"
                    value={accountNumber}
                    onChange={handleAccountNumber}
                    className={`px-3 w-full py-0.5 border ${
                      accountNumberError ? "border-red-500" : "border-black"
                    } rounded`}
                  />
                  {/* Error message display */}
                  {accountNumberError && (
                    <p className="text-red-500 mt-1 text-sm">
                      {accountNumberError}
                    </p>
                  )}
                </div>

                <div className="mb-4 w-[50%] mx-2">
                  <label htmlFor="field13">Branch Name</label>
                  <span className="text-red-500 font-bold ">*</span>
                  <input
                    type="text"
                    id="field10"
                    name="field10"
                    placeholder="Enter Branch Name"
                    style={{ textTransform: "capitalize" }}
                    value={branchName}
                    onChange={handleBranchName}
                    className={`px-3 w-full py-0.5 border ${
                      branchNameError ? "border-red-500" : "border-black"
                    } rounded`}
                  />
                  {/* Error message display */}
                  {branchNameError && (
                    <p className="text-red-500 mt-1 text-sm">
                      {branchNameError}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full flex justify-between">
                <div className="mb-4 w-[50%] mx-2">
                  <label htmlFor="field13">IFSC Code</label>
                  <span className="text-red-500 font-bold ">*</span>
                  <input
                    type="text"
                    id="field9"
                    name="field9"
                    placeholder="Enter IFSC Code"
                    value={ifscCode}
                    onChange={handleIFSCCode}
                    className={`px-3 w-full py-0.5 border ${
                      ifscCodeError ? "border-red-500" : "border-black"
                    } rounded`}
                  />
                  {/* Error message display */}
                  {ifscCodeError && (
                    <p className="text-red-500 mt-1 text-sm">{ifscCodeError}</p>
                  )}
                </div>

                <div className="mb-4 w-[50%] mx-2">
                  <label htmlFor="field13">Bank Name</label>
                  <span className="text-red-500 font-bold ">*</span>
                  <input
                    type="text"
                    id="field10"
                    name="field10"
                    placeholder="Enter Bank Name"
                    style={{ textTransform: "capitalize" }}
                    value={bankName}
                    onChange={handleBankName}
                    className={`px-3 w-full py-0.5 border ${
                      bankNameError ? "border-red-500" : "border-black"
                    } rounded`}
                  />
                  {/* Error message display */}
                  {bankNameError && (
                    <p className="text-red-500 mt-1 text-sm">{bankNameError}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-center">
                <div className="p-4">
                  {/* <Link to="/"> */}
                  <button
                    type="submit"
                    onClick={registerMerchantDataConfirmation}
                    className="bg-[#6A5ACD] text-white py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                  {/* </Link> */}
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
      {showConfirmationModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    {/* Heroicon name: check */}
                    <svg
                      className="h-6 w-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Registration Confirmation
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Do you want to submit the details?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={registerMerchantData}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#6a5acd] text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Proceed
                </button>
                <button
                  onClick={() => setShowConfirmationModal(false)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Check again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showConfirmationModall && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    {/* Heroicon name: check */}
                    <img
                      className="h-6 w-6 text-green-600"
                      src="https://cdn-icons-png.flaticon.com/512/14035/14035689.png"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Merchant registration failed!
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Some of the fields are empty or not entered correctly
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {/* <button
                  onClick={registerMerchantData}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#6a5acd] text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Proceed
                </button> */}
                <button
                  onClick={() => setShowConfirmationModall(false)}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#6a5acd] text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Check again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MerchantRegistration;
