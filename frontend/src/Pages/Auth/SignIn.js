import React from "react";
import logo from "../../Assets/Logos/logo_white.svg";
import SignInRight from "../../Components/AuthComp/SignInRight";
import SignInLeft from "../../Components/AuthComp/SignInLeft";

function SignIn() {
  return (
    <div className="flex h-screen w-screen">
      <SignInLeft />
      <SignInRight />
    </div>
  );
}

export default SignIn;
