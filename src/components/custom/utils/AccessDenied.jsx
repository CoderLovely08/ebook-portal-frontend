import React from "react";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { routes } from "@/utils/app.constants";

const AccessDenied = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
            <div className="bg-red-100 p-4 rounded-full mb-6">
                <ShieldAlert className="h-12 w-12 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-6 max-w-md">
                You don't have permission to access this page. This area is restricted to administrators only.
            </p>
            <Button asChild>
                <Link to={routes.DASHBOARD.routes.home.path}>
                    Return to Dashboard
                </Link>
            </Button>
        </div>
    );
};

export default AccessDenied; 