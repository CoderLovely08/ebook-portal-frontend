import { useState } from "react";
import { ChevronRight, ExternalLink, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useFetch } from "@/hooks/common/useFetch";
import { apiRoutes, QUERY_KEYS, ORDER_STATUS, routes } from "@/utils/app.constants";
import Container from "@/components/custom/utils/Container";
import LoadingSpinner from "@/components/custom/utils/LoadingSpiner";
import { format } from "date-fns";
import { useCustomMutation } from "@/hooks/common/useCustomMutation";
import { Link } from "react-router-dom";
// import { toast } from "sonner";

const PurchaseCard = ({ purchase }) => {
    return (
        <Card className="p-6 hover:border-primary/50 border border-transparent transition-all duration-200">
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <ShoppingCart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">
                            <Link to={routes.ADMIN.routes.bookDetails.getPath(purchase.book.id)}>
                                <Button variant="link" className="p-0">
                                    {purchase.book.title} {`(by: ${purchase.book.author})`}
                                     <ExternalLink className="h-4 w-4" />
                                </Button>
                            </Link>
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">
                                {purchase.user.fullName}
                            </Badge>
                            <Badge variant="outline">
                                ₹{purchase.book.price}
                            </Badge>
                        </div>
                    </div>
                </div>
                <Badge
                    variant={
                        purchase.status === ORDER_STATUS.COMPLETED
                            ? "success"
                            : purchase.status === ORDER_STATUS.CANCELLED
                            ? "destructive"
                            : "warning"
                    }
                >
                    {purchase.status}
                </Badge>
            </div>

            <div className="mt-4 text-sm text-gray-600">
                <p>Order ID: {purchase.id}</p>
                <p>Book Author: {purchase.book.author}</p>
                <p>User Email: {purchase.user.email}</p>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>
                    Purchased on{" "}
                    {format(
                        new Date(purchase.purchaseDate),
                        "MMM d, yyyy HH:mm"
                    )}
                </span>
            </div>
        </Card>
    );
};

const ViewPurchaseOrders = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const {
        responseData: purchases,
        responseIsLoading,
        responseError,
    } = useFetch(
        `${apiRoutes.ADMIN.PURCHASES}?page=${page}&limit=${limit}${
            statusFilter ? `&status=${statusFilter}` : ""
        }`,
        [QUERY_KEYS.ADMIN.ALL_PURCHASES, page, statusFilter]
    );

    if (responseIsLoading) {
        return <LoadingSpinner />;
    }

    if (responseError) {
        return (
            <Container>
                <div className="text-center text-red-500">
                    Error loading purchase orders
                </div>
            </Container>
        );
    }

    const filteredPurchases = purchases?.data?.filter(
        (purchase) =>
            purchase.book.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            purchase.user.fullName
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            purchase.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container>
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Purchase Orders</h1>
                        <p className="text-gray-500 mt-1">
                            Manage and track book purchases
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search by book title, user name or order ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-md border border-input bg-background px-3 py-2"
                    >
                        <option value="">All Status</option>
                        <option value={ORDER_STATUS.PENDING}>Pending</option>
                        <option value={ORDER_STATUS.COMPLETED}>
                            Completed
                        </option>
                        <option value={ORDER_STATUS.CANCELLED}>
                            Cancelled
                        </option>
                    </select>
                </div>

                {/* Purchase Orders Grid */}
                <div className="space-y-4">
                    {filteredPurchases?.map((purchase) => (
                        <PurchaseCard key={purchase.id} purchase={purchase} />
                    ))}
                </div>

                {/* Empty State */}
                {(!filteredPurchases || filteredPurchases.length === 0) && (
                    <div className="text-center py-12">
                        <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">
                            No purchase orders found
                        </h3>
                        <p className="mt-1 text-gray-500">
                            {searchQuery || statusFilter
                                ? "Try adjusting your filters"
                                : "No purchase orders have been made yet"}
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {purchases?.pagination?.pages > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </Button>
                        <span className="flex items-center">
                            Page {page} of {purchases.pagination.pages}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setPage((p) =>
                                    Math.min(purchases.pagination.pages, p + 1)
                                )
                            }
                            disabled={page === purchases.pagination.pages}
                        >
                            Next
                        </Button>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default ViewPurchaseOrders;
