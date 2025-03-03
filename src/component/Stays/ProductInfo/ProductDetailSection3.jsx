import { Box, Container, Paper, Typography } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router-dom';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import WifiIcon from "@mui/icons-material/Wifi";
import SpaIcon from "@mui/icons-material/Spa";
import { CiApple } from 'react-icons/ci';
import { BiSolidDrink } from 'react-icons/bi';
import { GiCampfire } from 'react-icons/gi';
import { MdLocalParking } from 'react-icons/md';


const ProductDetailSection3 = () => {
    const location = useLocation();
    const { val, stayType } = location.state || {};
    const freeServices = val?.freeServices || [];

    // Define a mapping of free services to icons
    const serviceIcons = {
        "Free Breakfast": <CiApple />,
        "Free WiFi": <WifiIcon />,
        "Complimentary Drinks": <BiSolidDrink />,
        "Spa Access": <SpaIcon />,
        "Campfire Experience": <GiCampfire />,
        "Free Parking": <MdLocalParking />,
        // "Trekking"  ,
        // "Bonfire",
        // "Wildlife Safari",
        // "Swimming Pool",
        // "Caretaker",
        // "Game Room"
    };

  return (
    <Container sx={{ mt: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: "700", mb: 2, borderBottom: "2px solid grey", width: "18%", borderImage: 'linear-gradient(to right, black, white) 5' }}>Dining Options</Typography>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row", lg: "row" }, gap: 5 }}>
                    <Paper sx={{ width: { xs: "90%", sm: "50%", lg: "25%" }, height: "15vh", display: "flex", alignItems: "center", p: 1, gap: 2, borderRadius: "5px" }}>
                        <FastfoodIcon sx={{ width: "30%", height: "70%", backgroundColor: "#5B7830", color: "white", p: 0.2, borderRadius: "5px" }} />
                        <Box>
                            <Typography component='p' sx={{ fontWeight: "600" }}>Meals</Typography>
                            {val && val.foodDining && val.foodDining.length > 0 && (
                                <Typography>{val.foodDining[0].isMealProvided ? "Yes" : "No"}</Typography>
                            )}
                        </Box>
                    </Paper>
                    <Paper sx={{ width: { xs: "90%", sm: "50%", lg: "25%" }, height: "15vh", display: "flex", alignItems: "center", p: 1, gap: 2, borderRadius: "5px" }}>
                        <FastfoodIcon sx={{ width: "30%", height: "70%", backgroundColor: "#5B7830", color: "white", p: 0.2, borderRadius: "5px" }} />
                        <Box>
                            <Typography component='p' sx={{ fontWeight: "600" }}>Veg / Non-veg</Typography>
                            {val && val.foodDining && val.foodDining.length > 0 && (
                                <Typography>{val.foodDining[0].isMealProvided ? "Yes" : "No"}</Typography>
                            )}
                        </Box>
                    </Paper>
                    <Paper sx={{ width: { xs: "90%", sm: "50%", lg: "25%" }, height: "15vh", display: "flex", alignItems: "center", p: 1, gap: 2, borderRadius: "5px" }}>
                        <FastfoodIcon sx={{ width: "30%", height: "70%", backgroundColor: "#5B7830", color: "white", p: 0.2, borderRadius: "5px" }} />
                        <Box>
                            <Typography component='p' sx={{ fontWeight: "600" }}>Outside Food Allowed</Typography>
                            {val?.foodDining?.length > 0 && (
                                <Typography>{val.foodDining[0].isOutsideFoodAllowed ? "Yes" : "No"}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Box>
                <Box sx={{mt:2}}>
                    <Typography  variant="h5" sx={{ fontWeight: "700", mb: 2, borderBottom: "2px solid grey", width: "18%", borderImage: 'linear-gradient(to right, black, white) 5'}}>Amenities</Typography>
                    <Box></Box>
                </Box>
            </Container>
  )
}

export default ProductDetailSection3