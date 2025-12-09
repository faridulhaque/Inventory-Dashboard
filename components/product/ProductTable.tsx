import { TProduct } from "@/services/types";
import React from "react";
type tyeProductTable = {
  data: TProduct[];
};

function ProductTable({ data }: tyeProductTable) {

  return <div>{JSON.stringify(data)}</div>;
}

export default ProductTable;
