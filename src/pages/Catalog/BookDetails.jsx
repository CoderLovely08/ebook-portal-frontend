import {
  Star,
  ShoppingCart,
  BookOpen,
  Calendar,
  Clock,
  Edit,
  Plus,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetch } from "@/hooks/common/useFetch";
import { useParams } from "react-router-dom";
import { apiRoutes, QUERY_KEYS, USER_TYPES } from "@/utils/app.constants";
import Container from "@/components/custom/utils/Container";
import LoadingSpinner from "@/components/custom/utils/LoadingSpiner";
import NotFoundPage from "@/components/custom/utils/NotFoundPage";
import { selectUser } from "@/store/slices/auth.slice";
import { useSelector } from "react-redux";
import PdfViewerModal from "@/components/custom/ui/PdfDocViewer";
import ReviewButton from "@/components/custom/ui/ReviewButton";
import { useState } from "react";
import ActionButton from "./components/ActionButton";

const BookDetails = () => {
  const { id } = useParams();
  const isAdmin = useSelector(selectUser).userType.name === USER_TYPES.ADMIN;
  const [reviewRefreshKey, setReviewRefreshKey] = useState(0);

  const {
    responseData: book,
    responseIsLoading,
    responseError,
  } = useFetch(apiRoutes.BOOKS.GET_BY_ID(id), QUERY_KEYS.BOOKS.DETAIL(id));

  const { responseData: reviews, responseIsLoading: reviewsLoading } = useFetch(
    apiRoutes.REVIEWS.GET_BOOK_REVIEWS(id),
    [...QUERY_KEYS.REVIEWS.BOOK_REVIEWS(id), reviewRefreshKey]
  );

  const handleReviewAdded = () => {
    setReviewRefreshKey((prev) => prev + 1);
  };

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
    isPurchased,
  } = book;

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
                <ActionButton
                  id={id}
                  filePath={filePath}
                  title={title}
                  isAdmin={isAdmin}
                  isFree={isFree}
                  price={price}
                  isPurchased={isPurchased}
                />
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
            <p className="text-xl text-gray-600 mb-4">by {author}</p>

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
                  Published {format(new Date(publishedDate), "MMMM dd, yyyy")}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>
                  Last updated{" "}
                  {format(new Date(book.updatedAt), "MMMM dd, yyyy")}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-2xl font-semibold mb-4">About this book</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {description}
            </p>
          </div>

          <Separator />

          {/* Categories Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Categories</h2>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 ">
              {categories.map((category) => (
                <Card key={category.id} className="p-4">
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <Separator />
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Reviews</h2>
              {!isAdmin && (
                <ReviewButton bookId={id} onReviewAdded={handleReviewAdded} />
              )}
            </div>

            {reviewsLoading ? (
              <div className="space-y-4">
                <Card className="p-4">
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </Card>
              </div>
            ) : reviews?.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className="flex mr-2">
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
                        <span className="font-medium">{review.user.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {format(new Date(review.createdAt), "MMM dd, yyyy")}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-6 text-center text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>No reviews yet. Be the first to review this book!</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BookDetails;
