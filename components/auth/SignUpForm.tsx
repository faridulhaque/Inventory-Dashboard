"use client";
import { postData } from "@/services/apis";
import {
  APIEnums,
  ApiResponse,
  HttpStatus,
  TRegisterBody,
  TVerification,
} from "@/services/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

type TSignUpForm = {
  setSignIn: (v: boolean) => void;
};

function SignUpForm({ setSignIn }: TSignUpForm) {
  const [viewPass, setViewPass] = useState(false);
  const [viewPass_2, setViewPass_2] = useState(false);
  const [verifyFrom, setVerifyForm] = useState(false);
  const [email, setEmail] = useState("test@faridmurshed.dev");
  const [code, setCode] = useState<number | null>(null);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values: TRegisterBody & { password_2: string } = Object.fromEntries(
      formData
    ) as any;

    if (values.password !== values.password_2)
      return toast.error("Both password should be similar");
    delete (values as any).password_2;

    const res: ApiResponse<null> = await postData<TRegisterBody>(
      APIEnums.register,
      values
    );
    if (res.status === HttpStatus.ok) {
      toast.success(res.message);
      setEmail(values.email);
      setVerifyForm(true);
    } else {
      toast.error(res.message || "Something went wrong");
    }
  };

  const handleVerification = async (e: any) => {
    e.preventDefault();
    if (!code) return toast.error("Please provide the verification code");
    const res: ApiResponse<null> = await postData<TVerification>(
      APIEnums.verify,
      {
        email,
        code: Number(code),
      }
    );

    if (res.status === HttpStatus.ok) {
      toast.success(res.message);
      setSignIn(true);
      setVerifyForm(false);
    } else {
      toast.error(res.message || "Something went wrong");
    }
  };

  return (
    <div>
      {verifyFrom ? (
        <form
          onSubmit={handleVerification}
          className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-6 mx-auto space-y-5"
        >
          <div className="space-y-2">
            <label className="label p-0">
              <span className="label-text">Verification Code</span>
            </label>

            <input
              onBlur={(e: any) => setCode(e.target.value)}
              required
              type="text"
              className="input input-bordered w-full"
              placeholder="Please input the verification code"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleSignUp}
          className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-6 mx-auto space-y-5"
        >
          <h2 className="text-center text-3xl font-bold text-primary">
            Sign Up Now!
          </h2>

          <div className="space-y-2">
            <label className="label p-0">
              <span className="label-text">Name</span>
            </label>

            <input
              name="name"
              required
              type="text"
              className="input input-bordered w-full"
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <label className="label p-0">
              <span className="label-text">Email</span>
            </label>

            <input
              required
              type="email"
              className="input input-bordered w-full"
              placeholder="Your email"
              name="email"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between w-full">
              <label className="label p-0">
                <span className="label-text">Password</span>
              </label>

              {!viewPass ? (
                <svg
                  onClick={() => setViewPass(!viewPass)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 cursor-pointer text-base-content/70 hover:text-base-content"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              ) : (
                <svg
                  onClick={() => setViewPass(!viewPass)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 cursor-pointer text-base-content/70 hover:text-base-content"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </div>

            <input
              minLength={8}
              required
              type={viewPass ? "text" : "password"}
              className="input input-bordered w-full"
              placeholder="Give a strong password"
              name="password"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between w-full">
              <label className="label p-0">
                <span className="label-text">Reassign Password</span>
              </label>

              {!viewPass_2 ? (
                <svg
                  onClick={() => setViewPass_2(!viewPass_2)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 cursor-pointer text-base-content/70 hover:text-base-content"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              ) : (
                <svg
                  onClick={() => setViewPass_2(!viewPass_2)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 cursor-pointer text-base-content/70 hover:text-base-content"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </div>

            <input
              minLength={8}
              required
              type={viewPass_2 ? "text" : "password"}
              className="input input-bordered w-full"
              placeholder="Give a strong password"
              name="password_2"
            />
          </div>

          <div className="text-sm">
            Already have an account?{" "}
            <button
              onClick={() => setSignIn(true)}
              className="text-primary hover:underline"
            >
              Sign In here
            </button>
          </div>

          <button className="btn btn-primary w-full">Submit</button>
        </form>
      )}
    </div>
  );
}

export default SignUpForm;
