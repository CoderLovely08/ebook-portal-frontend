import {
    Star,
    ShoppingCart,
    BookOpen,
    Calendar,
    Clock,
    Edit,
    Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { useFetch } from "@/hooks/common/useFetch";
import { useParams } from "react-router-dom";
import { apiRoutes, QUERY_KEYS, USER_TYPES } from "@/utils/app.constants";
import Container from "@/components/custom/utils/Container";
import LoadingSpinner from "@/components/custom/utils/LoadingSpiner";
import NotFoundPage from "@/components/custom/utils/NotFoundPage";
import { selectUser } from "@/store/slices/auth.slice";
import { useSelector } from "react-redux";
import PdfViewerModal from "@/components/custom/ui/PdfDocViewer";

const BookDetails = () => {
    const { id } = useParams();
    const isAdmin = useSelector(selectUser).userType.name === USER_TYPES.ADMIN;

    const {
        responseData: book,
        responseIsLoading,
        responseError,
    } = useFetch(apiRoutes.BOOKS.GET_BY_ID(id), QUERY_KEYS.BOOKS.DETAIL(id));

    if (responseIsLoading) {
        return <LoadingSpinner />;
    }

    if (responseError) {
        return <NotFoundPage />;
    }

    const {
        title,
        author,
        coverImage,
        description,
        categories,
        price,
        isFree,
        avgRating,
        reviewCount,
        publishedDate,
        filePath,
    } = book;

    console.log(book);
    

    return (
        <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column - Cover Image */}
                <div className="md:col-span-1">
                    <div className="sticky top-8">
                        <Card className="overflow-hidden shadow-lg">
                            <img
                                src={coverImage}
                                alt={title}
                                className="w-full h-auto object-cover rounded-t-lg"
                            />
                            <div className="p-4 space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                        <span className="font-semibold">
                                            {avgRating || "No ratings"}
                                        </span>
                                        <span className="text-gray-500">
                                            ({reviewCount} reviews)
                                        </span>
                                    </div>
                                </div>
                                {!isAdmin ? (
                                    <div className="space-y-2">
                                        <Button className="w-full" size="lg">
                                            {isFree ? (
                                                <>
                                                    <BookOpen className="mr-2 h-5 w-5" />
                                                    Read Now
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                                    Buy for ₹{price}
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                ) : (
                                    <PdfViewerModal
                                        path={filePath}
                                        title={title}
                                    >
                                        <Button className="w-full">
                                            <BookOpen className="mr-2 h-5 w-5" />
                                            Read Now
                                        </Button>
                                    </PdfViewerModal>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Right Column - Book Details */}
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <div className="flex items-center justify-between">
                            <h1 className="text-4xl font-bold mb-2">{title}</h1>
                            {isAdmin && (
                                <Button variant="outline">
                                    <Edit className="mr-2 h-5 w-5" />
                                    Edit
                                </Button>
                            )}
                        </div>
                        <p className="text-xl text-gray-600 mb-4">
                            by {author}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {categories.map((category) => (
                                <Badge key={category.id} className="text-sm">
                                    {category.name}
                                </Badge>
                            ))}
                        </div>

                        <div className="flex items-center space-x-6 text-gray-500 mb-6">
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>
                                    Published{" "}
                                    {format(
                                        new Date(publishedDate),
                                        "MMMM dd, yyyy"
                                    )}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                <span>
                                    Last updated{" "}
                                    {format(
                                        new Date(book.updatedAt),
                                        "MMMM dd, yyyy"
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">
                            About this book
                        </h2>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {description}
                        </p>
                    </div>

                    <Separator />

                    {/* Categories Section */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">
                            Categories
                        </h2>
                        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 ">
                            {categories.map((category) => (
                                <Card key={category.id} className="p-4">
                                    <h3 className="font-semibold mb-2">
                                        {category.name}
                                    </h3>
                                    <p className="text-gray-600">
                                        {category.description}
                                    </p>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Reviews Section Placeholder */}
                    <Separator />
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold">Reviews</h2>
                            {!isAdmin && (
                                <Button variant="outline">
                                    <Plus className="mr-2 h-5 w-5" />
                                    Add Review
                                </Button>
                            )}
                        </div>
                        {reviewCount === 0 ? (
                            <Card className="p-6 text-center text-gray-500">
                                <p>
                                    No reviews yet. Be the first to review this
                                    book!
                                </p>
                            </Card>
                        ) : null}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default BookDetails;
