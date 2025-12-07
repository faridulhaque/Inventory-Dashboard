import React from "react";

export default function AddForm() {
  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <label className="label">Product Name</label>
      <input type="text" className="input" placeholder="Your product name" />
      <label className="label">SKU</label>
      <input type="text" className="input" placeholder="Product's SKU number" />

      <label className="label">Price (per unit)</label>
      <input type="text" className="input" placeholder="Price for each unit" />

      <label className="label">Quantity</label>
      <input
        type="text"
        className="input"
        placeholder="Quantity of the product"
      />

      <label className="label">Low Stock At</label>
      <input
        type="text"
        className="input"
        placeholder="Quantity for low stock sign"
      />
    </fieldset>
  );
}
