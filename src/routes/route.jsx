import DashboardLayout from "@/layout/DashboardLayout";
import { createBrowserRouter } from "react-router-dom";

import DashboardOverview from "@/pages/Dashboard/DashboardOverview";
import UnderConstruction from "@/components/custom/utils/UnderConstruction";
import { routes } from "@/utils/app.constants";
import LoginForm from "@/pages/Auth/LoginPage";
import GenericTableComp from "@/pages/Components/GenericTableComp";
import EbookPortal from "@/pages/Landing/LandingPage";
import ViewAllUsers from "@/pages/Admin/Users/ViewAllUsers";
import BookDetails from "@/pages/Catalog/BookDetails";
import ViewAllCategories from "@/pages/Admin/Categories/ViewAllCategories";

// Placeholder for all pages
const PlaceholderPage = ({ title }) => (
    <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">{title} Page - Coming Soon</h1>
    </div>
);

export const applicationRouter = createBrowserRouter([
    {
        path: "/",
        element: <EbookPortal />,
    },

    {
        path: routes.AUTH.LOGIN,
        element: <LoginForm />,
    },

    {
        path: routes.AUTH.REGISTER,
        element: <PlaceholderPage title="Register" />,
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
                path: routes.DASHBOARD.routes.home.path,
                element: <PlaceholderPage title="Dashboard Home" />,
            },

            // Catalog Routes
            {
                path: routes.CATALOG.routes.books.path,
                element: <PlaceholderPage title="Books Catalog" />,
            },
            {
                path: routes.CATALOG.routes.categories.path,
                element: <PlaceholderPage title="Categories" />,
            },

            // User Content Routes
            {
                path: routes.USER_CONTENT.routes.library.path,
                element: <PlaceholderPage title="My Library" />,
            },
            {
                path: routes.USER_CONTENT.routes.purchases.path,
                element: <PlaceholderPage title="My Purchases" />,
            },
            {
                path: routes.USER_CONTENT.routes.reviews.path,
                element: <PlaceholderPage title="My Reviews" />,
            },

            // Admin Routes
            {
                path: routes.ADMIN.routes.users.path,
                element: <ViewAllUsers />,
            },
            {
                path: routes.ADMIN.routes.books.path,
                element: <PlaceholderPage title="Books Management" />,
            },
            {
                path: routes.ADMIN.routes.bookDetails.path,
                element: <BookDetails />,
            },
            {
                path: routes.ADMIN.routes.categories.path,
                element: <ViewAllCategories />,
            },
            {
                path: routes.ADMIN.routes.purchases.path,
                element: <PlaceholderPage title="Purchases Management" />,
            },
            {
                path: routes.ADMIN.routes.stats.path,
                element: <PlaceholderPage title="Admin Statistics" />,
            },

            // Core Routes
            {
                path: routes.CORE.UNDER_CONSTRUCTION,
                element: <UnderConstruction />,
            },
            {
                path: routes.CORE.NO_MATCH,
                element: <PlaceholderPage title="404 - Page Not Found" />,
            },
        ],
    },
]);
