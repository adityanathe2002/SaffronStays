import React, { useContext, useEffect, useState } from "react";
import { staysContext } from "../AppContext/TentsContext";
import axios from "axios";
import { Box, Typography, Button, Card, CardContent, CardMedia, Divider, IconButton, TextField, MenuItem, Grid, } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs"; // To handle date calculations
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const { addCart, setAddCart, isLoggedIn, setIsLoggedIn, theme, confirmOrder, setConfirmOrder } = useContext(staysContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dates, setDates] = useState({});
  const [guests, setGuests] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (confirmOrder) {
      setAddCart([]); // Clear the cart
      setConfirmOrder(false); // Reset the confirmOrder state
    }
  }, [confirmOrder, setAddCart, setConfirmOrder]);
console.log(confirmOrder);

  useEffect(() => {
    axios
      .get("http://localhost:5000/cart")
      .then((resp) => {
        setAddCart(resp.data);
        calculateTotal(resp.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const calculateTotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      const fromDate = dates[item.id]?.from || dayjs().format("YYYY-MM-DD");
      const toDate = dates[item.id]?.to || dayjs().add(1, "day").format("YYYY-MM-DD");

      const nights = dayjs(toDate).diff(dayjs(fromDate), "day") || 1;
      const totalGuests = (guests[item.id]?.adults || 1) + (guests[item.id]?.children || 0);

      total += item.prices.afterDiscount * nights * totalGuests;
    });
    setTotalPrice(total);
  };

  const handleDateChange = (id, type, value) => {
    setDates((prev) => ({
      ...prev,
      [id]: { ...prev[id], [type]: value },
    }));
    calculateTotal(addCart);
  };

  const handleGuestChange = (id, type, value) => {
    setGuests((prev) => ({
      ...prev,
      [id]: { ...prev[id], [type]: value },
    }));
    calculateTotal(addCart);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${id}`);
      const updatedCart = addCart.filter((item) => item.id !== id);
      setAddCart(updatedCart);
      calculateTotal(updatedCart);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleProceedToCheckout = async () => {
    if (addCart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const bookings = addCart.map((stay) => {
      const fromDate = dates[stay.id]?.from;
      const toDate = dates[stay.id]?.to;
      const totalGuests = (guests[stay.id]?.adults || 1) + (guests[stay.id]?.children || 0);

      // Validation: Ensure all details are filled
      if (!fromDate || !toDate || totalGuests < 1) {
        alert("Please select check-in & check-out dates and guests for all items before proceeding.");
        return null; // Stop processing if any booking is incomplete
      }

      return {
        campId: stay.id,
        campName: stay.campName,
        fromDate,
        toDate,
        adults: guests[stay.id]?.adults || 1,
        children: guests[stay.id]?.children || 0,
        totalGuests,
        pricePerNight: stay.prices.afterDiscount,
        totalPrice: stay.prices.afterDiscount * dayjs(toDate).diff(dayjs(fromDate), "day"),
      };
    });

    // Check if all bookings are valid
    if (bookings.includes(null)) return;

    try {
      // Store booking data in database via /bookNow API
      await axios.post("http://localhost:5000/bookNow", { bookings });
      // alert("Booking details saved! Redirecting to checkout...");

      // Redirect to Checkout Page
      // window.location.href = "/checkoutpage";
      navigate("/checkoutpage")
    } catch (error) {
      console.error("Error storing booking data:", error);
      alert("Something went wrong. Please try again.");
    }
  };


  return (
    <Box sx={{ padding: { xs: "10px", sm: "20px" }, maxWidth: "900px", margin: "auto", textAlign: "center" }}>
      {isLoggedIn ? (
        <>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Complete Your Booking
          </Typography>
          <Typography variant="body2"  gutterBottom  sx={{color: theme === "dark" ? "#666666" : "#666666",}} >
            Choose your dates, select guests, and finalize your stay!
          </Typography>

          <Divider sx={{ marginY: "20px" }} />

          {addCart.length > 0 ? (
            <>
              {addCart.map((stay) => (
                <Card key={stay.id} sx={{ marginBottom: "15px", display: "flex", flexDirection: { xs: "column", sm: "row" }, textAlign: "left", bgcolor: theme === 'dark' ? "#292A2D" : "", color: theme === 'dark' ? "white" : "" }}>
                  <CardMedia
                    component="img"
                    sx={{ width: { xs: "100%", sm: 220 }, height: { xs: 180, sm: 200 }, p: 1, borderRadius: "20px" }}
                    image={stay.about.images[0] || "https://via.placeholder.com/180"}
                    alt={stay.campName}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="bold">{stay.campName}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ color: theme === 'dark' ? "white" : "#666666" }}> {stay.address.tal}</Typography>
                    <Typography variant="body1" sx={{ marginTop: "10px" }}>Price: ₹{stay.prices.afterDiscount}</Typography>

                    <Grid container spacing={2} sx={{ marginTop: "10px" }}>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          fullWidth
                          type="date"
                          size="small"
                          value={dates[stay.id]?.from || ""}
                          onChange={(e) => handleDateChange(stay.id, "from", e.target.value)}
                          label="Check-in"
                          sx={{
                            "& .MuiInputBase-input": {
                              color: theme === "dark" ? "#666666" : "black", // Ensures input text color
                            },
                            "& .MuiInputLabel-root": {
                              color: theme === "dark" ? "#666666" : "#666666", // Adjusts label color
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: theme === "dark" ? "white" : "#666666", // Border color
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: theme === "dark" ? "#38BCF8" : "#1976d2", // Hover effect
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: theme === "dark" ? "#38BCF8" : "#1976d2", // Focus effect
                            }
                          }}
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ min: dayjs().format("YYYY-MM-DD") }}
                        />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          fullWidth
                          type="date"
                          size="small"
                          value={dates[stay.id]?.to || ""}
                          onChange={(e) => handleDateChange(stay.id, "to", e.target.value)}
                          label="Check-out"
                          sx={{
                            "& .MuiInputBase-input": {
                              color: theme === "dark" ? "#666666" : "black", // Ensures input text color
                            },
                            "& .MuiInputLabel-root": {
                              color: theme === "dark" ? "#666666" : "#666666", // Adjusts label color
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: theme === "dark" ? "white" : "#666666", // Border color
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: theme === "dark" ? "#38BCF8" : "#1976d2", // Hover effect
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: theme === "dark" ? "#38BCF8" : "#1976d2", // Focus effect
                            }
                          }}
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ min: dates[stay.id]?.from || dayjs().format("YYYY-MM-DD") }}
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ marginTop: "10px" }}>
                      <Grid item xs={6} sm={3}>
                        <TextField
                          fullWidth
                          select
                          size="small"
                          value={guests[stay.id]?.adults || 1}
                          onChange={(e) => handleGuestChange(stay.id, "adults", parseInt(e.target.value))}
                          label="Adults"
                          sx={{
                            "& .MuiInputBase-input": {
                              color: theme === "dark" ? "#666666" : "black", // Ensures input text color
                            },
                            "& .MuiInputLabel-root": {
                              color: theme === "dark" ? "#666666" : "#666666", // Adjusts label color
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: theme === "dark" ? "white" : "#666666", // Border color
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: theme === "dark" ? "#38BCF8" : "#1976d2", // Hover effect
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: theme === "dark" ? "#38BCF8" : "#1976d2", // Focus effect
                            }
                          }}
                        >
                          {[1, 2, 3, 4, 5].map((num) => (
                            <MenuItem key={num} value={num}>{num}</MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <TextField
                          fullWidth
                          select
                          size="small"
                          value={guests[stay.id]?.children || 0}
                          onChange={(e) => handleGuestChange(stay.id, "children", parseInt(e.target.value))}
                          label="Children"
                          sx={{
                            "& .MuiInputBase-input": {
                              color: theme === "dark" ? "#666666" : "black", // Ensures input text color
                            },
                            "& .MuiInputLabel-root": {
                              color: theme === "dark" ? "#666666" : "#666666", // Adjusts label color
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: theme === "dark" ? "white" : "#666666", // Border color
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: theme === "dark" ? "#38BCF8" : "#1976d2", // Hover effect
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: theme === "dark" ? "#38BCF8" : "#1976d2", // Focus effect
                            }
                          }}
                        >
                          {[0, 1, 2, 3, 4, 5].map((num) => (
                            <MenuItem key={num} value={num}>{num}</MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={6} textAlign="center">
                        <Typography variant="body1">
                          Total Guests: {(guests[stay.id]?.adults || 1) + (guests[stay.id]?.children || 0)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>

                  <IconButton onClick={() => handleDelete(stay.id)} color="error" sx={{ display: { xs: "none", sm: "block" } }}>
                    <DeleteIcon />
                  </IconButton>
                  <Button onClick={() => handleDelete(stay.id)} color="error" sx={{ display: { xs: "block", sm: "none" } }}>
                    Remove
                  </Button>
                </Card>
              ))}

              <Divider sx={{ marginY: "20px" }} />

              <Typography variant="h5" fontWeight="bold">
                Total Price: ₹{totalPrice}
              </Typography>

              <Link>
                <Button variant="contained" color="primary" size="large" sx={{ marginTop: "20px", width: { xs: "100%", sm: "auto" } }} onClick={handleProceedToCheckout}>
                  Proceed to Checkout
                </Button>
              </Link>
            </>
          ) : (
            <Typography variant="h6" color="text.secondary" sx={{ height: "30vh" }}>
              Your cart is empty. Start adding your favorite camps now!
            </Typography>
          )}
        </>
      ) : (
        <Box sx={{ width: "100%", height: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
          <Typography variant="h6" color="text.secondary">
            Please log in to view your cart details.
          </Typography>
          <Link to="/login">
            <Button variant="contained">Login</Button>
          </Link>
        </Box>
      )}
    </Box>
  );

};

export default CartPage;
