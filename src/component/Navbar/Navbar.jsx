import { BookmarkBorderOutlined, DarkMode, LightMode, Phone } from '@mui/icons-material';
import { AppBar, Box, Button, Menu, MenuItem, Drawer, IconButton, List, ListItem, ListItemText, TextField, Toolbar, Typography, Badge } from '@mui/material';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { FaChevronDown, FaUser } from "react-icons/fa";
import { MdPerson, MdLogout } from "react-icons/md";
import { FcBusinessman } from "react-icons/fc";
import { IoFilter } from "react-icons/io5";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
// import Logo from '../../assets/HomePage/logoImage.jpg';
import { useContext, useEffect, useState } from 'react';
import { staysContext } from '../AppContext/TentsContext';
import axios from 'axios';
import Cookies from "js-cookie";

const Navbar = () => {
    const { isLoggedIn, setIsLoggedIn, setUserDetails, addBookmark, setAddBookmark, addCart, setAddCart, theme, toggleTheme } = useContext(staysContext)
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [cartTrue, setCartTrue] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/bookmark").then((resp) => {
            setAddBookmark(resp.data);
        }).catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        // if (cartTrue) {
        axios.get("http://localhost:5000/cart").then((resp) => {
            setAddCart(resp.data);
            // setCartTrue(false)
        }).catch((error) => console.log(error))
        // }
    }, [])


    let bookmarkcount = addBookmark.length;
    let cartcount = addCart.length;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        Cookies.remove("email");
        Cookies.remove("password");
        Cookies.remove("rememberMe");
        setAnchorEl(null);
    };

    // const handleLogout = () => {
    //     setIsLoggedIn(false);
    //     setUserDetails({ email: "", password: "" });
    //     navigate('/');  // Redirect to login page
    // };

    const handleLogout = () => {
        Cookies.remove("email");
        Cookies.remove("password");
        Cookies.remove("rememberMe");
        setIsLoggedIn(false);
        setUserDetails({ email: "", password: "" });
        navigate("/");
    };


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navLinks = [
        { label: 'Home', to: '/' },
        { label: 'About Us', to: '/aboutus' },
        { label: 'Tours', to: '/stays' },
        { label: 'Contact Us', to: '/contactus' },
    ];

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
            <Typography variant='h6'
                class="p-2 font-semibold text-red-200"            >
                SaffronStays
            </Typography>
            <List>
                {navLinks.map((link) => (
                    <ListItem button key={link.to}>
                        <Link to={link.to}>
                            <ListItemText primary={link.label} />
                        </Link>
                    </ListItem>
                ))}
            </List>

            {/* Add Login and Contact Us buttons in the drawer */}
            <Box className="flex flex-col gap-2 px-4 py-2">
                {isLoggedIn ? (
                    <Link to=''>
                        <Button
                            variant="outlined"
                            onClick={handleLogout}
                            className="bg-gray-200 text-black border border-black rounded-xl w-full"
                        >
                            Logout
                        </Button>
                    </Link>

                ) : (
                    <Link to='/login'>
                        <Button
                            variant="outlined"
                            className="bg-gray-200 text-black border border-black rounded-xl w-full"
                        >
                            Login
                        </Button>
                    </Link>
                )}

            </Box>
        </Box>
    );

    return (
        <AppBar position="sticky" sx={{ backgroundColor: theme === "dark" ? "#1F2020" : "white", color: theme === "dark" ? "white" : "black", }} >
            <Toolbar sx={{}}
                className="flex justify-between items-center w-full  px-2 py-2"
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ display: { xs: 'block', sm: 'none' }, mr: 2 }}
                    onClick={handleDrawerToggle}
                >
                    <MenuIcon />
                </IconButton>

                {/* Logo */}
                <Box
                    className="flex items-center gap-2 sm:w-28" sx={{ fontSize: { xs: '14px', sm: '16px' }, gap: { xs: '1rem', sm: '2rem' } }}>
                    <Typography variant="h6" sx={{ fontFamily: "'Waltograph', sans-serif", fontSize: { xs: '16px', sm: '20px', lg: '20px' }, fontWeight: "500" }}>
                        <Link to='/'> SaffronStays</Link>
                    </Typography>
                </Box>


                {/* Desktop Navigation */}
                <Box
                    sx={{ width: "45%", color: "darkMode" ? "white" : "black", }}
                    className="hidden md:flex justify-center gap-6 ">
                    {navLinks.map((link, index) => (
                        <Link to={link.to} >
                            <NavLink

                                className={({ isActive }) => {
                                    let checkIsActive = ` ${isActive ? "text-blue-500 font-bold" : theme === "dark" ? "text-white" : "text-black"}`;
                                    return checkIsActive;
                                }}
                                to={link.to}
                            >
                                {link.label}
                            </NavLink>
                            {/* {link.label} */}

                        </Link>
                    ))}
                </Box>

                {/* Icons */}
                <Box className=" flex items-center justify-end   gap-4">
                    {/* cart */}
                    <Link to="/cart">
                        <IconButton sx={{ color: theme === 'dark' ? "white" : "black" }}>
                            <Badge badgeContent={cartcount} color="primary">
                                <ShoppingBagIcon color='black' />
                            </Badge>
                        </IconButton>
                    </Link>
                    {/* bookmark */}
                    <Link to="/bookmark">
                        <IconButton sx={{ color: theme === 'dark' ? "white" : "black" }}>
                            <Badge badgeContent={bookmarkcount} color="primary">
                                <BookmarkBorderOutlined color='black' />
                            </Badge>
                        </IconButton>
                    </Link>
                    {isLoggedIn ? (
                        <Box >
                            {/* Button to open dropdown */}
                            <Button
                                onClick={handleClick}
                                variant="contained"
                                sx={{
                                    backgroundColor: "white",
                                 color: "black",
                                    display: "flex",
                                    alignItems: "center",
                                    textTransform: "none",
                                    px: 2,
                                    py: 1,
                                    borderRadius: "8px",
                                    "&:hover": { backgroundColor: "#f0f0f0" },
                                }}
                            >
                                <Typography sx={{ mr: 1 }}> <FcBusinessman /> </Typography>
                                <IoFilter />
                            </Button>

                            {/* Dropdown Menu */}
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                    sx: {
                                        mt: 1,
                                        boxShadow: 3,
                                        borderRadius: "8px",
                                        minWidth: "150px"
                                    }
                                }}
                            >
                                {/* My Profile */}
                                <MenuItem
                                    onClick={handleClose}
                                    component={Link}
                                    to="/userData"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        "&:hover": { backgroundColor: "#f5f5f5" }
                                    }}
                                >
                                    <MdPerson size={20} className="text-blue-600" />

                                    <Link to="/userprofile">
                                        My Profile
                                    </Link>
                                </MenuItem>

                                {/* Booking Histroy */}
                                <MenuItem
                                    onClick={handleClose}
                                    component={Link}
                                    to="/userData"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        "&:hover": { backgroundColor: "#f5f5f5" }
                                    }}
                                >
                                    <ShoppingBagIcon color='black' size={20} />

                                    <Link to="/bookinghistroy">
                                        Booking Histroy
                                    </Link>
                                </MenuItem>

                                {/* Logout */}
                                <MenuItem
                                    onClick={() => {
                                        handleClose();
                                        handleLogout();
                                    }}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        color: "red",
                                        "&:hover": { backgroundColor: "#f5f5f5" }
                                    }}
                                >
                                    <MdLogout size={20} />
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        <Link to='/login' >
                            <Typography
                                // variant="outlined"
                                className="bg-gray-200 text-black border gap-2 border-gray-300 items-center rounded-xl px-4 py-1 hidden md:flex "
                            >
                                <FaUser />
                                Login
                            </Typography>
                        </Link>
                    )}

                    <IconButton onClick={toggleTheme} sx={{ color: theme === 'dark' ? "yellow" : "black" }}>
                        {theme === 'light' ? <DarkMode /> : <LightMode />}
                    </IconButton>
                </Box>



            </Toolbar>

            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
            >
                {drawer}
            </Drawer>
        </AppBar>
    );
};

export default Navbar;
