import Container from "@/components/custom/utils/Container";
import React from "react";
import CreateBookForm from "./components/CreateBookForm";
import GoBackButton from "@/components/custom/utils/GoBackButton";

const AddNewBook = () => {
    return (
        <Container>
            <div className="mx-auto">
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Add New Book
                        </h1>
                        <GoBackButton />
                    </div>
                    <p className="text-muted-foreground mt-2">
                        Fill in the details below to add a new book to the
                        catalog.
                    </p>
                </div>

                <CreateBookForm />
            </div>
        </Container>
    );
};

export default AddNewBook;
