// import { get } from "http";
import { NavSection } from "@/types/dashboard.types";
import { getDashboardRoute, UserRole } from "./authUtiles";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDashboardRoute(role);
  return [
    {
      items: [
        {
          title: "Home",
          href: "/",
          icon: "Home",
        },
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "Dashboard",
        },
        {
          title: "My Profile",
          href: "/my-profile",
          icon: "User",
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Change Password",
          href: "/change-password",
          icon: "Lock",
        },
      ],
    },
  ];
};

export const doctorNavitems: NavSection[] = [
  {
    title: "Patient Management",
    items: [
      {
        title: "Appoinments",
        href: "/doctor/dashboard/appointments",
        icon: "Calendar",
      },
      {
        title: "Schedule",
        href: "/doctor/dashboard/my-schedules",
        icon: "Schedule",
      },
      {
        title: "Prescriptions",
        href: "/doctor/dashboard/prescriptions",
        icon: "Prescription",
      },
      {
        title: "Reviews",
        href: "/doctor/dashboard/my-reviews",
        icon: "Star",
      },
    ],
  },
];

export const adminNavitems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Admins",
        href: "/admin/dashboard/admins-managment",
        icon: "User",
      },
      {
        title: "Specialities",
        href: "/admin/dashboard/specialities-managment",
        icon: "Stethoscope",
      },
      {
        title: "Schedules",
        href: "/admin/dashboard/schedules-managment",
        icon: "Schedule",
      },
      {
        title: "Reviews",
        href: "/admin/dashboard/reviews-managment",
        icon: "Star",
      },
      {
        title: "Prescriptions",
        href: "/admin/dashboard/prescriptions-managment",
        icon: "Prescription",
      },
      {
        title: "Payments",
        href: "/admin/dashboard/payment-managment",
        icon: "Payment",
      },
      {
        title: "Patients",
        href: "/admin/dashboard/patientes-managment",
        icon: "User",
      },

      {
        title: "Doctors",
        href: "/admin/dashboard/doctors-managment",
        icon: "User",
      },
      {
        title: "Doctor Speciality",
        href: "/admin/dashboard/doctor-specialities-managment",
        icon: "Stethoscope",
      },
      {
        title: "Doctor Schedules",
        href: "/admin/dashboard/doctor-schedules-managment",
        icon: "Schedule",
      },
      {
        title: "Appointments",
        href: "/admin/dashboard/appoinment-managment",
        icon: "Calendar",
      },
    ],
  },
];

export const PatientNavItems: NavSection[] = [
  {
    title: "Appointments",
    items: [
      {
        title: "My Appoinments",
        href: "/dashboard/my-appoinments",
        icon: "Calendar",
      },
      {
        title: "Book New Appoinment",
        href: "/dashboard/book-appoinment",
        icon: "CalendarPlus",
      },
      {
        title: "My Prescriptions",
        href: "/dashboard/my-prescription",
        icon: "Prescription",
      },
      {
        title: "Health Records",
        href: "/dashboard/health-records",
        icon: "Health",
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavitems = getCommonNavItems(role);
  if (role === "ADMIN" || role === "SUPER_ADMIN") {
    return [...commonNavitems, ...adminNavitems];
  } else if (role === "DOCTOR") {
    return [...commonNavitems, ...doctorNavitems];
  } else {
    return [...commonNavitems, ...PatientNavItems];
  }
};
