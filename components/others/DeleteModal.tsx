import { Modals, TProduct } from "@/services/types";
import React from "react";

function DeleteModal({ product }: { product: TProduct }) {
  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id={Modals.deleteModal} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">This modal works with a hidden checkbox!</p>
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
