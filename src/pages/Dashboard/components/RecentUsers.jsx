import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, ChevronRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRoutes, QUERY_KEYS } from "@/utils/app.constants";
import { useFetch } from "@/hooks/common/useFetch";
import { formatDistance } from "date-fns";
import EmptyState from "@/components/custom/utils/EmptyState";
import LoadingSpinner from "@/components/custom/utils/LoadingSpiner";

const RecentUsers = () => {
    const { responseData: users, responseIsLoading } = useFetch(
        apiRoutes.ADMIN.USERS(1, 10, ""),
        QUERY_KEYS.ADMIN.USERS
    );

    // Function to format time relative to now
    const formatTime = (timestamp) => {
        return formatDistance(new Date(timestamp), new Date(), {
            addSuffix: true,
        });
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Recent Users
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-xs">
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                {responseIsLoading ? (
                    <LoadingSpinner />
                ) : !users || users?.length === 0 ? (
                    <EmptyState Icon={Users} message="No recent users" />
                ) : (
                    <div className="space-y-4">
                        {users.data?.map((user) => (
                            <div
                                key={user.id}
                                className="relative rounded-lg border p-4 transition-colors hover:bg-muted/50"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-medium">
                                                {user.fullName}
                                            </h4>
                                            {user.userType && (
                                                <Badge variant="outline">
                                                    {user.userType.name}
                                                </Badge>
                                            )}
                                        </div>

                                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                                            <Mail className="h-3 w-3" />
                                            {user.author}
                                        </p>

                                        <div className="flex items-center gap-4 mt-2">
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {formatTime(user.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default RecentUsers;
