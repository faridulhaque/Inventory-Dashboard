import Sidebar from "@/components/others/Sidebar";
import ProfilePage from "@/components/profile/ProfilePage";
import React from "react";

function page() {
  return (
    <div>
      <Sidebar title="Settings">
        <ProfilePage></ProfilePage>
      </Sidebar>
    </div>
  );
}

export default page;
