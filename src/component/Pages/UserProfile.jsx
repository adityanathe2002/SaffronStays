import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Avatar, Card, CardContent, LinearProgress } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { staysContext } from "../AppContext/TentsContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { userDetails, isLoggedIn, setIsLoggedIn } = useContext(staysContext);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn])

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((resp) => {
      const matchedUser = resp.data.find((user) => user.email === userDetails.email);
      if (matchedUser) {
        setUserData(matchedUser);
      }
    }).catch((error) => {
      console.error("Error fetching user data:", error);
    });
  }, [userDetails.email]);

  return (

    isLoggedIn ? (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          p: 2,
        }}
      >
        <Card
          sx={{
            maxWidth: 400,
            width: "100%",
            textAlign: "center",
            p: 3,
            boxShadow: 3,
          }}
        >
          <Avatar
            sx={{
              bgcolor: deepPurple[500],
              width: 80,
              height: 80,
              fontSize: 32,
              margin: "auto",
            }}
          >
            {userData ? userData.username.charAt(0).toUpperCase() : "?"}
          </Avatar>

          <CardContent>
            {userData ? (
              <>
                <Typography variant="h5" fontWeight="bold">
                  {userData.username}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {userData.email}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {userData.contact}
                </Typography>
              </>
            ) : (
              <Typography variant="h6" color="text.secondary">
                User not found
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    ) :(
      <Box sx={{ width: '100%',height:"80vh" }}>
      <LinearProgress />
    </Box>
    )

  );
};

export default UserProfile;
