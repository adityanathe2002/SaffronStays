import React, { useState, useReducer } from "react";
import { TextField, Button, Box, Typography, IconButton, InputAdornment, Checkbox, FormControlLabel } from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "../../assets/Register/login.jpg";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
  username: "",
  email: "",
  contact: "",
  password: "",
  isChecked: false,
  error: "",
  success: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ERROR":
      return { ...state, error: action.value, success: "" };
    case "SET_SUCCESS":
      return { ...state, success: action.value, error: "" };
    case "TOGGLE_CHECKBOX":
      return { ...state, isChecked: !state.isChecked };
    default:
      return state;
  }
};

const SignUp = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("Password must be at least 6 characters long.");
  const [showPasswordTip, setShowPasswordTip] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const handlePasswordChange = (value) => {
    handleChange("password", value);
    if (value.length < 6) {
      setPasswordMessage("Password must be at least 6 characters long.");
      setShowPasswordTip(true);
    } else {
      setPasswordMessage("✅ Password looks good!");
      setShowPasswordTip(true);
      setTimeout(() => setShowPasswordTip(false), 2000);
    }
  };

  const validateForm = () => {
    if (!state.username || !state.email || !state.password || !state.contact) {
      dispatch({ type: "SET_ERROR", value: "All fields are required" });
      return false;
    }
    if (state.username.length < 3) {
      dispatch({ type: "SET_ERROR", value: "Username must be at least 3 characters long." });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(state.email)) {
      dispatch({ type: "SET_ERROR", value: "Please enter a valid email." });
      return false;
    }
    if (state.password.length < 6) {
      dispatch({ type: "SET_ERROR", value: "Password must be at least 6 characters long." });
      return false;
    }
    if (!/^\d{10}$/.test(state.contact)) {
      dispatch({ type: "SET_ERROR", value: "Contact number must be exactly 10 digits." });
      return false;
    }
    if (!state.isChecked) {
      dispatch({ type: "SET_ERROR", value: "You must agree to the Terms & Conditions." });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = {
      username: state.username,
      email: state.email,
      contact: state.contact,
      password: state.password,
    };

    try {
      const existingUser = await axios.get(`http://localhost:5000/users?email=${state.email}`);
      if (existingUser.data.length > 0) {
        dispatch({ type: "SET_ERROR", value: "User with this email already exists!" });
        return;
      }

      await axios.post("http://localhost:5000/users", data, { headers: { "Content-Type": "application/json" } });
      dispatch({ type: "SET_SUCCESS", value: "Sign up successful!" });
      toast.success("Sign Up successful!",{duration: 2000});
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Signup error:", error);
      dispatch({ type: "SET_ERROR", value: "Signup failed! Please try again." });
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "101vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${Login})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box sx={{ width: { xs: "90%", sm: "60%", md: "40%" }, p: 3, bgcolor: "white",color:"black" , opacity: 0.8, boxShadow: 3, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ textAlign: "center", mb: 1, fontWeight: "bold" }}>Sign Up</Typography>
        <Typography variant="h5" sx={{ textAlign: "center", mb: 1, fontWeight: "bold" }}>Welcome To SaffronStays</Typography>
        <Typography variant="body2" sx={{ textAlign: "center", mb: 2, fontWeight: "" }}>Sign up for exclusive offers</Typography>
        {state.error && <Typography color="error" sx={{ textAlign: "center" }}>{state.error}</Typography>}
        {state.success && <Typography color="success.main" sx={{ textAlign: "center" }}>{state.success}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField label="Username" name="username" variant="outlined" fullWidth sx={{ mb: 2 }} onChange={(e) => handleChange("username", e.target.value)} />
          <TextField label="Email" name="email" type="email" variant="outlined" fullWidth sx={{ mb: 2 }} onChange={(e) => handleChange("email", e.target.value)} />
          <TextField label="Contact" name="contact" type="tel" variant="outlined" fullWidth sx={{ mb: 2 }} onChange={(e) => handleChange("contact", e.target.value)} />
          <TextField label="Password" name="password" type={showPassword ? "text" : "password"} variant="outlined" fullWidth sx={{ mb: 2 }} onChange={(e) => handlePasswordChange(e.target.value)} InputProps={{ endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</IconButton></InputAdornment> }} />
          {showPasswordTip && <Typography sx={{ fontSize: "12px", color: "gray" }}>{passwordMessage}</Typography>}
          <FormControlLabel sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} control={<Checkbox checked={state.isChecked} onChange={() => dispatch({ type: "TOGGLE_CHECKBOX" })} />} label="I agree to the Terms & Conditions" />
          <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: "#464646", color: "white", p: 1.5, "&:hover": { bgcolor: "#202020" } }}>Sign Up</Button>
          <Typography sx={{ textAlign: "center", mt: 2 }}>Already a member? <Link to="/login"><Typography variant="p" sx={{ color: "#38BCF8" }}>Sign In</Typography></Link></Typography>
        </form>
      </Box>
    </Box>
  );
};
export default SignUp;



