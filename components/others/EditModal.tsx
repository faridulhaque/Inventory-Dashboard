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
import React, { useState } from "react";
import toast from "react-hot-toast";

function EditModal({ product }: { product: TProduct }) {
  const [sold, setSold] = useState(true);
  const [soldQuantity, setSoldQuantity] = useState("");
  const [boughtQuantity, setBoughQuantity] = useState("");

  const handleSubmit = async () => {
    if (sold) {
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
  };

  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id={Modals.editModal} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          {/* name of each tab group should be unique */}
          <div className="tabs tabs-box">
            <input
              onClick={() => setSold(true)}
              type="radio"
              name="my_tabs_1"
              className="tab"
              aria-label="Sold"
              defaultChecked
            />
            <input
              onClick={() => setSold(false)}
              type="radio"
              name="my_tabs_1"
              className="tab"
              aria-label="Bought"
            />
          </div>

          <div>
            {sold ? (
              <div>
                <span> {product?.quantity} + </span>
                <input
                  onChange={(e) => setSoldQuantity(e.target.value)}
                  type="text"
                  placeholder="Type here"
                  className="input"
                />
                <button onClick={handleSubmit} className="btn btn-success">
                  Sell
                </button>
              </div>
            ) : (
              <div>
                <span> {product?.quantity} - </span>
                <input
                  onChange={(e) => setBoughQuantity(e.target.value)}
                  type="text"
                  placeholder="Type here"
                  className="input"
                />
                <button onClick={handleSubmit} className="btn btn-error">
                  Buy
                </button>
              </div>
            )}
          </div>

          <div className="modal-action">
            <label htmlFor={Modals.editModal} className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditModal;
