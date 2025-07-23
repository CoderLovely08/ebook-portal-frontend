# BookVerse Frontend

A modern, responsive frontend application for the BookVerse eBook platform. Built with React, Vite, and Tailwind CSS, featuring a comprehensive admin dashboard and user interface for browsing, purchasing, and managing digital books.

## Backend Repository

The backend repository is available at [BookVerse Backend](https://github.com/CoderLovely08/ebook-portal-backend).

## Project Overview

BookVerse Frontend provides a complete user experience for the digital eBook platform with distinct interfaces for different user roles:

### 1. User Interface

- **Landing Page**: Marketing homepage with featured books and categories
- **Book Catalog**: Browse and search through available eBooks with filtering
- **Book Details**: Comprehensive book information with reviews and purchase options
- **User Dashboard**: Personal library management and purchase history
- **Authentication**: Secure login and registration system

### 2. Admin Dashboard

- **Book Management**: Complete CRUD operations for book catalog
- **Category Management**: Organize books into categories
- **User Management**: Oversee user accounts and permissions
- **Purchase Management**: Track and manage all purchase orders
- **Analytics Dashboard**: Comprehensive statistics and insights

### 3. Responsive Design

- **Mobile-First**: Optimized for all device sizes
- **Dark/Light Theme**: Modern UI with theme switching capabilities
- **Accessibility**: WCAG compliant with proper ARIA attributes
- **Performance**: Optimized loading and caching strategies

## 💻 Tech Stack:

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![React Query](https://img.shields.io/badge/reactquery-ffffff?style=for-the-badge&logo=reactquery&logoColor=#FF4154) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

### Frontend Stack

- **React 18.3.1**: Modern React with hooks and concurrent features
- **Vite**: Next-generation frontend build tool for fast development
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Shadcn/ui**: High-quality, accessible component library
- **Redux Toolkit**: Predictable state container for JavaScript apps
- **React Query**: Powerful data synchronization for React applications
- **React Router DOM**: Declarative routing for React applications
- **React Hook Form**: Performant, flexible forms with easy validation
- **Zod**: TypeScript-first schema validation with static type inference
- **Axios**: Promise-based HTTP client for API requests
- **Recharts**: Composable charting library for React applications

### UI/UX Libraries

- **Radix UI**: Low-level UI primitives for building design systems
- **Lucide React**: Beautiful & consistent icon pack
- **Class Variance Authority**: For building type-safe component APIs
- **Tailwind Merge**: Utility function to merge Tailwind CSS classes
- **Tailwind Animate**: Animation utilities for Tailwind CSS

## Project Structure

### Frontend Structure

```
frontend/
├── public/                           # Static assets
│   ├── vite.svg                    # Vite logo
│   └── ...                         # Other static files
├── src/
│   ├── api/                        # API layer and HTTP requests
│   │   ├── common.api.js           # Generic CRUD operations
│   │   ├── admin.api.js            # Admin-specific API calls
│   │   ├── auth.api.js             # Authentication API calls
│   │   ├── book.api.js             # Book-related API calls
│   │   ├── category.api.js         # Category API calls
│   │   ├── purchase.api.js         # Purchase API calls
│   │   ├── review.api.js           # Review API calls
│   │   └── user.api.js             # User API calls
│   ├── components/                 # Reusable UI components
│   │   ├── ui/                     # Shadcn/ui components (25 components)
│   │   │   ├── button.jsx          # Button component
│   │   │   ├── input.jsx           # Input component
│   │   │   ├── dialog.jsx          # Dialog/Modal component
│   │   │   ├── table.jsx           # Table component
│   │   │   ├── form.jsx            # Form components
│   │   │   └── ...                 # More UI components
│   │   ├── custom/                 # Custom application components
│   │   │   ├── forms/              # Custom form components
│   │   │   │   └── ReviewForm.jsx
│   │   │   ├── ui/                 # Custom UI components
│   │   │   │   ├── HighlightCard.jsx
│   │   │   │   ├── PdfDocViewer.jsx
│   │   │   │   └── ReviewModal.jsx
│   │   │   └── utils/              # Utility components
│   │   │       ├── ProtectedRoute.jsx
│   │   │       ├── GenericTable.jsx
│   │   │       ├── LoadingSpinner.jsx
│   │   │       ├── Container.jsx
│   │   │       ├── GoBackButton.jsx
│   │   │       └── CustomTooltip.jsx
│   │   └── navigation/             # Navigation components
│   │       ├── nav-main.jsx        # Main navigation
│   │       ├── nav-user.jsx        # User navigation
│   │       └── nav-projects.jsx
│   ├── core/                       # Core utilities and configurations
│   │   └── axios.js                # Axios instance with interceptors
│   ├── hooks/                      # Custom React hooks
│   │   ├── common/                 # Generic hooks
│   │   │   ├── useFetch.jsx        # Data fetching hook
│   │   │   ├── useCustomMutation.jsx       # Mutation hook
│   │   │   └── useDebounce.jsx       # Debounce hook
│   │   ├── admin/                  # Admin-specific hooks
│   │   │   ├── useBook.jsx         # Book management hooks
│   │   │   └── usePurchaseAction.jsx
│   │   ├── auth/                   # Authentication hooks
│   │   │   ├── useLogin.jsx        # Login hook
│   │   │   └── useRegister.jsx       # Registration hook
│   │   └── user/                   # User-specific hooks
│   │       ├── usePurchase.jsx       # Purchase hooks
│   │       └── useReview.jsx       # Review hooks
│   ├── layout/                     # Layout components
│   │   └── DashboardLayout.jsx       # Main dashboard layout
│   ├── lib/                        # Utility libraries
│   │   └── utils.js                # Common utility functions
│   ├── pages/                      # Page components
│   │   ├── Admin/                  # Admin pages
│   │   │   ├── Books/              # Book management pages
│   │   │   ├── Categories/         # Category management pages
│   │   │   ├── Purchases/          # Purchase management pages
│   │   │   ├── Stats/              # Statistics and analytics
│   │   │   └── Users/              # User management pages
│   │   ├── Auth/                   # Authentication pages
│   │   │   ├── Login.jsx           # Login page
│   │   │   └── Register.jsx        # Registration page
│   │   ├── Catalog/                # Book catalog pages
│   │   │   ├── BookDetails.jsx       # Individual book details
│   │   │   └── CatalogPage.jsx       # Book listing page
│   │   ├── Dashboard/              # Dashboard pages
│   │   │   ├── AdminDashboard.jsx      # Admin dashboard
│   │   │   └── UserDashboard.jsx       # User dashboard
│   │   ├── Landing/                # Landing page
│   │   │   └── LandingPage.jsx
│   │   └── Components/             # Shared page components
│   │       ├── AddDialog.jsx       # Generic add dialog
│   │       └── GenericTableComp.jsx
│   ├── routes/                     # Routing configuration
│   │   └── route.jsx               # Main router setup with protected routes
│   ├── schemas/                    # Validation schemas
│   │   └── validation.schemas.js       # Zod validation schemas
│   ├── store/                      # Redux state management
│   │   ├── slices/                 # Redux slices
│   │   │   └── authSlice.js        # Authentication state
│   │   └── store.js                # Redux store configuration
│   ├── utils/                      # Utility functions and constants
│   │   └── app.constants.js        # Application constants
│   ├── App.jsx                     # Main App component
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Global styles and Tailwind imports
├── components.json                 # Shadcn/ui configuration
├── eslint.config.js                # ESLint configuration
├── jsconfig.json                   # JavaScript project configuration
├── package.json                    # Dependencies and scripts
├── postcss.config.js               # PostCSS configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── vercel.json                     # Vercel deployment configuration
└── vite.config.js                  # Vite build tool configuration
```

## Core Features

### User Experience

- **Responsive Design**: Mobile-first approach with seamless cross-device experience
- **Book Discovery**: Advanced search, filtering, and category-based browsing
- **User Authentication**: Secure login/registration with JWT tokens
- **Personal Library**: Manage purchased books and reading progress
- **Book Reviews**: Rating and review system for community engagement
- **Purchase System**: Secure book purchasing with order tracking

### Admin Management

- **Dashboard Analytics**: Comprehensive statistics and data visualization
- **Content Management**: Full CRUD operations for books and categories
- **User Oversight**: User account management and role administration
- **Order Management**: Purchase order tracking and status updates
- **Review Moderation**: Content moderation tools for user reviews

### Technical Features

- **State Management**: Redux Toolkit for global state with React Query for server state
- **Form Handling**: React Hook Form with Zod validation for type-safe forms
- **API Integration**: Axios-based HTTP client with request/response interceptors
- **Route Protection**: Role-based access control for admin and user routes
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Performance Optimization**: Code splitting, lazy loading, and caching strategies

## Component Library

### UI Components (Shadcn/ui)

- **Form Elements**: Button, Input, Textarea, Select, Checkbox, Radio
- **Layout**: Card, Separator, Sheet, Tabs, Accordion
- **Navigation**: Command, Dropdown Menu, Popover, Tooltip
- **Feedback**: Alert, Toast, Dialog, Progress, Skeleton
- **Data Display**: Table, Avatar, Badge, Calendar
- **Advanced**: Collapsible, Select with search, Date picker

### Custom Components

- **HighlightCard**: Featured content display cards
- **PdfDocViewer**: PDF document viewer for eBooks
- **ReviewModal**: Interactive review submission modal
- **GenericTable**: Reusable data table with sorting and pagination
- **ProtectedRoute**: Route wrapper for authentication and authorization
- **LoadingSpinner**: Consistent loading indicators across the app

## API Integration

### Endpoint Categories

```javascript
// Authentication
POST /auth/system/login
POST /auth/system/register

// Books
GET /books
GET /books/:id
POST /books (Admin)
PUT /books/:id (Admin)
DELETE /books/:id (Admin)

// Categories
GET /categories
POST /categories (Admin)
PUT /categories/:id (Admin)
DELETE /categories/:id (Admin)

// User Library
GET /library
POST /library
DELETE /library/:bookId

// Purchases
GET /purchases
POST /purchases
PUT /purchases/:id/status (Admin)

// Reviews
GET /reviews/book/:bookId
POST /reviews
PUT /reviews/:id
DELETE /reviews/:id

// Admin
GET /admin/users
GET /admin/purchases
GET /admin/stats
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- BookVerse Backend API running

### Installation

1. Clone the repository

```bash
git clone https://github.com/CoderLovely08/ebook-portal-frontend.git
cd ebook-portal-frontend
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env
# Configure your API endpoint and other environment variables
```

4. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Environment Variables

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_APP_NAME=BookVerse
VITE_APP_VERSION=1.0.0
```

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint for code quality

## Routing Structure

```javascript
// Public Routes
/ → Landing Page
/login → User Login
/register → User Registration
/catalog → Book Catalog
/catalog/:id → Book Details

// Protected User Routes
/dashboard → User Dashboard
/library → Personal Library
/purchases → Purchase History

// Protected Admin Routes
/admin → Admin Dashboard
/admin/books → Book Management
/admin/categories → Category Management
/admin/users → User Management
/admin/purchases → Purchase Management
/admin/stats → Analytics Dashboard
```

### React Query Usage

- Server state caching and synchronization
- Automatic background refetching
- Optimistic updates for mutations
- Error handling and retry logic

## Performance Optimizations

- **Code Splitting**: Route-based code splitting with React.lazy()
- **Image Optimization**: Lazy loading and responsive images
- **Bundle Optimization**: Tree shaking and dead code elimination
- **Caching Strategy**: React Query caching with stale-while-revalidate
- **Virtual Scrolling**: For large book catalogs and data tables

## Security Features

- **Protected Routes**: Authentication-based route protection
- **Role-Based Access**: Admin and user role differentiation
- **Input Validation**: Client-side validation with Zod schemas
- **XSS Protection**: Sanitized user inputs and outputs
- **CSRF Protection**: Token-based request authentication

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Author

Made with ❤️ by Lovely Sharma
