import axios from "axios";
import React, { useEffect, useContext } from "react";
import { staysContext } from "../AppContext/TentsContext";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
} from "@mui/material";

const BookingHistory = () => {
  const { bookingData, setBookingData } = useContext(staysContext);

  useEffect(() => {
    axios.get("http://localhost:5000/bookingDetails").then((resp) => {
      setBookingData(resp.data);
    });
  }, []);

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
        Booking History
      </Typography>

      <Divider sx={{ marginY: "20px" }} />

      {bookingData.length > 0 ? (
        bookingData.map((booking, index) => (
          <Card key={index} sx={{ marginBottom: 2, padding: 2, }}>
            <CardContent >
              <Typography variant="h6" fontWeight="bold">
                Booking Details
              </Typography>
              <Typography>
                <strong>Name:</strong> {booking.userDetails.name}
              </Typography>
              <Typography>
                <strong>Email:</strong> {booking.userDetails.email}
              </Typography>
              <Typography>
                <strong>Phone:</strong> {booking.userDetails.phone}
              </Typography>
              <Typography>
                <strong>Payment Method:</strong> {booking.userDetails.paymentMethod}
              </Typography>

              <Divider sx={{ marginY: "10px" }} />

              {booking.bookings.map((stay, idx) => (
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
        ))
      ) : (
        <Typography>No previous bookings found.</Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          width: { xs: "100%", sm: "auto" },
          marginTop: "20px",
        }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default BookingHistory;
