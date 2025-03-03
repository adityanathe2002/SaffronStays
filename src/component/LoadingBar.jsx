import React from "react";
import { Skeleton, Box, Grid, Card, CardContent, AppBar, Toolbar, Container, LinearProgress } from "@mui/material";

const LoadingBar = () => {


  return (
    <Box sx={{ width: "100%" }}>
    <LinearProgress variant="determinate"  />
      {/* Navbar Skeleton */}
      <AppBar position="static" color="grey.500" sx={{mt:1}}>
        <Toolbar>
          <Skeleton variant="rectangular" width={120} height={40} sx={{ bgcolor: "grey.500" }} />
          <Box sx={{ flexGrow: 1 }} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} sx={{ mx: 1 }} />
          <Skeleton variant="circular" width={40} height={40} />
        </Toolbar>
      </AppBar>

      {/* Hero Section Skeleton */}
      <Box sx={{ width: "100%", height: 300, mt: 2 }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Box>

      {/* Cards Section Skeleton */}
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <Skeleton variant="rectangular" width="100%" height={180} />
                <CardContent>
                  <Skeleton variant="text" width="80%" height={20} />
                  <Skeleton variant="text" width="60%" height={20} sx={{ mt: 1 }} />
                  <Skeleton variant="text" width="90%" height={20} sx={{ mt: 1 }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LoadingBar;
