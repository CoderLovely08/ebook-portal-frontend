import LoadingSpinner from "@/components/custom/utils/LoadingSpiner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePurchaseAction } from "@/hooks/admin/usePurchaseAction";
import { ORDER_STATUS } from "@/utils/data.constants";
import { Pencil } from "lucide-react";
import React, { useState } from "react";

const PurchaseActionButton = ({ purchase }) => {
  const [status, setStatus] = useState(purchase.status);
  const { updatePurchaseStatus, isPending } = usePurchaseAction(purchase?.id);

  const handleUpdatePurchaseStatus = () => {
    let confirm = window.confirm(
      "Are you sure you want to update the purchase status? This action cannot be undone."
    );
    if (confirm) {
      updatePurchaseStatus(status);
    }
  };

  if (purchase.isActionTaken) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger>
          <SelectValue placeholder={purchase.status} />
        </SelectTrigger>
        <SelectContent>
          {Object.values(ORDER_STATUS).map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button size="sm" onClick={handleUpdatePurchaseStatus}>
        {isPending ? <LoadingSpinner /> : "Save"}
      </Button>
    </div>
  );
};

export default PurchaseActionButton;
