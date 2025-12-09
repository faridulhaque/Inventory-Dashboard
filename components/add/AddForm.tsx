"use client";
import { postData } from "@/services/apis";
import {
  APIEnums,
  ApiResponse,
  HttpStatus,
  TProduct,
  TProductRequest,
} from "@/services/types";
import React from "react";
import toast from "react-hot-toast";

export default function AddForm() {
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


    const res: ApiResponse<TProduct> = await postData<TProductRequest>(
      APIEnums.product,
      values
    );

    if (res.status === HttpStatus.created) {
      toast.success(res.message);
      (e as any).target.reset();
    } else return toast.error(res.message);
  };
  return (
    <form
      onSubmit={handleAddProduct}
      className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
    >
      <h2 className="py-3 text-center text-4xl">Add a product!</h2>
      <div>
        <label className="label">Product Name</label>
        <input
          name="name"
          required
          type="text"
          className="input"
          placeholder="Product's name"
        />
      </div>

      <div>
        <label className="label">Price</label>
        <input
          required
          type="number"
          className="input"
          placeholder="Product's price"
          name="price"
        />
      </div>

      <div className="relative">
        <label className="label">Sku</label>
        <input
          required
          type={"text"}
          className="input"
          placeholder="Product's sku number"
          name="sku"
        />
      </div>

      <div className="relative">
        <label className="label">Quantity</label>
        <input
          required
          type={"number"}
          className="input"
          placeholder="Product's quantity"
          name="quantity"
        />
      </div>

      <div className="relative">
        <label className="label">Low stock at</label>
        <input
          required
          type={"number"}
          className="input"
          placeholder="When stock is low"
          name="lowStockAt"
        />
      </div>

      <button className="btn btn-primary w-full my-3">Submit</button>
    </form>
  );
}
