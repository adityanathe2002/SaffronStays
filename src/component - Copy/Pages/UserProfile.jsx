import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Avatar, Card, CardContent, Button, TextField, Select, MenuItem, LinearProgress } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { staysContext } from "../AppContext/TentsContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { userDetails, isLoggedIn } = useContext(staysContext);
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contact: "",
    gender: "",
    tal: "",
    dist: "",
    state: "",
    profilePic: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((resp) => {
      const matchedUser = resp.data.find((user) => user.email === userDetails.email);
      if (matchedUser) {
        setUserData(matchedUser);
        setFormData(matchedUser);
      }
    }).catch((error) => {
      console.error("Error fetching user data:", error);
    });
  }, [userDetails.email]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:5000/users/${userData.id}`, formData)
      .then((resp) => {
        setUserData(resp.data);
        setEditing(false);
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  return (
    isLoggedIn ? (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "auto", p: 2 }}>
        <Card sx={{ maxWidth: 400, width: "100%", textAlign: "center", p: 3, boxShadow: 3, borderRadius: 3 }}>
          <label htmlFor="profile-pic-upload">
            <Avatar
              sx={{ bgcolor: deepPurple[500], width: 80, height: 80, fontSize: 32, margin: "auto", cursor: "pointer" }}
              src={formData.profilePic || ""}
            >
              {!formData.profilePic ? userData?.username.charAt(0).toUpperCase() : ""}
            </Avatar>
          </label>
          <input id="profile-pic-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />

          <CardContent>
            {userData ? (
              editing ? (
                <>
                  <TextField label="Username" name="username" fullWidth margin="dense" value={formData.username} onChange={handleChange} variant="outlined" sx={{ mb: 2, borderRadius: 2 }} />
                  <TextField label="Email" name="email" fullWidth margin="dense" value={formData.email} disabled variant="outlined" sx={{ mb: 2, borderRadius: 2 }} />
                  <TextField label="Contact" name="contact" fullWidth margin="dense" value={formData.contact} onChange={handleChange} variant="outlined" sx={{ mb: 2, borderRadius: 2 }} />
                  <Select name="gender" fullWidth value={formData.gender} onChange={handleChange} variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  <TextField label="Taluka" name="tal" fullWidth margin="dense" value={formData.tal} onChange={handleChange} variant="outlined" sx={{ mb: 2, borderRadius: 2 }} />
                  <TextField label="District" name="dist" fullWidth margin="dense" value={formData.dist} onChange={handleChange} variant="outlined" sx={{ mb: 2, borderRadius: 2 }} />
                  <TextField label="State" name="state" fullWidth margin="dense" value={formData.state} onChange={handleChange} variant="outlined" sx={{ mb: 2, borderRadius: 2 }} />
                  <Button onClick={handleUpdate} variant="contained" sx={{ mt: 2, borderRadius: 2 }}>Save</Button>
                  <Button onClick={() => setEditing(false)} variant="text" sx={{ mt: 1 }}>Cancel</Button>
                </>
              ) : (
                <>
                  <Typography variant="h5" fontWeight="bold">{userData.username}</Typography>
                  <Typography variant="body1" color="text.secondary">{userData.email}</Typography>
                  <Typography variant="body1" color="text.secondary">{userData.contact}</Typography>
                  <Typography variant="body1" color="text.secondary">Gender: {userData.gender || "N/A"}</Typography>
                  <Typography variant="body1" color="text.secondary">Address: {`${userData.tal || "N/A"}, ${userData.dist || "N/A"}, ${userData.state || "N/A"}`}</Typography>
                  <Button onClick={() => setEditing(true)} variant="contained" sx={{ mt: 2, borderRadius: 2 }}>Edit Profile</Button>
                </>
              )
            ) : (
              <Typography variant="h6" color="text.secondary">User not found</Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    ) : (
      <Box sx={{ width: "100%", height: "80vh" }}>
        <LinearProgress />
      </Box>
    )
  );
};

export default UserProfile;
