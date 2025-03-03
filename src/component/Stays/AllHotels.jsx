import { BookmarkBorderOutlined } from '@mui/icons-material'
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import { Box, Pagination, Paper, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { staysContext } from '../AppContext/TentsContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import { BiLeaf } from 'react-icons/bi';
import { BsFire } from 'react-icons/bs';
import yoga from '../../assets/HomePage/yoga.png'
import { useNavigate } from 'react-router-dom';


const AllHotels = () => {
    let { allHotels, filteredHotels } = useContext(staysContext);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [stayType, setStayType] = useState("hotels");
    const [page, setPage] = useState(1);
    const navigate = useNavigate()

    const HotelsPerPage = 8;

    const handleChange = ((event, value) => {
        setPage(value)
    })

    const indexOfLastHotels = page * HotelsPerPage;
    const indexOfFirstHotels = indexOfLastHotels - HotelsPerPage;
    const currentHotels = filteredHotels.slice(indexOfFirstHotels, indexOfLastHotels);


    useEffect(() => {
        if (currentHotels.length === 0 || !currentHotels[0]?.about?.images) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % currentHotels[0].about.images.length
            );
        }, 3000);
        return () => clearInterval(interval);
    }, [currentHotels]);


    // const dataSource = currentTents.length ? currentTents : currentHotels.length ? currentHotels : currentHomeStays;
    // useEffect(() => {
    //     if (dataSource.length === 0 || !dataSource[0]?.about?.images) return;
    //     const interval = setInterval(() => {
    //         setCurrentImageIndex((prevIndex) =>
    //             (prevIndex + 1) % dataSource[0].about.images.length
    //         );
    //     }, 3000);

    //     return () => clearInterval(interval);
    // }, [currentTents, currentHotels, currentHomeStays]); // Add dependencies

    return (
        <Box>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
                    gap: 2,

                }}
            >
                {currentHotels.length === 0 ? (
                            <Typography className="text-xl text-gray-500 font-semibold col-span-full">No plants found. Please try a different category or filter.</Typography>

                ):
                (currentHotels.map((val, i) => (
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
                        }}
                        data-aos="fade-up"
                        data-aos-duration="1000"

                    >
                        <Box sx={{ width: "100%", height: { xs: "200px", sm: "250px", md: "300px" }, borderRadius: "20px", objectFit: "cover", position: "relative", }}>
                            <Box
                                component="img"
                                onClick={() => navigate("/productDetails", { state: { val,stayType } })}
                                src={val.about.images[currentImageIndex]} // Display current image based on the index
                                sx={{ width: "100%", height: { xs: "200px", sm: "250px", md: "300px" }, borderRadius: "10px", objectFit: "cover", position: "absolute", }}
                            />
                            <Typography variant="body2" color="black" sx={{ position: "absolute", backgroundColor: "transparent", borderRadius: "10px", width: "100%", display: "flex", justifyContent: "space-between", p:1 }}>
                                <Box sx={{ display: "flex" }} class="hidden md:flex">
                                    <Box sx={{ width: "30px", height: "30px", backgroundColor: "white", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", mr: 1, mb: 1 }}>
                                        <Box component='img' src={yoga} sx={{ width: "20px", objectFit: "fill" }} />
                                    </Box>
                                    <Typography sx={{ width: "30px", height: "30px", backgroundColor: "white", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", mr: 1, mb: 1 }}>
                                        <BsFire color="orange" />
                                    </Typography>
                                </Box>
                                <span className="bg-white p-1 rounded-lg font-bold h-8">
                                    <StarIcon sx={{ color: "orange" }} /> {val.ratings.location} | {val.weather.currentTemp}
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
                            <Typography variant="body1" sx={{ fontWeight: "bold", color: "black" }}>
                                {val.campName}
                            </Typography>

                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <Typography sx={{ width: "30px", height: "30px", border: "1px solid black", backgroundColor: "lightgrey", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", mr: 1, mb: 1 }}>
                                    <BedOutlinedIcon fontSize="small" sx={{ color: "#293E67" }} />
                                </Typography>
                                <Typography sx={{ width: "30px", height: "30px", border: "1px solid black", backgroundColor: "lightgrey", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", mr: 1, mb: 1 }}>
                                    <BiLeaf color='#5B7830' />
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant="body1" sx={{ mt: 0, paddingLeft: "10px", fontWeight: "bold" }}>
                            ₹{val.prices.afterDiscount} <s style={{ color: "gray", marginLeft: "5px" }}>₹{val.prices.actual}</s>
                        </Typography>
                    </Paper>
                )))}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Pagination
                    count={Math.ceil(filteredHotels.length / HotelsPerPage)}
                    page={page}
                    onChange={handleChange}
                    color="primary"
                />
            </Box>
        </Box>
    )
}

export default AllHotels