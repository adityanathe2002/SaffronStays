import { Box, Button, Card, CardContent, Container, Grid, Typography, LinearProgress, Paper, TextField, Rating, MenuItem } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import mainImg from '../../../assets/About/about2.jpg'
import { staysContext } from '../../AppContext/TentsContext';

const ProductDetailSection4 = () => {
    const location = useLocation();
    const {theme} = useContext(staysContext)
    const { val, stayType } = location.state || {};
    const [visibleReviews, setVisibleReviews] = useState(2);
    const [expanded, setExpanded] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);

    const handleToggle = () => {
        if (expanded) {
            setVisibleReviews(2);
        } else {
            setVisibleReviews(val.reviews.length);
        }
        setExpanded(!expanded);
    };

    const RatingBar = ({ label, value }) => (
        <Box sx={{ width: "100%", mb: 2, height: "", }}>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>{label}</Typography>
                <Typography variant="body2">{value.toFixed(1)}/5</Typography>
            </Box>
            <LinearProgress
                variant="determinate"
                value={(value / 5) * 100}
                sx={{
                    height: 8,
                    borderRadius: 2,
                    backgroundColor:"whitesmoke",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#38BCF8" }
                }}
            />

        </Box>
    );


    const [reviewData, setReviewData] = useState({
        custName: "",
        date: new Date().toISOString().split("T")[0], // Default to today’s date
        categoryUsed: "",
        review: "",
        rating: 0,
    });

    const categories = ["tents", "hotels", "homestays", "camps", "villas", "farmhouses", "cottages", "apartments", "treehouses"];

    const handleChange = (e) => {
        setReviewData({ ...reviewData, [e.target.name]: e.target.value });
    };

    const handleRatingChange = (event, newValue) => {
        setReviewData({ ...reviewData, rating: newValue });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Review:", reviewData);
        setShowReviewForm(false);
    }

    return (
        <Container sx={{ mt: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: "700", mb: 2, borderBottom: "2px solid grey", width: "10%", borderImage: 'linear-gradient(to right, black, white) 5' }}>Reviews</Typography>

            {/* Ratings Display Section */}
            <Box sx={{ width: "100%", display: "flex", gap: 3, }}>
                <Box sx={{ width: { xs: "100%", lg: "50%" }, height: { xs: "50vh", lg: "60vh" }, p: 2, border: "1px solid #ddd",borderRadius: 2, boxShadow: 3, mb: 3, display: "flex", flexDirection: "column", gap: 5, bgcolor: theme === 'dark'? '#292A2D' : 'white', }}>
                    {Object.entries(val.ratings).map(([key, value]) => (
                        <RatingBar key={key} label={key.replace(/([A-Z])/g, ' $1')} value={value}  />
                    ))}

                </Box>
                <Paper sx={{ width: "50%", height: "60vh", display: { xs: "none", sm: "block" } }} >
                    <Box component="img" src={mainImg} sx={{ width: "100%", height: "100%", borderRadius: "5px" }} />
                </Paper>
            </Box>

            {/* Reviews Section */}
            <Box sx={{ display: "flex", flexWrap: "wrap", }}>
                <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap", p: 2, borderTop: "0.1px solid gray", borderBottom: "0.1px solid gray", }}>
                    <Grid container spacing={2}>
                        {val.reviews.slice(0, visibleReviews).map((review) => (
                            <Grid item xs={12} sm={6} key={review.id}>
                                <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3 , bgcolor: theme === 'dark'? '#292A2D' : 'white', color: theme==='dark'? 'white':'black'}}>
                                    <CardContent>
                                        <Typography variant="body1" sx={{ mt: 1 }}>{review.review}</Typography>
                                        <Typography variant="body1" sx={{ mt: 1 }}>⭐ {review.rating} {review.categoryUsed}</Typography>
                                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>{review.custName}</Typography>
                                        <Typography variant="caption" color="textSecondary" sx={{color: theme==='dark'? 'white': ""}}>{review.date}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box sx={{ width: "100%", textAlign: "center", mt: 2,display:"flex", gap:5, justifyContent:"center" }}>
                    <Button variant="contained" sx={{ backgroundColor: "#464646" }} onClick={handleToggle}>
                        {expanded ? "Show Less" : "Load More"}
                    </Button>
                    <Button variant="contained" sx={{ backgroundColor: "#464646" }}onClick={() => setShowReviewForm(!showReviewForm)}>
                    {showReviewForm ? "Close Review" : "Add Review"}
                </Button>
                </Box>
            </Box>
            {/* <Box
                sx={{
                    maxWidth: 400,
                    mx: "auto",
                    mt: 4,
                    p: 3,
                    border: "1px solid gray",
                    borderRadius: "10px",
                    boxShadow: 2,
                }}
            >
                <Typography variant="h5" mb={2}>
                    Submit a Review
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="custName"
                        value={reviewData.custName}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Date"
                        name="date"
                        type="date"
                        value={reviewData.date}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        select
                        fullWidth
                        label="Category Used"
                        name="categoryUsed"
                        value={reviewData.categoryUsed}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    >
                        {categories.map((category, index) => (
                            <MenuItem key={index} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        fullWidth
                        label="Review"
                        name="review"
                        multiline
                        rows={3}
                        value={reviewData.review}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <Typography>Rating:</Typography>
                        <Rating
                            name="rating"
                            value={reviewData.rating}
                            onChange={handleRatingChange}
                        />
                    </Box>
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Submit Review
                    </Button>
                </form>
            </Box> */}

            {/* <Box sx={{ textAlign: "center", mt: 3 }}>
               
            </Box> */}

            {showReviewForm && (
                <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 3, border: "1px solid gray", borderRadius: "10px", boxShadow: 2, backgroundColor : theme ? "white":"white"  }}>
                    <Typography mb={2}  sx={{ color: theme === "dark" ? "white" : "black"}} >Submit a Review</Typography>
                    <form onSubmit={handleSubmit} >
                        <TextField fullWidth label="Name" name="custName" value={reviewData.custName} onChange={handleChange} sx={{ mb: 2 }} />
                        <TextField fullWidth label="Date" name="date" type="date" value={reviewData.date} onChange={handleChange} sx={{ mb: 2 }} />
                        <TextField select fullWidth label="Category Used" name="categoryUsed" value={reviewData.categoryUsed} onChange={handleChange} sx={{ mb: 2 }}>
                            {categories.map((category, index) => (
                                <MenuItem key={index} value={category}>{category}</MenuItem>
                            ))}
                        </TextField>
                        <TextField fullWidth label="Review" name="review" multiline rows={3} value={reviewData.review} onChange={handleChange} sx={{ mb: 2 }} />
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                            <Typography>Rating:</Typography>
                            <Rating name="rating" value={reviewData.rating} onChange={handleRatingChange} />
                        </Box>
                        <Button variant="contained" color="primary" type="submit" fullWidth>Submit Review</Button>
                    </form>
                </Box>
            )}

        </Container>
    );
}

export default ProductDetailSection4
