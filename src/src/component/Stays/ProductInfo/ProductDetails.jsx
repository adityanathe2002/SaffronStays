import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import SocialMedia from '../../Footer/SocialMedia'
import { useLocation, useNavigate } from "react-router-dom";
import ProductDetailSection1 from "./ProductDetailSection1";
import ProductDetailSection2 from "./ProductDetailSection2";
import ProductDetailSection3 from "./ProductDetailSection3";
import ProductDetailSection4 from "./ProductDetailSection4";
import ProductDetailSection5 from "./ProductDetailSection5";
import { staysContext } from "../../AppContext/TentsContext";

const ProductDetails = () => {
    let {theme} =useContext(staysContext);
useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" })
},[])

    return (
        <Box sx={{ width: "100%", height: "auto", padding: { xs: "1rem", lg: "2rem" },backgroundColor: theme === "dark" ? "black" : "#F1F1F1",}}>

            {/* Section 1*/}
            <ProductDetailSection1/>
            
            {/* section 2 */}
           <ProductDetailSection2/>

            {/* section 3 dining options */}
            <ProductDetailSection3/>

            {/* section 4 reviews*/}
            <ProductDetailSection4/>
            
            {/* Related camp */}
            <ProductDetailSection5/>

        </Box>
    );
};

export default ProductDetails;