import React, { useState } from "react";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCategory } from "@/api/methods.api";
import { useCustomMutation } from "@/hooks/common/useCustomMutation";
import { Textarea } from "@/components/ui/textarea";
import LoadingSpinner from "@/components/custom/utils/LoadingSpiner";
//
const CreateCategoryDialog = () => {
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");

    const { func, onSuccess, onError } = createCategory();

    const { performMutation, isPendingMutation } = useCustomMutation(
        func,
        onSuccess,
        onError
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        performMutation({ name: categoryName, description });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                    Add <Plus className="w-3 h-3" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create Category</DialogTitle>
                        <DialogDescription>
                            Add a new product category to your catalog.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start w-full gap-4">
                            <Label htmlFor="category" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="category"
                                value={categoryName}
                                onChange={(e) =>
                                    setCategoryName(e.target.value)
                                }
                                required
                                className="col-span-3"
                                placeholder="Enter category name"
                            />
                        </div>
                        <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start w-full gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter category description"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isPendingMutation}>
                            {isPendingMutation ? "Creating..." : "Create"}
                            {isPendingMutation && <LoadingSpinner />}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateCategoryDialog;
