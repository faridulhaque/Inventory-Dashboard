"use client";
import { putData } from "@/services/apis";
import {
  APIEnums,
  ApiResponse,
  HttpStatus,
  Modals,
  TBought,
  TProduct,
  TSold,
} from "@/services/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function EditModal({ product }: { product: TProduct }) {
  const [sold, setSold] = useState(true);
  const [soldQuantity, setSoldQuantity] = useState("");
  const [boughtQuantity, setBoughQuantity] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (sold) {
      if (Number(soldQuantity) > product.quantity)
        return toast.error(
          "Selling products can't be higher than the quantity"
        );

      const res: ApiResponse<any> = await putData<TSold>(APIEnums.sellProduct, {
        id: product.id,
        quantity: product.quantity,
        soldQuantity: Number(soldQuantity),
      });

      if (res.status === HttpStatus.ok) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } else {
      const res: ApiResponse<any> = await putData<TBought>(
        APIEnums.buyProduct,
        {
          id: product.id,
          quantity: product.quantity,
          boughtQuantity: Number(boughtQuantity),
        }
      );

      if (res.status === HttpStatus.ok) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    }
    router.refresh();
    const modal: any = document.getElementById(Modals.editModal);

    if (modal) modal.checked = false;
    setBoughQuantity("");
    setSoldQuantity("");
  };

  return (
    <>
      <input type="checkbox" id={Modals.editModal} className="modal-toggle" />

      <div className="modal" role="dialog">
        <div className="modal-box bg-base-200 rounded-xl relative space-y-6">
          <label
            htmlFor={Modals.editModal}
            className="btn btn-sm btn-circle absolute right-4 top-4 bg-error text-white hover:bg-error/80"
          >
            ✕
          </label>

          <div className="tabs tabs-boxed w-full">
            <input
              onClick={() => {
                setSold(true);
                setBoughQuantity("");
                setSoldQuantity("");
              }}
              type="radio"
              name="edit_tabs"
              className="tab"
              aria-label="Sold"
              defaultChecked
            />

            <input
              onClick={() => {
                setSold(false);
                setBoughQuantity("");
                setSoldQuantity("");
              }}
              type="radio"
              name="edit_tabs"
              className="tab"
              aria-label="Bought"
            />
          </div>

          {sold ? (
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-base-content">
                {product?.quantity} -
              </span>

              <input
                onChange={(e) => setSoldQuantity(e.target.value)}
                type="text"
                placeholder="Qty"
                className="input input-bordered w-full"
                value={soldQuantity}
              />

              <button
                onClick={handleSubmit}
                className="btn bg-success text-white hover:bg-success/80"
              >
                Sell
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-base-content">
                {product?.quantity} +
              </span>

              <input
                onChange={(e) => setBoughQuantity(e.target.value)}
                type="text"
                placeholder="Qty"
                className="input input-bordered w-full"
                value={boughtQuantity}
              />

              <button
                onClick={handleSubmit}
                className="btn bg-error text-white hover:bg-error/80"
              >
                Buy
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EditModal;
