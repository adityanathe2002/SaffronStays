import { Box, Container, IconButton, Paper, Typography } from "@mui/material";
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import React, { useState, useEffect, useContext } from "react";
import { staysContext } from "../AppContext/TentsContext";
import StarIcon from '@mui/icons-material/Star';
import { BiLeaf } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BookmarkBorderOutlined } from "@mui/icons-material";


const HomeSection4 = () => {
    const { allApartments, theme, addBookmark, setAddBookmark } = useContext(staysContext);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [stayType, setStayType] = useState("apartments")
    const navigate = useNavigate()
    const HotelData = allApartments.slice(0, 8);



    // Automatic image change every 3 seconds
    useEffect(() => {
        if (HotelData.length > 0) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HotelData[0].about.images.length);
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [HotelData]);

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
                    updatedBookmark.push(stayType);
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
        <Container sx={{ width: "100%", marginTop: "40px" }}>
            <Typography
                data-aos="zoom-up"
                data-aos-duration="2000"
                variant="h5" sx={{ mb: 2, marginBottom: "20px", borderBottom: "2px solid grey", width: "20%", borderImage: 'linear-gradient(to right, black, white) 10' }}>
                New Destinations
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr ", md: "1fr 1fr 1fr", lg: "1fr 1fr 1fr 1fr " },
                    gap: 2,
                }}
            >
                {HotelData.map((val, i) => (
                    <Paper
                        key={i}
                        sx={{
                            p: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "",
                            textAlign: "",
                            bgcolor: theme === 'dark' ? '#292A2D' : 'white', color: theme === 'dark' ? 'white' : '',
                            transition: "transform 0.3s ease-in-out",
                            "&:hover": { transform: "scale(1.05)" },
                        }}
                        // data-aos="flip-left"
                        // data-aos-easing="ease-out-cubic"
                        // data-aos-duration="2000"
                        data-aos="fade-up"
                        data-aos-duration="2000"
                    >
                        <Box sx={{ width: "100%", height: { xs: "200px", md: "300px" }, borderRadius: "10px", objectFit: "cover", position: "relative", }}>
                            <Box
                                component="img"
                                onClick={() => navigate("/productDetails", { state: { val, stayType } })}
                                src={val.about.images?.[currentImageIndex] || "fallback-image.jpg"} // Display current image based on the index
                                sx={{ width: "100%", height: { xs: "200px", md: "300px" }, borderRadius: "20px", objectFit: "cover", position: "absolute", cursor: "pointer" }}
                            />
                            <Typography variant="body2" color="black" sx={{ position: "absolute", backgroundColor: "transparent", borderRadius: "10px", width: "100%", display: "flex", justifyContent: "end", paddingTop: "4px", paddingRight: "4px" }}>
                                <span className="bg-white p-1 rounded-lg font-bold">
                                    {val.weather.currentTemp} |  <StarIcon sx={{ color: "orange" }} />{val.ratings.location}
                                </span>
                            </Typography>

                            {/* Render dots for the images */}
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",  // Center the dots horizontally
                                gap: "5px",
                                position: "absolute",
                                bottom: "10px",  // Position at the bottom of the image

                            }}>
                                {val.about.images.map((_, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: "3px",
                                            height: "3px",
                                            borderRadius: "50%",
                                            backgroundColor: currentImageIndex === index ? "orange" : "gray",
                                            cursor: "pointer",
                                            transition: "background-color 0.3s ease",
                                        }}
                                        onClick={() => setCurrentImageIndex(index)} // Update image on dot click
                                    />
                                ))}
                            </Box>
                        </Box>

                        <Typography variant="body1" sx={{ mt: 1, paddingLeft: "10px" }}>
                            {val.address.tal}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="body1" sx={{ mt: 0, paddingLeft: "10px", fontWeight: "bold" }}>
                                {val.campName}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <IconButton
                                    onClick={() => toggleBookmark(val)}
                                    sx={{ width: "30px", height: "30px", backgroundColor: "lightgrey", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", mr: 1, mb: 1 }}>
                                    <BookmarkBorderOutlined fontSize="small" sx={{ color: "black", }} />
                                </IconButton>
                            </Box>
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: "semibold", color: theme === 'dark' ? 'white' : 'black', mt: 1, paddingLeft: "10px" }}>
                            ₹{val.prices.afterDiscount} <s style={{ color: "gray", marginLeft: "5px" }}>₹{val.prices.actual}</s>
                        </Typography>

                    </Paper>
                ))}
            </Box>
        </Container>
    );
};

export default HomeSection4;
