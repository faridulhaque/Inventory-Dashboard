import React from "react";
import ProductTable from "./ProductTable";
import { TProduct } from "@/services/types";

type tyeProductPage = {
  data: TProduct[];
  page: number;
};

function ProductPage({ data, page }: tyeProductPage) {
  return (
    <div className="w-full bg-base-200 rounded-xl p-4 shadow overflow-x-auto">
      <ProductTable data={data} page={page} />
    </div>
  );
}

export default ProductPage;
