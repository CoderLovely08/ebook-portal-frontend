import React, { useState } from "react";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetch } from "@/hooks/common/useFetch";
import { apiRoutes, QUERY_KEYS } from "@/utils/app.constants";
import { toast } from "react-toastify";
import { useReview } from "@/hooks/user/useReview";

const ReviewForm = ({ bookId, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { createReview, isPending } = useReview(bookId, onSuccess);

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    createReview({ rating, comment, bookId });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
        <CardDescription>
          Share your thoughts about this book with other readers
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Rating</p>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleRatingClick(value)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 ${
                      value <= rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Your Review</p>
            <Textarea
              placeholder="What did you like or dislike about this book?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              "Submitting..."
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Review
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ReviewForm;
