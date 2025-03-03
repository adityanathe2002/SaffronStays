import { Box, Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Tabs, Tab, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { staysContext } from "../AppContext/TentsContext";

const Search = () => {
    const { ratings, setRatings, sortPrice, setSortPrice, sortAmenities, setSortAmenities, sortLocation, setSortLocation } = useContext(staysContext);
    const [activeTab, setActiveTab] = useState(0); // Track active tab

    const ratingsObj = ["4.5 & above", "4.0 & above", "3.5 & above", "3.0 & above"];
    const priceFilter = ["Under ₹5000", "₹5000 - ₹10000", "₹10000 - ₹15000", "Above ₹15000"];
    const capacityObj = ["1-2 Guest", "3-4 Guest", "5-6 Guest", "7+ Guest"];
    const amenitiesfilter = ["Free Breakfast", "Bonfire", "Wildlife Safari", "Restaurant", "Free WiFi", "Swimming Pool", "Trekking"];
    const locationObj = ["Mumbai", "Pune", "Nashik", "Kolhapur", "Aurangabad","Raigad","Ahmednagar","Chandrapur","Bhandara","Thane","Sindhudurg"];

    const handleTabChange = (event, newValue) => setActiveTab(newValue);

    const handleFilterChange = (value, setter) => {
        setter(prevSelected =>
            prevSelected.includes(value)
                ? prevSelected.filter(item => item !== value)
                : [...prevSelected, value]
        );
    };
    
    const handleClearBtn = () =>{
        setSortPrice([]);
        setSortLocation([]);
        setSortAmenities([]);
        setRatings([]);
    }

    const renderFilterList = (items, selectedItems, setter) => (
        <List>
            {items.map((item, index) => (
                <ListItem key={index} disablePadding>
                    <ListItemButton role={undefined} dense>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={selectedItems.includes(item)}
                                onChange={() => handleFilterChange(item, setter)}
                                tabIndex={-1}
                            />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );

    return (
        <Box sx={{ width: "100%",  }}>
            {/* Desktop View (Flexbox Filters) */}
            <Box sx={{ display: { xs: "none", sm: "flex" }, justifyContent: "space-evenly", gap: 2 }}>
                <Box sx={{ width: "20%" }}>
                    <Typography>Price Range</Typography>
                    {renderFilterList(priceFilter, sortPrice, setSortPrice)}
                </Box>
                <Box sx={{ width: "20%" }}>
                    <Typography>Capacity</Typography>
                    {renderFilterList(capacityObj, sortPrice, setSortPrice)}
                </Box>
                <Box sx={{ width: "20%" }}>
                    <Typography>Amenities</Typography>
                    {renderFilterList(amenitiesfilter, sortAmenities, setSortAmenities)}
                </Box>
                <Box sx={{ width: "20%" }}>
                    <Typography>Rating</Typography>
                    {renderFilterList(ratingsObj, ratings, setRatings)}
                </Box>
                <Box sx={{ width: "20%" }}>
                    <Typography>Location</Typography>
                    {renderFilterList(locationObj, sortLocation, setSortLocation)}
                </Box>
            </Box>

            {/* Mobile View (TabList for Filters) */}
            <Box sx={{ display: { xs: "block", sm: "none" }, width: "100%" }}>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                >
                    <Tab label="Price" />
                    <Tab label="Capacity" />
                    <Tab label="Amenities" />
                    <Tab label="Rating" />
                    <Tab label="Location" />
                </Tabs>

                <Box sx={{ p: 2, maxHeight: "300px", overflowY: "auto" }}>
                    {activeTab === 0 && renderFilterList(priceFilter, sortPrice, setSortPrice)}
                    {activeTab === 1 && renderFilterList(capacityObj, sortPrice, setSortPrice)}
                    {activeTab === 2 && renderFilterList(amenitiesfilter, sortAmenities, setSortAmenities)}
                    {activeTab === 3 && renderFilterList(ratingsObj, ratings, setRatings)}
                    {activeTab === 4 && renderFilterList(locationObj, sortLocation, setSortLocation)}
                </Box>
            </Box>
            <Box sx={{ width:"100%", display:"flex",justifyContent:"end", gap:2 }}>
                <Button variant="outlined" sx={{color:"black", border:"1px solid black"}} onClick={handleClearBtn} >Clear All</Button>
            </Box>
        </Box>
    );
};

export default Search;
