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
    <div className="flex flex-col items-center space-y-6 pt-20">
      <div className="avatar relative">
        <label
          htmlFor="pro_pic"
          className="absolute -right-3 bottom-4 cursor-pointer bg-primary text-white p-1 rounded-full shadow"
        >
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
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"
            />
          </svg>
        </label>

        <div className="ring-primary ring-offset-base-100 w-28 rounded-full ring-2 ring-offset-2 overflow-hidden">
          <Image
            width={300}
            height={300}
            alt="avatar"
            src={`${user?.imageUrl ?? "/assets/default/avatar.webp"}`}
          />
        </div>
      </div>

      <div className="flex flex-col items-center space-y-3 w-full">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <span>{user?.name}</span>

          <span
            onClick={() => setEditName(true)}
            className="cursor-pointer text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"
              />
            </svg>
          </span>
        </div>

        {editName && (
          <input
            onChange={(e) => setUserName(e.target.value)}
            defaultValue={user?.name}
            type="text"
            className="input input-bordered w-full max-w-xs"
          />
        )}

        <button
          onClick={handleSaveName}
          className="btn btn-primary w-full max-w-xs"
        >
          Save
        </button>
      </div>

      <div className="text-base-content text-sm">{user?.email}</div>
    </div>
  );
}

export default ProfilePage;
