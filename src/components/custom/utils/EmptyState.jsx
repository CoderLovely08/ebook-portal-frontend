import { Bell } from "lucide-react";
import React from "react";

const EmptyState = ({ Icon = Bell, message = "No data found", children }) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center">
        <Icon className="w-10 h-10" />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      {children}
    </div>
  );
};

export default EmptyState;
