import Navbar from "./components/Navbar";
import { Shield, User, Users2 } from "lucide-react";

export const BusPassLandingPage = () => {
    return (
        <div className="font-sans antialiased text-gray-800 bg-gray-50">
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <section id="home" className="relative h-screen flex items-center">
                {/* Background with gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
                    {/* Abstract shapes */}
                    <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                    <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
                </div>

                <div className="container mx-auto px-6 z-10">
                    <div className="flex flex-col lg:flex-row items-center">
                        <div className="lg:w-1/2 mb-12 lg:mb-0">
                            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                                <span className="block">Smart Digital</span>
                                <span className="text-blue-300">
                                    Bus Pass System
                                </span>
                            </h1>
                            <p className="text-xl mb-8 text-blue-100 opacity-90">
                                Revolutionize your daily commute with our
                                digital bus pass solution. Seamless, secure, and
                                sustainable.
                            </p>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <a
                                    href="#"
                                    className="bg-white text-blue-600 px-8 py-3 rounded-full font-medium text-center hover:bg-gray-100 transition shadow-lg transform hover:-translate-y-1 hover:shadow-xl"
                                >
                                    Get Started
                                </a>
                            </div>
                        </div>
                        <div className="lg:w-1/2 flex justify-center relative">
                            <div className="relative">
                                <img
                                    src="https://placehold.co/400"
                                    alt="Digital Bus Pass"
                                    className="rounded-xl shadow-2xl relative z-10"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 320"
                        className="w-full"
                    >
                        <path
                            fill="#f9fafb"
                            fillOpacity="1"
                            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,149.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                            <p className="text-blue-600 text-4xl font-bold mb-2">
                                15K+
                            </p>
                            <p className="text-gray-600">Active Users</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                            <p className="text-blue-600 text-4xl font-bold mb-2">
                                200+
                            </p>
                            <p className="text-gray-600">Bus Routes</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                            <p className="text-blue-600 text-4xl font-bold mb-2">
                                98%
                            </p>
                            <p className="text-gray-600">Satisfaction</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                            <p className="text-blue-600 text-4xl font-bold mb-2">
                                24/7
                            </p>
                            <p className="text-gray-600">Support</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <span className="text-blue-600 font-semibold uppercase tracking-wider">
                            Our Platform
                        </span>
                        <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">
                            Key Features
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our digital bus pass system offers a comprehensive
                            solution for all stakeholders in the public
                            transportation ecosystem.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10">
                        {/* Feature Cards */}
                        {[
                            {
                                icon: (
                                    <svg
                                        className="w-8 h-8 text-blue-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                                        ></path>
                                    </svg>
                                ),
                                title: "Digital Bus Passes",
                                description:
                                    "Generate QR-based digital bus passes instantly. No more physical cards to carry, lose, or damage.",
                            },
                            {
                                icon: (
                                    <svg
                                        className="w-8 h-8 text-blue-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        ></path>
                                    </svg>
                                ),
                                title: "Quick Verification",
                                description:
                                    "Conductors verify passes in seconds with a simple QR scan, making boarding faster for everyone.",
                            },
                            {
                                icon: (
                                    <svg
                                        className="w-8 h-8 text-blue-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        ></path>
                                    </svg>
                                ),
                                title: "Flexible Pass Options",
                                description:
                                    "Choose from weekly or monthly passes tailored to your travel needs and budget requirements.",
                            },
                            {
                                icon: (
                                    <svg
                                        className="w-8 h-8 text-blue-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        ></path>
                                    </svg>
                                ),
                                title: "Secure Authentication",
                                description:
                                    "Enterprise-grade security for your account and bus passes with multi-factor authentication options.",
                            },
                            {
                                icon: (
                                    <svg
                                        className="w-8 h-8 text-blue-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                        ></path>
                                    </svg>
                                ),
                                title: "Admin Dashboard",
                                description:
                                    "Comprehensive admin panel for authorities to manage applications, passes, and pricing in real-time.",
                            },
                            {
                                icon: (
                                    <svg
                                        className="w-8 h-8 text-blue-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                        ></path>
                                    </svg>
                                ),
                                title: "Seamless Payments",
                                description:
                                    "Multiple payment options with a secure gateway for hassle-free pass purchases and renewals.",
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                            >
                                <div className="inline-block p-4 bg-blue-50 rounded-2xl mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-800">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section
                id="how-it-works"
                className="py-20 bg-gradient-to-b from-white to-blue-50"
            >
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <span className="text-blue-600 font-semibold uppercase tracking-wider">
                            Simple Process
                        </span>
                        <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">
                            How It Works
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our platform simplifies the bus pass process with a
                            streamlined workflow for each user type.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                        {/* Passenger Flow */}
                        <div className="lg:w-1/3 relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl transform rotate-2 group-hover:rotate-1 transition-transform duration-300"></div>
                            <div className="relative h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                                <div className="p-4 inline-block bg-blue-100 rounded-full mb-6">
                                    <Users2 />
                                </div>
                                <h3 className="text-2xl font-bold mb-6 pb-3 border-b border-gray-200 text-gray-800">
                                    For Passengers
                                </h3>
                                <ol className="space-y-6">
                                    {[
                                        "Register & login with email",
                                        "Apply for a bus pass",
                                        "Select pass type (weekly/monthly)",
                                        "Upload required documents",
                                        "Make payment",
                                        "Receive digital pass with QR code",
                                    ].map((step, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start"
                                        >
                                            <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 mt-0.5">
                                                {index + 1}
                                            </span>
                                            <span className="text-gray-700">
                                                {step}
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>

                        {/* Admin Flow */}
                        <div className="lg:w-1/3 relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-300 rounded-2xl transform -rotate-1 group-hover:rotate-1 transition-transform duration-300"></div>
                            <div className="relative h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                                <div className="p-4 inline-block bg-blue-100 rounded-full mb-6">
                                    <Shield />
                                </div>
                                <h3 className="text-2xl font-bold mb-6 pb-3 border-b border-gray-200 text-gray-800">
                                    For Administrators
                                </h3>
                                <ol className="space-y-6">
                                    {[
                                        "Login to admin dashboard",
                                        "View pending pass applications",
                                        "Check user details and documents",
                                        "Approve or reject applications",
                                        "Manage pass types and pricing",
                                        "View analytics and reports",
                                    ].map((step, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start"
                                        >
                                            <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 mt-0.5">
                                                {index + 1}
                                            </span>
                                            <span className="text-gray-700">
                                                {step}
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>

                        {/* Conductor Flow */}
                        <div className="lg:w-1/3 relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-200 rounded-2xl transform rotate-1 group-hover:-rotate-1 transition-transform duration-300"></div>
                            <div className="relative h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                                <div className="p-4 inline-block bg-blue-100 rounded-full mb-6">
                                    <User />
                                </div>
                                <h3 className="text-2xl font-bold mb-6 pb-3 border-b border-gray-200 text-gray-800">
                                    For Conductors
                                </h3>
                                <ol className="space-y-6">
                                    {[
                                        "Access pass verification page",
                                        "Scan passenger's QR code",
                                        "View pass details and validity status",
                                        "If QR fails, enter pass ID manually",
                                        "Verify passenger identity if needed",
                                    ].map((step, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start"
                                        >
                                            <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 mt-0.5">
                                                {index + 1}
                                            </span>
                                            <span className="text-gray-700">
                                                {step}
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">DigiPass</h3>
                            <p className="text-gray-400">
                                Simplifying bus travel with digital solutions
                                for passengers, administrators, and conductors.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">
                                Quick Links
                            </h4>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="#home"
                                        className="text-gray-400 hover:text-white transition"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#features"
                                        className="text-gray-400 hover:text-white transition"
                                    >
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#how-it-works"
                                        className="text-gray-400 hover:text-white transition"
                                    >
                                        How It Works
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#contact"
                                        className="text-gray-400 hover:text-white transition"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">
                                Legal
                            </h4>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition"
                                    >
                                        Terms of Service
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition"
                                    >
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition"
                                    >
                                        Cookie Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">
                                Contact
                            </h4>
                            <address className="not-italic text-gray-400">
                                <p>123 Transport Street</p>
                                <p>Bus City, BC 12345</p>
                                <p className="mt-2">Email: info@digipass.com</p>
                                <p>Phone: (123) 456-7890</p>
                            </address>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        <p>
                            &copy; {new Date().getFullYear()} DigiPass. All
                            rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
