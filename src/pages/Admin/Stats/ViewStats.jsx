import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useFetch } from "@/hooks/common/useFetch";
import { apiRoutes, QUERY_KEYS, routes } from "@/utils/app.constants";
import Container from "@/components/custom/utils/Container";
import LoadingSpinner from "@/components/custom/utils/LoadingSpiner";
import { Book, Users, ShoppingCart, Folder, Star, Library } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const StatCard = ({ title, value, icon: Icon, subText }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{subText}</p>
        </CardContent>
    </Card>
);

const RecentItem = ({ title, date, icon: Icon, subText, id }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="h-4 w-4 text-primary" />
            </div>
            <div>
                <Link to={routes.ADMIN.routes.bookDetails.getPath(id)}>
                    <Button variant="link" className="p-0">
                        <p className="font-medium">{title}</p>
                    </Button>
                </Link>
                <p className="text-sm text-muted-foreground">{subText}</p>
            </div>
        </div>
        <span className="text-sm text-muted-foreground">
            {format(new Date(date), "MMM d, yyyy")}
        </span>
    </div>
);

const ViewStats = () => {
    const { responseData: stats, responseIsLoading: isStatsLoading } = useFetch(
        apiRoutes.ADMIN.STATS,
        QUERY_KEYS.ADMIN.STATS
    );

    if (isStatsLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Container>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Statistics Overview</h1>
                    <p className="text-muted-foreground">
                        Detailed statistics about your e-book portal
                    </p>
                </div>

                {/* Main Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Users"
                        value={stats?.counts?.users}
                        icon={Users}
                        subText="Registered users"
                    />
                    <StatCard
                        title="Total Books"
                        value={stats?.counts?.books}
                        icon={Book}
                        subText={`${stats?.counts?.freeBooks} free, ${stats?.counts?.paidBooks} paid`}
                    />
                    <StatCard
                        title="Total Categories"
                        value={stats?.counts?.categories}
                        icon={Folder}
                        subText="Book categories"
                    />
                    <StatCard
                        title="Total Purchases"
                        value={stats?.counts?.purchases}
                        icon={ShoppingCart}
                        subText={`${stats?.counts?.completedPurchases} completed`}
                    />
                </div>

                {/* Purchase Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Purchase Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Badge variant="warning">Pending</Badge>
                                </div>
                                <span className="font-medium">
                                    {stats?.counts?.pendingPurchases}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Badge variant="success">Completed</Badge>
                                </div>
                                <span className="font-medium">
                                    {stats?.counts?.completedPurchases}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Badge variant="destructive">
                                        Cancelled
                                    </Badge>
                                </div>
                                <span className="font-medium">
                                    {stats?.counts?.cancelledPurchases}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Library Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Library Stats
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Library className="h-4 w-4" />
                                    <span>Total Library Entries</span>
                                </div>
                                <span className="font-medium">
                                    {stats?.counts?.libraryEntries}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4" />
                                    <span>Total Reviews</span>
                                </div>
                                <span className="font-medium">
                                    {stats?.rating?.count}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4" />
                                    <span>Average Rating</span>
                                </div>
                                <span className="font-medium">
                                    {stats?.rating?.average?.toFixed(1)}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Recent Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {stats?.recent?.purchases
                                ?.slice(0, 3)
                                .map((activity) => (
                                    <RecentItem
                                        key={activity.id}
                                        title={activity.book?.title}
                                        date={activity.purchaseDate}
                                        icon={ShoppingCart}
                                        subText={`by ${activity.user?.fullName}`}
                                        id={activity.book?.id}
                                        
                                    />
                                ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Container>
    );
};

export default ViewStats;
