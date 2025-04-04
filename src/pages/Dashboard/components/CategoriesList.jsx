import { Badge } from "@/components/ui/badge";
import React from "react";

const CategoriesList = ({ categories }) => {
    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
                <Badge key={category.id}>
                    {category.name}
                </Badge>
            ))}
        </div>
    );
};

export default CategoriesList;
