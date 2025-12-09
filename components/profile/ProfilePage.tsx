"use client";
import { getData, putData } from "@/services/apis";
import { APIEnums, ApiResponse, HttpStatus, TUser } from "@/services/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { uploadImage } from "@/services/util-client";

function ProfilePage() {
  const [editName, setEditName] = useState(false);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      const res: ApiResponse<TUser> = await getData(APIEnums.profile);
      if (res.status === HttpStatus.ok) {
        setUser(res.data);
      }
    };
    getProfile();
  }, []);

  const handleSaveName = async () => {
    if (!userName) return toast.error("Name is required");
    const res: ApiResponse<TUser> = await putData<{
      name?: string;
      imageUrl?: string;
    }>(APIEnums.profile, {
      name: userName,
    });

    if (res.status === HttpStatus.ok) {
      toast.success(res.message);
    } else {
      toast.error(res.message ?? "Something went wrong");
    }
    setEditName(false);
  };

  return (
    <div>
      <div className="avatar relative">
        <label htmlFor="pro_pic" className="absolute -right-3 bottom-5">
          <input
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const allowed = ["image/jpeg", "image/jpg", "image/png"];
              if (!allowed.includes(file.type)) {
                toast.error("Only JPG or PNG allowed");
                return;
              }

              const url = await uploadImage(file);

              await putData(APIEnums.profile, { imageUrl: url });

              toast.success("Profile picture updated");

              setUser((prev) => (prev ? { ...prev, imageUrl: url } : prev));
            }}
            id="pro_pic"
            type="file"
            className="hidden"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </label>
        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
          <Image
            width={300}
            height={300}
            alt="avatar"
            src={`${user?.imageUrl ?? "/assets/default/avatar.webp"}`}
          />
        </div>
      </div>

      <div className="py-5">
        <span>{user?.name}</span>
        <span onClick={() => setEditName(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </span>

        {editName && (
          <input
            onChange={(e) => setUserName(e.target.value)}
            defaultValue={user?.name}
            type="text"
            placeholder="Type here"
            className="input"
          />
        )}
        <button onClick={handleSaveName} className="btn btn-accent">
          Save
        </button>
      </div>
      <div className="py-5">{user?.email}</div>
    </div>
  );
}

export default ProfilePage;
