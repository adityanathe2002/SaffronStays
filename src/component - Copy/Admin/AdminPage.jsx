import { useState, useEffect, useContext } from "react";
import { Box, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, IconButton, Card, CardContent, CardHeader, Grid, Button, useTheme, useMediaQuery, Avatar, Divider, Tabs, Tab, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Pagination } from "@mui/material";
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

// Register Chart.js components
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,ArcElement, Tooltip, Legend);

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

    const renderStaysTable = () => (
        <Box>
            <TableContainer component={Paper} sx={{ mt: 3, bgcolor: theme === 'dark' ? "#292A2D" : "white", }}>
                <Table>
                    <TableHead >
                        <TableRow >
                            <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }} >Camp ID</TableCell>
                            <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }} >Camp Name</TableCell>
                            <TableCell sx={{ color: theme === 'dark' ? "white" : "black" }} >Image</TableCell>
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
                                    <IconButton sx={{ color: theme === 'dark' ? "#FF5861" : "#FF5861" }}>
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
                                    <IconButton sx={{ color: theme === 'dark' ? "#38BCF8" : "#38BCF8" }}>
                                        <FaEdit size={20} />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton sx={{ color: theme === 'dark' ? "#FF5861" : "#FF5861" }}>
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
                                    <IconButton sx={{ color: theme === 'dark' ? "#FF5861" : "#FF5861" }}>
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
                {["dashboard", "stays", "users", "admin", "statistics"].map((endpoint) => (
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
                            primary={endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}
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
                    {selectedEndpoint.charAt(0).toUpperCase() + selectedEndpoint.slice(1)}
                </Typography>
                {selectedEndpoint === "statistics" ? (
                    <Box sx={{display:"flex", width:"100%", alignItems:"center"}}>
                        <Box sx={{ width: "50%",height:"60vh",  margin: "auto" }}>
                            <BookingPieChart bookingData={bookingData} />
                        </Box>
                        <Box sx={{ width: "50%",height:"60vh", margin: "auto", mt:20 }}>
                            {/* <Typography variant="h5" gutterBottom sx={{ textAlign: "center", mb: 3 }}>
                                User Registration Trends
                            </Typography> */}
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

