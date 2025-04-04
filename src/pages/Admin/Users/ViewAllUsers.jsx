import Container from "@/components/custom/utils/Container";
import { GenericTable } from "@/components/custom/utils/GenericTable";
import GoBackButton from "@/components/custom/utils/GoBackButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/common/useFetch";
import GenericTableComp from "@/pages/Components/GenericTableComp";
import { apiRoutes, QUERY_KEYS } from "@/utils/app.constants";
import { formatDate } from "date-fns";
import React from "react";

const ViewAllUsers = () => {
    const { responseData: users, responseIsLoading } = useFetch(
        apiRoutes.ADMIN.USERS(1, 100, ""),
        QUERY_KEYS.ADMIN.USERS
    );

    const tableData = {
        title: "Users",
        columns: [
            {
                field: "id",
                header: "ID",
            },
            {
                field: "fullName",
                header: "Full Name",
            },
            {
                field: "email",
                header: "Email",
            },
            {
                field: "userType.name",
                header: "Role",
                render: (value) => {
                    return <Badge>{value}</Badge>;
                },
            },
            {
                field: "createdAt",
                header: "Created At",
                render: (value) => {
                    return (
                        <span>{formatDate(value, "dd MMM yyyy HH:mm a")}</span>
                    );
                },
            },
        ],
        data: users?.data,
        searchFields: ["fullName", "email", "role"],
    };

    return (
        <Container>
            <div className="flex justify-end items-center">
                <GoBackButton />
            </div>
            <GenericTable
                title="Users"
                {...tableData}
                isLoading={responseIsLoading}
            />
        </Container>
    );
};

export default ViewAllUsers;
