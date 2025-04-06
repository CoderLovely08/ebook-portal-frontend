import { useState } from "react";
import { ChevronRight, Edit, Folder, Plus, Search, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useFetch } from "@/hooks/common/useFetch";
import { apiRoutes, QUERY_KEYS, routes } from "@/utils/app.constants";
import Container from "@/components/custom/utils/Container";
import LoadingSpinner from "@/components/custom/utils/LoadingSpiner";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import CreateCategoryDialog from "./components/CreateCategory";
import { deleteCategory } from "@/api/methods.api";
import { useCustomMutation } from "@/hooks/common/useCustomMutation";

const CategoryCard = ({ category }) => {

    const {
        func: deleteCategoryFunc,
        onSuccess: deleteCategoryOnSuccess,
        onError: deleteCategoryOnError,
    } = deleteCategory();

    const { performMutation: deleteCategoryMutation, isPendingMutation: isDeletingCategory } = useCustomMutation(
        deleteCategoryFunc,
        deleteCategoryOnSuccess,
        deleteCategoryOnError
    );

    const handleDelete = async (id) => {
        let confirm = window.confirm("Are you sure you want to delete this category?");
        if (confirm) {
            deleteCategoryMutation(id);
        }
    };
    return (
        <Card
            key={category.id}
            className="p-6 hover:border-primary/50 border border-transparent transition-all duration-200 relative"
        >
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Folder className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">
                            {category.name}
                        </h3>
                        <Badge variant="secondary" className="mt-1">
                            {category._count?.books || 0} books
                        </Badge>
                    </div>
                </div>
                <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 z-10 hover:bg-red-600 hover:text-white transition-colors duration-200 p-2"
                    onClick={() => handleDelete(category.id)}
                    disabled={isDeletingCategory}
                >
                    {isDeletingCategory ? <LoadingSpinner /> : <Trash className="h-4 w-4" />}
                </Button>
            </div>

            <p className="mt-4 text-gray-600 line-clamp-2">
                {category.description}
            </p>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>
                    Created{" "}
                    {format(new Date(category.createdAt), "MMM d, yyyy")}
                </span>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    <Link to={routes.ADMIN.routes.categories.path}>
                        <Button variant="ghost" size="sm" className="p-2">
                            <Edit className="h-4 w-4 text-primary" />
                        </Button>
                    </Link>
                    <Link to={routes.ADMIN.routes.booksByCategory.getPath(category.id)}>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-200"
                        >
                            <ChevronRight className="h-4 w-4 text-primary" />
                        </Button>
                    </Link>
                </div>
            </div>
        </Card>
    );
};

const ViewAllCategories = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [limit] = useState(12);

    const {
        responseData: categories,
        responseIsLoading,
        responseError,
    } = useFetch(apiRoutes.CATEGORIES.BASE, QUERY_KEYS.CATEGORIES.ALL);

    if (responseIsLoading) {
        return <LoadingSpinner />;
    }

    if (responseError) {
        return (
            <Container>
                <div className="text-center text-red-500">
                    Error loading categories
                </div>
            </Container>
        );
    }

    const filteredCategories = categories?.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container>
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Categories</h1>
                        <p className="text-gray-500 mt-1">
                            Manage and organize book categories
                        </p>
                    </div>
                    <CreateCategoryDialog />
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCategories?.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>

                {/* Empty State */}
                {filteredCategories?.length === 0 && (
                    <div className="text-center py-12">
                        <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">
                            No categories found
                        </h3>
                        <p className="mt-1 text-gray-500">
                            {searchQuery
                                ? "Try adjusting your search"
                                : "Create a new category to get started"}
                        </p>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default ViewAllCategories;
