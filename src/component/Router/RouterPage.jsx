// import React from 'react'
// import { createBrowserRouter } from 'react-router-dom'
// import SaffranStays from '../SaffranStays'
// import Demo from '../Demo'
// import AllStays from '../Stays/AllStays'
// import SignUp from '../Pages/SignUp'
// import SignIn from '../Pages/SignIn'
// import Admin from '../Admin/Admin'
// import PageNotFound from '../Pages/PageNotFound'
// import About from '../Pages/About'
// import ContactUs from '../Pages/ContactUs'
// import ProductDetails from '../Stays/ProductInfo/ProductDetails'
// import BookmarkPage from '../CartAndBookmark/BookmarkPage'
// import CartPage from '../CartAndBookmark/CartPage'
// import UserProfile from '../Pages/UserProfile'
// import CheckoutPage from '../CartAndBookmark/CheckOutPage'
// import ConfirmPage from '../CartAndBookmark/ConfirmPage'
// import BookingHistroy from '../CartAndBookmark/BookingHistroy'

// export let routingPage = createBrowserRouter([
//     {
//         path:"/",
//         element: <SaffranStays/>,
//         children: [
//             {
//                 path:"demo",
//                 element: <Demo/>
//             },
//             {
//                 path:"stays",
//                 element: <AllStays/>
//             },
//             {
//                 path:"bookmark",
//                 element: <BookmarkPage/>
//             },
//             {
//                 path:"cart",
//                 element: <CartPage/>
//             },
//             {
//                 path:"checkoutpage",
//                 element: <CheckoutPage/>
//             },
//             {
//                 path:"productDetails",
//                 element: <ProductDetails/>
//             },
//             {
//                 path:"aboutus",
//                 element: <About/>
//             },
//             {
//                 path:"contactus",
//                 element: <ContactUs/>
//             },,
//             {
//                 path:"userprofile",
//                 element: <UserProfile/>
//             },
//             {
//                 path:"confirmpage",
//                 element: <ConfirmPage/>
//             },
//             {
//                 path:"bookinghistroy",
//                 element: <BookingHistroy/>
//             }
//         ]
//     },
//     {
//         path:"/register",
//         element: <SignUp/>
//     },
//     {
//         path:"/login",
//         element: <SignIn/>
//     },
//     {
//         path:"/admin-dash",
//         element: <Admin/>
//     },
//     {
//         path:"*",
//         element: <PageNotFound/>
//     }
// ])

// import React, { lazy, Suspense } from 'react';
// import { createBrowserRouter } from 'react-router-dom';


// const SaffranStays = lazy(() => import('../SaffranStays'));
// const Demo = lazy(() => import('../Demo'));
// const AllStays = lazy(() => import('../Stays/AllStays'));
// const SignUp = lazy(() => import('../Pages/SignUp'));
// const SignIn = lazy(() => import('../Pages/SignIn'));
// const Admin = lazy(() => import('../Admin/Admin'));
// const PageNotFound = lazy(() => import('../Pages/PageNotFound'));
// const About = lazy(() => import('../Pages/About'));
// const ContactUs = lazy(() => import('../Pages/ContactUs'));
// const ProductDetails = lazy(() => import('../Stays/ProductInfo/ProductDetails'));
// const BookmarkPage = lazy(() => import('../CartAndBookmark/BookmarkPage'));
// const CartPage = lazy(() => import('../CartAndBookmark/CartPage'));
// const UserProfile = lazy(() => import('../Pages/UserProfile'));
// const CheckoutPage = lazy(() => import('../CartAndBookmark/CheckOutPage'));
// const ConfirmPage = lazy(() => import('../CartAndBookmark/ConfirmPage'));
// const BookingHistroy = lazy(() => import('../CartAndBookmark/BookingHistroy'));

// const Loading = () => <div>Loading...</div>;

// export let routingPage = createBrowserRouter([
//     {
//         path: "/",
//         element: (
//             <Suspense fallback={<Loading />}>
//                 <SaffranStays />
//             </Suspense>
//         ),
//         children: [
//             {
//                 path: "demo",
//                 element: (
//                     <Suspense fallback={<Loading />}>
//                         <Demo />
//                     </Suspense>
//                 )
//             },
//             {
//                 path: "stays",
//                 element: (
//                     <Suspense fallback={<Loading />}>
//                         <AllStays />
//                     </Suspense>
//                 )
//             },
//             {
//                 path: "bookmark",
//                 element: (
//                     <Suspense fallback={<Loading />}>
//                         <BookmarkPage />
//                     </Suspense>
//                 )
//             },
//             {
//                 path: "cart",
//                 element: (
//                     <Suspense fallback={<Loading />}>
//                         <CartPage />
//                     </Suspense>
//                 )
//             },
//             {
//                 path: "checkoutpage",
//                 element: (
//                     <Suspense fallback={<Loading />}>
//                         <CheckoutPage />
//                     </Suspense>
//                 )
//             },
//             {
//                 path: "productDetails",
//                 element: (
//                     <Suspense fallback={<Loading />}>
//                         <ProductDetails />
//                     </Suspense>
//                 )
//             },
//             {
//                 path: "aboutus",
//                 element: (
//                     <Suspense fallback={<Loading />}>
//                         <About />
//                     </Suspense>
//                 )
//             },
//             {
//                 path: "contactus",
//                 element: (
//                     <Suspense fallback={<Loading />}>
//                         <ContactUs />
//                     </Suspense>
//                 )
//             },
//             {
//                 path: "userprofile",
//                 element: (
//                     <Suspense fallback={<Loading />}>
//                         <UserProfile />
//                     </Suspense>
//                 )
//             },
//             {
//                 path: "confirmpage",
//                 element: (
//                     <Suspense fallback={<Loading />}>
//                         <ConfirmPage />
//                     </Suspense>
//                 )
//             },
//             {
//                 path: "bookinghistroy",
//                 element: (
//                     <Suspense fallback={<Loading />}>
//                         <BookingHistroy />
//                     </Suspense>
//                 )
//             }
//         ]
//     },
//     {
//         path: "/register",
//         element: (
//             <Suspense fallback={<Loading />}>
//                 <SignUp />
//             </Suspense>
//         )
//     },
//     {
//         path: "/login",
//         element: (
//             <Suspense fallback={<Loading />}>
//                 <SignIn />
//             </Suspense>
//         )
//     },
//     {
//         path: "/admin-dash",
//         element: (
//             <Suspense fallback={<Loading />}>
//                 <Admin />
//             </Suspense>
//         )
//     },
//     {
//         path: "*",
//         element: (
//             <Suspense fallback={<Loading />}>
//                 <PageNotFound />
//             </Suspense>
//         )
//     }
// ]);




import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LoadingBar from '../LoadingBar';


// Lazy loading components
const SaffranStays = lazy(() => import('../SaffranStays'));
const Demo = lazy(() => import('../Demo'));
const AllStays = lazy(() => import('../Stays/AllStays'));
const SignUp = lazy(() => import('../Pages/SignUp'));
const SignIn = lazy(() => import('../Pages/SignIn'));
const Admin = lazy(() => import('../Admin/Admin'));
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
            { path: "demo", element: <Demo /> },
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
    { path: "/admin-dash", element: <Admin /> },
    {
        path: "*",
        element: (
            <Suspense fallback={<LoadingBar />}>
                <PageNotFound />
            </Suspense>
        )
    }
]);







