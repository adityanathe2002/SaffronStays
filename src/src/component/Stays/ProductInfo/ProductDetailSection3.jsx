import { Box, Container, Paper, Typography } from '@mui/material';
import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import WifiIcon from "@mui/icons-material/Wifi";
import SpaIcon from "@mui/icons-material/Spa";
import { CiApple } from 'react-icons/ci';
import { BiSolidDrink } from 'react-icons/bi';
import { GiCampfire } from 'react-icons/gi';
import { MdLocalParking } from 'react-icons/md';
import PoolIcon from "@mui/icons-material/Pool";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ParkIcon from "@mui/icons-material/Park";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
// import SpaIcon from "@mui/icons-material/Spa";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import GrassIcon from "@mui/icons-material/Grass";
import HikingIcon from "@mui/icons-material/Hiking";
import SafariIcon from "@mui/icons-material/EmojiNature";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import { staysContext } from '../../AppContext/TentsContext';

const ProductDetailSection3 = () => {
    const location = useLocation();
    const {theme} = useContext(staysContext)

    const { val, stayType } = location.state || {};
    const freeServices = val?.freeServices || [];
    const amenities = val?.amenities || [];


    // Define a mapping of free services to icons
    const serviceIcons = {
        "Free Breakfast": <CiApple />,
        "Free WiFi": <WifiIcon />,
        "Complimentary Drinks": <BiSolidDrink />,
        "Spa Access": <SpaIcon />,
        "Campfire Experience": <GiCampfire />,
        "Free Parking": <MdLocalParking />,

    };

    const amenitiesIcons = {
        "Swimming Pool": <PoolIcon />,
        "Bonfire": <LocalFireDepartmentIcon />,
        "Caretaker": <EmojiPeopleIcon />,
        "Game Room": <SportsEsportsIcon />,
        "Garden": <ParkIcon />,
        "Restaurant": <RestaurantIcon />,
        "Barbeque": <OutdoorGrillIcon />,
        "Spa": <SpaIcon />,
        "Gym": <FitnessCenterIcon />,
        "Lawn": <GrassIcon />,
        "Trekking": <HikingIcon />,
        "Wildlife Safari": <SafariIcon />,
        "Yoga Sessions": <SelfImprovementIcon />,
    }
    return (
        <Container sx={{ mt: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "700", mb: 2, borderBottom: "2px solid grey", width: "18%", borderImage: 'linear-gradient(to right, black, white) 5' }}>Dining Options</Typography>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row", lg: "row" }, gap: 5 }}>
                <Paper sx={{ width: { xs: "90%", sm: "50%", lg: "25%" }, height: "15vh", display: "flex", alignItems: "center", p: 1, gap: 2, borderRadius: "5px", bgcolor: theme === 'dark'? '#292A2D' : 'white', color: theme==='dark'? 'white':'' }}>
                    <FastfoodIcon sx={{ width: "30%", height: "70%", backgroundColor: "#5B7830", color: "white", p: 0.2, borderRadius: "5px" }} />
                    <Box>
                        <Typography component='p' sx={{ fontWeight: "600" }}>Meals</Typography>
                        {val && val.foodDining && val.foodDining.length > 0 && (
                            <Typography>{val.foodDining[0].isMealProvided ? "Yes" : "No"}</Typography>
                        )}
                    </Box>
                </Paper>
                <Paper sx={{ width: { xs: "90%", sm: "50%", lg: "25%" }, height: "15vh", display: "flex", alignItems: "center", p: 1, gap: 2, borderRadius: "5px", bgcolor: theme === 'dark'? '#292A2D' : 'white',color: theme==='dark'? 'white':'' }}>
                    <FastfoodIcon sx={{ width: "30%", height: "70%", backgroundColor: "#5B7830", color: "white", p: 0.2, borderRadius: "5px" }} />
                    <Box>
                        <Typography component='p' sx={{ fontWeight: "600" }}>Veg / Non-veg</Typography>
                        {val && val.foodDining && val.foodDining.length > 0 && (
                            <Typography>{val.foodDining[0].isMealProvided ? "Yes" : "No"}</Typography>
                        )}
                    </Box>
                </Paper>
                <Paper sx={{ width: { xs: "90%", sm: "50%", lg: "25%" }, height: "15vh", display: "flex", alignItems: "center", p: 1, gap: 2, borderRadius: "5px", bgcolor: theme === 'dark'? '#292A2D' : 'white',color: theme==='dark'? 'white':'' }}>
                    <FastfoodIcon sx={{ width: "30%", height: "70%", backgroundColor: "#5B7830", color: "white", p: 0.2, borderRadius: "5px" }} />
                    <Box>
                        <Typography component='p' sx={{ fontWeight: "600" }}>Outside Food Allowed</Typography>
                        {val?.foodDining?.length > 0 && (
                            <Typography>{val.foodDining[0].isOutsideFoodAllowed ? "Yes" : "No"}</Typography>
                        )}
                    </Box>
                </Paper>
            </Box>
            {/* Amenities */}
            <Box sx={{ mt: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: "700", mb: 2, borderBottom: "2px solid grey", width: "15%", borderImage: 'linear-gradient(to right, black, white) 5' }}>Amenities</Typography>
                <Box sx={{ marginTop: "0.5rem", display: "flex", height:"100px" ,flexDirection: "column", gap: 0.5, flexWrap: "wrap" }}>
                    {amenities.length > 0 ? (
                        amenities.map((amenity, index) => (
                            <Box
                                key={index}
                                sx={{
                                    width: "170px",
                                    height: "30px",
                                    display: "flex",
                                    alignItems: "start",
                                    justifyContent: "start",
                                    flexDirection: "row",
                                    fontSize: "1.2rem",
                                    color: theme === 'dark'?  " white": "#858585",
                                    gap: "1rem",
                                    textAlign: "center",
                                    p: 1,
                                }}
                            >
                                {amenitiesIcons[amenity] || null}
                                <Typography variant="body2" sx={{ fontSize: "1rem", color:theme=== 'dark' ? "white": "#464646" }}>
                                    {amenity}
                                </Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography>No Amenities Available</Typography>
                    )}
                </Box>

            </Box>
           
        </Container>
    )
}

export default ProductDetailSection3