import PdfViewerModal from "@/components/custom/ui/PdfDocViewer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { routes } from "@/utils/app.constants";
import { format } from "date-fns";
import { BookOpen, ExternalLink } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
    return (
        <Card className="flex flex-col md:flex-row gap-4 p-4 hover:border-primary/50 border border-transparent transition-all duration-200">
            <div className="w-full md:w-48 h-48 md:h-64 flex-shrink-0">
                <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>
            <div className="flex-1 min-w-0 space-y-4">
                <div>
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                                {book.title}
                                <Link
                                    to={routes.ADMIN.routes.bookDetails.getPath(
                                        book.id
                                    )}
                                >
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-primary"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </h3>
                            <p className="text-gray-500">{book.author}</p>
                        </div>
                        <Badge variant={book.isFree ? "success" : "default"}>
                            {book.isFree ? "Free" : `₹${book.price}`}
                        </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {book.categories.map((category) => (
                            <Badge
                                key={category?.id}
                                variant="secondary"
                                className="text-xs"
                            >
                                {category?.name}
                            </Badge>
                        ))}
                    </div>
                </div>

                <p className="text-gray-600 line-clamp-2">{book.description}</p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                            <span className="font-medium">
                                {book.avgRating || "No"} ratings
                            </span>
                            <span className="mx-2">•</span>
                            <span>
                                {format(
                                    new Date(book.publishedDate),
                                    "MMM d, yyyy"
                                )}
                            </span>
                        </div>
                    </div>
                    <PdfViewerModal title={book.title} path={book.filePath}>
                        <Button variant="outline" size="sm">
                            <BookOpen className="h-4 w-4 mr-2" />
                            Preview
                        </Button>
                    </PdfViewerModal>
                </div>
            </div>
        </Card>
    );
};

export default BookCard;
