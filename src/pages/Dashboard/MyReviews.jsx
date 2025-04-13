import React, { useState } from "react";
import Container from "@/components/custom/utils/Container";
import { useFetch } from "@/hooks/common/useFetch";
import { apiRoutes, QUERY_KEYS } from "@/utils/app.constants";
import { Search, Star, MessageSquare, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { routes } from "@/utils/app.constants";
import LoadingSpinner from "@/components/custom/utils/LoadingSpiner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MyReviews = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [ratingFilter, setRatingFilter] = useState("all");
    const [sortBy, setSortBy] = useState("recent");

    const { responseData: reviews, responseIsLoading } = useFetch(
        apiRoutes.USER_CONTENT.REVIEWS,
        QUERY_KEYS.USER.REVIEWS
    );

    const filteredReviews = reviews?.filter((review) => {
        const matchesSearch = review.book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.comment.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (ratingFilter === "all") return matchesSearch;
        return matchesSearch && review.rating === parseInt(ratingFilter);
    });

    const sortedReviews = [...(filteredReviews || [])].sort((a, b) => {
        if (sortBy === "recent") return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
        if (sortBy === "rating-high") return b.rating - a.rating;
        if (sortBy === "rating-low") return a.rating - b.rating;
        return 0;
    });

    if (responseIsLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Container>
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">My Reviews</h1>
                        <p className="text-gray-500 mt-1">
                            Manage and view your book reviews
                        </p>
                    </div>
                    <Button asChild>
                        <Link to={routes.CATALOG.routes.books.path}>
                            Browse Books
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search by book title, author, or review content..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Select value={ratingFilter} onValueChange={setRatingFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by rating" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Ratings</SelectItem>
                                <SelectItem value="5">5 Stars</SelectItem>
                                <SelectItem value="4">4 Stars</SelectItem>
                                <SelectItem value="3">3 Stars</SelectItem>
                                <SelectItem value="2">2 Stars</SelectItem>
                                <SelectItem value="1">1 Star</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="recent">Most Recent</SelectItem>
                                <SelectItem value="oldest">Oldest First</SelectItem>
                                <SelectItem value="rating-high">Rating (High-Low)</SelectItem>
                                <SelectItem value="rating-low">Rating (Low-High)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sortedReviews?.map((review) => (
                        <Card key={review.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="flex items-start space-x-4 p-4">
                                {/* Book Cover */}
                                <div className="h-24 w-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                    <img
                                        src={review.book.coverImage}
                                        alt={review.book.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                {/* Review Content */}
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold">
                                                <Link 
                                                    to={routes.CATALOG.routes.bookDetails.getPath(review.book.id)}
                                                    className="hover:text-primary"
                                                >
                                                    {review.book.title}
                                                </Link>
                                            </h3>
                                            <p className="text-sm text-gray-500">by {review.book.author}</p>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${
                                                        i < review.rating
                                                            ? "text-yellow-400 fill-yellow-400"
                                                            : "text-gray-300"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {review.comment}
                                    </p>

                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span>
                                            {format(new Date(review.createdAt), "MMM d, yyyy")}
                                        </span>
                                        <div className="flex items-center space-x-2">
                                            <Button variant="ghost" size="sm">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {(!sortedReviews || sortedReviews.length === 0) && (
                    <div className="text-center py-12">
                        <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">
                            No reviews yet
                        </h3>
                        <p className="mt-1 text-gray-500">
                            {searchTerm || ratingFilter !== "all"
                                ? "Try adjusting your filters"
                                : "Start reviewing books to share your thoughts"}
                        </p>
                        <Button className="mt-4" asChild>
                            <Link to={routes.CATALOG.routes.books.path}>
                                Browse Books
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default MyReviews; 