import { useFetch } from "@/hooks/common/useFetch";
import { apiRoutes, QUERY_KEYS, routes } from "@/utils/app.constants";
import { generateDynaimcParamRoute } from "@/utils/app.utils";
import React from "react";
import { Link, useParams } from "react-router-dom";
import {
    Book,
    Star,
    Calendar,
    Clock,
    BookOpen,
    ExternalLinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/custom/utils/Container";
import LoadingSpinner from "@/components/custom/utils/LoadingSpiner";
import { format } from "date-fns";
import GoBackButton from "@/components/custom/utils/GoBackButton";
import PdfViewerModal from "@/components/custom/ui/PdfDocViewer";

const BookCard = ({ book }) => {
    return (
        <Card className="p-4 hover:border-primary/50 border border-transparent transition-all duration-200">
            <div className="flex gap-4">
                <div className="w-24 h-32 flex-shrink-0">
                    <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="font-semibold text-lg truncate flex items-center gap-2">
                                {book.title}
                                <Link
                                    to={routes.ADMIN.routes.bookDetails.getPath(
                                        book.id
                                    )}
                                    className="text-primary"
                                >
                                    <Button variant="ghost" size="icon">
                                        <ExternalLinkIcon className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </h3>
                            <p className="text-sm text-gray-500">
                                {book.author}
                            </p>
                        </div>
                        <Badge variant={book.isFree ? "success" : "default"}>
                            {book.isFree ? "Free" : `₹${book.price}`}
                        </Badge>
                    </div>

                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {book.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4 text-gray-500">
                            <div className="flex items-center">
                                <Star className="w-4 h-4 mr-1 text-yellow-400" />
                                <span>{book.avgRating || "No ratings"}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                <span>
                                    {format(
                                        new Date(book.publishedDate),
                                        "MMM yyyy"
                                    )}
                                </span>
                            </div>
                        </div>
                        <PdfViewerModal title={book?.title} path={book?.filePath}>
                            <Button variant="ghost" size="sm" className="p-2">
                                <BookOpen className="h-4 w-4" />
                            </Button>
                        </PdfViewerModal>
                    </div>
                </div>
            </div>
        </Card>
    );
};

const CategoryDetails = () => {
    const { id } = useParams();

    const { responseData: books, responseIsLoading: isBooksLoading } = useFetch(
        apiRoutes.CATEGORIES.GET_BOOKS(id),
        QUERY_KEYS.CATEGORIES.BOOKS(id)
    );

    if (isBooksLoading) {
        return (
            <Container>
                <LoadingSpinner />
            </Container>
        );
    }

    return (
        <Container>
            <div className="flex w-full justify-end">
                <GoBackButton />
            </div>
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Books in Category
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Browse and manage books in this category
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                            {books?.pagination?.total || 0} books
                        </Badge>
                    </div>
                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-1 gap-4">
                    {books?.data?.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>

                {/* Empty State */}
                {books?.data?.length === 0 && (
                    <div className="text-center py-12">
                        <Book className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">
                            No books found
                        </h3>
                        <p className="mt-1 text-gray-500">
                            There are no books in this category yet
                        </p>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default CategoryDetails;
