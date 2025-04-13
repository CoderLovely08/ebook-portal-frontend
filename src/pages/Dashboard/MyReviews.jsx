import React, { useState } from "react";
import Container from "@/components/custom/utils/Container";
import { useFetch } from "@/hooks/common/useFetch";
import { apiRoutes, QUERY_KEYS } from "@/utils/app.constants";
import { Book, Search, Star, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { routes } from "@/utils/app.constants";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const MyReviews = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("recent");
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [editForm, setEditForm] = useState({
        rating: 0,
        comment: ""
    });

    const { responseData: reviewsData, responseIsLoading } = useFetch(
        apiRoutes.REVIEWS.BASE,
        QUERY_KEYS.REVIEWS.ALL
    );

    const filteredReviews = reviewsData?.reviews?.filter((review) => {
        return review.book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const sortedReviews = [...(filteredReviews || [])].sort((a, b) => {
        if (sortBy === "recent") return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortBy === "title") return a.book.title.localeCompare(b.book.title);
        if (sortBy === "author") return a.book.author.localeCompare(b.book.author);
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
    });

    const handleEditClick = (review) => {
        setSelectedReview(review);
        setEditForm({
            rating: review.rating,
            comment: review.comment
        });
        setIsEditDialogOpen(true);
    };

    const handleDeleteClick = (review) => {
        setSelectedReview(review);
        setIsDeleteDialogOpen(true);
    };

    const handleEditSubmit = () => {
        // Here you would call an API to update the review
        console.log("Updating review:", selectedReview.id, editForm);
        setIsEditDialogOpen(false);
    };

    const handleDeleteSubmit = () => {
        // Here you would call an API to delete the review
        console.log("Deleting review:", selectedReview.id);
        setIsDeleteDialogOpen(false);
    };

    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, index) => (
            <Star 
                key={index} 
                className={`h-4 w-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
            />
        ));
    };

    return (
        <Container>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">My Reviews</h1>
                <Button asChild>
                    <Link to={routes.CATALOG.routes.books.path}>Browse Books</Link>
                </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search by book title, author, or review content..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="recent">Most Recent</SelectItem>
                            <SelectItem value="title">Book Title (A-Z)</SelectItem>
                            <SelectItem value="author">Author (A-Z)</SelectItem>
                            <SelectItem value="rating">Rating (High-Low)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Reviews List */}
            {responseIsLoading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <Card key={i}>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <Skeleton className="h-6 w-1/3" />
                                        <Skeleton className="h-6 w-1/4" />
                                    </div>
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : sortedReviews?.length > 0 ? (
                <div className="space-y-4">
                    {sortedReviews.map((review) => (
                        <Card key={review.id}>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg">{review.book.title}</CardTitle>
                                        <CardDescription>{review.book.author}</CardDescription>
                                    </div>
                                    <div className="flex items-center">
                                        {renderStars(review.rating)}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">{review.comment}</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Posted on {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2">
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleEditClick(review)}
                                >
                                    <Edit className="h-4 w-4 mr-1" />
                                    Edit
                                </Button>
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleDeleteClick(review)}
                                >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Delete
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Star className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium mb-2">No reviews yet</h3>
                        <p className="text-gray-500 mb-4">Start reviewing books you've read</p>
                        <Button asChild>
                            <Link to={routes.CATALOG.routes.books.path}>Browse Books</Link>
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Edit Review Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Review</DialogTitle>
                        <DialogDescription>
                            Update your review for {selectedReview?.book.title}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="rating">Rating</Label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Button
                                        key={star}
                                        variant="ghost"
                                        size="sm"
                                        className="p-0 h-auto"
                                        onClick={() => setEditForm({ ...editForm, rating: star })}
                                    >
                                        <Star 
                                            className={`h-6 w-6 ${star <= editForm.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                        />
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="comment">Review</Label>
                            <Textarea
                                id="comment"
                                value={editForm.comment}
                                onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
                                rows={4}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleEditSubmit}>
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Review Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Review</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete your review for {selectedReview?.book.title}?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteSubmit}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default MyReviews; 