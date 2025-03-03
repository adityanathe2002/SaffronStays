import { Box, Container, Paper, Typography } from "@mui/material";
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import React, { useState, useEffect, useContext } from "react";
import { staysContext } from "../AppContext/TentsContext";
import StarIcon from '@mui/icons-material/Star';
import { BiLeaf } from "react-icons/bi";
import { useNavigate } from "react-router-dom";


const HomeSection4 = () => {
    const { allApartments} = useContext(staysContext);
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
    return (
        <Container sx={{ width: "100%", marginTop: "40px" }}>
            <Typography
            data-aos="zoom-up"
            data-aos-duration="2000"  
            variant="h5" sx={{ mb: 2, marginBottom: "20px",borderBottom: "2px solid grey", width: "20%",  borderImage: 'linear-gradient(to right, black, white) 10' }}>
                New Destinations
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr ", md: "1fr 1fr 1fr", lg:"1fr 1fr 1fr 1fr " },
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
                            transition: "transform 0.3s ease-in-out",
                            "&:hover": { transform: "scale(1.05)" },
                        }}
                        // data-aos="flip-left"
                        // data-aos-easing="ease-out-cubic"
                        // data-aos-duration="2000"
                        data-aos="fade-up"
                        data-aos-duration="2000"
                    >
                        <Box sx={{ width: "100%", height:{ xs:"200px",md:"300px"}, borderRadius: "10px", objectFit: "cover", position: "relative", }}>
                            <Box
                                component="img"
                                onClick={()=> navigate("/productDetails",{state:{val,stayType}})}
                                src={val.about.images?.[currentImageIndex] || "fallback-image.jpg"} // Display current image based on the index
                                sx={{ width: "100%", height:{ xs:"200px",md:"300px"}, borderRadius: "20px", objectFit: "cover", position: "absolute", cursor:"pointer"}}
                            />
                            <Typography variant="body2" color="black" sx={{ position: "absolute", backgroundColor: "transparent", borderRadius: "10px", width: "100%", display: "flex", justifyContent: "end", paddingTop: "4px", paddingRight: "4px" }}>
                                <span className="bg-white p-1 rounded-lg font-bold">
                                    {val.weather.currentTemp} |  <StarIcon sx={{color:"orange"}}/>{val.ratings.location}
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
                                <Typography sx={{ width: "30px", height: "30px", border: "1px solid black", backgroundColor: "lightgrey", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", mr: 1, mb: 1 }}>
                                    <BedOutlinedIcon fontSize="small" sx={{ color: "#293E67" }} />
                                </Typography>
                                <Typography sx={{ width: "30px", height: "30px", border: "1px solid black", backgroundColor: "lightgrey", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", mr: 1, mb: 1 }}>
                                    <BiLeaf color='#5B7830' />
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: "semibold", color: "black", mt: 1, paddingLeft: "10px" }}>
                            ₹{val.prices.afterDiscount} <s style={{ color: "gray", marginLeft: "5px" }}>₹{val.prices.actual}</s>
                        </Typography>

                    </Paper>
                ))}
            </Box>
        </Container>
    );
};

export default HomeSection4;
