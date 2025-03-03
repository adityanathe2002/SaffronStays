import { Container, Grid, Paper, Typography, Link, Box, IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import React from "react";
import Logo1 from "../../assets/HomePage/trigo1.png";

const Footer = () => {
  return (
    <Paper
      sx={{
        width: "100%",
        backgroundColor: "#272727",
        // marginTop: "30px",
        color: "white",
        padding: "40px 60px",
      }}
      elevation={0}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" justifyContent="space-between">
          {/* Left Section: Company and Contact Info */}
          <Grid item xs={12} md={4}>
            {/* Logo */}
            <Typography variant="h4" fontWeight="bold">
              TRIPGO
            </Typography>

            {/* Links & Contact */}
            <Grid container spacing={4} mt={2} class="flex justify-between gap-6">
              <Grid item xs={12} sm={6}> 
                <Typography variant="h6" fontWeight="bold">
                  Company
                </Typography>
                <Box mt={2}>
                  <Link href="#" color="inherit" display="block" underline="none">
                    Home
                  </Link>
                  <Link href="#" color="inherit" display="block" underline="none">
                    About Us
                  </Link>
                  <Link href="#" color="inherit" display="block" underline="none">
                    Tours
                  </Link>
                  <Link href="#" color="inherit" display="block" underline="none">
                    Careers
                  </Link>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="h6" fontWeight="bold">
                  Contact
                </Typography>
                <Box mt={2}>
                  <Typography>+91 987654321</Typography>
                  <Typography>info@tripgo.com</Typography>
                  <Typography>support@tripgo.com</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Right Section: Arrow Button & Image */}
          <Grid item xs={12} md={2} textAlign="end" justifyContent="space-between">
            <IconButton
              sx={{
                color: "white",
                border: "1px solid white",
                padding: "10px",
                marginBottom: "0px",
               
              }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowUpwardIcon />
            </IconButton>

            {/* Footer Image */}
            <Box mt={2} >
              <img src={Logo1} alt="Footer Logo" style={{ width: "200px", height: "100px" }} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default Footer;
