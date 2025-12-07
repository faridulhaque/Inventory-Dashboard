import AddProductPage from "@/components/add/AddProductPage";
import DashboardPage from "@/components/dashboard/DashboardPage";
import Sidebar from "@/components/others/Sidebar";
import React from "react";

function page() {
  return (
    <div>
      <Sidebar title="Add Product">
        <AddProductPage></AddProductPage>
      </Sidebar>
    </div>
  );
}

export default page;
