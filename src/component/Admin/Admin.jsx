import { useState, useEffect, useContext } from "react";
import { Box, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, IconButton, Card, CardContent, CardHeader, Grid,Button,useTheme,useMediaQuery,Avatar, Divider,} from "@mui/material";
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
} from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
import { staysContext } from "../AppContext/TentsContext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

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
  "statistics", // New option for statistics
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

const Admin = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAdminLoggedIn } = useContext(staysContext);
  const [selectedEndpoint, setSelectedEndpoint] = useState("dashboard");
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({});
  const [bookingData, setBookingData] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

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
    }
  }, [selectedEndpoint]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/${selectedEndpoint}`);
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

  const drawer = (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        
      }}
    >
      <Box sx={{ p: 2, textAlign: "center" }}>
        <img
          src="/logo.png"
          alt="Saffron Stays Logo"
          style={{ width: "80%", maxWidth: "150px" }}
        />
      </Box>
      <List>
        {["dashboard", ...ENDPOINTS].map((endpoint) => (
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
                  ? theme.palette.action.selected
                  : "transparent",
              "&:hover": { backgroundColor: theme.palette.action.hover },
              borderRadius: 1,
              mb: 0.5,
            }}
          >
            <IconButton size="small" sx={{ mr: 2 }}>
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
      <Card elevation={3} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: theme.palette.primary.main }}>{getIcon(key)}</Avatar>}
          title={key.charAt(0).toUpperCase() + key.slice(1)}
          subheader={`Total: ${value}`}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Click on the sidebar to view details.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );


  const renderDataCard = (item, index) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
      <Card elevation={3} sx={{ width:{xs:"300px", lg:"auto" ,md:"auto"},height: "350px", display: "flex", flexDirection: "column",justifyContent:{xs:"center"}, }}>
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
          <Box sx={{ overflowY:{xs:"auto",lg:"auto"}, maxHeight: "160px", paddingRight: "4px" }}>
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
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { md: 240 }, flexShrink: { md: 0 } }}>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: 240,
              display: isMobile ? "block" : "flex",
              flexDirection: "column",
              overflowX:"auto"
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
          <Box sx={{ width: "50%", margin: "auto" }}>
            <BookingPieChart bookingData={bookingData} />
          </Box>
        ) : selectedEndpoint === "dashboard" ? (
          <Grid container spacing={3}>
            {Object.entries(summary).map(([key, value]) => renderDashboardCard(key, value))}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {data.map((item, index) => renderDataCard(item, index))}
          </Grid>
        )}
      </Box>
    </Box>
  ) : null;
};

export default Admin; 