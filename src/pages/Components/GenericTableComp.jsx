import { GenericTable } from "@/components/custom/utils/GenericTable";
import { Button } from "@/components/ui/button";
import React from "react";

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
};

const GenericTableComp = () => {
  return <GenericTable {...dummyTableData} />;
};

export default GenericTableComp;
