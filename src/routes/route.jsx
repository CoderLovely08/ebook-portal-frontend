import DashboardLayout from "@/layout/DashboardLayout";
import { createBrowserRouter } from "react-router-dom";

import DashboardOverview from "@/pages/Dashboard/DashboardOverview";
import UnderConstruction from "@/components/custom/utils/UnderConstruction";
import { routes } from "@/utils/app.constants";
import GenericTableComp from "@/pages/Components/GenericTableComp";

export const applicationRouter = createBrowserRouter([
  {
    element: <DashboardLayout />,
    path: routes.CORE.path,
    children: [
      {
        path: routes.DASHBOARD.path,
        children: [
          {
            path: routes.DASHBOARD.routes.overview.path,
            element: <DashboardOverview />,
          },
        ],
      },
      {
        path: routes.COMPONENTS.path,
        children: [
          {
            path: routes.COMPONENTS.routes.dataTable.path,
            element: <GenericTableComp />,
          },
        ],
      },

      {
        path: routes.CORE.UNDER_CONSTRUCTION,
        element: <UnderConstruction />,
      },
    ],
  },
]);
