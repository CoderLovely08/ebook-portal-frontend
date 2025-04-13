import React, { useState } from "react";
import Container from "@/components/custom/utils/Container";
import { useFetch } from "@/hooks/common/useFetch";
import { apiRoutes, QUERY_KEYS } from "@/utils/app.constants";
import { Book, Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { routes } from "@/utils/app.constants";

const MyLibrary = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [sortBy, setSortBy] = useState("recent");

    const { responseData: libraryData, responseIsLoading } = useFetch(
        apiRoutes.LIBRARY.BASE,
        QUERY_KEYS.LIBRARY.USER_BOOKS
    );

    const filteredBooks = libraryData?.books?.filter((book) => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (filter === "all") return matchesSearch;
        if (filter === "read") return matchesSearch && book.readStatus === "READ";
        if (filter === "reading") return matchesSearch && book.readStatus === "READING";
        if (filter === "want") return matchesSearch && book.readStatus === "WANT_TO_READ";
        
        return matchesSearch;
    });

    const sortedBooks = [...(filteredBooks || [])].sort((a, b) => {
        if (sortBy === "recent") return new Date(b.addedDate) - new Date(a.addedDate);
        if (sortBy === "title") return a.title.localeCompare(b.title);
        if (sortBy === "author") return a.author.localeCompare(b.author);
        return 0;
    });

    const getReadStatusBadge = (status) => {
        switch (status) {
            case "READ":
                return <Badge className="bg-green-500">Read</Badge>;
            case "READING":
                return <Badge className="bg-blue-500">Reading</Badge>;
            case "WANT_TO_READ":
                return <Badge className="bg-yellow-500">Want to Read</Badge>;
            default:
                return <Badge className="bg-gray-500">Unknown</Badge>;
        }
    };

    return (
        <Container>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">My Library</h1>
                <Button asChild>
                    <Link to={routes.CATALOG.routes.books.path}>Browse More Books</Link>
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
                            <SelectItem value="all">All Books</SelectItem>
                            <SelectItem value="read">Read</SelectItem>
                            <SelectItem value="reading">Reading</SelectItem>
                            <SelectItem value="want">Want to Read</SelectItem>
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
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Books Grid */}
            {responseIsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Card key={i} className="overflow-hidden">
                            <CardHeader className="pb-2">
                                <Skeleton className="h-6 w-3/4" />
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center space-x-4">
                                    <Skeleton className="h-16 w-16 rounded-md" />
                                    <div className="space-y-2 flex-1">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-3/4" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : sortedBooks?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedBooks.map((book) => (
                        <Card key={book.id} className="overflow-hidden">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg">{book.title}</CardTitle>
                                    {getReadStatusBadge(book.readStatus)}
                                </div>
                                <CardDescription>{book.author}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center space-x-4">
                                    <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-200">
                                        {book.coverImage ? (
                                            <img 
                                                src={book.coverImage} 
                                                alt={book.title} 
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center bg-gray-300">
                                                <Book className="h-8 w-8 text-gray-500" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Added: {new Date(book.addedDate).toLocaleDateString()}
                                        </p>
                                        {book.lastReadDate && (
                                            <p className="text-sm text-gray-500">
                                                Last read: {new Date(book.lastReadDate).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" size="sm" asChild>
                                    <Link to={`/dashboard/catalog/books/${book.id}`}>View Details</Link>
                                </Button>
                                <Button variant="outline" size="sm">Update Status</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Book className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Your library is empty</h3>
                        <p className="text-gray-500 mb-4">Start adding books to your library</p>
                        <Button asChild>
                            <Link to={routes.CATALOG.routes.books.path}>Browse Books</Link>
                        </Button>
                    </CardContent>
                </Card>
            )}
        </Container>
    );
};

export default MyLibrary; 