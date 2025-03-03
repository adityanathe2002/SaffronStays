import React from 'react'
import Navbar from './Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import HeroSection from './Home/HeroSection';
import HomeSection2 from './Home/HomeSection2';
import HomeSection3 from './Home/HomeSection3';
import HomeSection4 from './Home/HomeSection4';
import Footer from './Footer/Footer';
import SocialMedia from './Footer/SocialMedia';

const SaffranStays = () => {
    const location = useLocation();
    return (
        <div>
            <Navbar />
            {location.pathname === '/' && (
                <>
                  <HeroSection/>
                  <HomeSection2/>
                  <HomeSection3/>
                  <HomeSection4/>
                  <SocialMedia/>
                </>
            )}
            <Outlet />
            <Footer />
        </div>
    );
}

export default SaffranStays