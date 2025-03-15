import { Container, Grid, Paper, Typography, Link, Box, IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Paper
  sx={{
    width: "100%",
    backgroundImage: `url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgcwHTGllKkwiTOpzwX-TcSyDW4AZj67t3i1VbJ5aGIMX12vUcjSJ0eraLuJsMDMkw-PfL6A6RRpcxX-O2Z3-mOFo3Y9XvPP8KlJqinKEgjSMfV7Gnk5YANpnT2FZe4VYPNAWqjUaHc8_at/w640-h360-rw/black-wallpaper-pc-heroscreen.cc-4k.png")`,
    backgroundSize: "cover", // Ensure it covers the entire area
    backgroundPosition: "center", // Center the image
    backgroundRepeat: "no-repeat", // Prevent repeating
    color: "white",
    padding: "40px 60px",
  }}
  elevation={0}
>

      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="flex-start" justifyContent="space-between">
          
          {/* 1️⃣ Company Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h4" sx={{ fontFamily: "Waltograph, cursive" }}>
              SaffronStay
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "#B0B0B0" }}>
              Explore the world with comfort & adventure.
            </Typography>

            <Box mt={2}>
              <Typography variant="h6" fontWeight="bold">Company</Typography>
              <Link href="#" color="inherit" display="block" underline="none">Home</Link>
              <Link href="#" color="inherit" display="block" underline="none">About Us</Link>
              <Link href="#" color="inherit" display="block" underline="none">Tours</Link>
              <Link href="#" color="inherit" display="block" underline="none">Careers</Link>
            </Box>
          </Grid>

          {/* 2️⃣ Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold">Quick Links</Typography>
            <Box mt={2}>
              <Link href="#" color="inherit" display="block" underline="none">Destinations</Link>
              <Link href="#" color="inherit" display="block" underline="none">Travel Blog</Link>
              <Link href="#" color="inherit" display="block" underline="none">FAQs</Link>
              <Link href="#" color="inherit" display="block" underline="none">Testimonials</Link>
            </Box>
          </Grid>

          {/* 3️⃣ Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold">Contact</Typography>
            <Box mt={2}>
              <Typography>+91 9359803710</Typography>
              <Typography>adityanathe@saffronstay.com</Typography>
              <Typography>support@saffronstay.com</Typography>
            </Box>
          </Grid>

          {/* 4️⃣ Social Media & Scroll-to-Top */}
          <Grid item xs={12} sm={6} md={3} textAlign="center">
            

            <Box mt={2}>
              <IconButton
                sx={{
                  color: "white",
                  border: "1px solid white",
                  padding: "10px",
                }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <ArrowUpwardIcon />
              </IconButton>
            </Box>
          </Grid>

        </Grid>
      </Container>

      {/* Copyright */}
      <Box sx={{ marginTop: "3rem", textAlign: "center" }}>
        <Typography variant="body2">
          &copy; {currentYear} SaffronStay. All rights reserved.
        </Typography>
      </Box>
    </Paper>
  );
};

export default Footer;
