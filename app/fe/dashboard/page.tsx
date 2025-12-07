import DashboardPage from "@/components/dashboard/DashboardPage";
import Sidebar from "@/components/others/Sidebar";
import React from "react";

function page() {
  return (
    <div>
      <Sidebar title="Dashboard">
        <DashboardPage></DashboardPage>
      </Sidebar>
    </div>
  );
}

export default page;
