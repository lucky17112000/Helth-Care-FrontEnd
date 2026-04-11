import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

import DoctorList from "@/components/modules/Consultation/DoctorList";
import { getDoctors } from "@/services/doctor.services";

const ConsultationDoctorPage = async () => {
  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <div>dddd</div>
  );
};

export default ConsultationDoctorPage;
