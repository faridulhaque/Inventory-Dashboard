"use client";
import { postData } from "@/services/apis";
import {
  APIEnums,
  ApiResponse,
  HttpStatus,
  TProduct,
  TProductRequest,
} from "@/services/types";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../others/Loading";

export default function AddForm() {
  const [adding, setAdding] = useState(false);
  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values: TProductRequest = Object.fromEntries(formData) as any;

    if (values.lowStockAt < 1 || values.lowStockAt % 1 !== 0) {
      return toast.error(
        "Low stock can't be a decimal number, zero or less than 0"
      );
    }

    if (values.quantity < 1 || values.quantity % 1 !== 0) {
      return toast.error(
        "Quantity can't be a decimal number, zero or less than 0"
      );
    }

    if (values.price <= 0) return toast.error("price cant' be zero or less");
    setAdding(true);

    const res: ApiResponse<TProduct> = await postData<TProductRequest>(
      APIEnums.product,
      values
    );

    if (res.status === HttpStatus.created) {
      toast.success(res.message);
      (e as any).target.reset();
    } else toast.error(res.message);

    setAdding(false);
  };
  return (
    <form
      onSubmit={handleAddProduct}
      className="fieldset bg-base-200 border-base-300 rounded-box border p-6 space-y-4 mx-auto w-full max-w-sm flex flex-col items-center"
    >
      <h2 className="text-center text-3xl font-semibold mb-4">Add a Product</h2>

      <div className="w-full flex flex-col space-y-1">
        <label className="label">Product Name</label>
        <input
          name="name"
          required
          type="text"
          className="input input-bordered w-full"
          placeholder="Product name"
        />
      </div>

      <div className="w-full flex flex-col space-y-1">
        <label className="label">Price</label>
        <input
          required
          type="number"
          className="input input-bordered w-full"
          placeholder="Product price"
          name="price"
        />
      </div>

      <div className="w-full flex flex-col space-y-1">
        <label className="label">Sku</label>
        <input
          required
          type="text"
          className="input input-bordered w-full"
          placeholder="SKU number"
          name="sku"
        />
      </div>

      <div className="w-full flex flex-col space-y-1">
        <label className="label">Quantity</label>
        <input
          required
          type="number"
          className="input input-bordered w-full"
          placeholder="Quantity"
          name="quantity"
        />
      </div>

      <div className="w-full flex flex-col space-y-1">
        <label className="label">Low Stock At</label>
        <input
          required
          type="number"
          className="input input-bordered w-full"
          placeholder="Stock alert level"
          name="lowStockAt"
        />
      </div>

      {adding ? (
        <Loading></Loading>
      ) : (
        <button disabled={adding} className="btn btn-primary w-full mt-2">
          Submit
        </button>
      )}
    </form>
  );
}
