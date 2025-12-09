import { postData } from "@/services/apis";
import {
  APIEnums,
  ApiResponse,
  HttpStatus,
  TLoginBody,
} from "@/services/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

type TSignInForm = {
  setSignIn: (v: boolean) => void;
};
function SignInForm({ setSignIn }: TSignInForm) {
  const router = useRouter();
  const [viewPass, setViewPass] = useState(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values: TLoginBody = Object.fromEntries(formData) as any;

    const res: ApiResponse<{ token: string }> = await postData<TLoginBody>(
      APIEnums.login,
      values
    );

    if (res.status === HttpStatus.ok) {
      localStorage.setItem("token", res.data.token);
      toast.success(res.message);
      router.push("/fe/dashboard");
    } else {
      toast.error(res.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSignIn}
      className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
    >
      <h2 className="py-3 text-center text-4xl">Sign In Now!</h2>

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

      <div>
        Don&apos;t have an account?{" "}
        <button onClick={() => setSignIn(false)}>Sign up here</button>
      </div>
      <button className="btn btn-primary w-full my-3">Submit</button>
    </form>
  );
}

export default SignInForm;
