import { cookies } from "next/headers";
import DashboardCompany from "./dashBoard/page";
import { getChartData, getUserDetails } from "@/actions/employer/actions";

const UserPages = async () => {
  const cookieStore = await cookies();
  const role = cookieStore.get("job-app-role")?.value;

  const userDetails = await getUserDetails();
  const data = await getChartData();

  return (
    <div>
      <div className="text-2xl text-center">
        {userDetails}:{role}
      </div>

      <DashboardCompany data={data} />
    </div>
  );
};

export default UserPages;
