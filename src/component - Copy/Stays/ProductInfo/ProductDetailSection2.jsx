import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Paper, Tab, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { WiThermometer } from "react-icons/wi";
import { staysContext } from '../../AppContext/TentsContext';


const ProductDetailSection2 = () => {
    const location = useLocation();
    const {theme} = useContext(staysContext);
    const { val, stayType } = location.state || {};

    const [value, setValue] = React.useState('1');
    const handleChanges = (event, newValue) => {
        setValue(newValue);
    };

        // const embedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(val?.location)}`;
        // const embedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(`${val?.address?.tal}`)}`;

//         const API_KEY = "YOUR_ACTUAL_GOOGLE_MAPS_API_KEY"; // Replace with a valid key
// const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodeURIComponent(` ${val?.address?.dist}`)}`;
const embedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(`${val.address.village}, ${val.address.tal}, ${val.address.dist}`)}`;

    

  return (
    <Box sx={{ mt: 1 }}>
    <Box  >
        <TabContext value={value}>
            <TabList
                onChange={handleChanges}
                textColor= "inherit"
                indicatorColor="primary"
                aria-label="secondary tabs example"
                variant="scrollable"
                scrollButtons="auto "
                allowScrollButtonsMobile

                sx={{
                    
                    width: '100%',
                    display: "flex",
                    flexWrap: { xs: "wrap", sm: "nowrap" }, overflowY: { xs: "auto", sm: "unset" }, maxHeight: { xs: "300px", sm: "none" },

                }}
            >
                <Tab label="About" value="1" />
                <Tab label="Refund" value="2" />
                <Tab label="Cancellation Policy" value="3" />
                <Tab label="Food Dining" value="4" />
                <Tab label="Rooms In Camp" value="5" />
                <Tab label="Property Layout" value="6" />
                <Tab label="Address" value="7" />
                <Tab label="Dynamic Pricing" value="8" />
                <Tab label="Weather" value="9" />
                <Tab label="Other" value="10" />
                <Tab label="Health And Safety" value="11" />

            </TabList>
            <TabPanel value="1">
                <Box>
                    <Typography>{val?.about?.info}</Typography>
                </Box>
            </TabPanel>
            <TabPanel value="2">
                <Box>
                    <Typography>{val?.refundPolicy}</Typography>
                </Box>
            </TabPanel>
            <TabPanel value="3">
                <Box>
                    <Typography>{val?.cancellationPolicy}</Typography>
                </Box>
            </TabPanel>
            <TabPanel value="4">
                <Box>
                    <Typography> {val && val?.foodDining && (
                        <Typography>Meal: {val?.foodDining?.isMealProvided ? "Yes" : "No"}</Typography>
                    )}</Typography>
                    <Typography>
                        <Typography sx={{ fontWeight: "700" }}>Meals Offered:</Typography>
                        {/* {val?.foodDining?.mealsOffered?.map((val,index) => (
                            <Typography key={index}>{val}</Typography>
                        ))} */}


                        {/* {val?.foodDining?.mealsOffered ? (
                            val.foodDining.mealsOffered.map((meal, index) => (
                                <Typography key={index}>{meal}</Typography>
                            ))
                        ) : (
                            <Typography>Loading meals...</Typography>
                        )} */}

                    </Typography>
                    <Typography> {val && val.foodDining && (
                        <Typography>Veg: {val.foodDining.veg ? "Yes" : "No"}</Typography>
                    )}</Typography>
                    <Typography> {val && val.foodDining && (
                        <Typography>Non-Veg: {val.foodDining.nonveg ? "Yes" : "No"}</Typography>
                    )}</Typography>
                    <Typography> {val && val.foodDining && (
                        <Typography>Outside : {val.foodDining.isOutsideFoodAllowed ? "Yes" : "No"}</Typography>
                    )}</Typography>
                </Box>
            </TabPanel>
            <TabPanel value="5">
                <Paper sx={{ p: 2,color: theme==='dark'? 'white':'',bgcolor: theme === 'dark'? '#292A2D' : 'white', }}>
                    {val?.roomsInACamp?.map((val, i) => (
                        <Box key={i}>
                            <Typography variant="h6"><b>Type:</b> {val.type}</Typography>
                            <Typography variant="h6"><b>Beds:</b> {val.beds}</Typography>
                            <Typography variant="h6"><b>Capacity:</b> {val.capacity}</Typography>
                        </Box>
                    ))}

                </Paper>
            </TabPanel>
            <TabPanel value="6">
                <Box sx={{ width: "100%", display: "flex", flexDirection: { xs: "column", sm: "row", lg: "row" }, justifyContent: "space-between", gap: 1 }}>
                    <Paper sx={{ p: 1, width: { xs: "100%", lg: "50%" }, height: { xs: "40vh", sm: "45vh", lg: "100vh" },bgcolor: theme === 'dark'? '#292A2D' : 'white',color: theme==='dark'? 'white':'' }}>
                        {(val?.propertyLayout?.roomOptions || val.propertyLayout.RoomOptions)?.map((val,index) => (
                            <Box key={index} >
                                <Typography sx={{ fontWeight: "700" }}>Room Options</Typography>
                                <Box component='img' src={val.img} sx={{ width: "100%", height: { xs: "20vh", lg: "70vh" }, borderRadius: "5px", objectFit: "cover" }} />
                                <Typography> <b>Quantity:</b>: {val.qty}</Typography>
                                <Typography><b>Name:</b> {val.name}</Typography>
                                <Typography><b>Beds:</b> {val.beds}</Typography>
                                <Typography><b>Extra:</b> {val.extra}</Typography>
                            </Box>
                        ))}
                    </Paper>
                    <Paper sx={{ p: 1, width: { xs: "100%", lg: "50%" }, height: { xs: "40vh", sm: "45vh", lg: "100vh" },bgcolor: theme === 'dark'? '#292A2D' : 'white',color: theme==='dark'? 'white':'' }}>
                        {val.propertyLayout.sharedOptions.map((val) => (
                            <Box key={val.i} >
                                <Typography sx={{ fontWeight: "700" }}>Shared Options</Typography>
                                <Box component='img' src={val.img} sx={{ width: "100%", height: { xs: "20vh", lg: "70vh" }, objectFit: "cover" }} />
                                <Typography> <b>Quantity:</b> {val.qty}</Typography>
                                <Typography><b>Name:</b> {val.name}</Typography>
                                <Typography><b>Beds:</b> {val.beds}</Typography>
                                <Typography><b>Extra:</b> {val.extra}</Typography>

                            </Box>
                        ))}
                    </Paper>
                </Box>
            </TabPanel>
            <TabPanel value="7">
                <Box>
                    <Typography>Landmark: {val.address.landmark} </Typography>
                    <Typography>Village: {val.address.village} </Typography>
                    <Typography>Taluka: {val.address.tal} </Typography>
                    <Typography>District: {val.address.dist} </Typography>
                    <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        src={embedUrl} />
                </Box>
            </TabPanel>
            <TabPanel value='8'>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row", lg: "row" }, gap: 2, justifyContent: "space-between" }}>
                    <Paper sx={{ p: 1, width: "30%",color: theme==='dark'? 'white':'',bgcolor: theme === 'dark'? '#292A2D' : 'white' }}>
                        <Typography sx={{ fontWeight: "700" }}>Weekday</Typography>
                        <Typography>Actual Price: ₹{val.dynamicPricing.weekday.actual}</Typography>
                        <Typography>Discounted Price:  ₹{val.dynamicPricing.weekday.discounted}</Typography>
                    </Paper>
                    <Paper sx={{ p: 1, width: "30%",color: theme==='dark'? 'white':'',bgcolor: theme === 'dark'? '#292A2D' : 'white' }}>
                        <Typography sx={{ fontWeight: "700" }} >Weekend</Typography>
                        <Typography>Actual Price: ₹{val.dynamicPricing.weekend.actual}</Typography>
                        <Typography>Discounted Price:  ₹{val.dynamicPricing.weekend.discounted}</Typography>
                    </Paper>
                    <Paper sx={{ p: 1, width: "30%",color: theme==='dark'? 'white':'',bgcolor: theme === 'dark'? '#292A2D' : 'white' }}>
                        <Typography sx={{ fontWeight: "700" }} >Peak Season</Typography>
                        <Typography> Actual Price:  ₹{val.dynamicPricing.peakSeason.actual}</Typography>
                        <Typography>Discounted Price:  ₹{val.dynamicPricing.peakSeason.discounted}</Typography>
                    </Paper>
                </Box>
            </TabPanel>
            <TabPanel value='9' sx={{ display: "flex", justifyContent: "center" }}>
                <Paper sx={{ width: { xs: "100%", lg: "30%" }, display: "flex", flexDirection: "column", p: 1, alignItems: "center", justifyContent: "center",color: theme==='dark'? 'white':'',bgcolor: theme === 'dark'? '#292A2D' : 'white' }}>
                    <Box >
                        <Typography>Weather</Typography>
                        <Typography sx={{ display: "flex", gap: 1, alignItems: "center " }}><b>Current Temperature: </b> {val.weather.currentTemp}<WiThermometer color="red" /> </Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Typography sx={{ fontWeight: "700" }} >Forecast:</Typography>
                            <Box>
                                {
                                    val.weather.forecast.map((val) => (
                                        <Typography>{val}</Typography>
                                    ))
                                }
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </TabPanel>
            <TabPanel value='10'>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row", lg: "row" }, gap: 2, justifyContent: "space-evenly", }}>
                    <Paper sx={{ p: 1 ,color: theme==='dark'? 'white':'',bgcolor: theme === 'dark'? '#292A2D' : 'white'}}>
                        <Box>
                            <Typography sx={{ fontWeight: "700", textAlign: "center", mb: 2 }}>Transportation</Typography>
                            <Typography> <b>Nearest Airport :</b> {val.transportation.nearestAirport}</Typography>
                            <Typography> <b>Nearest Railway Station :</b> {val.transportation.nearestRailwayStation}</Typography>
                            <Typography>
                                {val && val.transportation && (
                                    <Typography><b>Shuttle Service: </b>{val.transportation.shuttleService ? "Yes" : "No"}</Typography>
                                )}
                            </Typography>
                        </Box>
                    </Paper>
                    <Paper sx={{ p: 1,color: theme==='dark'? 'white':'',bgcolor: theme === 'dark'? '#292A2D' : 'white' }}>
                        <Box>
                            <Typography sx={{ fontWeight: "700", textAlign: "center", mb: 2 }}>Health And Safety</Typography>
                            <Typography> <b>Emergency Contact :</b> {val.healthAndSafety.emergencyContact}</Typography>
                            <Typography> <b>First Aid Available:</b> {val.healthAndSafety.firstAidAvailable}</Typography>
                            <Typography><b>Covid Precautions :</b> {val.healthAndSafety.covidPrecautions}  </Typography>
                        </Box>
                    </Paper>
                    <Paper sx={{ p: 1,color: theme==='dark'? 'white':'',bgcolor: theme === 'dark'? '#292A2D' : 'white' }}>
                        <Box>
                            <Typography sx={{ fontWeight: "700", textAlign: "center", mb: 2 }}>uniqueFeatures</Typography>
                            <Typography> {val.uniqueFeatures.map((val) => (
                                <Typography>• {val}</Typography>
                            ))}</Typography>
                        </Box>
                    </Paper>
                </Box>
            </TabPanel>
            <TabPanel value='11'></TabPanel>
        </TabContext>
    </Box>
</Box>
  )
}

export default ProductDetailSection2