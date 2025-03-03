import React, { useContext, useEffect } from "react";
import { staysContext } from "../AppContext/TentsContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
} from "@mui/material";
import toast from "react-hot-toast";

const ConfirmPage = () => {
  const { bookingData, setBookingData } = useContext(staysContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/bookingDetails")
      .then((resp) => {
        const data = resp.data;
        if (data.length > 0) {
          setBookingData(data[data.length - 1]); // Store only the last object
        }
      })
      .catch((error) => {
        console.error("Error fetching booking details:", error);
      });
  }, []);

  const handleConfirm = () => {
    toast.success("Booking Confirmed! ✅");
    navigate("/cart");
  };

  return (
    <Box
      sx={{
        padding: { xs: "10px", sm: "20px" },
        maxWidth: "900px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Confirm Your Booking
      </Typography>

      <Divider sx={{ marginY: "20px" }} />

      {bookingData ? ( // Ensure bookingData is available before rendering
        <Card sx={{ marginBottom: 2, padding: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              Booking Details
            </Typography>
            <Typography>
              <strong>Name:</strong> {bookingData.userDetails?.name}
            </Typography>
            <Typography>
              <strong>Email:</strong> {bookingData.userDetails?.email}
            </Typography>
            <Typography>
              <strong>Phone:</strong> {bookingData.userDetails?.phone}
            </Typography>
            <Typography>
              <strong>Payment Method:</strong> {bookingData.userDetails?.paymentMethod}
            </Typography>

            <Divider sx={{ marginY: "10px" }} />

            {bookingData.bookings?.map((stay, idx) => (
              <Box key={idx} sx={{ textAlign: "left", marginBottom: "10px" }}>
                <Typography variant="body1">
                  🏕 <strong>{stay.campName}</strong>
                </Typography>
                <Typography>
                  <strong>From:</strong> {stay.fromDate} | <strong>To:</strong> {stay.toDate}
                </Typography>
                <Typography>
                  <strong>Guests:</strong> {stay.totalGuests} (Adults: {stay.adults}, Children: {stay.children})
                </Typography>
                <Typography>
                  <strong>Price Per Night:</strong> ₹{stay.pricePerNight}
                </Typography>
                <Typography>
                  <strong>Total Price:</strong> ₹{stay.totalPrice}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      ) : (
        <Typography>No booking details found.</Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleConfirm}
        sx={{
          width: { xs: "100%", sm: "auto" },
          marginTop: "20px",
        }}
      >
        Confirm 
      </Button>
    </Box>
  );
};

export default ConfirmPage;
