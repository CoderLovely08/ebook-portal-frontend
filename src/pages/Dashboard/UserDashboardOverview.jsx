import React from "react";
import Container from "@/components/custom/utils/Container";
import { Calendar, Book, ShoppingCart, Star } from "lucide-react";
import { useFetch } from "@/hooks/common/useFetch";
import { apiRoutes, QUERY_KEYS } from "@/utils/app.constants";
import { Link } from "react-router-dom";
import { routes } from "@/utils/app.constants";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/slices/auth.slice";

const UserDashboardOverview = () => {
  const user = useSelector(selectUser);
  const { responseData: userStats, responseIsLoading } = useFetch(
    apiRoutes.USER_CONTENT.STATS,
    QUERY_KEYS.USER.STATS
  );

  const stats = [
    {
      title: "Books in Library",
      value: userStats?.libraryCount || 0,
      icon: Book,
      link: routes.USER_CONTENT.routes.library.path,
      color: "bg-blue-500",
    },
    {
      title: "Purchases",
      value: userStats?.purchasesCount || 0,
      icon: ShoppingCart,
      link: routes.USER_CONTENT.routes.purchases.path,
      color: "bg-green-500",
    },
    {
      title: "Reviews",
      value: userStats?.reviewsCount || 0,
      icon: Star,
      link: routes.USER_CONTENT.routes.reviews.path,
      color: "bg-yellow-500",
    },
  ];

  return (
    <Container>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Hello, {user?.fullName}
        </h1>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <span className="text-gray-500">{new Date().toDateString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {responseIsLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="flex items-center">
                  <div
                    className={`p-2 rounded-full ${stat.color} text-white mr-3`}
                  >
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link to={stat.link}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Books */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Books</CardTitle>
            <CardDescription>
              Books you've recently added to your library
            </CardDescription>
          </CardHeader>
          <CardContent>
            {responseIsLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : userStats?.recentBooks?.length > 0 ? (
              <div className="space-y-4">
                {userStats.recentBooks.map((book) => (
                  <div key={book.id} className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-200">
                      {book.coverImage ? (
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gray-300">
                          <Book className="h-6 w-6 text-gray-500" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{book.title}</h3>
                      <p className="text-sm text-gray-500">{book.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No recent books</p>
                <Button variant="outline" className="mt-2" asChild>
                  <Link to={routes.CATALOG.routes.books.path}>
                    Browse Books
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Purchases */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Purchases</CardTitle>
            <CardDescription>Your recent book purchases</CardDescription>
          </CardHeader>
          <CardContent>
            {responseIsLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : userStats?.recentPurchases?.length > 0 ? (
              <div className="space-y-4">
                {userStats.recentPurchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-200">
                        {purchase.book.coverImage ? (
                          <img
                            src={purchase.book.coverImage}
                            alt={purchase.book.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-gray-300">
                            <Book className="h-6 w-6 text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{purchase.book.title}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(purchase.purchaseDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${purchase.price.toFixed(2)}
                      </p>
                      <p
                        className={`text-sm ${
                          purchase.status === "COMPLETED"
                            ? "text-green-500"
                            : purchase.status === "PENDING"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {purchase.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No recent purchases</p>
                <Button variant="outline" className="mt-2" asChild>
                  <Link to={routes.CATALOG.routes.books.path}>
                    Browse Books
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default UserDashboardOverview;
