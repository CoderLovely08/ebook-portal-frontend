import { Calendar, CalendarCheck, LayoutDashboard, Users } from "lucide-react";

export const routes = {
  CORE: {
    path: "/", // for router paths
    NO_MATCH: "*", // for unmatched routes
    UNDER_CONSTRUCTION: "/under-construction",
    routeKey: "home",
    title: "Home",
  },
  DASHBOARD: {
    title: "Dashboard",
    routeKey: "dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
    routes: {
      overview: {
        path: "/dashboard/overview",
        routeKey: "overview",
      },
      analytics: {
        path: "/dashboard/analytics",
        routeKey: "analytics",
      },
    },
    items: [
      {
        title: "Overview",
        url: "/dashboard/overview",
      },
      {
        title: "Analytics",
        url: "/dashboard/analytics",
      },
    ],
  },
  EMPLOYEES: {
    title: "Employees",
    routeKey: "employees",
    path: "/employees",
    icon: Users,
    routes: {
      list: {
        path: "/employees/list",
        routeKey: "list",
      },
      create: {
        path: "/employees/create",
        routeKey: "create",
      },
      rfid: {
        path: "/employees/rfid",
        routeKey: "rfid",
      },
    },
    items: [
      {
        title: "Employee List",
        url: "/employees/list",
      },
      {
        title: "Add Employee",
        url: "/employees/create",
      },
      {
        title: "RFID Management",
        url: "/employees/rfid",
      },
    ],
  },
  ATTENDANCE: {
    title: "Attendance",
    routeKey: "attendance",
    path: "/attendance",
    icon: CalendarCheck,
    routes: {
      daily: {
        path: "/attendance/daily",
        routeKey: "daily",
      },
      monthly: {
        path: "/attendance/monthly",
        routeKey: "monthly",
      },
      timings: {
        path: "/attendance/timings",
        routeKey: "timings",
      },
    },
    items: [
      {
        title: "Daily Attendance",
        url: "/attendance/daily",
      },
      {
        title: "Monthly Report",
        url: "/attendance/monthly",
      },
      {
        title: "Work Timings",
        url: "/attendance/timings",
      },
    ],
  },
  HOLIDAYS: {
    title: "Holidays",
    routeKey: "holidays",
    icon: Calendar,
    routes: {
      list: {
        path: "/holidays/list",
        routeKey: "list",
      },
      create: {
        path: "/holidays/create",
        routeKey: "create",
      },
    },
    items: [
      {
        title: "Holiday List",
        url: "/holidays/list",
      },
      {
        title: "Add Holiday",
        url: "/holidays/create",
      },
    ],
  },
};

export const getMainNavigation = () => [
  routes.DASHBOARD,
  routes.EMPLOYEES,
  routes.ATTENDANCE,
  routes.HOLIDAYS,
];
