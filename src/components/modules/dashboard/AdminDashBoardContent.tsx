"use client";

import AppointmentBarChart from "@/components/shared/AppoinmentBarChart";
import AppoinmentPieChart from "@/components/shared/AppoinmentPieChart";
import StatsCard from "@/components/shared/StatsCard";
import { getDashBoardData } from "@/services/dashboard.services";
import { ApiResponse } from "@/types/api.types";
import { IAdminDashboardData } from "@/types/dashboard.types";
import { useQuery } from "@tanstack/react-query";

const AdminDashBoardContent = () => {
  const { data: adminDashboardData } = useQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: getDashBoardData,
    refetchOnWindowFocus: "always", // refatch korbe data ke jokhon user abar page e asbe mane jokhon user abar page e focus korbe tokhon abar data fetch korbe
  });
  const { data } = adminDashboardData as ApiResponse<IAdminDashboardData>;
  return (
    <div>
      <StatsCard
        title="Total Appoinments"
        value={data?.appoinmentCount || 0}
        iconName="CalenderDays"
        description="Number Of Appoinment Schedules"
      />
      <StatsCard
        title="Total Patients"
        value={data?.patientCount || 0}
        iconName="CalenderDays"
        description="Number Of Registered Patients"
      />
      <AppointmentBarChart data={data?.barChartData} />
      <AppoinmentPieChart
        data={data?.pieChartData}
        title="Appoinment Status Distribution"
        description="Distribution of appoinment status"
      />
    </div>
  );
};

export default AdminDashBoardContent;
