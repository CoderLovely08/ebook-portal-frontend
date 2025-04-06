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
import CategoryDetails from "@/pages/Admin/Categories/CategoryDetails";
import ViewAllBooks from "@/pages/Admin/Books/VIewAllBooks";
import CreateBook from "@/pages/Admin/Books/components/CreateBookForm";
import AddNewBook from "@/pages/Admin/Books/AddNewBook";
import ViewPurchaseOrders from "@/pages/Admin/Purchases/ViewPurchaseOrders";
import ViewStats from "@/pages/Admin/Stats/ViewStats";
import RegisterPage from "@/pages/Auth/RegisterPage";

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
        element: <RegisterPage />,
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
                element: <ViewAllBooks />,
            },
            {
                path: routes.CATALOG.routes.categories.path,
                element: <ViewAllCategories />,
            },
            {
                path: routes.CATALOG.routes.booksByCategory.path,
                element: <CategoryDetails />,
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
                element: <ViewAllBooks />,
            },
            {
                path: routes.ADMIN.routes.bookDetails.path,
                element: <BookDetails />,
            },
            {
                path: routes.ADMIN.routes.createBook.path,
                element: <AddNewBook />,
            },
            {
                path: routes.ADMIN.routes.categories.path,
                element: <ViewAllCategories />,
            },
            {
                path: routes.ADMIN.routes.booksByCategory.path,
                element: <CategoryDetails />,
            },
            {
                path: routes.ADMIN.routes.purchases.path,
                element: <ViewPurchaseOrders />,
            },
            {
                path: routes.ADMIN.routes.stats.path,
                element: <ViewStats />,
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
