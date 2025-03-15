import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Drawer, Button, Typography, TextField, InputAdornment } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import HeroImg from '../../assets/Hero/toursHero1.jpg';
import { staysContext } from '../AppContext/TentsContext';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AllHotels from './AllHotels';
import AllTents from './AllTents';
import AllHomestays from './AllHomestays';
import Search from './Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from "@mui/icons-material/Search";
import AllCamps from './AllCamps';
import AllVillas from './AllVillas';
import AllFarmHouses from './AllFarmHouses';
import AllTreeHouses from './AllTreeHouses';
import AllApartments from './AllApartments';
import AllCottages from './AllCottages';
import SocialMedia from '../Footer/SocialMedia'


const AllStays = () => {
    const { setSearch ,theme} = useContext(staysContext);
    const [value, setValue] = React.useState('1');
    const handleChanges = (event, newValue) => {
        setValue(newValue);
    };

     useEffect(()=>{
            window.scrollTo({ top: 0, behavior: "smooth" })
        },[])

    return (
        <Box >
            {/* Image as Background */}
            <Box component="div" className="w-full h-96 sm:h-screen rounded-sm relative mt-0">
                {/* Background Image */}
                <Box component="img" src={HeroImg} className="w-full h-96 sm:h-full object-cover rounded-md absolute top-0 left-0" />

                {/* Text Content */}
                <Box
                    data-aos="fade-up"
                    // data-aos-duration="2000"
                    className="w-full h-full absolute flex flex-col items-center justify-center text-center px-4">
                    <Typography variant="h6" sx={{ fontSize: "15px" }} className="text-sm sm:text-lg text-white"> Home / Category </Typography>
                    <Typography variant="h3" sx={{ fontSize: { xs: "20px", sm: "50px", md: "50px" } }} className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white"> Discover the Unknown </Typography>
                    <Typography variant="h3" sx={{ fontSize: { xs: "20px", sm: "50px", md: "50px" } }} className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white"> in every Adventure </Typography>
                </Box>

                {/* Search Box at Bottom */}


                <Box
                    data-aos="fade-up"
                    // data-aos-duration="1000"
                    className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-11/12 sm:w-1/2 rounded-xl px-2 ">
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Search for location, villa, facilities"
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-white  rounded-xl "
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon style={{ color: "gray" }} />
                                </InputAdornment>
                            ),
                            style: { borderRadius: "8px" }
                        }}
                    />
                </Box>

            </Box>


            <Box sx={{ mt: 3, }}>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value} >
                        <Box
                            // data-aos="zoom-up"
                            // data-aos-duration="2000"
                            sx={{ width: '100%', display: "flex", justifyContent: { xs: "none", sm: "space-between" }, flexWrap: "wrap", p: 1 }}>
                            <TabList onChange={handleChanges}
                                textColor="primary"
                                indicatorColor="parimary"
                                aria-label="secondary tabs example"
                                variant="scrollable"
                                scrollButtons="auto "
                                allowScrollButtonsMobile

                                sx={{
                                    color: theme === "dark" ? "white" : "black" ,
                                    width: '100%',
                                    display: "flex",
                                    flexWrap: { xs: "wrap", sm: "nowrap" }, overflowY: { xs: "auto", sm: "unset" }, maxHeight: { xs: "300px", sm: "none" },

                                }}
                            >
                                <Tab label="Tents" value="1" sx={{ color: theme === "dark" ? "white" : "black" }}  />
                                <Tab label="Homestays" value="2"  sx={{ color: theme === "dark" ? "white" : "black" }}  />
                                <Tab label="Hotels" value="3"  sx={{ color: theme === "dark" ? "white" : "black" }}  />
                                <Tab label="Cottages" value="4"   sx={{ color: theme === "dark" ? "white" : "black" }} />
                                <Tab label="Farmhouses" value="5"   sx={{ color: theme === "dark" ? "white" : "black" }} />
                                <Tab label="Treehouses" value="6"  sx={{ color: theme === "dark" ? "white" : "black" }}  />
                                <Tab label="Villas" value="7"  sx={{ color: theme === "dark" ? "white" : "black" }}  />
                                <Tab label="Camps" value="8"   sx={{ color: theme === "dark" ? "white" : "black" }} />
                                <Tab label="Apartments" value="9"   sx={{ color: theme === "dark" ? "white" : "black" }} />
                            </TabList>
                            <Box sx={{ display: { xs: "none", sm: "flex" }, marginRight: "5%", }}>
                                {/* <Box sx={{ color: "lightslategray", paddingLeft: "20px", paddingRight: "20px", display: "flex", alignItems: "center" }}> Sort By </Box> */}
                            </Box>
                        </Box>
                        {/* filters  */}
                        <Accordion
                            sx={{ marginTop: "5px" }} slotProps={{ heading: { component: 'h4' },     }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                sx={{color: theme === "dark" ? "white" : "black",bgcolor: theme === 'dark'? '#292A2D' : 'white'}}
                            >
                                Sort By
                            </AccordionSummary>
                            <AccordionDetails sx={{color: theme === "dark" ? "white" : "black",bgcolor: theme === 'dark'? '#292A2D' : 'white'}}>
                                <Search />
                            </AccordionDetails>
                        </Accordion>
                        {/* main content */}
                        <TabPanel value="1">  <AllTents /> </TabPanel>
                        <TabPanel value="2">  <AllHomestays /> </TabPanel>
                        <TabPanel value="3"> <AllHotels /> </TabPanel>
                        <TabPanel value='4'> <AllCottages/> </TabPanel>
                        <TabPanel value='5'> <AllFarmHouses/> </TabPanel>
                        <TabPanel value='6'> <AllTreeHouses/> </TabPanel>
                        <TabPanel value='7'> <AllVillas/> </TabPanel>
                        <TabPanel value='8'> <AllCamps/>  </TabPanel>
                        <TabPanel value='9'> <AllApartments/> </TabPanel>
                    </TabContext>
                </Box>
            </Box>
            
        </Box>
    );
};
export default AllStays;

















// import { Box, Button, Drawer, IconButton, MenuItem, Pagination, Paper, Typography } from '@mui/material';
// import React, { useContext, useEffect, useRef, useState } from 'react';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import TuneIcon from '@mui/icons-material/Tune';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import HeroImg from '../../assets/HomePage/HeroImg2.png';
// import { BookmarkBorderOutlined, CardTravel } from '@mui/icons-material';
// import { staysContext } from '../AppContext/TentsContext';

// const AllStays = () => {

//     let { allTents } = useContext(staysContext);
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const [page, setPage] = useState(1);
//     const TentsPerPage = 8;
//     const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//     // const anchorRef = useRef(null);
//     const closeTimeout = useRef(null); // Use useRef for timeout storage

//     const handleChange = ((event, value) => {
//         setPage(value)
//     })
//     const indexOfLastTents = page * TentsPerPage;
//     const indexOfFirstTents = indexOfLastTents - TentsPerPage;
//     const currentTents = allTents.slice(indexOfFirstTents, indexOfLastTents);

//     const priceFilter = [
//         { name: "Price", price: ["₹1000 - ₹2000", "₹2000 - ₹3000", "₹3000 - ₹4000", "₹5000 - ₹6000", "₹6000 - ₹7000", "₹7000 - ₹8000", "₹8000 - ₹9000", "₹9000 - ₹10000"] }
//     ];
//     const locationfilter = [
//         { name: "Location", location: ["Mumbai", "Malvan", "Nashik", "Pune", "Kolhapur", "Ratnagiri", "Lonavla", "Mahabaleshwar"] }
//     ];
//     const amenitiesfilter = [
//         { name: "Amenities", amenities: ["Barbeque", "Bonfire", "Caretaker", "Game Room", "Restaurant", "Spa", "Lawn", "Swimming Pool",] }
//     ]
//     // const Ratingfilter = [ { name:"Rating", rating:[ ""]}]

//     // Automatic image change every 3 seconds
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentImageIndex((prevIndex) => (prevIndex + 1) % currentTents[0].about.images.length);
//         }, 3000); // Change every 3 seconds
//         return () => clearInterval(interval); // Cleanup interval on component unmount
//     }, []);



//     return (
//         <Box>
//             {/* Image as Background */}
//             <Box component="div" className="w-full h-96 sm:h-screen rounded-lg relative mt-1">
//                 {/* Background Image */}
//                 <Box component="img" src={HeroImg} className="w-full h-96 sm:h-full object-cover rounded-md absolute top-0 left-0" />
//                 {/* Text Content */}
//                 <Box className="w-full h-full absolute flex flex-col items-center justify-center text-center px-4">
//                     <Typography variant="h6" className="text-sm sm:text-lg text-white" > Home / Category </Typography>
//                     <Typography variant="h3" className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white" > Discover the Unknown </Typography>
//                     <Typography variant="h3" className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white" >in every Adventure </Typography>
//                 </Box>
//             </Box>
//             {/* filter */}
//             <Box sx={{ marginTop: "20px", marginBottom: "20px", marginLeft: "20px" }}>
//                 {/* Wrapper to position dropdowns correctly */}
//                 <IconButton onClick={() => setIsDrawerOpen(true)} sx={{ display: { xs: "block", md: "none" } }}>
//                     <TuneIcon />
//                 </IconButton>
//                 {/* Drawer (Sidebar) for Mobile Filters */}
//                 <Drawer
//                     anchor="left"
//                     open={isDrawerOpen}
//                     onClose={() => setIsDrawerOpen(false)}
//                     // className='max-w-44 mt-4'
//                     sx={{
//                         width: { xs: "300px"}
//                     }}

//                 >
//                     <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, position: "relative",width:{xs:"300px"} , p:3}}>
//                         {/* filters */}
//                         {/* <Box sx={{ border: { md: "1px solid gray" }, borderRadius: { xs: "none", md: "50%" }, p: "4px" }} > <FilterListIcon /> </Box> */}
//                         <Button variant='outlined' sx={{ color: "lightslategray", borderRadius: " 20px", border: "1px solid gray", width:"50%" }}>Tents</Button>
//                         <Button variant='outlined' sx={{ color: "lightslategray", borderRadius: " 20px", border: "1px solid gray", width:"50%" }}>Cottages</Button>
//                         <Button variant='outlined' sx={{ color: "lightslategray", borderRadius: " 20px", border: "1px solid gray", width:"50%" }}>Hotels</Button>
//                         <Button variant='outlined' sx={{ color: "lightslategray", borderRadius: " 20px", border: "1px solid gray", width:"50%" }}>Homestays</Button>
//                         <Button variant='outlined' sx={{ color: "lightslategray", borderRadius: " 20px", border: "1px solid gray", width:"50%" }}>Treehouses</Button>
//                         <Button variant='outlined' sx={{ color: "lightslategray", borderRadius: " 20px", border: "1px solid gray", width:"50%" }}>Villas</Button>
//                         <Box sx={{ color: "lightslategray",width:"50%", borderRadius: " 20px", border: "1px solid gray", paddingLeft: "20px", paddingRight: "20px", display: "flex", alignItems: "center" }}> Sort By </Box>

//                     </Box>
//                 </Drawer>
//                 {/* filters */}
//                 <Box sx={{ display: { xs: "none", sm: "flex" }, justifyContent: "space-between", flexDirection: "row", gap: 2, position: "relative" }}  >
//                     <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
//                         {/* filters */}
//                         <Box sx={{ border: "1px solid gray", borderRadius: "50%", p: "4px" }} > <FilterListIcon /> </Box>
//                         <Button variant='outlined' sx={{ color: "lightslategray", borderRadius: " 20px", border: "1px solid gray" }}>Tents</Button>
//                         <Button variant='outlined' sx={{ color: "lightslategray", borderRadius: " 20px", border: "1px solid gray" }}>Cottages</Button>
//                         <Button variant='outlined' sx={{ color: "lightslategray", borderRadius: " 20px", border: "1px solid gray" }}>Hotels</Button>
//                         <Button variant='outlined' sx={{ color: "lightslategray", borderRadius: " 20px", border: "1px solid gray" }}>Homestays</Button>
//                         <Button variant='outlined' sx={{ color: "lightslategray", borderRadius: " 20px", border: "1px solid gray" }}>Treehouses</Button>
//                         <Button variant='outlined' sx={{ color: "lightslategray", borderRadius: " 20px", border: "1px solid gray" }}>Villas</Button>
//                     </Box>
//                     {/* sort by */}
//                     <Box sx={{ display: { xs: "none", sm: "flex" }, marginRight: "5%", flexDirection: "row", }}>
//                         <Box sx={{ color: "lightslategray", borderRadius: " 20px", border: "1px solid gray", paddingLeft: "20px", paddingRight: "20px", display: "flex", alignItems: "center" }}> Sort By </Box>
//                     </Box>
//                 </Box>
//             </Box>
//             {/* Main Content */}
//             <Box
//                 sx={{
//                     display: "grid",
//                     gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
//                     gap: 2,
//                     padding: 5
//                 }}
//             >
//                 {currentTents.map((val, i) => (
//                     <Paper
//                         key={i}
//                         sx={{
//                             p: 0,
//                             display: "flex",
//                             flexDirection: "column",
//                             mb: 5,
//                             alignItems: "",
//                             textAlign: "",
//                             transition: "transform 0.3s ease-in-out",
//                             "&:hover": { transform: "scale(1.05)" },
//                         }}
//                         data-aos="flip-left"
//                         data-aos-easing="ease-out-cubic"
//                         data-aos-duration="2000"
//                     >
//                         <Box sx={{ width: "100%", height: "300px", borderRadius: "20px", objectFit: "cover", position: "relative", }}>
//                             <Box
//                                 component="img"
//                                 src={val.about.images[currentImageIndex]} // Display current image based on the index
//                                 sx={{ width: "100%", height: "300px", borderRadius: "10px", objectFit: "cover", position: "absolute", }}
//                             />
//                             <Typography variant="body2" color="black" sx={{ position: "absolute", backgroundColor: "transparent", borderRadius: "10px", width: "100%", display: "flex", justifyContent: "end", paddingTop: "4px", paddingRight: "4px" }}>
//                                 <span className="bg-white p-1 rounded-lg font-bold">
//                                     ⭐{val.ratings.location} | {val.weather.currentTemp}
//                                 </span>
//                             </Typography>

//                             {/* Render dots for the images */}
//                             <Box sx={{
//                                 width: "100%",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",  // Center the dots horizontally
//                                 gap: "5px",
//                                 position: "absolute",
//                                 bottom: "10px",  // Position at the bottom of the image
//                             }}>
//                                 {val.about.images.map((_, index) => (
//                                     <Box
//                                         key={index}
//                                         sx={{
//                                             width: "3px",
//                                             height: "3px",
//                                             borderRadius: "50%",
//                                             backgroundColor: currentImageIndex === index ? "orange" : "gray",
//                                             cursor: "pointer",
//                                             transition: "background-color 0.3s ease",
//                                         }}
//                                         onClick={() => setCurrentImageIndex(index)} // Update image on dot click
//                                     />
//                                 ))}
//                             </Box>
//                         </Box>

//                         <Typography variant="body1" sx={{ mt: 1, paddingLeft: "10px" }}>
//                             {val.address.tal}
//                         </Typography>
//                         <Typography variant="body1" sx={{ fontWeight: "bold", color: "black", mt: 1, paddingLeft: "10px" }}>
//                             {val.campName}
//                         </Typography>

//                         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                             <Typography variant="body1" sx={{ mt: 0, paddingLeft: "10px", fontWeight: "bold" }}>
//                                 {val.prices.afterDiscount} <s style={{ color: "gray", marginLeft: "5px" }}>₹{val.prices.actual}</s>
//                             </Typography>
//                             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                                 <Typography sx={{ width: "30px", height: "30px", border: "1px solid black", backgroundColor: "lightgrey", borderRadius: "10%", display: "flex", justifyContent: "center", alignItems: "center", mr: 1, mb: 1 }}>
//                                     <ShoppingCartIcon fontSize="small" sx={{ color: "black" }} />
//                                 </Typography>
//                                 <Typography sx={{ width: "30px", height: "30px", border: "1px solid black", backgroundColor: "lightgrey", borderRadius: "10%", display: "flex", justifyContent: "center", alignItems: "center", mr: 1, mb: 1 }}>
//                                     <BookmarkBorderOutlined fontSize="small" sx={{ color: "black" }} />
//                                 </Typography>
//                             </Box>
//                         </Box>
//                     </Paper>
//                 ))}
//             </Box>
//             <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
//                 <Pagination
//                     count={Math.ceil(allTents.length / TentsPerPage)}
//                     page={page}
//                     onChange={handleChange}
//                     color="primary"
//                 />
//             </Box>
//         </Box>
//     );
// };
// export default AllStays;
