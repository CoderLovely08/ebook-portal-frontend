import React from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon, ArrowLeft, AlertCircle, Server } from "lucide-react";

const NotFoundPage = ({
    title = "Page Not Found",
    message = "The page you are looking for does not exist",
}) => {
    return (
        <div className="min-h-fit bg-white flex items-center justify-center p-6">
            <div className="max-w-3xl mx-auto text-center">
                {/* Animated industrial icon setup */}
                <div className="mb-4 relative">
                    <div className="w-20 h-20 mx-auto relative">
                        {/* Base circle with pulse effect */}
                        <div className="absolute inset-0 rounded-full bg-green-50 animate-ping opacity-25"></div>
                        <div className="absolute inset-0 rounded-full bg-green-50"></div>

                        {/* Center icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Server className="w-12 h-12 text-green-600" />
                        </div>
                    </div>
                </div>

                {/* Error code */}
                <div className="mb-2">
                    <h1 className="text-8xl font-bold text-gray-900 mb-2 font-mono">
                        4<span className="text-green-600">0</span>4
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-gray-500">
                        <span className="font-mono">
                            STATUS_ENDPOINT_NOT_FOUND
                        </span>
                    </div>
                </div>

                {/* Error message */}
                <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                    {title}
                </h2>

                <p className="text-lg text-gray-600 mb-4 max-w-lg mx-auto leading-relaxed">
                    {message}
                </p>

                {/* Technical details box */}
                <div className="mb-4 mx-auto max-w-md">
                    <div className="bg-gray-50 rounded-lg p-4 text-left">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-gray-400 mt-1" />
                            <div className="text-sm text-gray-600">
                                <p className="font-medium text-gray-900 mb-1">
                                    Technical Details
                                </p>
                                <p className="font-mono text-xs">
                                    Timestamp: {new Date().toISOString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        variant="default"
                        size="lg"
                        className="bg-green-600 hover:bg-green-700 shadow-lg shadow-green-100 group"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                        Return to Previous Page
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
