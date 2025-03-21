import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, IconButton, Rating, Stack } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { staysContext } from '../AppContext/TentsContext';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import toast from 'react-hot-toast';
import FavoriteIcon from '@mui/icons-material/Favorite';

const BookmarkPage = () => {
    const { addBookmark, setAddBookmark, isLoggedIn, theme } = useContext(staysContext);
    const navigate = useNavigate();
    const [stayType, setStayType] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/bookmark")
            .then((resp) => {
                setAddBookmark(resp.data);
                if (resp.data.length > 0) {
                    setStayType(resp.data[0].stayType || "");
                }
            })
            .catch((error) => console.log(error));
    }, []);

    // Function to remove a bookmarked camp
    const handleRemoveBookmark = (valId) => {
        axios.delete(`http://localhost:5000/bookmark/${valId}`)
            .then(() => {
                setAddBookmark(prev => prev.filter(val => val.id !== valId));
                toast.success("Removed from bookmarks!");
            })
            .catch(error => console.log(error));
    };

    // Function to add camp to cart and remove from bookmark
    const handleAddToCart = async (val) => {
        try {
            // Fetch the current cart data from the API
            const cartResponse = await axios.get('http://localhost:5000/cart');
            const cartItems = cartResponse.data;

            // Check if the stay already exists in the cart
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
                    stayType: stayType,
                    quantity: 1,
                });

                if (addResponse.status === 200 || addResponse.status === 201) {
                    toast.success(`${val.campName} added to cart successfully!`);
                    // Remove from bookmarks after adding to cart
                    handleRemoveBookmark(val.id);
                } else {
                    toast.error(`Failed to add ${val.campName} to cart.`);
                }
            }
        } catch (error) {
            console.error('Error managing cart:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            {isLoggedIn ? (
                <>
                    <Typography variant="h4" sx={{ marginBottom: 2, textAlign: 'center', fontWeight: 'bold' }}>
                        Your Bookmarked Camps
                    </Typography>
                    <Grid container spacing={3}>
                        {addBookmark.length > 0 ? (
                            addBookmark.map((val, i) => (
                                <Grid item xs={12} sm={6} md={4} key={i}>
                                    <Card sx={{ width: "100%", height: "70vh", boxShadow: 3, borderRadius: 2, position: "relative", bgcolor: theme === 'dark' ? "#292A2D" : "", color: theme === 'dark' ? "white" : "" }}>
                                        <CardMedia
                                            component="img"
                                            onClick={() => navigate("/productDetails", { state: { val, stayType } })}
                                            src={val?.about?.images[0]}
                                            sx={{ width: "100%", height: "60%", cursor: "pointer", objectFit: "cover", position: "relative" }}
                                            alt={val?.campName}
                                        />
                                        <Box sx={{ position: "absolute", pl: 2, pr: 2, pt: 0.5, pb: 0.5, borderRadius: "20px", bgcolor: "white", top: 10, right: 10, display: "flex", gap: 1 }}>
                                            <FavoriteIcon sx={{ color: "#FF4D5F" }} />
                                            <Typography sx={{ fontWeight: 600, color: "black" }}>Saved</Typography>
                                        </Box>
                                        <CardContent>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: "serif" }}>
                                                {val?.campName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ display: "flex", gap: 1, alignItems: "center", color: "#2368A2", mt: 1 }}>
                                                <LocationOnIcon sx={{ fontSize: "15px" }} /> {val?.address?.tal}, {val?.address?.dist}
                                            </Typography>

                                            {/* Price Section with Proper Structure */}
                                            <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 1 }}>
                                                <Typography sx={{ fontWeight: "600", color: "green" }}>
                                                    ₹{val?.prices?.afterDiscount}
                                                </Typography>
                                                <Typography sx={{ textDecoration: 'line-through', color: 'gray' }}>
                                                    ₹{val?.prices?.actual}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: "flex", gap: 2, alignItems: "center", justifyContent: "space-between" }}>
                                                <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                                                    <Typography sx={{ fontSize: "15px" }}>Rating: {val?.ratings?.location}</Typography>
                                                    <Stack spacing={1}>
                                                        <Rating name="half-rating" defaultValue={val?.ratings?.location} precision={0.5} sx={{ fontSize: "15px" }} />
                                                    </Stack>
                                                </Box>
                                                <Box sx={{ display: 'flex', gap: 1, justifyContent: '' }}>
                                                    <IconButton
                                                        sx={{ color: theme === 'dark' ? "white" : "black" }}
                                                        onClick={() => handleAddToCart(val)}
                                                    >
                                                        <ShoppingBagIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleRemoveBookmark(val.id)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            <Typography variant="body1" sx={{ textAlign: 'center', width: '100%', height: "80vh", mt: 2 }}>
                                No bookmarks yet. Start exploring and save your favorite camps!
                            </Typography>
                        )}
                    </Grid>
                </>
            ) : (
                <Box sx={{ width: "100%", height: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
                    <Typography variant="h6" color="text.secondary">
                        Please log in to view your Bookmark details.
                    </Typography>
                    <Link to="/login">
                        <Button variant="contained">Login</Button>
                    </Link>
                </Box>
            )}
        </Box>
    );
};

export default BookmarkPage;