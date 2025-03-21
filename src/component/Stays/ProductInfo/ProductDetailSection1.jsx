import { Box, Button, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { CiApple } from "react-icons/ci";
import WifiIcon from "@mui/icons-material/Wifi";
import { BiSolidDrink } from "react-icons/bi";
import SpaIcon from "@mui/icons-material/Spa";
import { GiCampfire } from "react-icons/gi";
import { MdLocalParking } from "react-icons/md";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { staysContext } from '../../AppContext/TentsContext';
import axios from 'axios';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import toast from 'react-hot-toast';


const ProductDetailSection1 = () => {
    const location = useLocation();
    const { val, stayType } = location.state || {};
    const { addBookmark, setAddBookmark, addCart, setAddCart, theme } = useContext(staysContext);
    const [selectedImage, setSelectedImage] = useState(val?.about?.images[0] || "");
    const freeServices = val?.freeServices || [];

    // Define a mapping of free services to icons
    const serviceIcons = {
        "Free Breakfast": <CiApple />,
        "Free WiFi": <WifiIcon />,
        "Complimentary Drinks": <BiSolidDrink />,
        "Spa Access": <SpaIcon />,
        "Campfire Experience": <GiCampfire />,
        "Free Parking": <MdLocalParking />
    };

    const handleAddToCart = async (val) => {
        try {
            // Fetch the current cart data from the API
            const cartResponse = await axios.get('http://localhost:5000/cart');
            const cartItems = cartResponse.data;

            // Corrected check: Find if a stay with the same stayType and id exists
            const existingStay = cartItems.find(data => data.stayType === stayType && data.id === val.id);

            if (existingStay) {
                // Stay already in cart
                toast.error(`${val.campName} is already in the cart!`);
            } else {
                // Add stay to cart
                const addResponse = await axios.post('http://localhost:5000/cart', {
                    id: val.id,
                    campName: val.campName,
                    type: val.type,
                    freeServices: val.freeServices,
                    refundPolicy: val.refundPolicy,
                    prices: val.prices,
                    roomsInACamp: val.roomsInACamp,
                    about: val.about,
                    address: val.address,
                    amenities: val.amenities,
                    propertyLayout: val.propertyLayout,
                    foodDining: val.foodDining,
                    date: val.data,
                    ratings: val.ratings,
                    reviews: val.reviews,
                    info: val.info,
                    activities: val.activities,
                    cancellationPolicy: val.cancellationPolicy,
                    specialPackages: val.specialPackages,
                    activitiesDetails: val.activitiesDetails,
                    dynamicPricing: val.dynamicPricing,
                    localAttractions: val.localAttractions,
                    weather: val.weather,
                    transportation: val.transportation,
                    healthAndSafety: val.healthAndSafety,
                    uniqueFeatures: val.uniqueFeatures,
                    stayType: stayType, // Fixed variable usage
                    quantity: 1,
                });

                // Show success or error messages
                if (addResponse.status === 200 || addResponse.status === 201) {
                    toast.success(`${val.campName} added to cart successfully!`);
                } else {
                    toast.error(`Failed to add ${val.campName} to cart.`);
                }
            }
        } catch (error) {
            console.error('Error managing cart:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };

    const toggleBookmark = async (val) => {
        try {
            let updatedBookmark = [...addBookmark];
            // const isBookmark = addBookmark.includes(val.stayType); // Check if already bookmarked
            const isBookmark = addBookmark.some(bookmark => bookmark.id === val.id && bookmark.stayType === stayType);

            if (isBookmark) {
                // Remove from bookmark
                const response = await axios.delete(`http://localhost:5000/bookmark/${val.id && val.stayType}`);
                if (response.status === 200) {
                    updatedBookmark = updatedBookmark.filter((item) => item !== val.stayType); // Correct removal
                    setAddBookmark(updatedBookmark);
                } else {
                    toast.error("Failed to remove from bookmark. Please try again.");
                }
            } else {
                // Fetch existing bookmarks from backend
                const { data: existingBookmark } = await axios.get("http://localhost:5000/bookmark");

                // Check if the exact stayType & id already exist in the backend
                if (existingBookmark.find((item) => item.stayType === stayType && item.id === val.id)) {
                    toast.error("This Stay is already in your Bookmark!");
                    return;
                }

                // Add to bookmark
                const response = await axios.post('http://localhost:5000/bookmark', {
                    id: val.id,
                    campName: val.campName,
                    type: val.type,
                    freeServices: val.freeServices,
                    refundPolicy: val.refundPolicy,
                    prices: val.prices,
                    roomsInACamp: val.roomsInACamp,
                    about: val.about,
                    address: val.address,
                    amenities: val.amenities,
                    propertyLayout: val.propertyLayout,
                    foodDining: val.foodDining,
                    date: val.data,
                    ratings: val.ratings,
                    reviews: val.reviews,
                    info: val.info,
                    activities: val.activities,
                    cancellationPolicy: val.cancellationPolicy,
                    specialPackages: val.specialPackages,
                    activitiesDetails: val.activitiesDetails,
                    dynamicPricing: val.dynamicPricing,
                    localAttractions: val.localAttractions,
                    weather: val.weather,
                    transportation: val.transportation,
                    healthAndSafety: val.healthAndSafety,
                    uniqueFeatures: val.uniqueFeatures,
                    stayType: stayType,
                    quantity: 1,
                });

                if (response.status === 200 || response.status === 201) {
                    updatedBookmark.push(val.stayType);
                    setAddBookmark(updatedBookmark);
                } else {
                    toast.error("Failed to add to Bookmark. Please try again.");
                }
            }
        } catch (error) {
            console.error('Error updating Bookmark:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };



    // Fetch bookmarked stays on component mount
    useEffect(() => {
        const fetchBookmark = async () => {
            try {
                const response = await axios.get('http://localhost:5000/bookmark');
                if (response.status === 200) {
                    setAddBookmark(response.data.map(item => item.stayType));
                }
            } catch (error) {
                console.error('Error fetching bookmark:', error);
            }
        };

        fetchBookmark();
    }, []);



    return (
        <Box
            sx={{
                width: "100%",
                height: { xs: "auto", lg: "90vh" },
                display: { sx: "none", md: "none", lg: "flex" },
                flexDirection: { sm: "none", md: "none", lg: "row" },
                gap: 2,
                mt: { lg: 0 },
                mb: 2,
            }}
        >
            {/* Main Image Section (Left Side) */}
            <Box
                sx={{
                    width: { sx: "100%", lg: "40%" },
                    height: { xs: "40vh", lg: "100%" },
                    borderRadius: "8px",
                    overflow: "hidden",
                    display: "flex",
                    mb: { xs: 1 },
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box
                    component="img"
                    src={selectedImage}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </Box>
            {/* Thumbnails & Product Details (Right Side) */}
            <Box sx={{ width: { lg: "15%" }, height: "100%", display: "flex", flexDirection: { xs: "row", lg: "column" }, gap: "1rem" }}>
                {/* Thumbnail Images */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "row", lg: "column" },
                        gap: "0.7rem",
                        alignItems: "center",
                    }}
                >
                    {val?.about?.images?.map((image, id) => (
                        <Box
                            key={id}
                            onMouseEnter={() => setSelectedImage(image)}
                            sx={{
                                width: "100%",
                                height: "6rem",
                                borderRadius: "0.375rem",
                                overflow: "hidden",
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                "&:hover": { borderColor: "#3B82F6" }, // Hover effect
                            }}
                        >
                            <Box
                                component="img"
                                src={image}
                                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
            {/* Product Details Section */}
            <Box sx={{ width: { lg: "50%" }, paddingLeft: { lg: 2 }, paddingTop: { xs: 2, lg: 0 }, borderRadius: "8px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6" sx={{ fontWeight: "600" }}>{val?.campName}</Typography>
                    <Typography variant="h6">
                        Rating <StarOutlineIcon sx={{ color: "orange" }} /> {val?.ratings?.location}
                    </Typography>
                </Box>
                {/* Free Services Section */}
                <Box sx={{ marginTop: "0.5rem", display: "flex", gap: 1 }}>
                    {freeServices.length > 0 ? (
                        freeServices.map((service, index) => (
                            <Typography key={index} sx={{ width: "30px", height: "30px", border: "1px solid gray", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", gap: "0.5rem", color: "#5B7830", flexDirection: "column" }}>
                                {serviceIcons[service] || null}
                            </Typography>

                        ))
                    ) : (
                        <Typography>No Free Services Available</Typography>
                    )}
                    <Typography sx={{ color: "#5B7830", border: "1px solid gray", borderRadius: "30px", pl: 2, pr: 2, textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}> Free Services</Typography>
                </Box>
                {/* Price  */}
                <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                    <Typography variant="h6">Price</Typography>
                    <Typography variant="h6">₹{val?.prices?.afterDiscount} </Typography>
                    <Typography variant="h6" sx={{ textDecoration: "line-through", color: "gray" }}> ₹{val?.prices?.actual} </Typography>
                </Box>
                {/* Address */}
                <Box sx={{ pt: 3, pb: 3, pl: 1, width: "100%", height: "auto", bgcolor: theme === 'dark' ? '#292A2D' : 'white', color: theme === "dark" ? "white" : "black", borderRadius: "10px", mt: 3, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Box sx={{ display: "flex", gap: 2, p: 1 }}>
                        <Typography sx={{ fontWeight: "700", color: theme === "dark" ? "white" : "black", }}>Address:</Typography>
                        <Typography sx={{ color: theme === 'dark' ? "white" : "#5B7830" }}> {val?.address?.tal}-{val?.address?.dist} </Typography>
                        <Typography sx={{ color: theme === 'dark' ? "white" : "#5B7830" }}> <LocationOnIcon /> </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1, p: 1 }}>
                        <Typography sx={{ fontWeight: "700", color: theme === "dark" ? "white" : "black", }}>Activities:</Typography>
                        <Typography sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {val?.activitiesDetails?.map((val, i) => (
                                <Typography key={i} sx={{ color: theme === 'dark' ? "white" : "#5B7830", }}> {val?.name}</Typography>
                            ))}
                        </Typography>
                    </Box>
                    <Box sx={{ width: "100%", height: "auto", display: "flex", gap: 0.5, p: 1 }}>
                        <Typography sx={{ fontWeight: "700", width: "150px", color: theme === "dark" ? "white" : "black", }}>Local Attractions:</Typography>
                        <Typography sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {val?.localAttractions?.map((val, i) => (
                                <Typography key={i} sx={{ color: theme === 'dark' ? "white" : "#5B7830", }}> {val?.name}</Typography>
                            ))}
                        </Typography>
                    </Box>
                </Box>
                {/* Special Packages */}
                <Box sx={{ mt: 3 }}>
                    <Typography sx={{ fontWeight: "700", mb: 1 }}>Special Packages</Typography>
                    <Box sx={{ display: "flex", gap: 2, color: "black" }}>
                        {val?.specialPackages?.map((val, i) => (
                            <Box key={i} sx={{ bgcolor: theme === 'dark' ? '#292A2D' : 'white', color: theme === "dark" ? "white" : "balck", width: { xs: "33%", lg: "32%" }, height: "12vh", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: { xs: "center", lg: "center" }, justifyContent: "center", p: 2 }}>
                                <Typography sx={{ textAlign: "center" }}> {val.name} </Typography>
                                <Typography sx={{ fontWeight: "700" }}> ₹ {val.price} </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
                {/* Buttons */}
                <Box sx={{ mt: 4, display: "flex", width: "100%", alignItems: "center", justifyContent: "center", gap: { xs: 2, lg: 2 } }}>
                    <Button
                        variant="contained"
                        onClick={() => handleAddToCart(val)}
                        sx={{ width: "50%", height: "8vh", backgroundColor: theme === "dark" ? "white" : "black", color: theme === "dark" ? "black" : "white", display: "flex", gap: { xs: 0, lg: 2 } }} >
                        <ShoppingBagIcon sx={{ color: theme === "dark" ? "black" : "white", }} />
                        Book Now
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => toggleBookmark(val)}
                        sx={{ width: "50%", height: "8vh", backgroundColor: theme === "dark" ? "white" : "black", color: theme === "dark" ? "black" : "white", display: "flex", gap: 2 }}
                    >
                        <BookmarkIcon
                            className={`${addBookmark.includes(val?.stayType) ? "color-white" : "text-gray-400"} transition-colors duration-200`}
                        /> bookmark</Button>
                </Box>

            </Box>
        </Box>
    )
}

export default ProductDetailSection1