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
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id={Modals.deleteModal} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h2>Are you sure?</h2>
          <input
            onChange={() => setSoftDelete(!isSoftDelete)}
            type="checkbox"
            defaultChecked={false}
            className="toggle btn-accent"
          />
          <span>Remove all data including statistics</span>
          <div>
            <button onClick={handleDelete} className="btn btn-primary">
              Delete
            </button>
          </div>
          <div className="modal-action">
            <label htmlFor={Modals.deleteModal} className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteModal;
