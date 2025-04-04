import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Bell,
    Clock,
    ChevronRight,
    User,
    CreditCard,
    Book,
    Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRoutes, QUERY_KEYS, routes } from "@/utils/app.constants";
import { useFetch } from "@/hooks/common/useFetch";
import { formatDistance } from "date-fns";
import EmptyState from "@/components/custom/utils/EmptyState";
import LoadingSpinner from "@/components/custom/utils/LoadingSpiner";
import CategoriesList from "./CategoriesList";
import { Link } from "react-router-dom";

const RecentBooks = () => {
    const { responseData: booksData, responseIsLoading } = useFetch(
        apiRoutes.BOOKS.BASE(1, 10, "", "all"),
        QUERY_KEYS.ADMIN.BOOKS
    );

    // Function to format time relative to now
    const formatTime = (timestamp) => {
        return formatDistance(new Date(timestamp), new Date(), {
            addSuffix: true,
        });
    };

    // Function to get status badge variant
    const getStatusBadgeVariant = (isFree) => {
        switch (isFree) {
            case true:
                return "outline";
            case false:
                return "success";
            default:
                return "secondary";
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Book className="h-5 w-5" />
                    Recent Books
                </CardTitle>
                <Button size="sm" className="text-xs" asChild>
                    <Link to={routes.ADMIN.routes.books.path}>
                        View All
                        <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                {responseIsLoading ? (
                    <LoadingSpinner />
                ) : booksData?.data?.length === 0 ? (
                    <EmptyState Icon={Book} message="No recently added books" />
                ) : (
                    <div className="space-y-4">
                        {booksData?.data?.map((book) => (
                            <div
                                key={book.id}
                                className="relative rounded-lg border p-4 transition-colors hover:bg-muted/50"
                            >
                                <div className="flex items-start gap-2">
                                    <div className="flex items-center gap-2 max-sm:hidden">
                                        <img
                                            src={book.coverImage}
                                            alt={book.title}
                                            className="w-12 h-12 rounded-md"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Book className="h-4 w-4 text-muted-foreground" />
                                            <h4 className="font-medium">
                                                {book.title}
                                            </h4>
                                            <Badge
                                                variant={getStatusBadgeVariant(
                                                    book.isFree
                                                )}
                                            >
                                                {book.isFree ? "Free" : "Paid"}
                                            </Badge>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4 mt-2">
                                            <span className="text-sm flex items-center gap-1">
                                                <Coins className="h-3 w-3 text-muted-foreground" />
                                                ₹{book.price}
                                            </span>

                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {formatTime(book.createdAt)}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <CategoriesList
                                                categories={book.categories}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default RecentBooks;
