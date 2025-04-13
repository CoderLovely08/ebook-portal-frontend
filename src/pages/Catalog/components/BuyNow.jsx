import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePurchase } from "@/hooks/user/usePurchase";

const BuyNow = ({ bookId, price, title }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { purchaseBook, isPending } = usePurchase(bookId);

  const handlePurchase = () => {
    setIsDialogOpen(true);
  };

  const confirmPurchase = async () => {
    purchaseBook().then(() => {
      setIsDialogOpen(false);
    });
  };

  return (
    <>
      <Button className="" onClick={handlePurchase}>
        <ShoppingCart className="mr-2 h-5 w-5" />
        Buy Now ₹{price}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
            <DialogDescription>
              You are about to purchase "{title}" for ₹{price}. This is a test
              mode purchase and will be marked as completed automatically.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-500">
              In a real implementation, this would redirect to a payment
              gateway.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={confirmPurchase} disabled={isPending}>
              {isPending ? (
                "Processing..."
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Confirm Purchase
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BuyNow;
