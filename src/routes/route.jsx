import DashboardLayout from "@/layout/DashboardLayout";
import { createBrowserRouter } from "react-router-dom";

import DashboardOverview from "@/pages/Dashboard/DashboardOverview";
import UnderConstruction from "@/components/custom/utils/UnderConstruction";
import { routes } from "@/utils/app.constants";
import LandingPage from "@/pages/Landing/LandingPage";
import LoginForm from "@/pages/Auth/LoginPage";
import GenericTableComp from "@/pages/Components/GenericTableComp";

export const applicationRouter = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  {
    path: routes.AUTH.LOGIN,
    element: <LoginForm />,
  },

  {
    path: routes.CORE.DASHBOARD,
    element: <DashboardLayout />,
    children: [
      {
        path: routes.DASHBOARD.routes.overview.path,
        element: <DashboardOverview />,
      },
      {
        path: routes.COMPONENTS.routes.dataTable.path,
        element: <GenericTableComp />,
      },
      {
        path: routes.COMPONENTS.routes.login.path,
        element: <LoginForm />,
      },
      {
        path: routes.CORE.UNDER_CONSTRUCTION,
        element: <UnderConstruction />,
      },
    ],
  },
]);
