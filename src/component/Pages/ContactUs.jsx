
import { useEffect, useMemo, useState } from "react"
import { Container, Typography, Grid, Box, TextField, Button, Card, CardContent, IconButton } from "@mui/material"
import { Phone, Email, LocationOn, Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material"
import HeroImg from '../../assets/About/contact.jpg'
const ContactUs = () => {
    const [zoom, setZoom] = useState(1);
      useEffect(() => {
          const interval = setInterval(() => {
              setZoom((prevZoom) => (prevZoom === 1 ? 1.2 : 1));
          }, 5000);
          return () => clearInterval(interval);
      }, []);
  
      const transformStyle = useMemo(() => ({
          transform: `scale(${zoom})`,
          transition: 'transform 5s ease-in-out',
      }), [zoom]);
 
  return (
    <Box className="overflow-hidden mt-0.5">
      {/* Hero Section */}
      <Box
        className="relative flex items-center justify-center bg-cover bg-center h-[40vh] md:h-[100vh]"
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(${HeroImg})`,
          ...transformStyle
        }}
      >
        <div className="absolute "></div>
        <Container maxWidth="lg" className="relative z-10 text-center">
          <Typography variant="h2" component="h1" className="text-white font-bold mb-4" data-aos="fade-up">
            Contact Us
          </Typography>
          <Typography variant="h5" className="text-white" data-aos="fade-up" data-aos-delay="100">
            Get in touch with Saffron Stays
          </Typography>
        </Container>
      </Box>

      {/* Contact Information and Form Section */}
      <Container maxWidth="lg" className="py-16">
        <Grid container spacing={6}>
          {/* Contact Information */}
          <Grid item xs={12} md={5} data-aos="fade-right">
            <Typography variant="h4" component="h2" className="font-bold mb-6">
              Get In Touch
            </Typography>
            <Typography variant="body1" className="mb-8">
              Have questions about our properties or need help planning your stay? Our team is here to assist you.
            </Typography>
            <Box className="space-y-4">
              <Box className="flex items-center space-x-4">
                <LocationOn className="text-yellow-400" />
                <Typography variant="body1">123 Hospitality Lane, Mumbai, Maharashtra 400001, India</Typography>
              </Box>
              <Box className="flex items-center space-x-4">
                <Phone className="text-yellow-400" />
                <Typography variant="body1">+91 98765 43210</Typography>
              </Box>
              <Box className="flex items-center space-x-4">
                <Email className="text-yellow-400" />
                <Typography variant="body1">info@saffronstays.com</Typography>
              </Box>
            </Box>
            <Box className="mt-8">
              <Typography variant="h6" className="mb-4">
                Follow Us
              </Typography>
              <Box className="flex space-x-4">
                <IconButton className="bg-gray-100 hover:bg-yellow-100">
                  <Facebook />
                </IconButton>
                <IconButton className="bg-gray-100 hover:bg-yellow-100">
                  <Twitter />
                </IconButton>
                <IconButton className="bg-gray-100 hover:bg-yellow-100">
                  <Instagram />
                </IconButton>
                <IconButton className="bg-gray-100 hover:bg-yellow-100">
                  <LinkedIn />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7} data-aos="fade-left">
            <Card className="shadow-lg rounded-lg overflow-hidden">
              <CardContent className="p-8">
                <Typography variant="h5" component="h3" className="font-bold mb-6">
                  Send Us a Message
                </Typography>
                <form className="space-y-4">
                  <TextField fullWidth label="Your Name" variant="outlined" className="bg-white" />
                  <TextField fullWidth label="Your Email" variant="outlined" className="bg-white" />
                  <TextField fullWidth label="Subject" variant="outlined" className="bg-white" />
                  <TextField
                    fullWidth
                    label="Your Message"
                    variant="outlined"
                    multiline
                    rows={4}
                    className="bg-white"
                  />
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    className="bg-yellow-400 text-gray-800 hover:bg-yellow-500 mt-4"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Map Section */}
      <Box className="bg-gray-100 py-16">
  <Container maxWidth="lg">
    <Typography
      variant="h4"
      component="h2"
      className="font-bold mb-8 text-center"
      data-aos="fade-up"
    >
      Find Us Here
    </Typography>

    <Box
      className="w-full h-[400px] rounded-lg overflow-hidden"
      data-aos="zoom-in"
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.2498570421017!2d73.8421569746521!3d18.51760786926578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c079d4c6d387%3A0x2ef12f3e384c82a!2sQspiders%20Pune%20Deccan%20Gymkhana!5e0!3m2!1sen!2sin!4v1740677275524!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </Box>
  </Container>
</Box>
    </Box>
  )
}

export default ContactUs

