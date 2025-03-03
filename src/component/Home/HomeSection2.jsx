import { Box, Container, Paper, Typography } from '@mui/material';
import React from 'react';
import img1 from '../../assets/HomePage/img1.png';
import img2 from '../../assets/HomePage/img2.png';
import img3 from '../../assets/HomePage/img3.png';
import img4 from '../../assets/HomePage/img4.png';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { BiLeaf } from 'react-icons/bi';

const HomeSection2 = () => {
  return (
    <Container className="w-full h-auto flex-col justify-between mt-10">
      <Typography 
       data-aos="zoom-up"
      data-aos-duration="2000"
      variant="h5" className="mb-10 bg-amber-100 text-center flex gap-1 items-center justify-center" >
       Discover the Touch of Nature  
      </Typography>
      <Box
        className="grid sm:grid-cols-4 gap-4 sm:flex-row flex-col justify-center items-center">
        {/* Image 1 */}
        <Box
          // data-aos="fade-up"
          data-aos={window.innerWidth < 640 ? "zoom-in" : "fade-up"}
          className="relative">
          <Box component="img"
            src={img1} className="mt-10 sm:mt-4 " />
          <Typography className="absolute top-12 right-24 sm:top-6 sm:right-6 text-black bg-white px-2 py-1 rounded-xl">
            <LocationOnOutlinedIcon />Kokan
          </Typography>
        </Box>

        {/* Image 2 */}
        <Box
          // data-aos="fade-up"
          data-aos={window.innerWidth < 640 ? "zoom-in" : "fade-up"}
          data-aos-delay="200"
          className="relative">
          <Box component="img" src={img2} className="mt-4 sm:mt-20 sm:ml-0 ml-10" />
          <Typography className="absolute top-6 right-12 sm:top-22 sm:right-6 text-black bg-white px-2 py-1 rounded-xl">
            <LocationOnOutlinedIcon />   E.Coast
          </Typography>
        </Box>

        {/* Image 3 */}
        <Box
          // data-aos="fade-up"
          data-aos={window.innerWidth < 640 ? "zoom-in" : "fade-up"}
          data-aos-delay="300"
          className="relative">
          <Box component="img" src={img3} className="mt-4 sm:mt-0" />
          <Typography className="absolute top-6 right-24 sm:top-2 sm:right-6 text-black bg-white px-2 py-1 rounded-xl">
            <LocationOnOutlinedIcon /> Canada
          </Typography>
        </Box>

        {/* Image 4 */}
        <Box
          // data-aos="fade-up"
          data-aos={window.innerWidth < 640 ? "zoom-in" : "fade-up"}
          data-aos-delay="400"
          className="relative">
          <Box component="img" src={img4} className="mt-4 sm:mt-20 sm:ml-0 ml-20" />
          <Typography className="absolute top-6 right-4  sm:top-22 sm:right-6 text-black bg-white px-2 py-1 rounded-xl">
            <LocationOnOutlinedIcon /> Andaman
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default HomeSection2;
