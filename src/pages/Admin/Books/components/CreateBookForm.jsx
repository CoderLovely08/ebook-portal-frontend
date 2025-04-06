import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Plus, Upload } from "lucide-react";
import { useBook } from "@/hooks/admin/useBook";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { MultiSelect } from "@/components/ui/multi-select";
import { useFetch } from "@/hooks/common/useFetch";
import { apiRoutes, QUERY_KEYS } from "@/utils/app.constants";
import LoadingSpinner from "@/components/custom/utils/LoadingSpiner";

export default function CreateBookForm() {
    const { createBookForm, onSubmit, isCreatingBook } = useBook();

    const { responseData: categories, isLoading: isLoadingCategories } =
        useFetch(apiRoutes.CATEGORIES.BASE, QUERY_KEYS.CATEGORIES.ALL);

    const formattedCategories = categories?.map((category) => ({
        label: category.name,
        value: category.id,
    }));

    // Watch the isFree field
    useEffect(() => {
        if (createBookForm.watch("isFree")) {
            createBookForm.setValue("price", 0);
        }
    }, [createBookForm.watch("isFree")]);

    return (
        <Card className="p-6">
            <Form {...createBookForm}>
                <form
                    onSubmit={createBookForm.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    {/* Basic Information Section */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">
                            Basic Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={createBookForm.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Book Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter book title"
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={createBookForm.control}
                                name="author"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Author Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter author name"
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={createBookForm.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter book description"
                                            className="min-h-[120px] resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={createBookForm.control}
                            name="categories"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categories</FormLabel>
                                    <FormControl>
                                        {isLoadingCategories ? (
                                            <LoadingSpinner />
                                        ) : (
                                            <MultiSelect
                                                options={formattedCategories ?? []}
                                                defaultValue={field.value}
                                                onValueChange={(value) =>
                                                    field.onChange(value)
                                                }
                                                placeholder="Select categories"
                                                maxCount={5}
                                            ></MultiSelect>
                                        )}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Separator />

                    {/* Pricing and Date Section */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold">
                            Pricing & Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={createBookForm.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price (₹)</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter price"
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={createBookForm.control}
                                name="publishedDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="mb-2.5">
                                            Published Date
                                        </FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={createBookForm.control}
                            name="isFree"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Free Book</FormLabel>
                                        <FormDescription>
                                            Check this box if the book is free
                                            to download
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>

                    <Separator />

                    {/* Files Section */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold">Files</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={createBookForm.control}
                                name="coverImage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cover Image</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    className="cursor-pointer"
                                                    required
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.files?.[0]
                                                        )
                                                    }
                                                />
                                                <Upload className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            Upload a high-quality cover image
                                            (JPG, PNG)
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={createBookForm.control}
                                name="filePath"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Book PDF</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <Input
                                                    type="file"
                                                    accept=".pdf"
                                                    className="cursor-pointer"
                                                    required
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.files?.[0]
                                                        )
                                                    }
                                                />
                                                <Upload className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            Upload the book PDF file
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Separator />

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="gap-2"
                            disabled={isCreatingBook}
                        >
                            {isCreatingBook ? (
                                <>
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    Creating...
                                </>
                            ) : (
                                <>Submit</>
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </Card>
    );
}
