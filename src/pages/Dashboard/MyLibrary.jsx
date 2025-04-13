import React, { useState } from "react";
import { apiRoutes, QUERY_KEYS } from "@/utils/app.constants";
import Container from "@/components/custom/utils/Container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  BookOpen,
  Star,
  Download,
  Filter,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { routes } from "@/utils/app.constants";
import LoadingSpinner from "@/components/custom/utils/LoadingSpiner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "@/hooks/common/useFetch";

const MyLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const { responseData: libraryData, responseIsLoading: isLoading } = useFetch(
    apiRoutes.LIBRARY.BASE,
    QUERY_KEYS.LIBRARY.USER_BOOKS
  );

  const filteredBooks = libraryData?.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    if (categoryFilter === "all") return matchesSearch;
    return (
      matchesSearch && book.categories.some((cat) => cat.id === categoryFilter)
    );
  });

  const sortedBooks = [...(filteredBooks || [])].sort((a, b) => {
    if (sortBy === "recent")
      return new Date(b.addedToLibraryAt) - new Date(a.addedToLibraryAt);
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "author") return a.author.localeCompare(b.author);
    if (sortBy === "rating") return b.avgRating - a.avgRating;
    return 0;
  });

  const allCategories = libraryData?.reduce((categories, book) => {
    book.categories.forEach((category) => {
      if (!categories.find((c) => c.id === category.id)) {
        categories.push(category);
      }
    });
    return categories;
  }, []);

  console.log(sortedBooks);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Library</h1>
            <p className="text-gray-500 mt-1">
              Access and manage your purchased books
            </p>
          </div>
          <Button asChild>
            <Link to={routes.CATALOG.routes.books.path}>Browse Books</Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {allCategories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
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
                <SelectItem value="rating">Rating (High-Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBooks?.map((book) => (
            <Card
              key={book.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-[3/4] relative">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <CardContent className="p-4 space-y-4">
                <div className="p-4">
                  <Link
                    to={routes.CATALOG.routes.bookDetails.getPath(book.id)}
                    className="hover:text-primary"
                  >
                    <h3 className="text-lg font-semibold  mb-1 flex items-center gap-2 hover:underline">
                      {book.title} <ExternalLink className="w-4 h-4" />
                    </h3>
                  </Link>
                  <p className="text-sm text-pretty">by {book.author}</p>
                </div>
                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {book.categories.slice(0, 3).map((category) => (
                    <Badge key={category.id} variant="secondary">
                      {category.name}
                    </Badge>
                  ))}
                  {book.categories.length > 3 && (
                    <Badge variant="outline">
                      +{book.categories.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.round(book.avgRating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({book.reviewCount} reviews)
                  </span>
                </div>

                {/* Added Date */}
                <div className="text-sm text-gray-500">
                  Added {format(new Date(book.addedToLibraryAt), "MMM d, yyyy")}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link to={book.filePath} target="_blank">
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {(!sortedBooks || sortedBooks.length === 0) && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              No books in your library
            </h3>
            <p className="mt-1 text-gray-500">
              {searchTerm || categoryFilter !== "all"
                ? "Try adjusting your filters"
                : "Start browsing and purchasing books to build your library"}
            </p>
            <Button className="mt-4" asChild>
              <Link to={routes.CATALOG.routes.books.path}>Browse Books</Link>
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default MyLibrary;
