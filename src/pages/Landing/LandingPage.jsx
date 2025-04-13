import React from "react";
import { Link } from "react-router-dom";
import {
    Book,
    BookOpen,
    Library,
    Star,
    Users,
    Shield,
    BookMarked,
    Calendar,
    UserPlus,
} from "lucide-react";
import Navbar from "./components/Navbar";
import { routes } from "@/utils/app.constants";

const LandingPage = () => {
    const featuresData = [
        {
            title: "Extensive Library",
            description:
                "Access thousands of premium ebooks across all genres with our comprehensive digital collection.",
            features: [
                "Unlimited book access",
                "New releases weekly",
                "Exclusive content",
            ],
            icon: Library,
        },
        {
            title: "Smart Reading",
            description:
                "Enhanced reading experience with personalized recommendations and smart bookmarking system.",
            features: [
                "Personalized suggestions",
                "Reading progress sync",
                "Custom bookmarks",
            ],
            icon: BookOpen,
        },
        {
            title: "Family Sharing",
            description:
                "Share your favorite books with family members and manage reading preferences for children.",
            features: [
                "Up to 6 profiles",
                "Parental controls",
                "Shared libraries",
            ],
            icon: Users,
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col items-center text-center mb-12">
                            <div className="inline-flex items-center px-4 py-2 bg-green-50 rounded-full text-green-700 text-sm font-medium mb-6">
                                <Shield className="h-4 w-4 mr-2" />
                                Trusted by 1M+ Readers Worldwide
                            </div>
                            <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
                                Your Digital Reading
                                <span className="text-green-600"> Journey</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                                Discover a world of knowledge with BookVerse's
                                extensive collection of ebooks, personalized
                                recommendations, and seamless reading
                                experience.
                            </p>
                            <div className="flex gap-4">
                                <Link to={routes.AUTH.REGISTER}>
                                    <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-lg shadow-green-100 flex items-center gap-2">
                                        <UserPlus className="h-4 w-4" />
                                        Register Now
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Everything You Need for Digital Reading
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Our platform provides a complete suite of features
                            for an immersive and enjoyable reading experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuresData.map((feature, index) => (
                            <div key={index} className="group">
                                <div className="h-full p-8 rounded-xl border border-green-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white shadow-lg shadow-green-50">
                                    <div className="flex flex-col h-full">
                                        <div className="mb-6">
                                            <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mb-6 group-hover:bg-green-100 transition-colors duration-300">
                                                <feature.icon className="h-7 w-7 text-green-600" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-600 mb-6">
                                                {feature.description}
                                            </p>
                                        </div>
                                        <div className="mt-auto space-y-4">
                                            {feature.features.map(
                                                (item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center text-gray-600"
                                                    >
                                                        <Star className="h-5 w-5 mr-3 text-green-600" />
                                                        {item}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Explore Popular Categories
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Find your next favorite read from our carefully
                            curated collection of books across various genres.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            {
                                name: "Fiction",
                                icon: "📚",
                                color: "bg-green-50",
                            },
                            {
                                name: "Business",
                                icon: "💼",
                                color: "bg-green-50",
                            },
                            {
                                name: "Science",
                                icon: "🔬",
                                color: "bg-green-50",
                            },
                            {
                                name: "Technology",
                                icon: "💻",
                                color: "bg-green-50",
                            },
                            {
                                name: "Self-Help",
                                icon: "🧠",
                                color: "bg-green-50",
                            },
                            {
                                name: "History",
                                icon: "🏛️",
                                color: "bg-green-50",
                            },
                            {
                                name: "Biography",
                                icon: "👤",
                                color: "bg-green-50",
                            },
                            { name: "Arts", icon: "🎨", color: "bg-green-50" },
                        ].map((category, index) => (
                            <div
                                key={index}
                                className={`${category.color} rounded-xl p-6 flex flex-col items-center justify-center transform hover:scale-105 transition-all cursor-pointer hover:bg-green-100`}
                            >
                                <span className="text-3xl mb-3">
                                    {category.icon}
                                </span>
                                <h3 className="font-semibold text-gray-900">
                                    {category.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-green-50">
                <div className="container mx-auto">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Start Your Reading Journey Today
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Join millions of readers who have already discovered
                            the joy of digital reading with BookVerse.
                        </p>
                        <button className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-lg shadow-green-100">
                            Get Started Free
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-green-100">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-12">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <Book className="h-8 w-8 text-green-600" />
                                <span className="text-xl font-bold text-gray-900">
                                    BookVerse
                                </span>
                            </div>
                            <p className="text-gray-600">
                                Your digital reading companion. Access thousands
                                of books anytime, anywhere.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">
                                Quick Links
                            </h4>
                            <ul className="space-y-3">
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:text-green-600"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:text-green-600"
                                    >
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:text-green-600"
                                    >
                                        Categories
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:text-green-600"
                                    >
                                        Pricing
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">
                                Support
                            </h4>
                            <ul className="space-y-3">
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:text-green-600"
                                    >
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:text-green-600"
                                    >
                                        Terms of Service
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:text-green-600"
                                    >
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:text-green-600"
                                    >
                                        Contact Us
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">
                                Newsletter
                            </h4>
                            <p className="text-gray-600 mb-4">
                                Subscribe for updates and book recommendations.
                            </p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2 rounded-l-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <button className="px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-green-100 mt-12 pt-8 text-center text-gray-600">
                        <p>
                            &copy; {new Date().getFullYear()} BookVerse. All
                            rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
