"use client";
import { Modals, TProduct } from "@/services/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import EditModal from "../others/EditModal";
import DeleteModal from "../others/DeleteModal";
type tyeProductTable = {
  data: TProduct[];
  page: number;
};

function ProductTable({ data, page }: tyeProductTable) {
  const router = useRouter();
  const [product, setProduct] = useState<null | TProduct>(null);
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Sku</th>
            <th>Price (per unit)</th>
            <th>Quantity</th>
            <th>Low Stock At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {data?.map((d) => (
            <tr
              key={d?.id}
              className={`${d?.quantity < d.lowStockAt ? "text-red-500" : ""}`}
            >
              <th>{d?.name}</th>
              <td>{d?.sku}</td>
              <td>{d.price}</td>
              <td>{d.quantity}</td>
              <td>{d.lowStockAt}</td>
              <td className="flex space-x-2">
                <label
                  onClick={() => setProduct(d)}
                  htmlFor={Modals.editModal}
                  className="btn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </label>
                <label
                  onClick={() => setProduct(d)}
                  htmlFor={Modals.deleteModal}
                  className="btn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <div className="join py-5">
          <button
            disabled={page === 1}
            onClick={() => router.push(`/fe/product?page=${page - 1}`)}
            className="join-item btn"
          >
            «
          </button>
          <button className="join-item btn">Page {page}</button>
          <button
            disabled={data?.length === 0}
            onClick={() => router.push(`/fe/product?page=${page + 1}`)}
            className="join-item btn"
          >
            »
          </button>
        </div>
      </div>
      {product && (
        <>
          <EditModal product={product}></EditModal>
          <DeleteModal product={product}></DeleteModal>
        </>
      )}
    </div>
  );
}

export default ProductTable;
