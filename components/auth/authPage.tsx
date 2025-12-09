"use client";
import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

function AuthPage() {
  const [signIn, setSignIn] = useState(true);
  return (
    <div>
      {signIn ? (
        <SignInForm setSignIn={setSignIn}></SignInForm>
      ) : (
        <SignUpForm setSignIn={setSignIn}></SignUpForm>
      )}
    </div>
  );
}

export default AuthPage;
