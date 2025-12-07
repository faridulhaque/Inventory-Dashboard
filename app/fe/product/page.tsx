import Sidebar from "@/components/others/Sidebar";
import ProductPage from "@/components/product/ProductPage";
import React from "react";

function page() {
  return (
    <div>
      <Sidebar title="Products">
        <ProductPage></ProductPage>
      </Sidebar>
    </div>
  );
}

export default page;
