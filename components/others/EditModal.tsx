"use client";
import { Modals, TProduct } from "@/services/types";
import React, { useState } from "react";

function EditModal({ product }: { product: TProduct }) {
  const [sold, setSold] = useState(true);
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
                <input type="text" placeholder="Type here" className="input" />
                <button className="btn btn-success">Sell</button>
              </div>
            ) : (
              <div>
                <span> {product?.quantity} - </span>
                <input type="text" placeholder="Type here" className="input" />
                <button className="btn btn-error">Buy</button>
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
