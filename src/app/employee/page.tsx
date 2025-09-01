import axios from "axios";
import React from "react";
import DashboardEmployee from "./dashboard/page";
import { getUserDetails } from "@/actions/employee/actions";
import { cookies } from "next/headers";

const UserPages = async () => {
  const cookieStore = await cookies();
  const role = cookieStore.get("job-app-role")?.value;

  const userDetails = await getUserDetails();
  console.log(userDetails);

  return (
    <div>
      <div className="text-3xl text-center">
        {userDetails}:{role}
      </div>
      <div className="pl-4">
        <DashboardEmployee />
      </div>
    </div>
  );
};

export default UserPages;
