import React from "react";
import ProductTable from "./ProductTable";
import { TProduct } from "@/services/types";

type tyeProductPage = {
  data: TProduct[];
};

function ProductPage({ data }: tyeProductPage) {
  return (
    <div>
      <ProductTable data={data}></ProductTable>
    </div>
  );
}

export default ProductPage;
