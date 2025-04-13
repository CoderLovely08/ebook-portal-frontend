import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ReviewForm from "@/components/custom/forms/ReviewForm";

const ReviewModal = ({ isOpen, onClose, bookId, onSuccess }) => {
  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess();
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose }>
      <DialogContent className="sm:max-w-[500px]"  onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Share your thoughts about this book with other readers
          </DialogDescription>
        </DialogHeader>
        <ReviewForm bookId={bookId} onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal; 