import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/slices/auth.slice";
import { USER_TYPES } from "@/utils/app.constants";
import { routes } from "@/utils/app.constants";
import AccessDenied from "./AccessDenied";

const ProtectedRoute = ({ requireAdmin = false }) => {
    const user = useSelector(selectUser);

    // If user is not logged in, redirect to login
    if (!user) {
        return <Navigate to={routes.AUTH.LOGIN} replace />;
    }

    // If admin access is required but user is not an admin, show access denied
    if (requireAdmin && user.userType?.name !== USER_TYPES.ADMIN) {
        return <AccessDenied />;
    }

    // Otherwise, render the protected content
    return <Outlet />;
};

export default ProtectedRoute; 