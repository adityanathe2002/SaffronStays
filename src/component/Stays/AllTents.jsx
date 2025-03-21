import { Box, IconButton, Pagination, Paper, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { staysContext } from '../AppContext/TentsContext';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import { BookmarkBorderOutlined } from '@mui/icons-material';
import axios from 'axios';
import toast from 'react-hot-toast';

const AllTents = () => {
    let { allTents, filteredStays, theme, setAddBookmark, addBookmark } = useContext(staysContext);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [stayType, setStayType] = useState("tent");
    const [page, setPage] = useState(1);
    const TentsPerPage = 8;
    const navigate = useNavigate();

    const indexOfLastTents = page * TentsPerPage;
    const indexOfFirstTents = indexOfLastTents - TentsPerPage;
    const currentTents = filteredStays.slice(indexOfFirstTents, indexOfLastTents);

    const handleChange = ((event, value) => {
        setPage(value)
    })

    useEffect(() => {
        if (currentTents.length === 0 || !currentTents[0]?.about?.images) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % currentTents[0].about.images.length
            );
        }, 3000);
        return () => clearInterval(interval);
    }, [currentTents]);

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
        <Box>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
                    gap: 2,

                }}
            >
                {currentTents.length === 0 ? (
                    <Typography className="col-span-full text-gray-500 text-xl font-semibold">No Product found. Please try a different category or filter.</Typography>

                ) :
                    (currentTents.map((val, i) => (
                        <Paper
                            key={i}
                            sx={{
                                pb: 1,
                                display: "flex",
                                flexDirection: "column",
                                mb: 5,
                                alignItems: "",
                                textAlign: "",
                                transition: "transform 0.3s ease-in-out",
                                "&:hover": { transform: "scale(1.05)" },
                                color: theme === "dark" ? "white" : "black", bgcolor: theme === 'dark' ? '#292A2D' : 'white',

                            }}
                        // data-aos="fade-up"
                        // data-aos-duration="800"
                        >
                            <Box sx={{ width: "100%", height: { xs: "200px", sm: "250px", md: "300px" }, borderRadius: "20px", objectFit: "cover", position: "relative", }}>
                                <Box
                                    component="img"
                                    onClick={() => navigate("/productDetails", { state: { val, stayType } })}
                                    src={val.about.images[currentImageIndex]} // Display current image based on the index
                                    sx={{ width: "100%", height: { xs: "200px", sm: "250px", md: "300px" }, borderRadius: "10px", objectFit: "cover", position: "absolute", }}
                                />
                                <Typography variant="body2" color="black" sx={{ position: "absolute", backgroundColor: "transparent", borderRadius: "10px", width: "100%", display: "flex", justifyContent: "end", p: 1 }}>
                                    <span className="bg-white h-7 p-1 rounded-lg font-bold" >
                                        <StarIcon sx={{ color: "orange", fontSize: "20px" }} />{val.ratings.location} | {val.weather.currentTemp}
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

                            <Typography variant="body1" sx={{ mt: 1, paddingLeft: "10px", color: "#858585" }}>
                                {val.address.tal}
                            </Typography>

                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: "10px" }}>
                                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
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
                            <Typography variant="body1" sx={{ mt: 0, paddingLeft: "10px", fontWeight: "bold", pb: 1 }}>
                                ₹{val.prices.afterDiscount} <s style={{ color: "gray", marginLeft: "5px" }}>₹{val.prices.actual}</s>
                            </Typography>
                        </Paper>
                    )))}
            </Box>
            <Box
                data-aos="zoom-up"
                data-aos-duration="1000"
                sx={{ display: "flex", justifyContent: "center", color: "white", bgcolor: "white" }}>
                <Pagination
                    count={Math.ceil(filteredStays.length / TentsPerPage)}
                    page={page}
                    onChange={handleChange}
                    color="primary"
                />
            </Box>
        </Box>
    )
}
export default AllTents