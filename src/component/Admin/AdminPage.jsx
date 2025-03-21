import { useState, useEffect, useContext } from "react";
import { Box, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, IconButton, Card, CardContent, CardHeader, Grid, Button, useTheme, useMediaQuery, Avatar, Divider, Tabs, Tab, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Pagination, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, FormGroup, FormLabel, Checkbox, RadioGroup, Radio } from "@mui/material";
import {
    Menu as MenuIcon,
    ExitToApp as LogoutIcon,
    Dashboard as DashboardIcon,
    Hotel as HotelIcon,
    Nature as TentIcon,
    Home as HomeIcon,
    Apartment as ApartmentIcon,
    People as UsersIcon,
    BarChart as StatisticsIcon,
    DarkMode,
    LightMode,
} from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
import { staysContext } from "../AppContext/TentsContext";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { FaEdit, FaTrash } from "react-icons/fa";
import DeleteIcon from "@mui/icons-material/Delete";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

const API_BASE_URL = "http://localhost:5000";
const ENDPOINTS = [
    "tents",
    "hotels",
    "homestays",
    "camps",
    "villas",
    "farmhouses",
    "cottages",
    "apartments",
    "treehouses",
    "users",
    "admin",
    "statistics",
];

const getIcon = (endpoint) => {
    switch (endpoint) {
        case "tents":
            return <TentIcon />;
        case "hotels":
            return <HotelIcon />;
        case "homestays":
        case "villas":
        case "farmhouses":
        case "cottages":
            return <HomeIcon />;
        case "apartments":
        case "treehouses":
            return <ApartmentIcon />;
        case "users":
            return <UsersIcon />;
        case "statistics":
            return <StatisticsIcon />;
        default:
            return <DashboardIcon />;
    }
};

const AdminPage = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { isAdminLoggedIn, theme, toggleTheme } = useContext(staysContext);
    const [selectedEndpoint, setSelectedEndpoint] = useState("dashboard");
    const [selectedStayTab, setSelectedStayTab] = useState("hotels");
    const [data, setData] = useState([]);
    const [summary, setSummary] = useState({});
    const [bookingData, setBookingData] = useState({});
    const [userRegistrationData, setUserRegistrationData] = useState([]);
    const themes = useTheme();
    const isMobile = useMediaQuery(themes.breakpoints.down("md"));
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const itemsPerPage = 4;
    const indexOfLastTents = page * itemsPerPage;
    const indexOfFirstTents = indexOfLastTents - itemsPerPage;
    const currentItems = data.slice(indexOfFirstTents, indexOfLastTents);

    const handlePageChange = ((event, value) => {
        setPage(value)
    })


    useEffect(() => {
        if (!isAdminLoggedIn) {
            navigate("/login");
        }
    }, [isAdminLoggedIn]);

    useEffect(() => {
        if (selectedEndpoint !== "dashboard" && selectedEndpoint !== "statistics") {
            fetchData();
        } else if (selectedEndpoint === "dashboard") {
            fetchSummary();
        } else if (selectedEndpoint === "statistics") {
            fetchBookingData();
            fetchUserRegistrationData();
        }
    }, [selectedEndpoint, selectedStayTab]);

    const fetchData = async () => {
        try {
            const endpoint = selectedEndpoint === "stays" ? selectedStayTab : selectedEndpoint;
            const response = await fetch(`${API_BASE_URL}/${endpoint}`);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchSummary = async () => {
        const summaryData = {};
        for (const endpoint of ENDPOINTS) {
            try {
                const response = await fetch(`${API_BASE_URL}/${endpoint}`);
                const result = await response.json();
                summaryData[endpoint] = result.length;
            } catch (error) {
                console.error(`Error fetching ${endpoint} summary:`, error);
            }
        }
        setSummary(summaryData);
    };

    const fetchUserRegistrationData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/registrations`); // Example endpoint for user registration data
            const result = await response.json();
            setUserRegistrationData(result);
        } catch (error) {
            console.error("Error fetching user registration data:", error);
        }
    };

    const fetchBookingData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/statistics`); // Updated endpoint
            const result = await response.json();
            const bookingRatios = calculateBookingRatios(result);
            setBookingData(bookingRatios);
        } catch (error) {
            console.error("Error fetching statistics data:", error);
        }
    };

    const calculateBookingRatios = (bookings) => {
        const ratios = {};
        bookings.forEach((booking) => {
            const type = booking.type;
            if (ratios[type]) {
                ratios[type]++;
            } else {
                ratios[type] = 1;
            }
        });
        return ratios;
    };

    const handleLogout = () => {
        navigate("/login");
        console.log("Logging out...");
    };

    const handleStayTabChange = (event, newValue) => {
        setSelectedStayTab(newValue);
    };

    const handleDeleteStay = async (stayId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${selectedStayTab}/${stayId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // If the deletion is successful, update the state to reflect the change
                setData(data.filter(stay => stay.id !== stayId));
            } else {
                console.error("Failed to delete stay");
            }
        } catch (error) {
            console.error("Error deleting stay:", error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // If the deletion is successful, update the state to reflect the change
                setData(data.filter(user => user.id !== userId));
            } else {
                console.error("Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleDeleteAdmin = async (adminId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/${adminId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // If the deletion is successful, update the state to reflect the change
                setData(data.filter(admin => admin.id !== adminId));
            } else {
                console.error("Failed to delete admin");
            }
        } catch (error) {
            console.error("Error deleting admin:", error);
        }
    };

    const renderStaysTable = () => (
        <Box>
            <TableContainer component={Paper} sx={{ mt: 3, bgcolor: theme === 'dark' ? "#292A2D" : "white", }}>
                <Table>
                    <TableHead >
                        <TableRow >
                            <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }} >Camp ID</TableCell>
                            <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }} >Image</TableCell>
                            <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }} >Camp Name</TableCell>
                            <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }} >Price</TableCell>
                            <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }} >Location</TableCell>
                            <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }} >Edit</TableCell>
                            <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }} >Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentItems.map((item) => (
                            <TableRow
                                key={item?.campId}
                                sx={{
                                    color: theme === 'dark' ? "white" : "black",
                                    "&:hover": { backgroundColor: theme === 'dark' ? "#38393D" : "#f5f5f5" }
                                }}
                            >
                                <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }} >{item?.id}</TableCell>
                                <TableCell>
                                    {item.about?.images && (
                                        <img
                                            src={item?.about?.images[0]}
                                            alt={item?.campName}
                                            style={{ width: "100px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
                                        />
                                    )}
                                </TableCell>
                                <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }} >{item?.campName}</TableCell>
                                <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }} >₹{item?.prices?.afterDiscount}</TableCell>
                                <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }} >{item?.address?.tal}</TableCell>
                                <TableCell>
                                    <IconButton sx={{ color: theme === 'dark' ? "#38BCF8" : "#38BCF8" }} >
                                        <FaEdit size={20} />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleDeleteStay(item.id)}
                                        sx={{ color: theme === 'dark' ? "#FF5861" : "#FF5861" }}>
                                        <FaTrash size={20} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Pagination
                    count={Math.ceil(data.length / itemsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{
                        "& .MuiPaginationItem-root": {
                            color: theme === 'dark' ? 'white' : 'black',
                        },
                        "& .MuiPaginationItem-page.Mui-selected": {
                            backgroundColor: theme === 'dark' ? '#38BCF8' : '#38BCF8',
                            color: 'white',
                        },
                    }}
                />
            </Box>

        </Box>

    );

    const renderUsersTable = () => (
        <Box>
            <TableContainer component={Paper} sx={{ mt: 3, bgcolor: theme === 'dark' ? "#292A2D" : "white" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }}>User ID</TableCell>
                            <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }}>Name</TableCell>
                            <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }}>Email</TableCell>
                            <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }}>Contact</TableCell>
                            <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }}>Edit</TableCell>
                            <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentItems.map((user) => (
                            <TableRow key={user?.id}
                                sx={{
                                    color: theme === 'dark' ? "white" : "black",
                                    "&:hover": { backgroundColor: theme === 'dark' ? "#38393D" : "#f5f5f5" }
                                }}

                            >
                                <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }}>{user?.id}</TableCell>
                                <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }}>{user?.username}</TableCell>
                                <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }}>{user?.email}</TableCell>
                                <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }}>{user?.contact}</TableCell>
                                <TableCell>
                                    <IconButton

                                        sx={{ color: theme === 'dark' ? "#38BCF8" : "#38BCF8" }}>
                                        <FaEdit size={20} />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleDeleteUser(user.id)}
                                        sx={{ color: theme === 'dark' ? "#FF5861" : "#FF5861" }}>
                                        <FaTrash size={20} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Pagination
                    count={Math.ceil(data.length / itemsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{
                        "& .MuiPaginationItem-root": {
                            color: theme === 'dark' ? 'white' : 'black',
                        },
                        "& .MuiPaginationItem-page.Mui-selected": {
                            backgroundColor: theme === 'dark' ? '#38BCF8' : '#38BCF8',
                            color: 'white',
                        },
                    }}
                />
            </Box>
        </Box>
    );

    const renderAdminTable = () => (
        <Box>
            <TableContainer component={Paper} sx={{ mt: 3, bgcolor: theme === 'dark' ? "#292A2D" : "white" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }}>Admin ID</TableCell>
                            <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }}>Name</TableCell>
                            <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }}>Email</TableCell>
                            <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }}>Contact</TableCell>
                            <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }}>Edit</TableCell>
                            <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentItems.map((admin) => (
                            <TableRow
                                key={admin?.id}
                                sx={{
                                    color: theme === 'dark' ? "white" : "black",
                                    "&:hover": { backgroundColor: theme === 'dark' ? "#38393D" : "#f5f5f5" }
                                }}
                            >
                                <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }}>{admin?.id}</TableCell>
                                <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }}>{admin?.username}</TableCell>
                                <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }}>{admin?.email}</TableCell>
                                <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }}>{admin?.contact}</TableCell>
                                <TableCell>
                                    <IconButton sx={{ color: theme === 'dark' ? "#38BCF8" : "#38BCF8" }}>
                                        <FaEdit size={20} />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleDeleteAdmin(admin.id)}
                                        sx={{ color: theme === 'dark' ? "#FF5861" : "#FF5861" }}>
                                        <FaTrash size={20} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );

    const renderUserRegistrationGraph = () => {
        const labels = userRegistrationData.map((entry) => entry.date); // Dates for the x-axis
        const dataPoints = userRegistrationData.map((entry) => entry.count); // Number of registrations for the y-axis

        const data = {
            labels: labels,
            datasets: [
                {
                    label: "User Registrations",
                    data: dataPoints,
                    borderColor: theme === 'dark' ? "#38BCF8" : "#38BCF8", // Line color
                    backgroundColor: theme === 'dark' ? "#38BCF8" : "#38BCF8", // Point color
                    fill: false,
                },
            ],
        };

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                },
            },
            scales: {
                x: {
                    grid: {
                        color: theme === 'dark' ? "#444" : "#ddd", // Grid color for x-axis
                    },
                    ticks: {
                        color: theme === 'dark' ? "white" : "black", // Tick color for x-axis
                    },
                },
                y: {
                    grid: {
                        color: theme === 'dark' ? "#444" : "#ddd", // Grid color for y-axis
                    },
                    ticks: {
                        color: theme === 'dark' ? "white" : "black", // Tick color for y-axis
                    },
                },
            },
        };

        return <Line data={data} options={options} />;
    };

    const drawer = (
        <Box
            sx={{
                backgroundColor: theme === 'dark' ? "#292A2D" : "white",
                color: theme === 'dark' ? "white" : "",
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box sx={{ p: 2, textAlign: "center" }}>
                <img
                    src="/logo.png"
                    alt="Saffron Stays Logo"
                    style={{ width: "80%", maxWidth: "150px", }}
                />
            </Box>
            <List>
                {["dashboard", "stays", "users", "admin", "statistics", "addStay"].map((endpoint) => (
                    <ListItem
                        button
                        key={endpoint}
                        onClick={() => {
                            setSelectedEndpoint(endpoint);
                            if (isMobile) setMobileOpen(false);
                        }}
                        sx={{
                            backgroundColor:
                                selectedEndpoint === endpoint
                                    ? themes.palette.action.selected
                                    : "transparent",
                            "&:hover": { backgroundColor: themes.palette.action.hover },
                            borderRadius: 1,
                            mb: 0.5,
                        }}
                    >
                        <IconButton size="small" sx={{ mr: 2, color: theme === 'dark' ? "white" : "", }}>
                            {getIcon(endpoint)}
                        </IconButton>
                        <ListItemText
                            primary={endpoint === "addStay" ? "Add Stay" : endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}
                            secondary={
                                endpoint !== "dashboard" && endpoint !== "statistics"
                                    ? `${summary[endpoint] || 0} items`
                                    : null
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    const AddStayForm = ({ onSubmit }) => {
        const [stayData, setStayData] = useState({
            stayType: "",
            campName: "",
            type: "",
            suitableFor: "",
            freeServices: [],
            refundPolicy: "",
            prices: { actual: "", afterDiscount: "" },
            roomsInACamp: [],
            about: { info: "", images: [] },
            address: { village: "", tal: "", dist: "", location: "", map: "", landmark: "" },
            amenities: [],
            propertyLayout: { roomOptions: [], sharedOptions: [] },
            foodDining: [{ isMealProvided: "", mealsOffered: [], veg: "", nonveg: "", isOutsideFoodAllowed: "" }],
            ratings: {},
            reviews: [],
            activities: [],
            cancellationPolicy: "",
            specialPackages: [],
            activitiesDetails: [],
            dynamicPricing: {},
            localAttractions: [],
            weather: {},
            transportation: {},
            healthAndSafety: {},
            uniqueFeatures: [],
        });

        const handleChange = (e) => {
            const { name, value } = e.target;
            setStayData((prev) => ({ ...prev, [name]: value }));
        };

        const handleArrayChange = (e, field) => {
            const { value, checked } = e.target;
            setStayData((prev) => ({
                ...prev,
                [field]: checked
                    ? [...prev[field], value]
                    : prev[field].filter((item) => item !== value),
            }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            onSubmit(stayData);
        };

        const handlePackageChange = (event, index, key) => {
            const updatedPackages = [...stayData.specialPackages];
            updatedPackages[index] = { ...updatedPackages[index], [key]: event.target.value };
            setStayData({ ...stayData, specialPackages: updatedPackages });
        };

        const addPackage = () => {
            setStayData({
                ...stayData,
                specialPackages: [...stayData.specialPackages, { name: "", price: "" }],
            });
        }
        const removePackage = (index) => {
            const updatedPackages = stayData.specialPackages.filter((_, i) => i !== index);
            setStayData({ ...stayData, specialPackages: updatedPackages });
        };

        const handleActivitiesDetails = (event, index, key) => {
            const updatedActivities = [...stayData.activitiesDetails];
            updatedActivities[index] = { ...updatedActivities[index], [key]: event.target.value };
            setStayData({ ...stayData, activitiesDetails: updatedActivities });
        };

        const addActivities = () => {
            setStayData({
                ...stayData,
                activitiesDetails: [...stayData.activitiesDetails, { name: "", price: "" }],
            });
        }
        const removeActivities = (index) => {
            const updatedActivities = stayData.activitiesDetails.filter((_, i) => i !== index);
            setStayData({ ...stayData, activitiesDetails: updatedActivities });
        };

        const handlePricingChange = (event, category, key) => {
            const { value } = event.target;

            setStayData((prevState) => ({
                ...prevState,
                dynamicPricing: {
                    ...prevState.dynamicPricing,
                    [category]: {
                        ...prevState.dynamicPricing[category],
                        [key]: value,
                    },
                },
            }));
        };

        const handleAttractionChange = (event, index, key) => {
            const updatedAttractions = [...stayData.localAttractions];
            updatedAttractions[index] = { ...updatedAttractions[index], [key]: event.target.value };
            setStayData({ ...stayData, localAttractions: updatedAttractions });
        };

        const addAttraction = () => {
            setStayData({
                ...stayData,
                localAttractions: [...stayData.localAttractions, { name: "", distance: "", description: "" }],
            });
        };

        const removeAttraction = (index) => {
            const updatedAttractions = stayData.localAttractions.filter((_, i) => i !== index);
            setStayData({ ...stayData, localAttractions: updatedAttractions });
        };

        const handleWeatherChange = (event, key) => {
            setStayData((prevState) => ({
                ...prevState,
                weather: {
                    ...prevState.weather,
                    [key]: event.target.value,
                },
            }));
        };

        const handleForecastChange = (event, condition) => {
            setStayData((prevState) => {
                const updatedForecast = prevState.weather?.forecast || [];
                if (event.target.checked) {
                    updatedForecast.push(condition);
                } else {
                    const index = updatedForecast.indexOf(condition);
                    if (index > -1) updatedForecast.splice(index, 1);
                }

                return {
                    ...prevState,
                    weather: {
                        ...prevState.weather,
                        forecast: updatedForecast,
                    },
                };
            });
        };

        const handleTransportationChange = (event, key) => {
            setStayData((prevState) => ({
                ...prevState,
                transportation: {
                    ...prevState.transportation,
                    [key]: event.target.value,
                },
            }));
        };

        const handleShuttleServiceChange = (event) => {
            setStayData((prevState) => ({
                ...prevState,
                transportation: {
                    ...prevState.transportation,
                    shuttleService: event.target.value === "true",
                },
            }));
        };
        const handleHealthSafetyChange = (event, key) => {
            setStayData((prevState) => ({
                ...prevState,
                healthAndSafety: {
                    ...prevState.healthAndSafety,
                    [key]: event.target.value,
                },
            }));
        };

        const handleFirstAidChange = (event) => {
            setStayData((prevState) => ({
                ...prevState,
                healthAndSafety: {
                    ...prevState.healthAndSafety,
                    firstAidAvailable: event.target.value === "true",
                },
            }));
        };
        const [customFeature, setCustomFeature] = useState("");

        const handleUniqueFeaturesChange = (event, feature) => {
            setStayData((prevState) => {
                const updatedFeatures = event.target.checked
                    ? [...prevState.uniqueFeatures, feature]
                    : prevState.uniqueFeatures.filter((f) => f !== feature);

                return { ...prevState, uniqueFeatures: updatedFeatures };
            });
        };

        const addCustomFeature = () => {
            if (customFeature.trim() !== "" && !stayData.uniqueFeatures.includes(customFeature)) {
                setStayData((prevState) => ({
                    ...prevState,
                    uniqueFeatures: [...prevState.uniqueFeatures, customFeature.trim()],
                }));
                setCustomFeature(""); // Clear input after adding
            }
        };

        const [newImage, setNewImage] = useState("");

        const handleImageChange = (event, index) => {
            const updatedImages = [...stayData.about.images];
            updatedImages[index] = event.target.value;
            setStayData({ ...stayData, about: { ...stayData.about, images: updatedImages } });
        };

        const addImage = () => {
            if (newImage.trim() !== "" && !stayData.about.images.includes(newImage)) {
                setStayData({
                    ...stayData,
                    about: { ...stayData.about, images: [...stayData.about.images, newImage] },
                });
                setNewImage(""); // Clear input field
            }
        };

        const removeImage = (index) => {
            const filteredImages = stayData.about.images.filter((_, i) => i !== index);
            setStayData({ ...stayData, about: { ...stayData.about, images: filteredImages } });
        };



        return (
            <Box component="form" onSubmit={handleSubmit} sx={{
                mt: 3, bgcolor: theme === 'dark' ? '#292A2D' : 'white', p: 2, "& .MuiInputLabel-root": {
                    color: theme === "dark" ? "#666666" : "black", // Ensures input text color
                }, "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme === "dark" ? "white" : "#C4C4C4", // Border color
                },
            }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Stay Type</InputLabel>
                    <Select name="stayType" value={stayData.stayType} onChange={handleChange} label="Stay Type">
                        <MenuItem value="hotels">Hotels</MenuItem>
                        <MenuItem value="tents">Tents</MenuItem>
                        <MenuItem value="villas">Villas</MenuItem>
                        <MenuItem value="homestays">HomeStays</MenuItem>
                        <MenuItem value="treehouses">TreeHouses</MenuItem>
                        <MenuItem value="cottages">Cottages</MenuItem>
                        <MenuItem value="camps">Camps</MenuItem>
                        <MenuItem value="apartments">Apartments</MenuItem>
                        <MenuItem value="farmhouses">FarmHouses</MenuItem>
                    </Select>
                </FormControl>
                <TextField fullWidth label="Camp Name" name="campName" value={stayData.campName} onChange={handleChange} sx={{ mb: 2, }} />
                <TextField fullWidth label="Type" name="type" value={stayData.type} onChange={handleChange} sx={{ mb: 2 }} />
                <TextField fullWidth label="Suitable For" name="suitableFor" value={stayData.suitableFor} onChange={handleChange} sx={{ mb: 2 }} />
                <FormGroup>
                    <FormLabel>Free Services</FormLabel>
                    {["WiFi", "Parking", "Breakfast", "Pool"].map((service) => (
                        <FormControlLabel
                            key={service}
                            control={<Checkbox checked={stayData.freeServices.includes(service)} onChange={(e) => handleArrayChange(e, "freeServices")} value={service} />}
                            label={service}
                        />
                    ))}
                </FormGroup>
                <TextField fullWidth label="Refund Policy" name="refundPolicy" value={stayData.refundPolicy} onChange={handleChange} sx={{ mb: 2 }} />
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Prices</Typography>
                    <TextField fullWidth label="Actual Price" name="actual" value={stayData.prices.actual} onChange={(e) => setStayData({ ...stayData, prices: { ...stayData.prices, actual: e.target.value } })} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Discounted Price" name="afterDiscount" value={stayData.prices.afterDiscount} onChange={(e) => setStayData({ ...stayData, prices: { ...stayData.prices, afterDiscount: e.target.value } })} sx={{ mb: 2 }} />
                </Box>

                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6">About the Camp</Typography>

                    {/* Camp Info Text Area */}
                    <TextField
                        fullWidth
                        label="Camp Description"
                        multiline
                        rows={3}
                        value={stayData.about.info}
                        onChange={(e) => setStayData({ ...stayData, about: { ...stayData.about, info: e.target.value } })}
                        sx={{ mb: 2 }}
                    />

                    {/* Image URLs Input */}
                    <Typography variant="subtitle1">Camp Images</Typography>
                    {stayData.about.images.map((img, index) => (
                        <Box key={index} display="flex" alignItems="center" sx={{ mb: 1 }}>
                            <TextField
                                fullWidth
                                label={`Image URL ${index + 1}`}
                                value={img}
                                onChange={(e) => handleImageChange(e, index)}
                            />
                            <IconButton onClick={() => removeImage(index)} color="error">
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}

                    {/* Add New Image Field */}
                    <TextField
                        fullWidth
                        label="Add Image URL"
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <Button variant="contained" onClick={addImage} sx={{ mt: 1 }}>
                        Add Image
                    </Button>
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Address</Typography>
                    <TextField fullWidth label="Address - Village" name="village" value={stayData.address.village} onChange={(e) => setStayData({ ...stayData, address: { ...stayData.address, village: e.target.value } })} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Address - Tal" name="tal" value={stayData.address.tal} onChange={(e) => setStayData({ ...stayData, address: { ...stayData.address, tal: e.target.value } })} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Address - Dist" name="dist" value={stayData.address.dist} onChange={(e) => setStayData({ ...stayData, address: { ...stayData.address, dist: e.target.value } })} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Address - Location" name="location" value={stayData.address.location} onChange={(e) => setStayData({ ...stayData, address: { ...stayData.address, location: e.target.value } })} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Address - Map" name="map" value={stayData.address.map} onChange={(e) => setStayData({ ...stayData, address: { ...stayData.address, map: e.target.value } })} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Address - Landmark" name="landmark" value={stayData.address.landmark} onChange={(e) => setStayData({ ...stayData, address: { ...stayData.address, landmark: e.target.value } })} sx={{ mb: 2 }} />
                </Box>
                <TextField fullWidth label="Date" name="date" value={stayData.date} onChange={handleChange} sx={{ mb: 2, }} />
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Ratings</Typography>
                    <TextField fullWidth label="Ratings - Location" name="location" value={stayData.ratings.location} onChange={(e) => setStayData({ ...stayData, ratings: { ...stayData.ratings, location: e.target.value } })} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Ratings - Cleanliness" name="cleanliness" value={stayData.ratings.cleanliness} onChange={(e) => setStayData({ ...stayData, ratings: { ...stayData.ratings, cleanliness: e.target.value } })} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Ratings - Value For Money" name="valueForMoney" value={stayData.ratings.valueForMoney} onChange={(e) => setStayData({ ...stayData, ratings: { ...stayData.ratings, valueForMoney: e.target.value } })} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Ratings - Food" name="food" value={stayData.ratings.food} onChange={(e) => setStayData({ ...stayData, ratings: { ...stayData.ratings, food: e.target.value } })} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Ratings - Facilities" name="facilities" value={stayData.ratings.facilities} onChange={(e) => setStayData({ ...stayData, ratings: { ...stayData.ratings, facilities: e.target.value } })} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Ratings - Check In Experience" name="checkInExperience" value={stayData.ratings.checkInExperience} onChange={(e) => setStayData({ ...stayData, ratings: { ...stayData.ratings, checkInExperience: e.target.value } })} sx={{ mb: 2 }} />
                </Box>
                <TextField fullWidth label="Id" name="id" value={stayData.id} onChange={handleChange} sx={{ mb: 2, }} />
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Rooms In Camp</Typography>
                    <TextField fullWidth label="Rooms In A Camp - Type" name="type" value={stayData.roomsInACamp[0]?.type || ""} onChange={(e) => { const updatedRooms = [...stayData.roomsInACamp]; updatedRooms[0] = { ...updatedRooms[0], type: e.target.value }; setStayData({ ...stayData, roomsInACamp: updatedRooms }); }} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Rooms In A Camp - Beds" name="beds" value={stayData.roomsInACamp[0]?.beds || ""} onChange={(e) => { const updatedRooms = [...stayData.roomsInACamp]; updatedRooms[0] = { ...updatedRooms[0], beds: e.target.value }; setStayData({ ...stayData, roomsInACamp: updatedRooms }); }} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Rooms In A Camp - Capacity" name="capacity" value={stayData.roomsInACamp[0]?.capacity || ""} onChange={(e) => { const updatedRooms = [...stayData.roomsInACamp]; updatedRooms[0] = { ...updatedRooms[0], capacity: e.target.value }; setStayData({ ...stayData, roomsInACamp: updatedRooms }); }} sx={{ mb: 2 }} />
                </Box>
                <FormGroup>
                    <FormLabel sx={{ fontSize: "20px" }}>Amenities</FormLabel>
                    {["Barbeque", "Bonfire", "Game Room", "Swimming Pool", "Lawn", "Restaurant", "Spa", "Caretaker"].map((val) => (
                        <FormControlLabel
                            key={val}
                            control={<Checkbox checked={stayData.amenities.includes(val)} onChange={(e) => handleArrayChange(e, "amenities")} value={val} />}
                            label={val}
                        />
                    ))}
                </FormGroup>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Property Layout</Typography>
                    <Box sx={{ mt: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 700 }}>Room Option</Typography>
                        <TextField fullWidth label="Rooms Option - RoomImg" name="img" value={stayData.propertyLayout.roomOptions[0]?.img || ""} onChange={(e) => { const updatedRooms = [...stayData.propertyLayout.roomOptions]; updatedRooms[0] = { ...updatedRooms[0], img: e.target.value }; setStayData({ ...stayData, propertyLayout: { ...stayData.propertyLayout, roomOptions: updatedRooms } }); }} sx={{ mb: 2 }} />
                        <TextField fullWidth label="Rooms Option  - RoomQty" name="qty" value={stayData.propertyLayout.roomOptions[0]?.qty || ""} onChange={(e) => { const updatedRooms = [...stayData.propertyLayout.roomOptions]; updatedRooms[0] = { ...updatedRooms[0], qty: e.target.value }; setStayData({ ...stayData, propertyLayout: { ...stayData.propertyLayout, roomOptions: updatedRooms } }); }} sx={{ mb: 2 }} />
                        <TextField fullWidth label="Rooms Option  - RoomName" name="name" value={stayData.propertyLayout.roomOptions[0]?.name || ""} onChange={(e) => { const updatedRooms = [...stayData.propertyLayout.roomOptions]; updatedRooms[0] = { ...updatedRooms[0], name: e.target.value }; setStayData({ ...stayData, propertyLayout: { ...stayData.propertyLayout, roomOptions: updatedRooms } }); }} sx={{ mb: 2 }} />
                        <TextField fullWidth label="Rooms Option  - RoomBeds" name="beds" value={stayData.propertyLayout.roomOptions[0]?.beds || ""} onChange={(e) => { const updatedRooms = [...stayData.propertyLayout.roomOptions]; updatedRooms[0] = { ...updatedRooms[0], beds: e.target.value }; setStayData({ ...stayData, propertyLayout: { ...stayData.propertyLayout, roomOptions: updatedRooms } }); }} sx={{ mb: 2 }} />
                        <TextField fullWidth label="Rooms Option  - Extra" name="extra" value={stayData.propertyLayout.roomOptions[0]?.extra || ""} onChange={(e) => { const updatedRooms = [...stayData.propertyLayout.roomOptions]; updatedRooms[0] = { ...updatedRooms[0], extra: e.target.value }; setStayData({ ...stayData, propertyLayout: { ...stayData.propertyLayout, roomOptions: updatedRooms } }); }} sx={{ mb: 2 }} />
                    </Box>
                    <Box>
                        <Typography variant="body1" sx={{ fontWeight: 700 }}>Shared Option</Typography>

                        <TextField fullWidth label="Shared Options - Img" name="img" value={stayData.propertyLayout.sharedOptions[0]?.img || ""} onChange={(e) => { const updatedRooms = [...stayData.propertyLayout.sharedOptions]; updatedRooms[0] = { ...updatedRooms[0], img: e.target.value }; setStayData({ ...stayData, propertyLayout: { ...stayData.propertyLayout, sharedOptions: updatedRooms } }); }} sx={{ mb: 2 }} />
                        <TextField fullWidth label="Shared Options - Qty" name="qty" value={stayData.propertyLayout.sharedOptions[0]?.qty || ""} onChange={(e) => { const updatedRooms = [...stayData.propertyLayout.sharedOptions]; updatedRooms[0] = { ...updatedRooms[0], qty: e.target.value }; setStayData({ ...stayData, propertyLayout: { ...stayData.propertyLayout, sharedOptions: updatedRooms } }); }} sx={{ mb: 2 }} />
                        <TextField fullWidth label="Shared Options - Name" name="name" value={stayData.propertyLayout.sharedOptions[0]?.name || ""} onChange={(e) => { const updatedRooms = [...stayData.propertyLayout.sharedOptions]; updatedRooms[0] = { ...updatedRooms[0], name: e.target.value }; setStayData({ ...stayData, propertyLayout: { ...stayData.propertyLayout, sharedOptions: updatedRooms } }); }} sx={{ mb: 2 }} />
                        <TextField fullWidth label="Shared Options - Beds" name="beds" value={stayData.propertyLayout.sharedOptions[0]?.beds || ""} onChange={(e) => { const updatedRooms = [...stayData.propertyLayout.sharedOptions]; updatedRooms[0] = { ...updatedRooms[0], beds: e.target.value }; setStayData({ ...stayData, propertyLayout: { ...stayData.propertyLayout, sharedOptions: updatedRooms } }); }} sx={{ mb: 2 }} />
                        <TextField fullWidth label="Shared Options - Extra" name="extra" value={stayData.propertyLayout.sharedOptions[0]?.extra || ""} onChange={(e) => { const updatedRooms = [...stayData.propertyLayout.sharedOptions]; updatedRooms[0] = { ...updatedRooms[0], extra: e.target.value }; setStayData({ ...stayData, propertyLayout: { ...stayData.propertyLayout, sharedOptions: updatedRooms } }); }} sx={{ mb: 2 }} />
                    </Box>
                </Box>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Food Dining</Typography>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Is Outside Food Allowed?</InputLabel>
                        <Select value={stayData.foodDining[0]?.isOutsideFoodAllowed || ""} onChange={(e) => { const updatedFoodDining = [...stayData.foodDining]; updatedFoodDining[0] = { ...updatedFoodDining[0], isOutsideFoodAllowed: e.target.value }; setStayData({ ...stayData, foodDining: updatedFoodDining }); }} >
                            <MenuItem value="true">True</MenuItem>
                            <MenuItem value="false">False</MenuItem>
                        </Select>
                    </FormControl>
                    {/* <FormGroup>
                    <FormLabel>Meals Offered</FormLabel>
                    {["Authentic Maharashtrian Dinner", "Breakfast", "Snacks", "Desserts", "Evening Tea/Coffee", "Dinner"].map((data) => (
                        <FormControlLabel
                            key={data}
                            control={
                                <Checkbox
                                    checked={stayData.foodDining.length > 0 && stayData.foodDining[0].mealsOffered.includes(data)}
                                    onChange={(e) => handleArrayChange(e, "mealsOffered")}
                                    value={data}
                                />
                            }
                            label={data}
                        />
                    ))}
                </FormGroup> */}

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Is Meal Provided?</InputLabel>
                        <Select value={stayData.foodDining[0]?.isMealProvided || ""} onChange={(e) => { const updatedFoodDining = [...stayData.foodDining]; updatedFoodDining[0] = { ...updatedFoodDining[0], isMealProvided: e.target.value }; setStayData({ ...stayData, foodDining: updatedFoodDining }); }} >
                            <MenuItem value="true">True</MenuItem>
                            <MenuItem value="false">False</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Veg?</InputLabel>
                        <Select value={stayData.foodDining[0]?.veg || ""} onChange={(e) => { const updatedFoodDining = [...stayData.foodDining]; updatedFoodDining[0] = { ...updatedFoodDining[0], veg: e.target.value }; setStayData({ ...stayData, foodDining: updatedFoodDining }); }} >
                            <MenuItem value="true">True</MenuItem>
                            <MenuItem value="false">False</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Non-Veg?</InputLabel>
                        <Select value={stayData.foodDining[0]?.nonveg || ""} onChange={(e) => { const updatedFoodDining = [...stayData.foodDining]; updatedFoodDining[0] = { ...updatedFoodDining[0], nonveg: e.target.value }; setStayData({ ...stayData, foodDining: updatedFoodDining }); }} >
                            <MenuItem value="true">True</MenuItem>
                            <MenuItem value="false">False</MenuItem>
                        </Select>
                    </FormControl>

                </Box>

                <TextField fullWidth label="Cancellation Policy" name="cancellationPolicy" value={stayData.cancellationPolicy} onChange={handleChange} sx={{ mb: 2, }} />

                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Special Package</Typography>
                    {stayData.specialPackages.map((pkg, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                            <TextField
                                fullWidth
                                label={`Special Package ${index + 1} - Name`}
                                name="name"
                                value={pkg.name || ""}
                                onChange={(e) => handlePackageChange(e, index, "name")}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label={`Special Package ${index + 1} - Price`}
                                name="price"
                                type="number"
                                value={pkg.price || ""}
                                onChange={(e) => handlePackageChange(e, index, "price")}
                                sx={{ mb: 2 }}
                            />
                            <Button variant="outlined" color="error" onClick={() => removePackage(index)}>
                                Remove Package
                            </Button>
                        </Box>
                    ))}
                    <Button variant="contained" onClick={addPackage}>
                        Add Package
                    </Button>
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Activities</Typography>
                    {stayData.activitiesDetails.map((pkg, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                            <TextField
                                fullWidth
                                label={`Activities Details ${index + 1} - Name`}
                                name="name"
                                value={pkg.name || ""}
                                onChange={(e) => handleActivitiesDetails(e, index, "name")}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label={`Activities Details ${index + 1} - Difficulty`}
                                name="difficulty"
                                value={pkg.difficulty || ""}
                                onChange={(e) => handleActivitiesDetails(e, index, "difficulty")}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label={`Activities Details ${index + 1} - Duration`}
                                name="duration"
                                value={pkg.duration || ""}
                                onChange={(e) => handleActivitiesDetails(e, index, "duration")}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label={`Activities Details ${index + 1} - Price`}
                                name="price"
                                type="number"
                                value={pkg.price || ""}
                                onChange={(e) => handleActivitiesDetails(e, index, "price")}
                                sx={{ mb: 2 }}
                            />
                            <Button variant="outlined" color="error" onClick={() => removeActivities(index)}>
                                Remove Activities
                            </Button>
                        </Box>
                    ))}

                    <Button variant="contained" onClick={addActivities}>
                        Add Activities
                    </Button>
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Dynamic Pricing</Typography>

                    {["weekday", "weekend", "peakSeason"].map((category) => (
                        <Box key={category} sx={{ mb: 2 }}>
                            <Typography variant="subtitle1">{category.replace(/([A-Z])/g, " $1")}</Typography>
                            <TextField
                                fullWidth
                                label={`${category} - Actual Price`}
                                type="number"
                                value={stayData.dynamicPricing?.[category]?.actual || ""}
                                onChange={(e) => handlePricingChange(e, category, "actual")}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label={`${category} - Discounted Price`}
                                type="number"
                                value={stayData.dynamicPricing?.[category]?.discounted || ""}
                                onChange={(e) => handlePricingChange(e, category, "discounted")}
                                sx={{ mb: 2 }}
                            />
                        </Box>
                    ))}
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Local Attractions</Typography>

                    {stayData.localAttractions.map((attraction, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                            <TextField
                                fullWidth
                                label={`Attraction ${index + 1} - Name`}
                                value={attraction.name || ""}
                                onChange={(e) => handleAttractionChange(e, index, "name")}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label={`Attraction ${index + 1} - Distance`}
                                value={attraction.distance || ""}
                                onChange={(e) => handleAttractionChange(e, index, "distance")}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label={`Attraction ${index + 1} - Description`}
                                multiline
                                rows={2}
                                value={attraction.description || ""}
                                onChange={(e) => handleAttractionChange(e, index, "description")}
                                sx={{ mb: 2 }}
                            />
                            <Button variant="outlined" color="error" onClick={() => removeAttraction(index)}>
                                Remove Attraction
                            </Button>
                        </Box>
                    ))}

                    <Button variant="contained" onClick={addAttraction}>
                        Add Attraction
                    </Button>
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Weather Details</Typography>

                    <TextField
                        fullWidth
                        label="Current Temperature"
                        value={stayData.weather?.currentTemp || ""}
                        onChange={(e) => handleWeatherChange(e, "currentTemp")}
                        sx={{ mb: 2 }}
                    />

                    <FormGroup>
                        <FormLabel sx={{ fontWeight: 700 }}>Weather Forecast</FormLabel>
                        {["Sunny", "Cloudy", "Light Rain", "Heavy Rain", "Storm"].map((condition) => (
                            <FormControlLabel
                                key={condition}
                                control={
                                    <Checkbox
                                        checked={stayData.weather?.forecast?.includes(condition) || false}
                                        onChange={(e) => handleForecastChange(e, condition)}
                                    />
                                }
                                label={condition}
                            />
                        ))}
                    </FormGroup>
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }} >Transportation Details</Typography>

                    <TextField
                        fullWidth
                        label="Nearest Airport"
                        value={stayData.transportation?.nearestAirport || ""}
                        onChange={(e) => handleTransportationChange(e, "nearestAirport")}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Nearest Railway Station"
                        value={stayData.transportation?.nearestRailwayStation || ""}
                        onChange={(e) => handleTransportationChange(e, "nearestRailwayStation")}
                        sx={{ mb: 2 }}
                    />

                    <FormControl sx={{ mb: 2 }}>
                        <FormLabel>Shuttle Service Available</FormLabel>
                        <RadioGroup
                            row
                            value={stayData.transportation?.shuttleService ?? false}
                            onChange={(e) => handleShuttleServiceChange(e)}
                        >
                            <FormControlLabel value={true} control={<Radio />} label="Yes" />
                            <FormControlLabel value={false} control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Health & Safety Measures</Typography>

                    <TextField
                        fullWidth
                        label="Emergency Contact"
                        value={stayData.healthAndSafety?.emergencyContact || ""}
                        onChange={(e) => handleHealthSafetyChange(e, "emergencyContact")}
                        sx={{ mb: 2 }}
                    />

                    <FormControl sx={{ mb: 2 }}>
                        <FormLabel>First Aid Available</FormLabel>
                        <RadioGroup
                            row
                            value={stayData.healthAndSafety?.firstAidAvailable ?? false}
                            onChange={(e) => handleFirstAidChange(e)}
                        >
                            <FormControlLabel value={true} control={<Radio />} label="Yes" />
                            <FormControlLabel value={false} control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="COVID Precautions"
                        value={stayData.healthAndSafety?.covidPrecautions || ""}
                        onChange={(e) => handleHealthSafetyChange(e, "covidPrecautions")}
                        multiline
                        rows={2}
                        sx={{ mb: 2 }}
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Unique Features</Typography>
                    <FormGroup>
                        {["Scenic Views", "Maharashtrian Cuisine", "Traditional Décor", "Private Bonfire", "Eco-Friendly Stay"].map((feature) => (
                            <FormControlLabel
                                key={feature}
                                control={
                                    <Checkbox
                                        checked={stayData.uniqueFeatures.includes(feature)}
                                        onChange={(e) => handleUniqueFeaturesChange(e, feature)}
                                    />
                                }
                                label={feature}
                            />
                        ))}
                    </FormGroup>

                    <TextField
                        fullWidth
                        label="Add Custom Feature"
                        value={customFeature}
                        onChange={(e) => setCustomFeature(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <Button variant="contained" onClick={addCustomFeature} sx={{ mt: 1 }}>
                        Add Feature
                    </Button>
                </Box>

                <Button type="submit" variant="contained" color="primary">Add Stay</Button>
            </Box>
        );
    };

    const handleAddStay = async (stayData) => {
        const { stayType, ...rest } = stayData; // Extract stayType from the data
        try {
            const response = await fetch(`${API_BASE_URL}/${stayType}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rest),
            });

            if (response.ok) {
                const newStay = await response.json();
                setData((prevData) => [...prevData, newStay]); // Update the state with the new stay
                setSelectedEndpoint("stays"); // Redirect to the stays table
            } else {
                console.error("Failed to add stay");
            }
        } catch (error) {
            console.error("Error adding stay:", error);
        }
    };

    const renderDashboardCard = (key, value) => (
        <Grid item xs={12} sm={6} md={4} key={key}>
            <Card elevation={3} sx={{ height: "100%", display: "flex", flexDirection: "column", }}>
                <CardHeader
                    sx={{ bgcolor: theme === 'dark' ? "#292A2D" : "", color: theme === 'dark' ? "white" : "" }}
                    avatar={<Avatar sx={{ bgcolor: theme === 'dark' ? "white" : themes.palette.primary.main, color: theme == 'dark' ? "black" : "" }}>{getIcon(key)}</Avatar>}
                    title={key.charAt(0).toUpperCase() + key.slice(1)}
                    subheader={`Total: ${value}`}
                />
                <CardContent sx={{ flexGrow: 1, bgcolor: theme === 'dark' ? "#292A2D" : "", color: theme === 'dark' ? "white" : "" }}>

                    <Typography variant="body2" color="text.secondary" sx={{ color: theme == 'dark' ? "white" : "" }}>
                        Click on the sidebar to view details.
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );

    const renderDataCard = (item, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card elevation={3} sx={{ width: { xs: "300px", lg: "auto", md: "auto" }, height: "350px", display: "flex", flexDirection: "column", justifyContent: { xs: "center" }, }}>
                <CardHeader
                    title={item.name || `Item ${index + 1}`} 
                    subheader={item.type || selectedEndpoint}
                    sx={{ textAlign: "center", pb: 0 }}
                />
                <CardContent sx={{ flexGrow: 1, overflowY: "auto", maxHeight: "320px", padding: "8px" }}>
                    {item.about?.images && (
                        <Box sx={{ textAlign: "center", mb: 1 }}>
                            <img
                                src={item.about.images[0]}
                                alt={item.name || "Image"}
                                style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                            />
                        </Box>
                    )}
                    {/* Scrollable Extra Details */}
                    <Box sx={{ overflowY: { xs: "auto", lg: "auto" }, maxHeight: "160px", paddingRight: "4px" }}>
                        {Object.entries(item).map(
                            ([key, value]) =>
                                key !== "name" &&
                                key !== "type" &&
                                key !== "about" && (
                                    <Box key={key} sx={{ mb: 1 }}>
                                        <Typography variant="caption" color="text.secondary">
                                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                                        </Typography>
                                        <Typography variant="body2">
                                            {typeof value === "object" ? JSON.stringify(value) : value.toString()}
                                        </Typography>
                                        <Divider sx={{ my: 1 }} />
                                    </Box>
                                )
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );

    const BookingPieChart = ({ bookingData }) => {
        const data = {
            labels: Object.keys(bookingData),
            datasets: [
                {
                    label: "Booking Ratio",
                    data: Object.values(bookingData),
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",   // Red  
                        "rgba(54, 162, 235, 0.2)",   // Blue  
                        "rgba(255, 206, 86, 0.2)",   // Yellow  
                        "rgba(75, 192, 192, 0.2)",   // Green  
                        "rgba(153, 102, 255, 0.2)",  // Purple  
                        "rgba(255, 159, 64, 0.2)",   // Orange  
                        "rgba(0, 128, 128, 0.2)",    // Teal  
                        "rgba(128, 0, 255, 0.2)",    // Purple  
                        "rgba(0, 255, 127, 0.2)"     // Spring Green
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                        "rgba(0, 128, 128, 1)",    // Teal  
                        "rgba(128, 0, 255,1)",    // Purple  
                        "rgba(0, 255, 127,1)"
                    ],
                    borderWidth: 1,
                },
            ],
        };

        return <Pie data={data} />;
    };

    return isAdminLoggedIn ? (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: theme === 'dark' ? "#292A2D" : "white", color: theme === 'dark' ? "whitesmoke" : "black" }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        sx={{ mr: 2, display: { md: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Saffron Stays Admin
                    </Typography>

                    <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
                        Logout
                    </Button>
                    <IconButton onClick={toggleTheme} sx={{ color: theme === 'dark' ? "yellow" : "black" }}>
                        {theme === 'light' ? <DarkMode sx={{ color: theme === 'dark' ? "White" : "" }} /> : <LightMode />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box component="nav" sx={{ width: { md: 233 }, flexShrink: { md: 0 } }}>
                <Drawer
                    variant={isMobile ? "temporary" : "permanent"}
                    open={isMobile ? mobileOpen : true}
                    onClose={() => setMobileOpen(false)}
                    sx={{
                        "& .MuiDrawer-paper": {
                            width: 240,
                            display: isMobile ? "block" : "flex",
                            flexDirection: "column",
                            overflowX: "auto"
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Typography variant="h4" gutterBottom>
                    {selectedEndpoint === "addStay" ? "Add Stay" : selectedEndpoint.charAt(0).toUpperCase() + selectedEndpoint.slice(1)}
                </Typography>
                {selectedEndpoint === "addStay" ? (
                    <AddStayForm onSubmit={handleAddStay} />
                ) : selectedEndpoint === "statistics" ? (
                    <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
                        <Box sx={{ width: "50%", height: "60vh", margin: "auto" }}>
                            <BookingPieChart bookingData={bookingData} />
                        </Box>
                        <Box sx={{ width: "50%", height: "60vh", margin: "auto", mt: 20 }}>
                            {renderUserRegistrationGraph()}
                        </Box>
                    </Box>
                ) : selectedEndpoint === "dashboard" ? (
                    <Grid container spacing={3}>
                        {Object.entries(summary).map(([key, value]) => renderDashboardCard(key, value))}
                    </Grid>
                ) : selectedEndpoint === "stays" ? (
                    <Box>
                        <Tabs value={selectedStayTab} onChange={handleStayTabChange} sx={{ mb: 3 }}>
                            <Tab label="Hotels" value="hotels" sx={{ color: theme === 'dark' ? "white" : "" }} />
                            <Tab label="Tents" value="tents" sx={{ color: theme === 'dark' ? "white" : "" }} />
                            <Tab label="Villas" value="villas" sx={{ color: theme === 'dark' ? "white" : "" }} />
                            <Tab label="HomeStays" value="homestays" sx={{ color: theme === 'dark' ? "white" : "" }} />
                            <Tab label="TreeHouses" value="treehouses" sx={{ color: theme === 'dark' ? "white" : "" }} />
                            <Tab label="Cottages" value="cottages" sx={{ color: theme === 'dark' ? "white" : "" }} />
                            <Tab label="Camps" value="camps" sx={{ color: theme === 'dark' ? "white" : "" }} />
                            <Tab label="Apartments" value="apartments" sx={{ color: theme === 'dark' ? "white" : "" }} />
                            <Tab label="FarmHouses" value="farmhouses" sx={{ color: theme === 'dark' ? "white" : "" }} />
                        </Tabs>
                        {renderStaysTable()}

                    </Box>
                ) : selectedEndpoint === "users" ? (
                    <Box>
                        {renderUsersTable()}
                    </Box>
                ) : selectedEndpoint === "admin" ? (
                    <Box>
                        {renderAdminTable()}
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {data.map((item, index) => renderDataCard(item, index))}
                    </Grid>
                )}
            </Box>
        </Box>
    ) : null;
};

export default AdminPage;

