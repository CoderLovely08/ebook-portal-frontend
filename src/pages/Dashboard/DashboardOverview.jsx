import HighlightCard from "@/components/custom/ui/HighlightCard";
import Container from "@/components/custom/utils/Container";
import EmptyState from "@/components/custom/utils/EmptyState";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/common/useFetch";
import {
    apiRoutes,
    highlightCardsData,
    QUERY_KEYS,
} from "@/utils/app.constants";
import { Calendar } from "lucide-react";
import React from "react";
import RecentBooks from "./components/RecentBooks";
import RecentUsers from "./components/RecentUsers";

const DashboardOverview = () => {
    const { responseData: statistics, responseIsLoading } = useFetch(
        apiRoutes.ADMIN.STATS,
        QUERY_KEYS.ADMIN.STATS
    );

    return (
        <Container>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-500">
                        {new Date().toDateString()}
                    </span>
                </div>
            </div>

            {/* Highlighted Statistics */}
            <div className="flex flex-wrap gap-2 w-full">
                {highlightCardsData.map((card) => (
                    <HighlightCard
                        key={card.title}
                        title={card.title}
                        Icon={card.Icon}
                        value={statistics?.counts?.[card.valueKey]}
                        subText={card.subText}
                        isLoading={responseIsLoading}
                    />
                ))}
            </div>

            {/* Recent Daata */}
            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-3 my-4">
                <RecentBooks
                    booksData={statistics?.recent?.books}
                    isLoading={responseIsLoading}
                />
                <RecentUsers
                    users={statistics?.recent?.users}
                    isLoading={responseIsLoading}
                />
            </div>
        </Container>
    );
};

export default DashboardOverview;
