"use client";
import { deleteData, putData } from "@/services/apis";
import {
  APIEnums,
  ApiResponse,
  HttpStatus,
  Modals,
  THardDelete,
  TProduct,
  TSoftDelete,
} from "@/services/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function DeleteModal({ product }: { product: TProduct }) {
  const router = useRouter();
  const [isSoftDelete, setSoftDelete] = useState(true);
  const handleDelete = async () => {
    if (isSoftDelete) {
      const res: ApiResponse<any> = await putData<TSoftDelete>(
        APIEnums.product,
        {
          isDeleted: true,
          id: product.id,
        }
      );

      if (res.status === HttpStatus.ok) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } else {
      const res: ApiResponse<any> = await deleteData<THardDelete>(
        APIEnums.product,
        {
          id: product.id,
        }
      );

      if (res.status === HttpStatus.ok) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    }

    const modal: any = document.getElementById(Modals.deleteModal);

    if (modal) modal.checked = false;
    setSoftDelete(true);
    router.refresh();
  };

  return (
    <>
      <input type="checkbox" id={Modals.deleteModal} className="modal-toggle" />

      <div className="modal" role="dialog">
        <div className="modal-box bg-base-200 rounded-xl relative space-y-6">
          <label
            htmlFor={Modals.deleteModal}
            className="btn btn-sm btn-circle absolute right-4 top-4 bg-error text-white hover:bg-error/80"
          >
            ✕
          </label>

          <h2 className="text-xl font-semibold text-center">Are you sure?</h2>

          <div className="flex items-center gap-3">
            <input
              onChange={() => setSoftDelete(!isSoftDelete)}
              type="checkbox"
              defaultChecked={false}
              className="toggle toggle-accent"
            />
            <span className="text-base-content">
              Remove all data including statistics
            </span>
          </div>

          <div className="w-full flex justify-center pt-2">
            <button
              onClick={handleDelete}
              className="btn bg-error text-white hover:bg-error/80 w-full"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteModal;
