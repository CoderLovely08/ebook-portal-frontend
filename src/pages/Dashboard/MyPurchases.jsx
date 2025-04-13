import React, { useState } from "react";
import Container from "@/components/custom/utils/Container";
import { useFetch } from "@/hooks/common/useFetch";
import { apiRoutes, QUERY_KEYS, ORDER_STATUS } from "@/utils/app.constants";
import { Book, Search, Calendar, Download, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { routes } from "@/utils/app.constants";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MyPurchases = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [sortBy, setSortBy] = useState("recent");

    const { responseData, responseIsLoading } = useFetch(
        apiRoutes.USER_CONTENT.PURCHASES,
        QUERY_KEYS.USER.PURCHASES,
        { showToast: true }
    );

    const filteredPurchases = responseData?.filter((purchase) => {
        const matchesSearch = purchase.book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            purchase.book.author.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (filter === "all") return matchesSearch;
        if (filter === "completed") return matchesSearch && purchase.status === ORDER_STATUS.COMPLETED;
        if (filter === "pending") return matchesSearch && purchase.status === ORDER_STATUS.PENDING;
        if (filter === "cancelled") return matchesSearch && purchase.status === ORDER_STATUS.CANCELLED;
        
        return matchesSearch;
    });

    const sortedPurchases = [...(filteredPurchases || [])].sort((a, b) => {
        if (sortBy === "recent") return new Date(b.purchaseDate) - new Date(a.purchaseDate);
        if (sortBy === "title") return a.book.title.localeCompare(b.book.title);
        if (sortBy === "author") return a.book.author.localeCompare(b.book.author);
        if (sortBy === "price") return b.book.price - a.book.price;
        return 0;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case ORDER_STATUS.COMPLETED:
                return <Badge className="bg-green-500">Completed</Badge>;
            case ORDER_STATUS.PENDING:
                return <Badge className="bg-yellow-500">Pending</Badge>;
            case ORDER_STATUS.CANCELLED:
                return <Badge className="bg-red-500">Cancelled</Badge>;
            default:
                return <Badge className="bg-gray-500">Unknown</Badge>;
        }
    };

    return (
        <Container>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">My Purchases</h1>
                <Button asChild>
                    <Link to={routes.CATALOG.routes.books.path}>Browse Books</Link>
                </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search by title or author..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Purchases</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="recent">Most Recent</SelectItem>
                            <SelectItem value="title">Title (A-Z)</SelectItem>
                            <SelectItem value="author">Author (A-Z)</SelectItem>
                            <SelectItem value="price">Price (High-Low)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Purchases Table */}
            {responseIsLoading ? (
                <Card>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-16 w-full" />
                            <Skeleton className="h-16 w-full" />
                            <Skeleton className="h-16 w-full" />
                        </div>
                    </CardContent>
                </Card>
            ) : sortedPurchases?.length > 0 ? (
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Book</TableHead>
                                    <TableHead>Purchase Date</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedPurchases.map((purchase) => (
                                    <TableRow key={purchase.id}>
                                        <TableCell>
                                            <div className="flex items-center space-x-3">
                                                <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-200">
                                                    {purchase.book.coverImage ? (
                                                        <img 
                                                            src={purchase.book.coverImage} 
                                                            alt={purchase.book.title} 
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center bg-gray-300">
                                                            <Book className="h-5 w-5 text-gray-500" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-medium">{purchase.book.title}</div>
                                                    <div className="text-sm text-gray-500">{purchase.book.author}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                                <span>{new Date(purchase.purchaseDate).toLocaleDateString()}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>₹{purchase.book.price.toFixed(2)}</TableCell>
                                        <TableCell>{getStatusBadge(purchase.status)}</TableCell>
                                        <TableCell className="text-right">
                                            {purchase.status === ORDER_STATUS.COMPLETED && (
                                                <Button variant="outline" size="sm" className="mr-2">
                                                    <Download className="h-4 w-4 mr-1" />
                                                    Download
                                                </Button>
                                            )}
                                            <Button variant="outline" size="sm" asChild>
                                                <Link to={`/dashboard/catalog/books/${purchase.book.id}`}>
                                                    View Details
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <ShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium mb-2">No purchases yet</h3>
                        <p className="text-gray-500 mb-4">Start browsing and purchasing books</p>
                        <Button asChild>
                            <Link to={routes.CATALOG.routes.books.path}>Browse Books</Link>
                        </Button>
                    </CardContent>
                </Card>
            )}
        </Container>
    );
};

export default MyPurchases; 