import React, { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <span className="text-blue-700 text-2xl font-bold">
                            QuickPass
                        </span>
                    </div>
                    <div className="hidden md:flex items-center space-x-10">
                        <a
                            href="#home"
                            className="text-gray-700 hover:text-blue-600 transition"
                        >
                            Home
                        </a>
                        <a
                            href="#features"
                            className="text-gray-700 hover:text-blue-600 transition"
                        >
                            Features
                        </a>
                        <a
                            href="#how-it-works"
                            className="text-gray-700 hover:text-blue-600 transition"
                        >
                            How It Works
                        </a>
                        <a
                            href="#contact"
                            className="text-gray-700 hover:text-blue-600 transition"
                        >
                            Contact
                        </a>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <a
                            href="#"
                            className="bg-white text-blue-700 border border-blue-700 px-5 py-2 rounded-md hover:bg-blue-50 transition"
                        >
                            Login
                        </a>
                        <a
                            href="#"
                            className="bg-blue-700 text-white px-5 py-2 rounded-md hover:bg-blue-800 transition"
                        >
                            Register
                        </a>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-700 focus:outline-none"
                        >
                            {isMenuOpen ? (
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            ) : (
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white px-4 pt-2 pb-4 shadow-md">
                    <a
                        href="#home"
                        className="block py-2 text-gray-700 hover:text-blue-600"
                    >
                        Home
                    </a>
                    <a
                        href="#features"
                        className="block py-2 text-gray-700 hover:text-blue-600"
                    >
                        Features
                    </a>
                    <a
                        href="#how-it-works"
                        className="block py-2 text-gray-700 hover:text-blue-600"
                    >
                        How It Works
                    </a>
                    <a
                        href="#contact"
                        className="block py-2 text-gray-700 hover:text-blue-600"
                    >
                        Contact
                    </a>
                    <div className="flex flex-col space-y-2 mt-4">
                        <a
                            href="#"
                            className="bg-white text-blue-700 border border-blue-700 px-5 py-2 rounded-md hover:bg-blue-50 transition text-center"
                        >
                            Login
                        </a>
                        <a
                            href="#"
                            className="bg-blue-700 text-white px-5 py-2 rounded-md hover:bg-blue-800 transition text-center"
                        >
                            Register
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
