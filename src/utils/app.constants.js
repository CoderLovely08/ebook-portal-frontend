import { Calendar, CalendarCheck, LayoutDashboard, List, Users } from "lucide-react";

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
    },
    items: [
      {
        title: "Overview",
        url: "/dashboard/overview",
      },
    ],
  },
  COMPONENTS: {
    title: "Components",
    routeKey: "components",
    path: "/components",
    icon: List,
    routes: {
      dataTable: {
        path: "/components/data-table",
        routeKey: "dataTable",
      },
    },
    items: [
      {
        title: "Data Table",
        url: "/components/data-table",
      },
    ],
  },
};

export const getMainNavigation = () => [routes.DASHBOARD, routes.COMPONENTS];

export const environmentVariables = {
  BASE_DEV_API_URL: import.meta.env.VITE_DEV_API_URL,
  BASE_PROD_API_URL: import.meta.env.VITE_PROD_API_URL,
  ENV: import.meta.env.VITE_ENV,
};
