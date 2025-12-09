import React from "react";
import ProductTable from "./ProductTable";
import { TProduct } from "@/services/types";

type tyeProductPage = {
  data: TProduct[];
  page: number;
};

function ProductPage({ data, page }: tyeProductPage) {
  return (
    <div>
      <ProductTable data={data} page={page}></ProductTable>
    </div>
  );
}

export default ProductPage;
