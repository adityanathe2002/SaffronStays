import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const PageNotFound = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        backgroundImage: `url(../../assets/HomePage/beachImg.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
      }}
    >
      <Box
        sx={{
          background: "rgba(0, 0, 0, 0.7)",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
        data-aos="fade-up"
      >
        <Typography variant="h1" sx={{ fontSize: "100px", color: "#ffcc00", fontWeight: "bold" }} data-aos="fade-down">
          404
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }} data-aos="fade-up">
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }} data-aos="zoom-in">
          Lost in the wilderness? No worries, let's find our way back!
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{
            backgroundColor: "#ffcc00",
            color: "black",
            "&:hover": { backgroundColor: "#ffaa00" },
          }}
          data-aos="fade-up"
        >
          🏕️ Back to Saffron site
        </Button>
      </Box>
    </Box>
  );
};

export default PageNotFound;
