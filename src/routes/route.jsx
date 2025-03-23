import DashboardLayout from "@/layout/DashboardLayout";
import { createBrowserRouter } from "react-router-dom";

import DashboardOverview from "@/pages/Dashboard/DashboardOverview";
import UnderConstruction from "@/components/custom/utils/UnderConstruction";
import { routes } from "@/utils/app.constants";
import GenericTableComp from "@/pages/Components/GenericTableComp";
import { BusPassLandingPage } from "@/pages/Landing/LandingPage";

export const applicationRouter = createBrowserRouter([
    {
        path: "/",
        element: <BusPassLandingPage />,
    },
    {
        path: routes.CORE.DASHBOARD,
        element: <DashboardLayout />,
        children: [
            {
                path: routes.DASHBOARD.routes.home.path,
                element: <DashboardOverview />,
            },
            {
                path: routes.CORE.UNDER_CONSTRUCTION,
                element: <UnderConstruction />,
            },
        ],
    },
]);
