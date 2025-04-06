import { useState, useEffect } from "react";
import {
    Book,
    Search,
    Filter,
    Plus,
    ChevronRight,
    ChevronLeft,
    ExternalLink,
    BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useFetch } from "@/hooks/common/useFetch";
import { apiRoutes, QUERY_KEYS } from "@/utils/app.constants";
import Container from "@/components/custom/utils/Container";
import LoadingSpinner from "@/components/custom/utils/LoadingSpiner";
import BookCard from "./BookCard";
import useDebounce from "@/hooks/common/useDebounce";

const ViewAllBooks = () => {
    const [searchInput, setSearchInput] = useState("");
    const [filters, setFilters] = useState({
        search: "",
        category: "",
        type: "all",
        sort: "desc",
        page: 1,
        limit: 10,
    });

    // Debounce the search input
    const debouncedSearch = useDebounce(searchInput, 500);

    // Update filters when debounced search changes
    useEffect(() => {
        setFilters(prev => ({ ...prev, search: debouncedSearch, page: 1 }));
    }, [debouncedSearch]);

    const {
        responseData: books,
        responseIsLoading: isBooksLoading,
        responseError: booksError,
    } = useFetch(
        apiRoutes.BOOKS.BASE(
            filters.page,
            filters.limit,
            filters.search,
            filters.type
        ),
        [QUERY_KEYS.BOOKS.ALL, filters]
    );

    const { responseData: categories, responseIsLoading: isCategoriesLoading } =
        useFetch(apiRoutes.CATEGORIES.BASE, QUERY_KEYS.CATEGORIES.ALL);

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
    };

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handlePageChange = (newPage) => {
        setFilters((prev) => ({ ...prev, page: newPage }));
    };

    return (
        <Container>
            <div className="flex flex-col space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Books</h1>
                        <p className="text-gray-500 mt-1">
                            Browse and manage your book collection
                        </p>
                    </div>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Book
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Filters Sidebar */}
                    <Card className="p-4 h-fit lg:sticky lg:top-4">
                        <h2 className="font-semibold flex items-center gap-2 mb-4">
                            <Filter className="h-4 w-4" /> Filters
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block">
                                    Search
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        placeholder="Search books..."
                                        value={searchInput}
                                        onChange={handleSearchChange}
                                        className="pl-10"
                                    />
                                </div>
                                {searchInput !== filters.search && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Searching...
                                    </p>
                                )}
                            </div>

                            {isCategoriesLoading ? (
                                <LoadingSpinner />
                            ) : (
                                <div>
                                    <label className="text-sm font-medium mb-1 block">
                                        Category
                                    </label>
                                    <Select
                                        value={filters.category}
                                        onValueChange={(value) =>
                                            handleFilterChange(
                                                "category",
                                                value
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="All Categories" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                All Categories
                                            </SelectItem>
                                            {categories?.map((category) => (
                                                <SelectItem
                                                    key={category?.id}
                                                    value={category?.id || "12"}
                                                >
                                                    {category?.name || "12"}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            <div>
                                <label className="text-sm font-medium mb-1 block">
                                    Type
                                </label>
                                <Select
                                    value={filters.type}
                                    onValueChange={(value) =>
                                        handleFilterChange("type", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="free">
                                            Free
                                        </SelectItem>
                                        <SelectItem value="paid">
                                            Paid
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1 block">
                                    Sort By
                                </label>
                                <Select
                                    value={filters.sort}
                                    onValueChange={(value) =>
                                        handleFilterChange("sort", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="desc">
                                            Ascending
                                        </SelectItem>
                                        <SelectItem value="asc">
                                            Descending
                                        </SelectItem>
                                        <SelectItem value="price_low">
                                            Price: Low to High
                                        </SelectItem>
                                        <SelectItem value="price_high">
                                            Price: High to Low
                                        </SelectItem>
                                        <SelectItem value="rating">
                                            Highest Rated
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </Card>

                    {/* Main Content */}
                    {isBooksLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="lg:col-span-3 space-y-6">
                            {/* Results Info */}
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500">
                                    Showing{" "}
                                    <span className="font-medium">
                                        {books?.data?.length || 0}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-medium">
                                        {books?.pagination?.total || 0}
                                    </span>{" "}
                                    books
                                </p>
                            </div>

                            {/* Books Grid */}
                            <div className="space-y-4">
                                {books?.data?.map((book) => (
                                    <BookCard key={book.id} book={book} />
                                ))}
                            </div>

                            {/* Empty State */}
                            {(!books?.data || books.data.length === 0) && (
                                <div className="text-center py-12">
                                    <Book className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900">
                                        No books found
                                    </h3>
                                    <p className="mt-1 text-gray-500">
                                        Try adjusting your filters
                                    </p>
                                </div>
                            )}

                            {/* Pagination */}
                            {books?.pagination?.pages > 1 && (
                                <div className="flex justify-center gap-2 mt-6">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            handlePageChange(filters.page - 1)
                                        }
                                        disabled={filters.page === 1}
                                    >
                                        <ChevronLeft className="h-4 w-4 mr-2" />
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            handlePageChange(filters.page + 1)
                                        }
                                        disabled={
                                            filters.page ===
                                            books.pagination.pages
                                        }
                                    >
                                        Next
                                        <ChevronRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default ViewAllBooks;
