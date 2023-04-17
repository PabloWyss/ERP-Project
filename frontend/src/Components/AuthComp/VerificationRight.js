import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom
import callAPI from "../../Axios/callAPI";

function VerificationRight() {
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const [error, setError] = useState("");

  //store typed email
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  //store typed password
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  //store typed repeat password
  const handleRepeatPasswordInput = (e) => {
    setRepeatPassword(e.target.value);
  };

  //check if passwords match
  useEffect(() => {
    checkPasswordMatch();
  }, [repeatPassword, userPassword]);

  const checkPasswordMatch = () => {
    if (repeatPassword !== "" && repeatPassword !== userPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  //store typed username
  const handleUserNameInput = (e) => {
    setUserName(e.target.value);
  };

  //store typed firstname
  const handleFirstNameInput = (e) => {
    setFirstName(e.target.value);
  };

  //store typed lastname
  const handleLastNameInput = (e) => {
    setLastName(e.target.value);
  };
  //store typed verification code
  const handleVerificationCodeInput = (e) => {
    setVerificationCode(e.target.value);
  };

  //validation
  const handleActivateClick = async (e) => {
    e.preventDefault();

    if (
      !userEmail ||
      !userName ||
      !verificationCode ||
      !userPassword ||
      !repeatPassword ||
      !firstName ||
      !lastName
    ) {
      setError("Every field is required.");
      return;
    } else {
      let emessage = "";

      //registration request to API
      await callAPI
        .patch(
          "registration/validate/",
          JSON.stringify({
            email: userEmail,
            username: userName,
            code: verificationCode,
            password: userPassword,
            password_repeat: repeatPassword,
            first_name: firstName,
            last_name: lastName,
          })
        )
        .catch((error) => (emessage = error.message));

      //console.log("68: "+emessage);
      if (!emessage) {
        //redirect to login page using NavLink
        return <NavLink to="/signin" />;
      } else {
        alert(emessage);
      }
    }
  };
  return (
    <div className="flex flex-col h-screen w-1/2 bg-bgLogin">
      <div className="flex flex-col items-center mt-12 h-90 w-full">
        <div className="text-2xl font-semibold pb-4">Verification</div>
        <div className="flex flex-col items-center w-60">
          <input
            type="text"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={handleVerificationCodeInput}
            className="leading-10 border-b-2 border-gray-200 w-99 mt-5"
          />
          <div className="grid grid-cols-2 w-full">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={handleFirstNameInput}
              className="leading-10 border-b-2 border-gray-200 w-90 mt-12"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={handleLastNameInput}
              className="leading-10 border-b-2 border-gray-200 w-90 mt-12"
            />
          </div>
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={handleUserNameInput}
            className="leading-10 border-b-2 border-gray-200 w-90 mt-12"
          />
          <input
            type="email"
            placeholder="Email"
            value={userEmail}
            onChange={handleEmailInput}
            className="leading-10 border-b-2 border-gray-200 w-90 mt-12"
          />
          <input
            type="password"
            placeholder="Password"
            value={userPassword}
            onChange={handlePasswordInput}
            className="leading-10 border-b-2 border-gray-200 w-90 mt-12"
          />
          <input
            type="password"
            placeholder="Repeat Password"
            value={repeatPassword}
            onChange={handleRepeatPasswordInput}
            className="leading-10 border-b-2 border-gray-200 w-90 mt-12"
          />
          {!passwordMatch && (
            <div className="text-red-500 text-sm mb-10">Passwords do not match</div>
          )}
          <div
            type="submit"
            onClick={handleActivateClick}
            className="px-24 py-5 rounded-full border-none bg-ifOrange text-white text-sm font-medium tracking-wider mt-6 hover:cursor-pointer"
          >
            Complete
          </div>
        </div>
      </div>
    </div>
  );
  
          }
  export default VerificationRight;
