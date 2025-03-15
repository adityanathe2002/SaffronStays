import { ArrowCircleRightRounded, FacebookOutlined, Instagram, Twitter, YouTube } from '@mui/icons-material';
import { Box, Grid, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { staysContext } from '../AppContext/TentsContext';

const SocialMedia = () => {
    const {theme} = useContext(staysContext)
    return (
        <Paper
            data-aos="zoom-up"
            data-aos-duration="2000"
            sx={{ display: "flex", marginTop: "30px", flexWrap: "wrap",bgcolor: theme === 'dark'? '#292A2D' : 'white',color: theme==='dark'? 'white':'' }} >
            {/* Social Media Section */}
            <Grid sx={{ width: { xs: '100%', md: '50%' }, height: "150px" }} className='border-r-1 flex flex-col items-center justify-center gap-3'>
                <Typography variant="h6" fontWeight="bold">
                    Leading the way in adventure
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                    <FacebookOutlined fontSize="large" />
                    <Instagram fontSize="large" />
                    <Twitter fontSize="large" />
                    <YouTube fontSize="large" />
                </Box>
            </Grid>

            {/* Newsletter Section */}
            <Grid sx={{ width: { xs: '100%', md: '50%' }, height: "150px" }} className='flex items-center justify-center gap-3'>
                <Typography variant="h6" fontWeight="bold">
                    Join our Newsletter
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Enter your email"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <ArrowCircleRightRounded fontSize="large" sx={{ color: 'black' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </Grid>
        </Paper>
    );
}

export default SocialMedia;
