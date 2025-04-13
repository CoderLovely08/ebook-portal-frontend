import React, { useState } from "react";
import { Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/common/useFetch";
import { apiRoutes, QUERY_KEYS } from "@/utils/app.constants";
import ReviewModal from "./ReviewModal";

const ReviewButton = ({ bookId, onReviewAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Check if user has purchased this book
  const { responseData: purchases, responseIsLoading } = useFetch(
    apiRoutes.USER_CONTENT.PURCHASES,
    QUERY_KEYS.USER.PURCHASES
  );
  
  const hasPurchased = purchases?.some(
    (purchase) => purchase.bookId === bookId && purchase.status === "COMPLETED"
  );
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const handleReviewSuccess = () => {
    if (onReviewAdded) {
      onReviewAdded();
    }
  };
  
  if (responseIsLoading) {
    return <Button variant="outline" disabled>Loading...</Button>;
  }
  
  if (!hasPurchased) {
    return (
      <Button variant="outline" disabled>
        <Star className="mr-2 h-4 w-4" />
        Purchase to Review
      </Button>
    );
  }
  
  return (
    <>
      <Button variant="outline" onClick={handleOpenModal}>
        <Plus className="mr-2 h-4 w-4" />
        Add Review
      </Button>
      
      <ReviewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        bookId={bookId}
        onSuccess={handleReviewSuccess}
      />
    </>
  );
};

export default ReviewButton; 