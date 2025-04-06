import {
    Book,
    Folder,
    LayoutDashboard,
    List,
    ShoppingCart,
    Users,
    Library,
    Star,
    Settings,
    BookOpen,
    LineChart,
} from "lucide-react";

export const USER_TYPES = {
    ADMIN: "Admin",
    USER: "User",
};

export const routes = {
    CORE: {
        path: "/", // for router paths
        DASHBOARD: "/dashboard",
        NO_MATCH: "*", // for unmatched routes
        UNDER_CONSTRUCTION: "/dashboard/under-construction",
        routeKey: "home",
        title: "Home",
    },
    AUTH: {
        LOGIN: "/login",
        REGISTER: "/signup",
    },
    DASHBOARD: {
        title: "Dashboard",
        routeKey: "dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
        routes: {
            home: {
                path: "/dashboard/home",
                routeKey: "home",
            },
            overview: {
                path: "/dashboard/overview",
                routeKey: "overview",
            },
        },
        items: [
            {
                title: "Overview",
                url: "/dashboard/overview",
                icon: LineChart,
            },
        ],
    },
    CATALOG: {
        title: "Catalog",
        routeKey: "catalog",
        path: "/dashboard/catalog",
        isActive: true,
        icon: Book,
        routes: {
            books: {
                path: "/dashboard/catalog/books",
                routeKey: "books",
            },
            categories: {
                path: "/dashboard/catalog/categories",
                routeKey: "categories",
            },
            booksByCategory: {
                path: "/dashboard/catalog/categories/:id/books",
                getPath: (id, name) =>
                    `/dashboard/catalog/categories/${id}/books?name=${name}`,
                routeKey: "booksByCategory",
            },
        },
        items: [
            {
                title: "Books",
                url: "/dashboard/catalog/books",
                icon: BookOpen,
            },
            {
                title: "Categories",
                url: "/dashboard/catalog/categories",
                icon: Folder,
            },
        ],
    },
    USER_CONTENT: {
        title: "My Content",
        routeKey: "user-content",
        path: "/dashboard/my-content",
        icon: Library,
        isActive: true,
        routes: {
            library: {
                path: "/dashboard/my-content/library",
                routeKey: "library",
            },
            purchases: {
                path: "/dashboard/my-content/purchases",
                routeKey: "purchases",
            },
            reviews: {
                path: "/dashboard/my-content/reviews",
                routeKey: "reviews",
            },
        },
        items: [
            {
                title: "My Library",
                url: "/dashboard/my-content/library",
                icon: Library,
            },
            {
                title: "My Purchases",
                url: "/dashboard/my-content/purchases",
                icon: ShoppingCart,
            },
            {
                title: "My Reviews",
                url: "/dashboard/my-content/reviews",
                icon: Star,
            },
        ],
    },
    ADMIN: {
        title: "Administration",
        routeKey: "admin",
        path: "/dashboard/admin",
        icon: Settings,
        isActive: true,
        isAdmin: true,
        routes: {
            users: {
                path: "/dashboard/admin/users",
                routeKey: "users",
            },
            books: {
                path: "/dashboard/admin/books",
                routeKey: "books",
            },
            bookDetails: {
                path: "/dashboard/admin/books/:id",
                getPath: (id) => `/dashboard/admin/books/${id}`,
                routeKey: "bookDetails",
            },
            createBook: {
                path: "/dashboard/admin/books/create",
                routeKey: "createBook",
            },
            categories: {
                path: "/dashboard/admin/categories",
                routeKey: "categories",
            },
            booksByCategory: {
                path: "/dashboard/admin/categories/:id/books",
                getPath: (id) => `/dashboard/admin/categories/${id}/books`,
                routeKey: "booksByCategory",
            },
            purchases: {
                path: "/dashboard/admin/purchases",
                routeKey: "purchases",
            },
            stats: {
                path: "/dashboard/admin/stats",
                routeKey: "stats",
            },
        },
        items: [
            {
                title: "Users",
                url: "/dashboard/admin/users",
                icon: Users,
            },
            {
                title: "Books Management",
                url: "/dashboard/admin/books",
                icon: Book,
            },
            {
                title: "Categories",
                url: "/dashboard/admin/categories",
                icon: Folder,
            },
            {
                title: "Purchases",
                url: "/dashboard/admin/purchases",
                icon: ShoppingCart,
            },
            {
                title: "Statistics",
                url: "/dashboard/admin/stats",
                icon: LineChart,
            },
        ],
    },
};

export const getAdminNavigation = (isAdmin = false) => {
    const navigation = [routes.DASHBOARD, routes.ADMIN];

    return navigation;
};

export const getUserNavigation = (isAdmin = false) => {
    const navigation = [routes.USER_CONTENT, routes.CATALOG];

    return navigation;
};

export const environmentVariables = {
    BASE_DEV_API_URL: import.meta.env.VITE_DEV_API_URL,
    BASE_PROD_API_URL: import.meta.env.VITE_PROD_API_URL,
    ENV: import.meta.env.VITE_ENV,
};

export const apiRoutes = {
    AUTH: {
        LOGIN: "/auth/system/login",
        REGISTER: "/auth/system/register",
    },
    BOOKS: {
        BASE: (page, limit, search, type, category, sort) =>
            `/books?page=${page}&limit=${limit}&search=${search}&type=${type}&category=${category}&sort=${sort}`,
        CREATE: "/books",
        GET_BY_ID: (id) => `/books/${id}`,
        UPDATE: (id) => `/books/${id}`,
        DELETE: (id) => `/books/${id}`,
        UPDATE_COVER: (id) => `/books/${id}/cover-image`,
        UPDATE_FILE: (id) => `/books/${id}/file-path`,
    },
    CATEGORIES: {
        BASE: "/categories",
        GET_BY_ID: (id) => `/categories/${id}`,
        GET_BOOKS: (id) => `/categories/${id}/books`,
        UPDATE: (id) => `/categories/${id}`,
        DELETE: (id) => `/categories/${id}`,
    },
    REVIEWS: {
        BASE: "/reviews",
        GET_BY_ID: (id) => `/reviews/${id}`,
        GET_BOOK_REVIEWS: (bookId) => `/reviews/book/${bookId}`,
        UPDATE: (id) => `/reviews/${id}`,
        DELETE: (id) => `/reviews/${id}`,
    },
    LIBRARY: {
        BASE: "/library",
        REMOVE_BOOK: (bookId) => `/library/${bookId}`,
    },
    PURCHASES: {
        BASE: "/purchases",
        GET_BY_ID: (id) => `/purchases/${id}`,
        UPDATE_STATUS: (id) => `/purchases/${id}/status`,
    },
    ADMIN: {
        USERS: (page, limit, search) =>
            `/admin/users?page=${page}&limit=${limit}&search=${search}`,
        BOOKS: (page, limit, search, type) =>
            `/admin/books?page=${page}&limit=${limit}&search=${search}&type=${type}`,
        PURCHASES: "/admin/purchases",
        STATS: "/admin/stats",
    },
    FINANCIAL: {
        OVERVIEW: "/financial/overview",
        TRENDS: (startDate, endDate) =>
            `/financial/trends?startDate=${startDate}&endDate=${endDate}`,
    },
};

const QUERY_KEYS = Object.freeze({
    BOOKS: {
        ALL: "books",
        DETAIL: (id) => ["book", id],
        BY_CATEGORY: (categoryId) => ["books", "category", categoryId],
        SEARCH: (query) => ["books", "search", query],
    },
    CATEGORIES: {
        ALL: "categories",
        DETAIL: (id) => ["category", id],
        BOOKS: (id) => ["category", id, "books"],
    },
    REVIEWS: {
        ALL: "reviews",
        DETAIL: (id) => ["review", id],
        BOOK_REVIEWS: (bookId) => ["reviews", "book", bookId],
    },
    LIBRARY: {
        USER_BOOKS: "user-library",
        BOOK_STATUS: (bookId) => ["library", "status", bookId],
    },
    PURCHASES: {
        USER_PURCHASES: "user-purchases",
        DETAIL: (id) => ["purchase", id],
        STATUS: (id) => ["purchase", id, "status"],
    },
    ADMIN: {
        STATS: "admin-stats",
        USERS: "admin-users",
        ALL_PURCHASES: "admin-purchases",
    },
    USER: {
        PROFILE: "user-profile",
        PREFERENCES: "user-preferences",
    },
    FINANCIAL: {
        OVERVIEW: "financial-overview",
        TRENDS: (startDate, endDate) => [
            "financial-trends",
            startDate,
            endDate,
        ],
    },
});

export { QUERY_KEYS };

export const highlightCardsData = [
    {
        title: "Total Users",
        valueKey: "users",
        Icon: Users,
        subText: "Total number of users",
    },
    {
        title: "Total Books",
        valueKey: "books",
        Icon: Book,
        subText: "Total number of books",
    },
    {
        title: "Total Purchases",
        valueKey: "purchases",
        Icon: ShoppingCart,
        subText: "Total number of purchases",
    },
    {
        title: "Total Categories",
        valueKey: "categories",
        Icon: Folder,
        subText: "Total number of categories",
    },
];

export const ORDER_STATUS = {
    PENDING: "PENDING",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
};
