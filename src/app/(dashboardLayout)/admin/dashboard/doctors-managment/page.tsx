import DoctorsTable from "@/components/modules/admin/doctorManagment/DoctorsTable";
import { getDoctors } from "@/services/doctor.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const DoctorManagmentPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
    staleTime: 1000 * 60 * 60, // 1 hr ei data ta fresh thakbe mane 30 second por abar call hobe data fetch korar jonno
    gcTime: 1000 * 60 * 60 * 24, // 24 hr por ei data ta memory theke remove kore dibe
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DoctorsTable />
    </HydrationBoundary>
  );
};

export default DoctorManagmentPage;
