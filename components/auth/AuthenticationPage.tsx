"use client";
import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

function AuthenticationPage() {
  const [signIn, setSignIn] = useState(true);
  return (
    <div className="h-screen w-full bg-base-100 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="backdrop-blur-md bg-base-200/70 border border-base-300 rounded-2xl p-6 shadow-xl animate-fadeIn">
          {signIn ? (
            <SignInForm setSignIn={setSignIn} />
          ) : (
            <SignUpForm setSignIn={setSignIn} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthenticationPage;
