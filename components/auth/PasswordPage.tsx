"use client";
import { postData, putData } from "@/services/apis";
import { APIEnums, ApiResponse, HttpStatus } from "@/services/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function PasswordPage() {
  const [step, setStep] = useState(1);
  const [viewPass, setViewPass] = useState(false);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();

  return (
    <div className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      {step === 1 && (
        <>
          <h2 className="py-3 text-center text-4xl">Give your email</h2>

          <div>
            <label className="label">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              className="input"
              placeholder="Your email"
              name="email"
            />
          </div>
          <button
            onClick={async () => {
              const res: ApiResponse<null> = await postData<{
                email: string;
              }>(APIEnums.forgetPassword, { email });

              if (res.status === HttpStatus.ok) {
                toast.success(res.message);
                setStep(2);
              } else {
                toast.error(res.message);
              }
            }}
            className="btn btn-primary w-full my-3"
          >
            Continue
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="py-3 text-center text-4xl">Verification Code</h2>

          <div>
            <label className="label">Code</label>
            <input
              onChange={(e) => setCode(e.target.value)}
              required
              type="text"
              className="input"
              placeholder="Verification code"
            />
          </div>
          <button
            onClick={async () => {
              const res: ApiResponse<null> = await postData<{
                email: string;
                code: number;
              }>(APIEnums.verifyCodeForPassword, { email, code: Number(code) });

              if (res.status === HttpStatus.ok) {
                toast.success(res.message);
                setStep(3);
              } else {
                toast.error(res.message);
              }
            }}
            className="btn btn-primary w-full my-3"
          >
            Continue
          </button>
        </>
      )}

      {step === 3 && (
        <>
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
              onChange={(e) => setNewPassword(e.target.value)}
              minLength={8}
              required
              type={viewPass ? "text" : "password"}
              className="input"
              placeholder="Give a strong password"
              name="password"
            />
          </div>
          <button
            onClick={async () => {
              const res: ApiResponse<null> = await putData<{
                email: string;
                password: string;
              }>(APIEnums.updatePassword, { email, password: newPassword });

              if (res.status === HttpStatus.ok) {
                toast.success(res.message);
                router.push("/fe/auth");
              } else {
                toast.error(res.message);
              }
            }}
            className="btn btn-primary w-full my-3"
          >
            Complete
          </button>
        </>
      )}
    </div>
  );
}

export default PasswordPage;
