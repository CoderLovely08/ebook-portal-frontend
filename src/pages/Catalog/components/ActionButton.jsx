import PdfViewerModal from "@/components/custom/ui/PdfDocViewer";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, ShoppingCart } from "lucide-react";
import React from "react";
import BuyNow from "./BuyNow";
import { Link } from "react-router-dom";

const ActionButton = ({
  id,
  filePath,
  title,
  isAdmin = false,
  isFree = false,
  isPurchased = false,
  price = 0,
}) => {
  return (
    <>
      {isAdmin || isFree || isPurchased ? (
        <div className="flex items-center gap-2">
          <PdfViewerModal path={filePath} title={title}>
            <Button className="w-full">
              <BookOpen className="mr-2 h-5 w-5" />
              Read Now
            </Button>
          </PdfViewerModal>
          {isPurchased && (
            <Link to={filePath} target="_blank">
              <Button className="w-full">
                <Download className="mr-2 h-5 w-5" />
                Download
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <BuyNow bookId={id} price={price} />
      )}
    </>
  );
};

export default ActionButton;
