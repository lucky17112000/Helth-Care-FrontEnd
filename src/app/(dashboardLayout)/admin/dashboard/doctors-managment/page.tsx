import DoctorsTable from "@/components/modules/admin/doctorManagment/DoctorsTable";
import { getDoctors } from "@/services/doctor.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const NORMALIZED_SORT_BY: Record<string, string> = {
  status: "user.status",
};

const DoctorManagmentPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const queryParamsObject = await searchParams;

  // console.log("Received query params:", queryParamsObject);
  const params = new URLSearchParams();
  // console.log("Received query params:", params);
  /* 
  এই কোডটা মূলত query params (URLSearchParams) বানানোর logic — যেখানে object থেকে URL query string তৈরি করা হচ্ছে।  👇*/

  Object.entries(queryParamsObject).forEach(([key, value]) => {
    if (value === undefined) return;

    if (key === "sortBy" || key === "sortby") {
      if (Array.isArray(value)) {
        value.forEach((item) =>
          params.append(key, NORMALIZED_SORT_BY[item] ?? item),
        );
      } else {
        params.append(key, NORMALIZED_SORT_BY[value] ?? value);
        console.log("ddddd", params);
      }
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
      return;
    }

    params.append(key, value);
  });

  if (!params.has("page")) {
    params.set("page", "1");
  }

  if (!params.has("limit")) {
    params.set("limit", "10");
  }
  /* 
  এই কোডটা মূলত query params (URLSearchParams) বানানোর logic — যেখানে object থেকে URL query string তৈরি করা হচ্ছে।  👇*/
  //final query string ta hobe example: ?search=abc&sortBy=createdAt&sortOrder=desc
  const queryString = params.toString();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["doctors", queryParamsObject],
    queryFn: () => getDoctors({ queryString }),
    staleTime: 1000 * 60 * 60, // 1 hr ei data ta fresh thakbe mane 30 second por abar call hobe data fetch korar jonno
    gcTime: 1000 * 60 * 60 * 24, // 24 hr por ei data ta memory theke remove kore dibe
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DoctorsTable
        queryString={queryString}
        queryParamsObject={queryParamsObject}
      />
    </HydrationBoundary>
  );
};

export default DoctorManagmentPage;
