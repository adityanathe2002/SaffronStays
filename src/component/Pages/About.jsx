import React, { useContext, useEffect, useMemo, useState } from "react";
import { Container, Typography, Grid, Box, Card, CardContent, CardMedia, Button, Paper, Avatar, IconButton, useTheme, useMediaQuery, } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn, LocationOn, Phone, Email, ArrowDownward } from "@mui/icons-material";
import AOS from "aos";
import "aos/dist/aos.css";
// import AboutHero from "../../assets/About/about.jpg";
import AboutHero from "../../assets/About/about5.jpg";
import toursImg from "../../assets/Hero/toursHero1.jpg";
import Tent from '../../assets/About/tent.webp'
import Apartment from '../../assets/About/apartment.webp'
import hotels from '../../assets/About/hotels.webp'
import farmhouse from '../../assets/About/farmhouse.webp'
import treehouse from '../../assets/About/treehouse.webp'
import cottages from '../../assets/About/cottages.webp'
import camps from '../../assets/About/camp.webp'
import homestays from '../../assets/About/homestay.webp'
import villa from '../../assets/About/villa.webp'
import CEO from '../../assets/About/prasad-sir.jpg'
import HOD from '../../assets/About/arvind-sir.jpg'
import EMP from '../../assets/About/adi.jpg'
import Founder from '../../assets/About/kedar-sir.jpg'
import Hero from '../../assets/HomePage/houseImg.jpg'
import SocialMedia from '../Footer/SocialMedia'
import { staysContext } from "../AppContext/TentsContext";

const About = () => {
    const { theme } = useContext(staysContext);
    const themes = useTheme();
    const isMobile = useMediaQuery(themes.breakpoints.down("sm"));
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

    const accommodationTypes = [
        {
            title: "Appartments",
            description:
                "Experience unparalleled comfort in our premium hotels with world-class amenities and personalized service.",
            image: Apartment
        },
        {
            title: "Tents",
            description:
                "Connect with nature without compromising on luxury in our specially designed glamping experiences.",
            image: Tent,
        },
        {
            title: "Camps",
            description:
                "Feel at home with spacious, fully-furnished apartments perfect for extended stays and family vacations.",
            image: camps,
        },
        {
            title: "Treehouses",
            description:
                "Elevate your stay literally with our unique treehouse accommodations offering panoramic views.",
            image: treehouse,
        },
        {
            title: "Farmhouses",
            description:
                "Immerse yourself in rural charm with our farmhouse stays featuring organic gardens and local experiences.",
            image: farmhouse,
        },
        {
            title: "Hotels",
            description:
                "Immerse yourself in rural charm with our farmhouse stays featuring organic gardens and local experiences.",
            image: hotels,
        },
        {
            title: "Villas",
            description:
                "Immerse yourself in rural charm with our farmhouse stays featuring organic gardens and local experiences.",
            image: villa,
        },
        {
            title: "Cottages",
            description:
                "Immerse yourself in rural charm with our farmhouse stays featuring organic gardens and local experiences.",
            image: cottages,
        },
        {
            title: "HomeStays",
            description:
                "Immerse yourself in rural charm with our farmhouse stays featuring organic gardens and local experiences.",
            image: homestays,
        },
    ];

    const teamMembers = [
        {
            name: "Kedarnath Sir",
            position: "Founder & CEO",
            bio: "With over 15 years in hospitality, Priya founded Saffron Stays with a vision to redefine experiential stays in India.",
            image: Founder,
        },
        {
            name: "Prasad Sir",
            position: "Chief Experience Officer",
            bio: "Rahul ensures every Saffron Stay delivers memorable experiences through innovative hospitality solutions.",
            image: CEO,
        },
        {
            name: "Arvind Sir",
            position: "Head of Design",
            bio: "Ananya brings spaces to life through thoughtful design that honors local culture while providing modern comfort.",
            image: HOD,
        },
        {
            name: "Aditya Nathe",
            position: "Operations Director",
            bio: "Vikram oversees the seamless functioning of all Saffron properties, maintaining our high standards of service.",
            image: EMP,
        },
    ];

    const testimonials = [
        {
            text: "Our stay at the Saffron treehouse was magical! The attention to detail and the warm hospitality made our anniversary truly special.",
            author: "Meera & Arjun",
            location: "Delhi",
        },
        {
            text: "The farmhouse retreat exceeded all expectations. From farm-to-table meals to guided nature walks, everything was perfect.",
            author: "The Kapoor Family",
            location: "Mumbai",
        },
        {
            text: "As a solo traveler, I felt completely at home in the boutique apartment. The staff went above and beyond to make my stay comfortable.",
            author: "Sarah Williams",
            location: "London",
        },
    ];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [])

    return (
        <Box className="overflow-hidden mt-1.2">
            {/* Hero Section */}
            <Box
                sx={{
                    height: { xs: "60vh", md: "100vh" },
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(${AboutHero})`,
                    opacity: "20",
                    // backgroundSize: zoom,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    ...transformStyle,

                }}
            >
                <div className="absolute inset-0 bg-opacity-20"></div>
                <Container maxWidth="lg" className="relative z-10">
                    <Box
                        className="flex justify-center top-20 h-screen relative"
                        data-aos="fade-up"
                    >

                        <Typography
                            className="text-white font-extrabold "
                            data-aos="Zoom-in"

                            sx={{
                                fontSize: { xs: "1rem", md: "2rem", lg: "2rem" },
                                position: "absolute",
                                textAlign: "center",
                                fontWeight: "800",
                                background: "linear-gradient(90deg,  #8B4513, #CD853F, #FFC0CB)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Nature is Calling—Answer with a Perfect Stay
                        </Typography>
                    </Box>
                </Container>
                <Box className="absolute left-1/2 bottom-5 transform -translate-x-1/2 animate-bounce">
                    <IconButton className="text-white">
                        <ArrowDownward sx={{ color: "white" }} />
                    </IconButton>
                </Box>
            </Box>

            {/* Our Story Section */}
            <Container maxWidth="lg" className="py-12 md:py-20">
                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12} md={6} data-aos="fade-right">
                        <Box
                            component="img"
                            src={toursImg} full
                            alt="Our Story"
                            className="rounded-lg shadow-lg"
                        />
                    </Grid>
                    <Grid item xs={12} md={6} data-aos="fade-left">
                        <Typography
                            className="text-yellow-400 tracking-widest"
                            variant="overline"
                            fontSize={40}
                            justifyItems="center"
                            alignItems="center"
                        >
                            OUR STORY
                        </Typography>
                        <Typography className="font-bold mb-3" variant="h3" component="h2">
                            A Journey of Passion & Hospitality
                        </Typography>
                        <Typography className="mb-4" variant="body1">
                            Founded in 2025, Saffron Stays began with a simple idea: to create
                            spaces where travelers could experience the authentic essence of a
                            destination while enjoying the comforts of a luxury stay.
                        </Typography>
                        <Typography className="mb-4" variant="body1">
                            What started as a single farmhouse in Maharashtra has grown into a
                            curated collection of over 100 unique properties across India -
                            from beachfront villas to mountain retreats, heritage havelis to
                            modern apartments.
                        </Typography>
                        <Typography className="mb-4" variant="body1">
                            Our name "Saffron" represents our commitment to providing
                            precious, authentic experiences that leave a lasting impression,
                            just like the rare and valuable spice.
                        </Typography>
                        <Box className="mt-6"></Box>
                    </Grid>
                </Grid>
            </Container>

            {/* Accommodation Types */}
            <Container maxWidth="lg">
                <Box className="text-center mb-12" data-aos="fade-up">
                    <Typography
                        className="text-yellow-400 tracking-widest"
                        variant="overline"
                        fontSize={40}
                    >
                        OUR ACCOMMODATIONS
                    </Typography>
                    <Typography
                        className=" mb-2 flex justify-center items-center"
                        variant="h5"
                        component="h2"
                    >
                        Unique Places to Stay
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {accommodationTypes.map((type, index) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <Card sx={{ bgcolor: theme === 'dark' ? '#292A2D' : 'white', }} className="h-full rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={type.image}
                                    alt={type.title}
                                    className="h-48 object-cover"

                                />
                                <CardContent sx={{ bgcolor: theme === 'dark' ? '#292A2D' : 'white', color: theme === 'dark' ? 'white' : '' }}>
                                    <Typography
                                        className="font-semibold mb-1"
                                        variant="h5"
                                        component="h3"
                                    >
                                        {type.title}
                                    </Typography>
                                    <Typography className={` theme ==='dark' ? "text-white :"text-gray-600 " `} variant="body2">
                                        {type.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Team Section */}
            <Box className=" py-12 md:py-20" >
                <Container maxWidth="lg">
                    <Box className="text-center mb-12" data-aos="fade-up" sx={{}}>
                        <Typography
                            className="text-yellow-400 tracking-widest"
                            variant="overline"
                            fontSize={30}
                        >
                            OUR TEAM
                        </Typography>
                        <Typography className=" flex justify-center items-center text-center" variant="h5" component="h2" sx={{ color: theme === 'dark' ? 'white' : '' }}>
                            The People Behind Saffron Stays
                        </Typography>

                    </Box>

                    <Grid container spacing={4}>
                        {teamMembers.map((member, index) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={3}
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <Card className="h-full rounded-lg shadow-md overflow-hidden">
                                    <Box className="relative pt-[100%]">
                                        <CardMedia
                                            component="img"
                                            image={member.image}
                                            alt={member.name}
                                            className="absolute top-0 left-0 w-full h-full object-cover"

                                        />
                                    </Box>
                                    <CardContent sx={{ bgcolor: theme === 'dark' ? '#292A2D' : 'white', color: theme === 'dark' ? 'white' : '' }}>
                                        <Typography
                                            className="font-semibold"
                                            variant="h6"
                                            component="h3"
                                        >
                                            {member.name}
                                        </Typography>
                                        <Typography
                                            className="text-yellow-600 mb-1"
                                            variant="subtitle2"
                                        >
                                            {member.position}
                                        </Typography>
                                        <Typography className={`theme==='dark' ? "text-white" : "text-gray-600"`} variant="body2">
                                            {member.bio}
                                        </Typography>
                                        <Box className="mt-3 flex gap-2">
                                            <IconButton
                                                size="small"
                                                className="bg-gray-100 hover:bg-yellow-100"
                                            >
                                                <LinkedIn fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                className="bg-gray-100 hover:bg-yellow-100"
                                            >
                                                <Twitter fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                className="bg-gray-100 hover:bg-yellow-100"
                                            >
                                                <Email fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Testimonials Section */}
            <Container maxWidth="lg" className="py-12 md:py-20">
                <Box className="text-center mb-12" data-aos="fade-up">
                    <Typography
                        className="text-yellow-400 tracking-widest"
                        variant="overline"
                        fontSize={40}
                    >
                        TESTIMONIALS
                    </Typography>
                    <Typography className="font-bold mb-2" variant="h5" component="h2">
                        What Our Guests Say
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {testimonials.map((testimonial, index) => (
                        <Grid
                            item
                            xs={12}
                            md={4}
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <Paper
                                elevation={2}
                                className="p-6 h-full rounded-lg flex flex-col transform transition-transform duration-300 hover:scale-105"
                                sx={{ bgcolor: theme === 'dark' ? '#292A2D' : 'white', color: theme === 'dark' ? 'white' : '' }}

                            >
                                <Typography className="flex-1 italic mb-4" variant="body1">
                                    "{testimonial.text}"
                                </Typography>
                                <Box>
                                    <Typography className="font-semibold" variant="subtitle1">
                                        {testimonial.author}
                                    </Typography>
                                    <Typography className="text-gray-600" variant="body2">
                                        {testimonial.location}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* CTA Section */}
            <Box
                className="py-12 md:py-20 bg-cover bg-center relative"
                sx={{
                    backgroundImage: `url(${Hero})`,
                }}
            >
                <div className="absolute inset-0  bg-opacity-70"></div>
                <Container maxWidth="md" className="relative z-10">
                    <Box
                        className="text-center text-white p-8 md:p-12 border border-white border-opacity-20 rounded-lg backdrop-filter backdrop-blur-md"
                        data-aos="fade-up"
                    >
                        <Typography className="font-bold mb-2" variant="h3" component="h2">
                            Ready for an Unforgettable Stay?
                        </Typography>
                        <Typography className="mb-8 max-w-2xl mx-auto" variant="body1">
                            Book your next adventure with Saffron Stays and experience
                            hospitality reimagined. From serene farmhouses to luxurious
                            treehouses, your perfect getaway awaits.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            className="bg-yellow-400 text-gray-800 hover:bg-yellow-500 px-8 py-3"
                        >
                            Book Your Stay Now
                        </Button>
                    </Box>
                </Container>
            </Box>

        </Box>
    );
};

export default About;
