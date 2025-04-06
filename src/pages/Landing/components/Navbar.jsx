import { routes } from "@/utils/app.constants";
import { Book, BookMarked } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="fixed w-full bg-white z-50 border-b border-green-100 shadow-sm">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to={routes.CORE.path}>
                    <div className="flex items-center gap-3">
                        <Book className="h-8 w-8 text-green-600" />
                        <div>
                            <span className="text-xl font-bold text-gray-900">
                                BookVerse
                            </span>
                            <p className="text-sm text-gray-500">
                                Digital Reading Platform
                            </p>
                        </div>
                    </div>
                </Link>
                <div className="flex items-center gap-6">
                    {/* Login Button */}
                    <Link to={routes.AUTH.LOGIN}>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-lg shadow-green-100 flex items-center gap-2">
                            <BookMarked className="h-4 w-4" />
                            Sign In
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
