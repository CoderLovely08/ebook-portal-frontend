import { GenericTable } from "@/components/custom/utils/GenericTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";
import AddDialog from "./AddDialog";

const dummyTableData = {
  columns: [
    { field: "name", header: "Name" },
    { field: "designation", header: "Designation" },
  ],
  data: [
    { name: "Alice", designation: "Developer" },
    { name: "Bob", designation: "Manager" },
  ],
  searchFields: ["name", "designation"],
  filterField: "designation",
  rowActions: (row) => <Button>View {row.name}</Button>,
  additionalElement: (
    <AddDialog
      title="Add User"
      description="Add a new user to the table"
      actionTrigger={<Button>Add User</Button>}
    />
  ),
};

const GenericTableComp = () => {
  return <GenericTable {...dummyTableData} />;
};

export default GenericTableComp;
