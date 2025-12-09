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
  const [verifyFrom, setVerifyForm] = useState(true);
  const [email, setEmail] = useState("test@faridmurshed.dev");
  const [code, setCode] = useState<number | null>(null);
  const router = useRouter();

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
    console.log("res in fe", res);

    if (res.status === HttpStatus.ok) {
      toast.success(res.message);
      router.push("/fe/auth");
    } else {
      toast.error(res.message || "Something went wrong");
    }
  };

  return (
    <div>
      {verifyFrom ? (
        <form
          onSubmit={handleVerification}
          className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
        >
          <div>
            <label className="label">Verification Code</label>
            <input
              onBlur={(e: any) => setCode(e.target.value)}
              required
              type="text"
              className="input"
              placeholder="Please input the verification code"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full my-3">
            Submit
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleSignUp}
          className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
        >
          <h2 className="py-3 text-center text-4xl">Sign Up Now!</h2>
          <div>
            <label className="label">Name</label>
            <input
              name="name"
              required
              type="text"
              className="input"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="label">Email</label>
            <input
              required
              type="email"
              className="input"
              placeholder="Your email"
              name="email"
            />
          </div>

          <div className="relative">
            {!viewPass ? (
              <svg
                onClick={() => setViewPass(!viewPass)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 absolute right-0 top-0"
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
                className="size-4 absolute right-0 top-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            )}

            <label className="label">Password</label>
            <input
              minLength={8}
              required
              type={viewPass ? "text" : "password"}
              className="input"
              placeholder="Give a strong password"
              name="password"
            />
          </div>

          <div className="relative">
            {!viewPass_2 ? (
              <svg
                onClick={() => setViewPass_2(!viewPass_2)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 absolute right-0 top-0"
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
                className="size-4 absolute right-0 top-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            )}

            <label className="label">Reassign Password</label>
            <input
              minLength={8}
              required
              type={viewPass_2 ? "text" : "password"}
              className="input"
              placeholder="Give a strong password"
              name="password_2"
            />
          </div>
          <div>
            Already have an account?{" "}
            <button onClick={() => setSignIn(true)}>Sign In here</button>
          </div>
          <button className="btn btn-primary w-full my-3">Submit</button>
        </form>
      )}
    </div>
  );
}

export default SignUpForm;
