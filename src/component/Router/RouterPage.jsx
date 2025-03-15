import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LoadingBar from '../LoadingBar';
import AdminPage from '../Admin/AdminPage';

// Lazy loading components
const SaffranStays = lazy(() => import('../SaffranStays'));
const AllStays = lazy(() => import('../Stays/AllStays'));
const SignUp = lazy(() => import('../Pages/SignUp'));
const SignIn = lazy(() => import('../Pages/SignIn'));
const PageNotFound = lazy(() => import('../Pages/PageNotFound'));
const About = lazy(() => import('../Pages/About'));
const ContactUs = lazy(() => import('../Pages/ContactUs'));
const ProductDetails = lazy(() => import('../Stays/ProductInfo/ProductDetails'));
const BookmarkPage = lazy(() => import('../CartAndBookmark/BookmarkPage'));
const CartPage = lazy(() => import('../CartAndBookmark/CartPage'));
const UserProfile = lazy(() => import('../Pages/UserProfile'));
const CheckoutPage = lazy(() => import('../CartAndBookmark/CheckOutPage'));
const ConfirmPage = lazy(() => import('../CartAndBookmark/ConfirmPage'));
const BookingHistroy = lazy(() => import('../CartAndBookmark/BookingHistroy'));

export let routingPage = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={<LoadingBar />}>
                <SaffranStays />
            </Suspense>
        ),
        children: [
            { path: "stays", element: <AllStays /> },
            { path: "bookmark", element: <BookmarkPage /> },
            { path: "cart", element: <CartPage /> },
            { path: "checkoutpage", element: <CheckoutPage /> },
            { path: "productDetails", element: <ProductDetails /> },
            { path: "aboutus", element: <About /> },
            { path: "contactus", element: <ContactUs /> },
            { path: "userprofile", element: <UserProfile /> },
            { path: "confirmpage", element: <ConfirmPage /> },
            { path: "bookinghistroy", element: <BookingHistroy /> }
        ]
    },
    { path: "/register", element: <SignUp /> },
    { path: "/login", element: <SignIn /> },
    { path: "/admin-dash2", element: <AdminPage /> },
    {
        path: "*",
        element: (
            <Suspense fallback={<LoadingBar />}>
                <PageNotFound />
            </Suspense>
        )
    }
]);







